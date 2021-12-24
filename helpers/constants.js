const timerCommand = '`timer';
const joinCommand = '`join';
const hugCommand = '`hug';
const spaceRegExp = new RegExp('[\\s]+');
const numberRegExp = new RegExp('^[\\d]+.?[\\d]+$');
const numberUnitRegExp = new RegExp('^[\\d]+.?[\\d]*[smhd]$');
const units = ['secs', 'sec', 'min', 'mins', 'hour', 'hours', 'day', 'days'];
const unitsToNumber = {
	'secs': 1000,
	'sec': 1000,
	's': 1000,
	'min': 1000 * 60,
	'mins': 1000 * 60,
	'm': 1000 * 60,
	'hour': 1000 * 3600,
	'hours': 1000 * 3600,
	'h': 1000 * 3600,
	'day': 1000 * 3600 * 24,
	'days': 1000 * 3600 * 24,
	'd': 1000 * 3600 * 24,
};
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const tagRegExp = new RegExp('^[a-zA-Z0-9]{4}$');
const timerTags = {};
const tags = [];
const timerMessage = {};
const sleep = require('util').promisify(setTimeout);

module.exports = {
	timerCommand,
	joinCommand,
	spaceRegExp,
	numberRegExp,
	numberUnitRegExp,
	units,
	unitsToNumber,
	timerTags,
	characters,
	tagRegExp,
	sleep,
	tags,
	timerMessage,
	hugCommand,
};