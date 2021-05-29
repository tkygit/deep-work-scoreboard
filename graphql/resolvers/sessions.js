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
        async editTotalTime(_, { session, seconds }, context) {
            const user = checkAuth(context);

            try {
                const updated = await Session.updateOne(
                    { _id: session },
                    { $set: { "timeSeconds" : seconds } }
                );
                console.log(updated);
                return session;
            } catch (e) {
                throw new Error("Unable to update session: " + e);
            }
        },
    }
};