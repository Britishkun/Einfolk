const Event = require("../../../Struct/Listeners");

module.exports = class Ready extends Event {
	constructor(...args) {
		super(...args, {
name: "ready",
        });
	}

	async run() {
		console.log(
			[
				`[CLIENT] ${this.user.username}`,
			].join("\n"),
		);
	}
};