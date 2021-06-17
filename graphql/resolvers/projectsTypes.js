const mongoose = require('mongoose');

const ProjectType = require('../../models/ProjectType');
const checkAuth = require('../../util/check-auth');

module.exports = {
    Mutation: {
        async createProjectType(_, { name }, context) {
            const user = checkAuth(context);

            if (name.trim() === '') {
                throw new Error('ProjectType name must not be empty');
            }

            const foundProjectType = await ProjectType.findOne({ 'name': name });

            if (!foundProjectType) {
                const newProjectType = new ProjectType({
                    name,
                    user: user.id,
                    createdAt: new Date().toISOString()
                });
    
                const projectType = await newProjectType.save();
    
                return projectType;   
            } else {
                return foundProjectType;
            }
        }
    },
    Query: {
        async getProjectTypes(_, {}, context) {
            const user = checkAuth(context);

            try {
                const projectTypes = await ProjectType.find({ 'user': user.id }).sort({ createdAt: -1 });
                return projectTypes;
            } catch (err) {
                throw new Error(err);
            }
        }
    }
};