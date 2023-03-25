const Redis = require('ioredis');
const redis = new Redis();

const entityUrl = 'http://localhost:4002/';
const userUrl = 'http://localhost:4001/';

module.exports = { entityUrl, userUrl, redis };