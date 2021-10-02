const { model, Schema } = require('mongoose');
const jwt = require('jsonwebtoken');

const { SECRET_KEY } = require('../config');

const userSchema = new Schema({
    email: String,
    googleProvider: {
        id: String,
        token: String
    },
    createdAt: String,
    firstName: String,
    lastName: String,
    totalDwSeconds: Number,
    nextMilestoneHr: Number,
    projectMilestones: [
        {
            type: Schema.Types.ObjectId,
            ref: 'projectmilestones'
        }
    ]
});

// Model Methods
userSchema.methods.generateJWT = function (expiresInSecs) {
    return jwt.sign({
        email: this.email,
        id: this._id,
        firstName: this.firstName,
        lastName: this.lastName
    }, SECRET_KEY, { expiresIn: expiresInSecs });
}

userSchema.statics.upsertGoogleUser = async function ({ accessToken, refreshToken, profile }) {
    const User = this;

    const user = await User.findOne({ 'googleProvider.id': profile.id });

    // no user was found, lets create a new one
    if (!user) {
        const newUser = await User.create({
            email: profile.emails[0].value,
            googleProvider: {
                id: profile.id,
                token: accessToken,
            },
            createdAt: new Date().toISOString(),
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            totalDwSeconds: 0,
            nextMilestoneHr: 10,
        });

        return newUser;
    }
    return user;
};

module.exports = model ('User', userSchema);