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
    endTally: Number
});

module.exports = model ('Session', sessionSchema);