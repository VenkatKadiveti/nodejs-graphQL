var scheduler = require("node-schedule");
var db = require('../database/db');
console.log('job')
// { hour: 1, minute: 39, dayOfWeek: [0, 1, 2, 3, 4, 5, 6] } '*/5 * * * *'
var job = scheduler.scheduleJob('00 * * * *', function () {
    console.log('The answer to life, the universe, and everything!');
});

module.exports.job = job;