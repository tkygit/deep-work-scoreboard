const mongoose = require('mongoose');
const { authenticateGoogle } = require('../../util/passport');

const User = require('../../models/User');

const checkAuth = require('../../util/check-auth');
const { updateTimeMilestone } = require('../../util/updateTimeMilestone');
const { UserInputError } = require('apollo-server-errors');

module.exports = {
    Mutation: {
        authGoogle: async (_, { input: { accessToken, expiresIn } }, { req, res }) => {
            req.body = {
                ...req.body,
                access_token: accessToken
            };

            try {
                // data contains the accessToken, refreshToken and profile from passport
                const { data, info } = await authenticateGoogle(req, res);

                if (data) {
                    const user = await User.upsertGoogleUser(data);

                    if (user) {
                        return ({
                            ...user._doc,
                            id: user.id,
                            token: user.generateJWT(expiresIn)
                        });
                    }
                }

                if (info) {
                    console.log(info);
                    switch (info.code) {
                        case 'ETIMEDOUT':
                            return (new Error('Failed to reach Google: Try Again'));
                        default:
                            return (new Error('Something went wrong'));
                    }
                }
                return (Error('Server error'));
            } catch (error) {
                return error;
            }
        },
        async addDwTime(_, { seconds }, context) {
            const user = checkAuth(context);
            const currUser = await User.findOne({ '_id': user.id });

            if (currUser) {
                try {
                    const updatedDwTime = currUser.totalDwSeconds + seconds
                    await User.updateOne(
                        { _id: user.id },
                        { $set: {"totalDwSeconds" :  updatedDwTime} }
                    );

                    return updatedDwTime;
                } catch (e) {
                    throw new Error("Unable to update user: " + e);
                }
            } else {
                throw new Error("Unable to find user to update");
            }
        },
        async updateNextMilestoneHr(_, {}, context) {
            const user = checkAuth(context);
            const currUser = await User.findOne({ '_id': user.id });
            const updatedTimeMilestone = updateTimeMilestone(currUser.totalDwSeconds, currUser.nextMilestoneHr);

            if (updatedTimeMilestone != currUser.nextMilestoneHr) {
                try {
                    await User.updateOne(
                        { _id: user.id },
                        { $set: { "nextMilestoneHr" : updatedTimeMilestone } }
                    );

                } catch (e) {
                    throw new Error("Unable to update user's next milestone hour: " + e);
                }
            }

            return updatedTimeMilestone;
        },
        async updateLastSessionDetails(_, {project, projectType, location}, context) {
            const user = checkAuth(context);

            try {
                await User.updateOne(
                    { _id: user.id },
                    { $set: { 
                        "lastProject" : project,
                        "lastProjectType" : projectType,
                        "lastLocation": location
                        }
                    }
                );

            } catch (e) {
                throw new Error("Unable to update user's last session details: " + e);
            }

            return { 
                "lastProject" : project,
                "lastProjectType" : projectType,
                "lastLocation": location
            };
        },
        async removeUser(_, {}, context) {
            const user = checkAuth(context);
            try {
                const date = new Date()
                const expireDate = date.setDate(date.getDate() + 7);

                return await User.updateOne({'_id': user.id}, { $set: { expireAt: expireDate } });
            } catch (err) {
                throw new Error(err);
            }
        }
    },
    Query: {
        async getUserStats(_, {}, context) {
            const user = checkAuth(context);

            try {
                const foundUser = await User.findOne({ '_id': user.id });
                return {
                    id: foundUser.id,
                    totalDwSeconds: foundUser.totalDwSeconds,
                    nextMilestoneHr: foundUser.nextMilestoneHr
                };
            } catch (err) {
                throw new Error(err);
            }
        },
        async getLastSessionDetails(_, {}, context) {
            const user = checkAuth(context);

            try {
                const foundUser = await User.findOne({ '_id': user.id })
                                            .populate('lastProject')
                                            .populate('lastProjectType')
                                            .populate('lastLocation');
                return {
                    id: foundUser.id,
                    lastProject: foundUser.lastProject,
                    lastProjectType: foundUser.lastProjectType,
                    lastLocation: foundUser.lastLocation
                };
            } catch (err) {
                throw new Error(err);
            }
        },
        async getAccountDetails(_, {}, context) {
            const user = checkAuth(context);

            try {
                const foundUser = await User.findOne({ '_id': user.id });
                return {
                    id: foundUser.id,
                    email: foundUser.email,
                    firstName: foundUser.firstName,
                    lastName: foundUser.lastName
                };
            } catch (err) {
                throw new Error(err);
            }
        },
    }
};