const { model, Schema } = require('mongoose');

const locationSchema = new Schema({
    name: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    createdAt: String,
});

module.exports = model ('Location', locationSchema);