"use strict";
const Event = require("../../../Struct/Listeners");
const Database = require('../../../models/guildmodel')
const Discord = require('discord.js');
module.exports = class Ping  extends Event {
	constructor(...args) {
		super(...args, {
name: "guildDelete",
        });
	}

	async run(message) {
		console.log(`[GUILD] Left a guild ${guild.name} (${guild.id})`);
await Database.deleteOne({guild: guild.id}).exec()
	}
};