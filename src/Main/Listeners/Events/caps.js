"use strict";

const Event = require("../../../Struct/Listeners");
const Database = require('../../../models/guildmodel')
const Discord = require('discord.js')
const limit = new Set()
module.exports = class Ping  extends Event {
	constructor(...args) {
		super(...args, {
name: "messageCreate",
        });
	}

	async run(message) {
        const db = await Database.findOne({guild: message.guild.id})|| {
            whitelist: [],
            caps: false,
            invite: false,
            website: false,
            spam: false,
        }
        if(message.author.id === this.user.id) return
        if(message.channel.type === "dm") return
        if(message.member.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)) return;
        if(db.whitelist.includes(message.author.id)) return
        if(db.caps === false) return

        let guild = message.guild
        let oziemb = new Discord.MessageEmbed()
        .setAuthor({
			name: guild.name,
			iconUL: guild.iconURL({dynamic: true})
		})
        .setFooter({text: "Edi tarafından geliştirildi"})
        .setColor("#4C0013")


        let str = message.content
        if(str.length < 3) return;
        if(str.replace(/[^A-Z]/g, "").length > message.content.length / 2) {
            await message.delete().catch(z => console.log(`Hata: ${z}`))
            oziemb.setColor("#4C0013").setDescription(`**${message.author}, Lütfen büyük harf kullanarak konuşma!**`)
            message.channel.send({embeds: [oziemb]}).then(msg => setTimeout(() => msg.delete() , 3000));
            limit.add(message.author.id,1)

        }



        

	}
};