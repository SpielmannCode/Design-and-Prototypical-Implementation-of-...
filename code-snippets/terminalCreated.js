async created() {
  await this.newCodeRequest();
  this.status = await this.fetchStatus();
  this.startPingInterval();
}
