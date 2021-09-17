const {Schema, model} = require('mongoose');

const dataSchema = new Schema({ any: {} }, { strict: false, timestamps: true});

module.exports = model('Data',dataSchema);