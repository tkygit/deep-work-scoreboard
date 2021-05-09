const { model, Schema } = require('mongoose');

const projectSchema = new Schema({
    name: String,
    createdAt: String,
});

module.exports = model ('Project', projectSchema);