const { model, Schema } = require('mongoose');

const sessionSchema = new Schema({
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
    time_goal: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    createdAt: String,
    completedAt: String
});

module.exports = model ('Session', sessionSchema);