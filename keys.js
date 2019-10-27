module.exports = {
    redisHost: process.env.REDIS_HOST,
    redisPort: process.env.REDIS_PORT
};

// connecting to redis. looks for host name and port. 
// set env variables for those to values here