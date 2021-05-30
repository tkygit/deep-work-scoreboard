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
        async editSessionTime(_, { session, seconds }, context) {
            checkAuth(context);

            try {
                await Session.updateOne(
                    { _id: session },
                    { $set: { "timeSeconds" : seconds } }
                );

                return seconds;
            } catch (e) {
                throw new Error("Unable to update session: " + e);
            }
        },
    }
};