var mongoose = require('mongoose');
var ImgsSchema = require('../schemas/imgs');
var Imgs = mongoose.model('Imgs',ImgsSchema);

module.exports = Imgs;