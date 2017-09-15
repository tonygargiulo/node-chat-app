const moment = require('moment');

// new Date().getTime();
var someTimestamp = moment().valueOf();
console.log(someTimestamp);

var createdAt = 1234;
var date = moment(createdAt);
// date.add(100, 'year').subtract(9, 'months');
console.log(date.format('h:mm a'));
