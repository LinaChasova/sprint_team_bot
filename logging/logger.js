function log(message) {
    const date = new Date(Date.now());
	console.log(`[${date.toISOString()}] ${message}`);
}

module.exports = { log };