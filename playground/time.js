var moment = require('moment');
moment.locale('pl');
//// Jan 1st 1970 00:00:00 am
//// Unix timestamp is independend from time zones and shifts
//var date = new Date();
//console.log(date.getMonth());

// 10:35 am
// 6:01 am
var date = moment().add(5, 'hours');
date = date.format('h:mm a');
console.log(date);