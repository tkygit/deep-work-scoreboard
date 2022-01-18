const { model, Schema } = require('mongoose');

const projectSchema = new Schema({
    name: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    createdAt: Date,
    totalProjectTime: Number,
    expireAt: {
        type: Date,
        default: null
    }
});

projectSchema.index({ expireAt: 1}, {expireAfterSeconds: 0})

module.exports = model ('Project', projectSchema);