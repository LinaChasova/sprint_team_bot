const { log } = require('../logging/logger.js');
const { timerCommand, joinCommand, spaceRegExp,
        numberRegExp, numberUnitRegExp, units,
        characters, tagRegExp, timerTags,
        hugCommand } = require('./constants.js');


function isTimerCommand(message) {
	// spliting message by the space
    log(`(isTimerCommand) | checking the message | [${message.content}]`);
    let args = message.content.split(spaceRegExp);

    // find index of the timer command
    // will return -1 if no such word
    const index = args.findIndex(word => word === timerCommand);

    if (index == -1) return [false, {}];

    // remove all the words before the command
    args = args.splice(index);

    // check for the time restraint
    // if format [number] [time unit] [message]
    if (numberRegExp.test(args[1]) & units.includes(args[2]) & args.length > 3) {
        const timer = parseFloat(args[1]);
        const timerContent = {
            time: timer,
            units: args[2],
            message: args.splice(3),
        };
        return [true, timerContent];
    }
    // parse by s, m, h, d -> if has number (float)
    // if format [number][time unit] [message]
    else if (numberUnitRegExp.test(args[1]) & args.length > 2) {
        // taking the last character
        const unit = args[1][args[1].length - 1];
        // taking the number out
        const timer = parseFloat(args[1].slice(0, args[1].length - 1));
        const timerContent = {
            time: timer,
            units: unit,
            message: args.splice(2),
        };
        return [true, timerContent];
    }

    message.channel.send('Command should be in format `` `timer [number][unit] [message] `` or `` `timer [number] [unit] [message] ``');
    return [false, {}];
}

function isJoinCommand(message) {
	// spliting message by the space
    log(`(isJoinCommand) | checking the message | [${message.content}]`);
    let args = message.content.split(spaceRegExp);

    // find index of the join command
    // will return -1 if no such word
    const index = args.findIndex(word => word === joinCommand);

    if (index == -1) return [false, null];

    // remove all the words before the command
    args = args.splice(index);

    // check for valid tag and that the tag is exists in channel id
    if (tagRegExp.test(args[1])) {
        if (message.channel in timerTags) {
            if (timerTags[message.channel].includes(args[1])) return [true, args[1]];
        }
        message.channel.send(`Timer ${args[1]} doesn't exist.`);
        return [false, null];
    }

    message.channel.send('Command should be in format ``join [tag]`');
    return [false, null];
}

function makeId(length) {
    log(`\t(makeId) create id length=${length}`);
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
   }
   return result;
}

function isHugCommand(message) {
	// spliting message by the space
    log(`(isHugCommand) | checking the message | [${message.content}]`);
    const args = message.content.split(spaceRegExp);

    // find index of the join command
    // will return -1 if no such word
    const index = args.findIndex(word => word === hugCommand);

    if (index == -1) return false;

    return true;
}

module.exports = { timerCommand, joinCommand, isTimerCommand, isJoinCommand, makeId, isHugCommand };