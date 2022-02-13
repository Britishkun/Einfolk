"use strict";
const Event = require("../../../Struct/Listeners");
const Database = require('../../../models/guildmodel')
const Discord = require('discord.js');
const moment = require('moment')
moment.locale("tr")
module.exports = class Ping  extends Event {
	constructor(...args) {
		super(...args, {
name: "messageCreate",
        });
	}

	async run(message) {
        let AutoMod_INVITE = /(?:https?:\/\/)?(?:www\.)?discord(?:\.gg|\.me|(?:app)?\.com\/invite)\/([A-Za-z0-9-]+)/g;
let  AutoMod_WEBSITE = /(?:https?:\/\/)?((?:[A-Za-z0-9]+\.){1,128}(?:[A-Za-z0-9]{2,63})(?:\/[A-Za-z0-9._~:/?#\[\]@!$&'()*+,;%=-]*)?)/g;
        const db = await Database.findOne({guild: message.guild.id}) || {
            whitelist: [],
            caps: false,
            invite: false,
            website: false,
            spam: false,
            log: null
        }
        if(message.author.id === this.user.id) return
        if(message.channel.type === "dm") return
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




        let str = message.content
if(AutoMod_INVITE.test(str)) {
    if(db.invite === false) return
     message.delete().catch(z => console.log(`Hata: ${z}`))
    oziemb.setColor("#4C0013").setDescription(`**${message.author}, Lütfen invite linki atma!**`)
    message.channel.send({embeds: [oziemb]}).then(msg => setTimeout(() => msg.delete() , 3000));
    let content = await cleanContent(message.content,message.channel)
    setTimeout(() => {
        let desc = `\`[${moment(new Date()).format("LLL")}]\` ${this.guilds.cache.get("855922640987095040").emojis.cache.find(x => x.name === "warn")} **${message.author.tag}** \`(${message.author.id})\` ${message.channel} kanalında bir \`DISCORD_INVITE\` linki paylaştı. \n \`\`\`${content}\`\`\` `
        if(db.log && this.channels.cache.has(db.log)) this.channels.cache.get(db.log).send(desc)
    }, 3000);

    return
}

if(AutoMod_WEBSITE.test(str)) {
    if(db.website === false) return
    oziemb.setColor("#4C0013").setDescription(`**${message.author}, Lütfen website linki atma!**`)
     message.delete().catch(z => console.log(`Hata: ${z}`))
    message.channel.send({embeds: [oziemb]}).then(msg => setTimeout(() => msg.delete() , 3000));
let content = await cleanContent(message.content,message.channel)
setTimeout(() => {
    let desc = `\`[${moment(new Date()).format("LLL")}]\` ${this.guilds.cache.get("855922640987095040").emojis.cache.find(x => x.name === "warn")} **${message.author.tag}** \`(${message.author.id})\` ${message.channel} kanalında bir \`WEBSITE\` linki paylaştı. \n\`\`\`${content}\`\`\` `
    if(db.log && this.channels.cache.has(db.log)) this.channels.cache.get(db.log).send(desc)
}, 3000);

    return
}



        

	}
};




  async function _removeMentions(str) {
    return str.replaceAll('@', '@\u200b');
  }

   async function cleanContent(str, channel) {
    str = str
      .replace(/<@!?[0-9]+>/g, input => {
        const id = input.replace(/<|!|>|@/g, '');
        if (channel.type === 'DM') {
          const user = channel.client.users.cache.get(id);
          return user ? _removeMentions(`@${user.username}`) : input;
        }

        const member = channel.guild.members.cache.get(id);
        if (member) {
          return _removeMentions(`@${member.displayName}`);
        } else {
          const user = channel.client.users.cache.get(id);
          return user ? _removeMentions(`@${user.username}`) : input;
        }
      })
      .replace(/<#[0-9]+>/g, input => {
        const mentionedChannel = channel.client.channels.cache.get(input.replace(/<|#|>/g, ''));
        return mentionedChannel ? `#${mentionedChannel.name}` : input;
      })
      .replace(/<@&[0-9]+>/g, input => {
        if (channel.type === 'DM') return input;
        const role = channel.guild.roles.cache.get(input.replace(/<|@|>|&/g, ''));
        return role ? `@${role.name}` : input;
      });
    return str;
  }
