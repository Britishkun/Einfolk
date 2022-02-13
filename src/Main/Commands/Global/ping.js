const Command = require("../../../Struct/Command");
const Discord = require("discord.js");

module.exports = class Ping extends Command {
	constructor(client) {
		super(client, {
			name: "ping",
			description: "Return the Websocket and API latency",
			category: "Global",
		});
	}

	async run(message, args) {
		const latency = Math.floor(new Date().getTime() - message.createdTimestamp);
		const apiLatency = Math.round(this.client.ws.ping);

		return message.channel.send(`Pong \`${latency}\` ms | **API:** \`${apiLatency}\` ms`);
	}
};