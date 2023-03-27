const Redis = require('ioredis');
const redis = new Redis({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD
});

const entityUrl = process.env.ENTITY_URL;
const userUrl = process.env.USER_URL;

module.exports = { entityUrl, userUrl, redis };
