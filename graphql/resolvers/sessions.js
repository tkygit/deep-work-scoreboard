const mongoose = require('mongoose');

const Session = require('../../models/Session');
const User = require('../../models/User');
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
            const user = checkAuth(context);
            const currUser = await User.findOne({ '_id': user.id });

            try {
                await Session.updateOne(
                    { _id: session },
                    { $set: {
                        "completedAt": new Date().toISOString(),
                        "timeSeconds": seconds,
                        "endTally": currUser.totalDwSeconds + seconds
                    }}
                );

                return seconds;
            } catch (e) {
                throw new Error("Unable to update session: " + e);
            }
        },
    },
    Query: {
        async getSessions(_, {}, context) {
            const user = checkAuth(context);

            try {
                const sessions = await Session.find({ 'user': user.id }).sort({ createdAt: -1 });
                return sessions;
            } catch (err) {
                throw new Error(err);
            }
        }
    }
};