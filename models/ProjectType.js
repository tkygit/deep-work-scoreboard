const { model, Schema } = require('mongoose');

const projectTypeSchema = new Schema({
    name: String,
    createdAt: String,
});

module.exports = model ('ProjectType', projectTypeSchema);