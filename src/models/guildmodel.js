const mongoose = require('mongoose');

const guildmodel = mongoose.Schema({
    guild: {type: String,default: null},
    whitelist: {type: Array,default: []},
    caps: {type: Boolean,default: false},
    invite: {type: Boolean,default: false},
    website: {type: Boolean,default: false},
    spam: {type: Boolean,default: false},
    mute: {type: String,default: null},
    log: {type: String,default: null},


})
module.exports = mongoose.model("guild", guildmodel);