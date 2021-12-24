// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');
const { isTimerCommand, isJoinCommand, isHugCommand } = require('./helpers/helpers.js');
const { performTimer, removeTag, joinTimer, sendHugGif } = require('./events.js');
const { log } = require('./logging/logger.js');
// const keepAlive = require("./server");

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	log(`bot instance is created ${client.user}`);
});

// bot commands on messages
client.on('messageCreate', async (message) => {
	// this thing should return (boolean, dictionary)
	if (message.author.id === client.user.id) return;

	const [isTimer, timerContent] = isTimerCommand(message);
	if (isTimer) {
		(async () => {
			const tag = await performTimer(message, timerContent);
			await removeTag(message.channel, tag);
		})();
		return;
	}
	const [isJoin, tag] = isJoinCommand(message);
	if (isJoin) {
		joinTimer(message, tag);
	}

	if (isHugCommand(message)) {
		sendHugGif(message);
	}
});

// keepAlive();
// Login to Discord with your client's token
client.login(token);