const keys = require('./keys');
const redis = require('redis');

const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000
    // retry stratergy is telling server how often to retry conn to server if conn lost
});

//
const sub = redisClient.duplicate();

// func for calc. simple fib calculation. recursive solution
function fib(index){
    if (index < 2) return 1;
    return fib(index - 1) + fib(index - 2);
}

// anytime we get new value fib is called. message is index
sub.on('message', (channel, message) => {
    redisClient.hset('values', message, fib(parseInt(message)))
});

// called on insert event
sub.subscribe('insert');