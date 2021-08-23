const mongoose = require('mongoose');
const { authenticateGoogle } = require('../../util/passport');

const User = require('../../models/User');

const checkAuth = require('../../util/check-auth');
const { updateTimeMilestone } = require('../../util/updateTimeMilestone');

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
    }
};