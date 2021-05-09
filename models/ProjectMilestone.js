const { model, Schema } = require('mongoose');

const projectMilestoneSchema = new Schema({
    project: {
        type: Schema.Types.ObjectId,
        ref: 'projects'   
    },
    description: String,
    createdAt: String,
    session: {
        type: Schema.Types.ObjectId,
        ref: 'sessions'   
    },
});

module.exports = model ('ProjectMilestone', projectMilestoneSchema);