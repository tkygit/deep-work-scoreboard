const { model, Schema } = require('mongoose');

const locationSchema = new Schema({
    name: String,
    createdAt: String,
});

module.exports = model ('Location', locationSchema);