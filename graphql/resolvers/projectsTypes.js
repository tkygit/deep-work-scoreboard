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

            const foundProjectType = await ProjectType.findOne({ 'name': name, 'user': user.id });

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
        },
        async removeUserProjectTypes(_, {}, context) {
            const user = checkAuth(context);
            try {
                const date = new Date()
                const expireDate = date.setDate(date.getDate() + 7);

                return await ProjectType.updateMany({'user': user.id}, { $set: { expireAt: expireDate } });
            } catch (err) {
                throw new Error(err);
            }
        }
    },
    Query: {
        async getProjectTypes(_, {}, context) {
            const user = checkAuth(context);

            try {
                const projectTypes = await ProjectType.find({ 'user': user.id, 'expireAt': null }).sort({ createdAt: -1 });
                return projectTypes;
            } catch (err) {
                throw new Error(err);
            }
        },
        async getProjectType(_, { id }, context) {
            const user = checkAuth(context);

            try {
                const foundProjectType = await ProjectType.findOne({ '_id': id });
                return foundProjectType;
            } catch (err) {
                throw new Error(err);
            }
        }      
    }
};