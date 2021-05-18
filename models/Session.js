const { model, Schema } = require('mongoose');

const projectMilestoneSchema = new Schema({
    project: {
        type: Schema.Types.ObjectId,
        ref: 'projects'
    },
    project_type: {
        type: Schema.Types.ObjectId,
        ref: 'projecttypes'   
    },
    location: {
        type: Schema.Types.ObjectId,
        ref: 'location'   
    },
    timeGoal: Integer,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    createdAt: String,
    completedAt: String
});

module.exports = model ('ProjectMilestone', projectMilestoneSchema);