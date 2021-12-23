// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');
const { isTimerCommand, isJoinCommand } = require('./helpers/helpers.js');
const { performTimer, removeTag, joinTimer } = require('./events.js');
const { log } = require('./logging/logger.js');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	log(`bot instance is created ${client.user}`);
});

// bot commands on messages
client.on('messageCreate', message => {
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
	log(tag);
	if (isJoin) {
		joinTimer(message, tag);
	}
});

// Login to Discord with your client's token
client.login(token);