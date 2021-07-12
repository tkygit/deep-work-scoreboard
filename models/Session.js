const { model, Schema } = require('mongoose');

const sessionSchema = new Schema({
    project: {
        type: Schema.Types.ObjectId,
        ref: 'projects'   
    },
    projectType: {
        type: Schema.Types.ObjectId,
        ref: 'projecttypes'   
    },
    location: {
        type: Schema.Types.ObjectId,
        ref: 'locations'   
    },
    timeGoal: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    createdAt: String,
    completedAt: String,
    timeSeconds: Number,
    endTally: Number
});

module.exports = model ('Session', sessionSchema);