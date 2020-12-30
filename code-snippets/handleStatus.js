async handleStatus() {
  let status = await this.fetchStatus();
  console.log("fetching status", status);
  if (status == "PENDING") {
    this.showQR();
  } else if (status == "GRANTED" && !this.alreadyHandlingGranted) {
    this.handleGrantedStatus();
  } else if (status == "DENIED" && !this.alreadyHandlingDenied) {
    this.handleDeniedStatus();
  }
}
