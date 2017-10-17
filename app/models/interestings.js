var mongoose = require('mongoose');
var InterestingSchema = require('../schemas/interestings');
var Interesting = mongoose.model('Interesting',InterestingSchema);

module.exports = Interesting;