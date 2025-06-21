const Redis = require('ioredis');

const redisClient = Redis.createClient({
  host: 'redis',
  port: 6379,
  retry_strategy: (options) => {
    if (options.error && options.error.code === 'ECONNREFUSED') {
      return new Error('Connection refused');
    }
    if (options.total_retry_time > 1000 * 60) {
      return null;
    }
    return Math.min(options.attempt * 100, 3000);
  },
});

module.exports = redisClient;
