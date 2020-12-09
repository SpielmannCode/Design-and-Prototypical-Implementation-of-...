async deployEventContract() {
  const args = cidToArgs(this.IpfsHash);
  this.showStatus(PROGRESS_DETERMINATE, WAITING_FOR_SIGNATURE);
  const createEvent = await this.eventFactory.methods
    .createEvent(
      args.hashFunction,
      args.size,
      args.digest,
      this.form.selectedApproverAddress,
      this.form.selectedApproverLevel,
      this.usedToken,
      this.form.granularity
    )
    .send(
      { from: this.$store.state.web3.account },
      async (error, transactionHash) => {
        this.showStatus(PROGRESS_INDETERMINATE, EVENT_DEPLOYING);
        if (transactionHash) {
          console.log(
            "submitted event contract deployment invocation: ",
            transactionHash
          );
        }
        let transactionReceipt = null;
        while (transactionReceipt == null) {
          transactionReceipt = await this.$store.state.web3.web3Instance.eth.getTransactionReceipt(
            transactionHash
          );
          await sleep(AVERAGE_TIME_WAITING_FOR_RECEIPT);
        }
        if (transactionReceipt) {
          console.log("Got the transaction receipt: ", transactionReceipt);
          this.showStatus(PROGRESS_INDETERMINATE, PROCESSING);
          await this.$store.dispatch("loadEvents");
          this.showStatus(PROGRESS_DETERMINATE, EVENT_DEPLOYED);
          await sleep(2000);
          this.hideStatus();
        }
        this.$router.push({
          path: `/`,
        });
      }
    )
    .catch(async (e) => {
      // Transaction rejected or failed
      this.deployingContractState = false;
      this.showErrorStatus();
      console.log(e);
      try {
        const result = await pinata.unpin(this.IpfsHash);
      } catch (e) {
        console.log(e);
      }
    });
}