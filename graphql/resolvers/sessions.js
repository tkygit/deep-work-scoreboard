const mongoose = require('mongoose');

const Session = require('../../models/Session');
const checkAuth = require('../../util/check-auth');

module.exports = {
    Mutation: {
        async createSession(_, { project, projectType, location, timeGoal }, context) {
            const user = checkAuth(context);

            const newSession = new Session({
                project,
                projectType,
                location,
                timeGoal,
                user: user.id,
                createdAt: new Date().toISOString()
            });

            const session = await newSession.save();

            return session;
        },
        async editCompletedTime(_, { session }, context) {
            const user = checkAuth(context);

            try {
                await Session.updateOne(
                    { _id: session },
                    { $set: { "completedAt" : new Date().toISOString() } }
                );

                return session;
            } catch (e) {
                throw new Error("Unable to update session: " + e);
            }
        },
    }
};