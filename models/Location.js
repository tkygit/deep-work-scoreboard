const { model, Schema } = require('mongoose');

const locationSchema = new Schema({
    name: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    createdAt: Date,
    expireAt: {
        type: Date,
        default: null
    }
});

locationSchema.index({ expireAt: 1}, {expireAfterSeconds: 0})

module.exports = model ('Location', locationSchema);