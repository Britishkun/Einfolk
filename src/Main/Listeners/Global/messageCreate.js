const Event = require("../../../Struct/Listeners");

module.exports = class Ping  extends Event {
	constructor(...args) {
		super(...args, {
name: "messageCreate",
        });
	}

	async run(message) {
const prefixs = [".","!","/"]
		if (message.channel.type === "dm") return;
		if (!message.guild || message.author.bot) return;
		const mentionRegex = RegExp(`^<@!?${this.user.id}>`);
		if (!prefixs.some(x => message.content.startsWith(x)) && !message.content.match(mentionRegex)) return;

		if (message.content.match(mentionRegex) && message.content.replace(mentionRegex, "").trim().length === 0)
			return message.channel.send(`Benim prefixim ${prefixs.map(x => x).join(",")} `);
		if (message.content.match(mentionRegex)) message.content = `!${message.content.replace(mentionRegex, "").trim()}`;
        const prefix = prefixs.filter(p => message.content.startsWith(p))[0];

		const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g);
		const command = this.commands.get(cmd.toLowerCase()) || this.commands.get(this.aliases.get(cmd.toLowerCase()));
		if (!command) return;
		if (command.devOnly) if (!["377135247004794880"].includes(message.author.id)) return;








        
try {
    await command.run(message,args)
} catch (error) {
    console.error(error)
}

	}
};