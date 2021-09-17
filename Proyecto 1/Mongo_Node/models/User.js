const {Schema, model} = require('mongoose');

const userSchema = new Schema({ any: {} }, { strict: false });

module.exports = model('User',userSchema);