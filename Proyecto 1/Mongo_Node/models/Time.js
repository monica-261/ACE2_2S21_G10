const {Schema, model} = require('mongoose');

const timeSchema = new Schema({ any: {} }, { strict: false, timestamps: true});

module.exports = model('Time',timeSchema);