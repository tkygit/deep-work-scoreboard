const { model, Schema } = require('mongoose');

const sessionSchema = new Schema({
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project'   
    },
    projectType: {
        type: Schema.Types.ObjectId,
        ref: 'ProjectType'   
    },
    location: {
        type: Schema.Types.ObjectId,
        ref: 'Location'   
    },
    timeGoal: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: String,
    completedAt: String,
    timeSeconds: Number,
    endTally: Number,
    expireAt: {
        type: Date,
        default: null
    }
});

sessionSchema.index({ expireAt: 1}, {expireAfterSeconds: 0})

module.exports = model ('Session', sessionSchema);