const { model, Schema } = require('mongoose');

const projectSchema = new Schema({
    name: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    createdAt: String,
});

module.exports = model ('Project', projectSchema);