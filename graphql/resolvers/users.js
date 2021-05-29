const mongoose = require('mongoose');
const { authenticateGoogle } = require('../../util/passport');

const User = require('../../models/User');
const checkAuth = require('../../util/check-auth');

module.exports = {
    Mutation: {
        authGoogle: async (_, { input: { accessToken } }, { req, res }) => {
            req.body = {
                ...req.body,
                access_token: accessToken,
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
                            token: user.generateJWT(),
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
        async addDwTime(_, { user, seconds }, context) {
            checkAuth(context);

            const foundUser = await User.findOne({ '_id': user });

            if (foundUser) {
                try {
                    const updated = await User.updateOne(
                        { _id: user },
                        { $set: { "totalDwSeconds" : foundUser.totalDwSeconds + seconds } }
                    );

                    return user;
                } catch (e) {
                    throw new Error("Unable to update user: " + e);
                }
            } else {
                throw new Error("Unable to find user to update");
            }
        },
    }
};