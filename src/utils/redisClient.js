// redisClient.js
const redis = require('redis');
const client = redis.createClient({
  url: process.env.REDIS_URI,
});

client.on('connect', () => console.log('Connected to Redis'));
client.on('error', (err) => console.error('Redis error:', err));

module.exports = client;
