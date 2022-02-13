const {MessageEmbed} = require('discord.js')
const moment = require('moment')
class AhrivUtil {
	constructor(client) {
		this.client = client;
	}

	async toDate(date)  {
		return moment(date).format("DD/MM/YYYY HH:mm:ss");
	  };
	async embed(color,desc,bsm,thendelete,chn) {
		let user;
		if(bsm.member) {
			user = bsm.member.user;
		} else {
			user = bsm;
		}
		chn = bsm.channel;
		let ro1 = new MessageEmbed()
		.setDescription(desc)
		.setAuthor({
			name: bsm.guild.name,
			iconURL: bsm.guild.iconURL({dynamic: true})
		})
		.setFooter({
			text: "Edi tarafından geliştirildi"	,
			iconURL: user.avatarURL({dynamic: true})
		})
		.setColor(color)
		if(!thendelete[0]) {
			chn.send({embeds: [ro1]})
		} else {
			chn.send({embeds: [ro1]})
			.then(msg => setTimeout(() => msg.delete() , thendelete[1]));
		}
	}

	async splitMessage(text, { maxLength = 2000, char = '\n', prepend = '', append = '' } = {}) {
		text = AhrivUtil.resolveString(text);
		if (text.length <= maxLength) return [text];
		const splitText = text.split(char);
		if (splitText.some(chunk => chunk.length > maxLength)) throw new RangeError('SPLIT_MAX_LEN');
		const messages = [];
		let msg = '';
		for (const chunk of splitText) {
		  if (msg && (msg + char + chunk + append).length > maxLength) {
			messages.push(msg + append);
			msg = prepend;
		  }
		  msg += (msg && msg !== prepend ? char : '') + chunk;
		}
		return messages.concat(msg).filter(m => m);
	  }

static  resolveString(data) {
    if (typeof data === 'string') return data;
    if (Array.isArray(data)) return data.join('\n');
    return String(data);
  }

};

module.exports = AhrivUtil