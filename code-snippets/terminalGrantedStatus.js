async handleGrantedStatus() {
    if (!this.alreadyHandlingGranted) {
        this.alreadyHandlingGranted = true;
        try {
            let ticketAmount =  await this.fetchTicketAmount();
            this.showGranted(ticketAmount);
        } catch(e) {
            this.showError();
        }
    }
}
