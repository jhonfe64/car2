const moment = require('moment');
const helpers = {}


helpers.date = (timeStamp) => {
    return moment(timeStamp).add(10, 'days').calendar(); 
}

module.exports = helpers;