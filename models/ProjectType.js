const { model, Schema } = require('mongoose');

const projectTypeSchema = new Schema({
    name: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    createdAt: String
});

module.exports = model ('ProjectType', projectTypeSchema);