  async handleMissedEvents(currentUserAddress) {
      // fetch events from event smart contract
    const events = await this.contract.getPastEvents("allEvents", {
      fromBlock: this.lastFetchedBlock + 1,
    });
    let userEvents = [];
    for (const event of events) {
        // assign event handler
        await this[`handle${event.event}`](event);
      if (eventConcernsUser(event, currentUserAddress)) {
        userEvents.push({ type: event.event, event: event.returnValues });
      }
    }
    return { success: true, userEvents };
  }