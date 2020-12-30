async uploadToIpfs() {
  this.ipfsString = this.createIpfsString();
  const result = await pinata.pinJSONToIPFS(JSON.parse(this.ipfsString));
  this.IpfsHash = result.IpfsHash;
},

createIpfsString() {
  let imgData = this.imageData;
  if (imgData == "") {
    if (this.event.image != "") {
      imgData = this.event.image;
    }
  }
  return JSON.stringify({
    version: "1.0",
    event: {
      title: this.form.title,
      location: this.form.location,
      category: this.form.category,
      description: this.form.eventDescription,
      time: this.startTimeUnix,
      website: this.form.website,
      twitter: this.formatTwitter,
      image: imgData,
    },
  });
}
