"use strict";
const Event = require("../../../Struct/Listeners");
const Database = require('../../../models/guildmodel')
const Discord = require('discord.js');
module.exports = class Ping  extends Event {
	constructor(...args) {
		super(...args, {
name: "guildCreate",
        });
	}

	async run(message) {
		console.log(`[GUILD] Joined a new guild ${guild.name} (${guild.id})`);
	}
};