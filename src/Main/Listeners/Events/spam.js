"use strict";
const Event = require("../../../Struct/Listeners");
const Database = require('../../../models/guildmodel')
const Discord = require('discord.js');

const spam1 = new Map();
const limit = new Discord.Collection();

const arrr = new Discord.Collection();


module.exports = class Ping  extends Event {
	constructor(...args) {
		super(...args, {
name: "messageCreate",
        });
	}

	async run(message) {
        const db = await Database.findOne({guild: message.guild.id}) || {
            whitelist: [],
            caps: false,
            invite: false,
            website: false,
            spam: false,
            mute: null
        }

        if(message.author.id === this.user.id) return
        if(message.channel.type === "dm") return
        if(db.spam === false) return
        if(message.member.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)) return;
        if(db.whitelist.includes(message.author.id)) return

        let guild = message.guild
        let oziemb = new Discord.MessageEmbed()
        .setAuthor({
			name: guild.name,
			iconUL: guild.iconURL({dynamic: true})
		})
        .setFooter({text: "Edi tarafından geliştirildi"})
        .setColor("#4C0013")




if(!spam1.has(message.author.id)) {
    spam1.set(message.author.id, {
        limit: 2
    });
    arrr.set(message.author.id, {mesjalar: [message]})
} else {
    let sayi =  spam1.get(message.author.id).limit
    spam1.set(message.author.id, {
        limit: sayi + 1
    });
    let ay = arrr.get(message.author.id).mesjalar.push(message)
    let bruh = arrr.get(message.author.id)
setTimeout(() => {
    spam1.delete(message.author.id)
}, 10*1000);
if(sayi >= 5) {
    bruh.mesjalar.forEach(async x =>  {
    const channel = message.guild.channels.cache.get(message.channel.id)
    if (channel) {
        const msg = channel.messages.cache.get(x.id)
        if (msg && msg.deletable) msg.delete()
    }})
    arrr.set(message.author.id, {mesjalar: []})
    if(db.mute !== null) message.member.roles.add(db.mute).catch(x => console.log("Rol hatası"))
    if(db.mute !== null) message.channel.send({content: "Susturuldu"})
}

}




	}
};