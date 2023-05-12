const express = require("express");
const router = express.Router();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
        },
        async function (accessToken, refreshToken, profile, done) {
            const newUser = {
                googleId: profile.id,
                googleEmail: profile.email,
                displayName: profile.displayName,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                profileImage: profile.photos[0].value,
            };

            try {
                let user = await User.findOne({ googleId: profile.id });
                console.log(user);
                if (user) {
                    done(null, user);
                } else {
                    user = await User.create(newUser);
                    done(null, user);
                }
            } catch (error) {
                console.log(error);
            }
        }
    )
);

// Google Login Route
router.get("/auth/google",
    passport.authenticate("google", { scope: ["email", "profile"] })
);

// Retrieve user data
router.get("/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/login-failure",
        successRedirect: "/",
    })
);

// Route if something goes wrong
router.get('/login-failure', (req, res) => {
    res.send('Something went wrong...');
});

// Destroy user session
router.get('/logout', (req, res) => {
    req.session.destroy(error => {
        if(error) {
            console.log(error);
            res.send('Error login out');
        } else {
            res.redirect('/')
        }
    })
});


// Presist user data after successful authentication


// Extract the user id (;
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

// Retrieve user data from session.
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});
module.exports = router;
