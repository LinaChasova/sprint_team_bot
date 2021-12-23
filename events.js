const { log } = require('./logging/logger.js');
const { unitsToNumber, timerTags, sleep, tags, timerMessage } = require('./helpers/constants.js');
const { makeId } = require('./helpers/helpers.js');

const performTimer = async (message, timerContent) => {
	log(`(performTimer) | timer command is started | ${timerContent.timer}${timerContent.units} ${timerContent.message}`);

    // check if current channel was already registered
    if (!(message.channel in timerTags)) timerTags[message.channel] = [];

    // get random tag for timer
    let tag = makeId(4);
    // make it check over all timers
    while (tags.includes(tag)) {
        tag = makeId(4);
    }

    timerTags[message.channel].push(tag);
    tags.push(tag);
    timerMessage[tag] = timerContent.message.join(' ');
    log(JSON.stringify(timerTags));

    message.channel.send(`Your timer ${tag} is scheduled`);

    const timeAwait = await timerContent.time * unitsToNumber[timerContent.units];
    await sleep(timeAwait);
    log(timerMessage[tag]);
    await message.channel.send(timerMessage[tag]);

    return tag;
};

function joinTimer(message, tag) {
    log(`(joinTimer) | add ${message.author.username} to timer ${tag}`);
    timerMessage[tag] += ` ${message.author.toString()}`;
    message.channel.send('Successfully added you to a timer');
}

const removeTag = async (channel, tag) => {
    log(`(removeTag) | remove ${tag} from ${channel}`);
    timerTags[channel] = await timerTags[channel].filter(item => item !== tag);
    const index = tags.indexOf(tag);
    tags.splice(index, 1);
    delete timerMessage[tag];
    log(JSON.stringify(timerTags));
};

module.exports = { performTimer, removeTag, joinTimer };