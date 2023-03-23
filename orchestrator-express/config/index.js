const Redis = require('ioredis');
const redis = new Redis();

const entityUrl = 'http://localhost:3000/';
const userUrl = 'http://localhost:3001/';

module.exports = { entityUrl, userUrl, redis };
