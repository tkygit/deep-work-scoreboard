const passport = require('passport');
const { Strategy: GoogleTokenStrategy } = require('passport-google-token');

const  { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = require('../config');

// GOOGLE STRATEGY
const GoogleTokenStrategyCallback = (accessToken, refreshToken, profile, done) => done(null, {
    accessToken,
    refreshToken,
    profile,
});

passport.use(new GoogleTokenStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
}, GoogleTokenStrategyCallback));

// promisified authenticate function
const authenticateGoogle = (req, res) => new Promise((resolve, reject) => {
    passport.authenticate('google-token', { session: false }, (err, data, info) => {
        if (err) reject(err);
        resolve({ data, info });
    })(req, res);
});

module.exports = { authenticateGoogle }; 