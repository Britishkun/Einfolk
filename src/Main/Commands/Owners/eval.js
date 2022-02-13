const Command = require("../../../Struct/Command");
const Discord = require("discord.js");

module.exports = class Ping extends Command {
	constructor(client) {
		super(client, {
			name: "eval",
			description: "Return Result from code",
			category: "Owner",
            devOnly: true,
		});
	}

	async run(message, args) {

        const clean = text => {
            if (typeof(text) === "string")
              return clean2(text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203)));
            else {
                return clean2(text);
            }
            }
        const clean2 = text => {
            if(text == "undefined") {
                text = "Return Promise: Undefined"
                return text;
            } else {
                return text;
            }
        }
    
        try {
            const code = args.join(" ");
            if(!code) return message.channel.send("woow you are great!")
            let evaled = eval(code);
       
            if (typeof evaled !== "string")
              evaled = require("util").inspect(evaled);
           let sst = await this.client.utils.splitMessage(evaled)
           
sst.forEach(async function(x) {
    message.channel.send({content: clean(x)})
})

          } catch (err) {
           return message.channel.send(`\`HATA\` \`\`\`xl\n${clean(err)}\n\`\`\``);
          }

	}
};