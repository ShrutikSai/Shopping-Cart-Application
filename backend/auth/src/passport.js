import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import User from "./models/user.js";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3003/auth/google/callback",
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) return done(null, existingUser);
        const email = profile.emails?.[0]?.value;
        let username = email ? email.split("@")[0] : null;
        let usernameExists = await User.findOne({ username });
        while (usernameExists) {
          const randomSuffix = crypto.randomBytes(2).toString("hex");
          username = `${username}_${randomSuffix}`;
          usernameExists = await User.findOne({ username });
        }
        const newUser = new User({
          googleId: profile.id,
          email,
          name: profile.displayName,
          username,
          avatar: profile.photos?.[0]?.value || null,
        });
        await newUser.save();
        done(null, newUser);
      } catch (error) {
        done(error, null);
      }
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => done(null, user));
});
