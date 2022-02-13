
module.exports = class Event {
	constructor(client, options = {}) {
		this.name = options.name;
        this.desc = options.desc || "No description provided";
        this.category = options.category || "Miscellaneous";
		this.client = client;
	}


};