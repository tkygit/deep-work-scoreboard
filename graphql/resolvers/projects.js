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
                    createdAt: new Date().toISOString(),
                    totalProjectTime: 0
                });
    
                const project = await newProject.save();
    
                return project;   
            } else {
                return foundProject;
            }
        },
        async addProjectTime(_, { project, seconds }, context) {
            checkAuth(context);

            const foundProject = await Project.findOne({ '_id': project });

            if (foundProject) {
                try {
                    const updatedProjectTime = foundProject.totalProjectTime + seconds;
                    await Project.updateOne(
                        { _id: project },
                        { $set: {"totalProjectTime" : updatedProjectTime} }
                    );
    
                    return updatedProjectTime;
                } catch (e) {
                    throw new Error("Unable to update project: " + e);
                }
            } else {
                throw new Error("Unable to find project to update");
            }
        },
    }
};