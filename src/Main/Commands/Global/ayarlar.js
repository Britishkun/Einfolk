const Command = require("../../../Struct/Command");
const Discord = require("discord.js");
const Database = require('../../../models/guildmodel')
module.exports = class Ping extends Command {
	constructor(client) {
		super(client, {
			name: "ayarlar",
			description: "Ayar yapmaya yarar",
			category: "Global",
		});
	}

	async run(message, args) {
const db = await Database.findOne({guild: message.guild.id})|| {
    whitelist: [],
    caps: false,
    invite: false,
    website: false,
    spam: false,
	mute: null,
	log: null
}
switch(args[0]) {
case "whitelist":
	case "güvenli":
		case "beyazliste":
			
		const user = message.mentions.members.first() || message.guild.members.cache.get(args[1])
		if(!user) return this.client.utils.embed("RED",`Güvenli listeye eklemek için geçerli bir kişi belirtmelisin!`,message,[true,15000],message.channel), message.react(this.client.emojis.cache.find(x => x.name === "shinoa_red"))

if(!db.whitelist.includes(user.id)) {
	await  Database.findOneAndUpdate({guild: message.guild.id}, {$push: {whitelist: user.id}},{upsert: true}).exec()
	this.client.utils.embed("GREEN",`${user} Kişisi başarıyla whiteliste eklendi.`,message,[true,15000],message.channel), message.react(this.client.emojis.cache.find(x => x.name === "shinoa_onay"))
	
} else {
	await  Database.findOneAndUpdate({guild: message.guild.id}, {$pull: {whitelist: user.id}},{upsert: true}).exec()
this.client.utils.embed("GREEN",`${user} Kişisi başarıyla whitelistten çıkarıldı.`,message,[true,15000],message.channel), message.react(this.client.emojis.cache.find(x => x.name === "shinoa_onay"))

}
break;

case "caps":
	case "capslock":
		case "büyükharf":
if(db.caps === true) {
await Database.findOneAndUpdate({guild: message.guild.id}, {$set: {caps: false}}, {upsert: true}).exec()
this.client.utils.embed("GREEN",`Büyük harf koruması başarıyla kapatıldı!`,message,[true,15000],message.channel), message.react(this.client.emojis.cache.find(x => x.name === "shinoa_onay"))

} else if(db.caps === false) {
	await Database.findOneAndUpdate({guild: message.guild.id}, {$set: {caps: true}},{upsert: true}).exec()
	this.client.utils.embed("GREEN",`Büyük harf koruması başarıyla açıldı!`,message,[true,15000],message.channel), message.react(this.client.emojis.cache.find(x => x.name === "shinoa_onay"))

}
break;

case "invite":
	case "discordlink": 
	if(db.invite === true) {
		await Database.findOneAndUpdate({guild: message.guild.id}, {$set: {invite: false}}, {upsert: true}).exec()
		this.client.utils.embed("GREEN",`Invite  koruması başarıyla kapatıldı!`,message,[true,15000],message.channel), message.react(this.client.emojis.cache.find(x => x.name === "shinoa_onay"))
		
		} else if(db.invite === false) {
			await Database.findOneAndUpdate({guild: message.guild.id}, {$set: {invite: true}}, {upsert: true}).exec()
			this.client.utils.embed("GREEN",`Invite koruması başarıyla açıldı!`,message,[true,15000],message.channel), message.react(this.client.emojis.cache.find(x => x.name === "shinoa_onay"))
		}
break;
case "website":
	case "site":
		if(db.website === true) {
			await Database.findOneAndUpdate({guild: message.guild.id}, {$set: {website: false}}, {upsert: true}).exec()
			this.client.utils.embed("GREEN",`Website  koruması başarıyla kapatıldı!`,message,[true,15000],message.channel), message.react(this.client.emojis.cache.find(x => x.name === "shinoa_onay"))
			
			} else if(db.website === false) {
				await Database.findOneAndUpdate({guild: message.guild.id}, {$set: {website: true}}, {upsert: true}).exec()
				this.client.utils.embed("GREEN",`Website koruması başarıyla açıldı!`,message,[true,15000],message.channel), message.react(this.client.emojis.cache.find(x => x.name === "shinoa_onay"))
			}
	break;
	case "spam":
		case "flood":
			if(db.spam === true) {
				await Database.findOneAndUpdate({guild: message.guild.id}, {$set: {spam: false}}, {upsert: true}).exec()
				this.client.utils.embed("GREEN",`Spam  koruması başarıyla kapatıldı!`,message,[true,15000],message.channel), message.react(this.client.emojis.cache.find(x => x.name === "shinoa_onay"))
				
				} else if(db.spam === false) {
					await Database.findOneAndUpdate({guild: message.guild.id}, {$set: {spam: true}}, {upsert: true}).exec()
					this.client.utils.embed("GREEN",`Spam koruması başarıyla açıldı!`,message,[true,15000],message.channel), message.react(this.client.emojis.cache.find(x => x.name === "shinoa_onay"))
				}
		break;
		case "muterol":
			case "mute":
				case "muted":

					const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])

					if(!role) return this.client.utils.embed("RED",`Geçerli bir **mute** rolü etiketlemelisin`,message,[true,15000],message.channel), message.react(this.client.emojis.cache.find(x => x.name === "shinoa_red"))
					await Database.findOneAndUpdate({guild: message.guild.id}, {$set: {mute: role.id}}, {upsert: true}).exec()
					this.client.utils.embed("GREEN",`Mute rölü başarıyla ${role} olarak ayarlandı!`,message,[true,15000],message.channel), message.react(this.client.emojis.cache.find(x => x.name === "shinoa_onay"))
					break;

case "log":
	case "channel":
		case "logchannel":
			const chan = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])

			if(!chan) return this.client.utils.embed("RED",`Geçerli bir **mute** rolü etiketlemelisin`,message,[true,15000],message.channel), message.react(this.client.emojis.cache.find(x => x.name === "shinoa_red"))
			await Database.findOneAndUpdate({guild: message.guild.id}, {$set: {log: chan.id}}, {upsert: true}).exec()
			this.client.utils.embed("GREEN",`Log kanalı başarıyla ${chan} olarak ayarlandı!`,message,[true,15000],message.channel), message.react(this.client.emojis.cache.find(x => x.name === "shinoa_onay"))
			break;

		default:
			this.client.utils.embed("#1A5BE3",`**${message.guild.name} Ayarları

			● Whitelist:
			${db.whitelist ? db.whitelist.map(x => `<@${x}>`) : "Kapalı"}
			● Capslock Koruması:
			${db.caps === true ? "Açık": "Kapalı"}
			● Discord Invite Koruması:
			${db.invite === true ? "Açık": "Kapalı"}
			● Website Koruması:
			${db.website === true ? "Açık": "Kapalı"}
			● Spam Koruması:
			${db.spam === true ? "Açık": "Kapalı"}
			● Mute Rolü:
			${db.mute === null ? "Ayarlanmamış": message.guild.roles.cache.has(db.mute) ? `<@&${db.mute}>`: "Geçersiz Rol"}
			● Log Kanalı:
			${db.log === null ? "Ayarlanmamış": message.guild.channels.cache.has(db.log) ? `<#${db.log}>`: "Geçersiz Kanal"}
**
			`,message,[true,15000],message.channel)

		}





	}
};