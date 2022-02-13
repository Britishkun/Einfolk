const {Intents,Client,Collection} = require('discord.js')
const Utilss = require('../Utils/Client')
const fs = require('fs');
const { join } = require('path');
class Ahriv extends Client {
    constructor() {
        super({
            intents: Object.keys(Intents.FLAGS)
        })
		this.commands = new Collection();
        this.aliases = new Collection();
        this.listeners = new Collection();
        this.utils = new Utilss(this)

    }

async commandHandler() {
    let dirs = fs.readdirSync(`${join(__dirname,"..","Main","Commands")}`, { encoding: "utf8" });

for (const command of dirs) {
     let files = fs.readdirSync(`${join(__dirname,"..","Main","Commands",command)}`, { encoding: "utf8" }).filter(file => file.endsWith(".js"));

for (const cFiles of files) {
    const Command = new (require(`${join(__dirname,"..","Main","Commands",command,cFiles)}`))(this)
if(!Command.name) return console.error(`An error occurred while loading Command [${command}](${cFiles})`)
console.log(Command.run)
try {
    this.commands.set(Command.name, Command);
    if (Command.aliases.length) {
        for (const alias of Command.aliases) {
            this.aliases.set(alias, Command.name);
        }
    }

    console.log(`[${command}](${cFiles}) is Loaded `);

} catch (error) {
console.error(error)
}    
}

}

} 

async eventHandler() {
    let dirs = fs.readdirSync(`${join(__dirname,"..","Main","Listeners")}`, { encoding: "utf8" });
for(const listDir of dirs) {
    let files = fs.readdirSync(`${join(__dirname,"..","Main","Listeners",listDir)}`, { encoding: "utf8" }).filter(file => file.endsWith(".js"));
for(const listeners of files) {
    const List = new (require(`${join(__dirname,"..","Main","Listeners",listDir,listeners)}`))(this)
    if(!List.name) return console.error(`An error occurred while loading Listeners [${listDir}](${listeners})`)
    this.on(List.name, List.run);

    //console.log(List)
    // try {
    //     this.listeners.set(listeners.name, listeners);

    // } catch (error) {
        
    // }
}
}
}

async login(token) {
    await this.commandHandler()
    await this.eventHandler()

    await super.login(token)
}

}

module.exports = Ahriv