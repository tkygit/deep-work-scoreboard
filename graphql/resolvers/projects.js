const mongoose = require('mongoose');

const Project = require('../../models/Project');
const checkAuth = require('../../util/check-auth');

module.exports = {
    Mutation: {
        async createProject(_, { name }, context) {
            const user = checkAuth(context);

            if (name.trim() === '') {
                throw new Error('Project name must not be empty');
            }

            const foundProject = await Project.findOne({ 'name': name });

            if (!foundProject) {
                const newProject = new Project({
                    name,
                    user: user.id,
                    createdAt: new Date().toISOString()
                });
    
                const project = await newProject.save();
    
                return project;   
            } else {
                return foundProject;
            }
        }
    }
};