const fs = require("fs");
const Discord = require("discord.js");
const Sssh = require('./Struct/Client')
const mongoose = require('mongoose')

const client = new Sssh()
client.login().then(x => console.log("Ssh"))

mongoose.connect("", { useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify: false});
mongoose.connection.on('connected',()=>{
console.log("evet")
})
