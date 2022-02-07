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

            const foundProject = await Project.findOne({ 'name': name, 'user': user.id });

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
        async updateProjectName(_, { project, name }, context) {
            checkAuth(context);

            const foundProject = await Project.findOne({ '_id': project });

            if (foundProject) {
                try {
                    await Project.updateOne(
                        { _id: project },
                        { $set: {"name" : name} }
                    );
    
                    return name;
                } catch (e) {
                    throw new Error("Unable to update project: " + e);
                }
            } else {
                throw new Error("Unable to find project to update");
            }
        },
        async removeProject(_, { project }, context) {
            const user = checkAuth(context);
            try {
                const date = new Date()
                const expireDate = date.setDate(date.getDate() + 7);

                return await Project.updateMany({'user': user.id, '_id': project}, { $set: { expireAt: expireDate } });
            } catch (err) {
                throw new Error(err);
            }
        },
        async removeUserProjects(_, {}, context) {
            const user = checkAuth(context);
            try {
                const date = new Date()
                const expireDate = date.setDate(date.getDate() + 7);

                return await Project.updateMany({'user': user.id, 'name': {$ne: 'Default Project'}}, { $set: { expireAt: expireDate } });
            } catch (err) {
                throw new Error(err);
            }
        }
    },
    Query: {
        async getProjects(_, {}, context) {
            const user = checkAuth(context);

            try {
                const projects = await Project.find({ 'user': user.id, 'expireAt': null }).sort({ createdAt: -1 });
                return projects;
            } catch (err) {
                throw new Error(err);
            }
        },
        async getProject(_, { id }, context) {
            const user = checkAuth(context);

            try {
                const foundProject = await Project.findOne({ '_id': id });
                return foundProject;
            } catch (err) {
                throw new Error(err);
            }
        }      
    }
};