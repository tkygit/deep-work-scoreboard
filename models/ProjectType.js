const { model, Schema } = require('mongoose');

const projectTypeSchema = new Schema({
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

projectTypeSchema.index({ expireAt: 1}, {expireAfterSeconds: 0})

module.exports = model ('ProjectType', projectTypeSchema);