const { Permissions } = require("discord.js");

module.exports = class Command {
	constructor(client, options = {}) {
		this.client = client;
		this.name = options.name
		this.aliases = options.aliases || new Array()
		this.description = options.description || "No description provided";
		this.category = options.category || "Miscellaneous";
		this.usage = options.usage || "No usage provided";
		this.userPerms = new Permissions(options.userPerms).freeze();
		this.userRoles = options.roles || new Array()
		this.devOnly = options.devOnly || false;
	}
	async run(_message, _args) {
		console.log("log")
	}

};