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
                createdAt: new Date().toISOString(),
                completedAt: "",
                timeSeconds: 0,
                endTally: 0
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
                        "endTally": currUser.totalDwSeconds
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
                const sessions = await Session.find({ 'user': user.id })
                                              .sort({ createdAt: -1 })
                                              .populate('project')
                                              .populate('projectType')
                                              .populate('location');
                return sessions;
            } catch (err) {
                throw new Error(err);
            }
        },
        async getSession(_, { id }, context) {
            const user = checkAuth(context);

            try {
                const foundSession = await Session.findOne({ '_id': id })
                                                  .populate('project')
                                                  .populate('projectType')
                                                  .populate('location');
                return foundSession;
            } catch (err) {
                throw new Error(err);
            }
        }  
    }
};