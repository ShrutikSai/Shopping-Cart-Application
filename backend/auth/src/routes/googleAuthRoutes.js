import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import UserRepository from "../repositories/userRepository.js";
import generateToken from "../utils/generateToken.js";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const userRepository = new UserRepository();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await userRepository.getUserByGoogle(profile.id);
        if (!user) {
          const newUser = {
            googleId: profile.id,
            email: profile.emails?.[0]?.value,
            name: profile.displayName,
            avatar: profile.photos?.[0]?.value,
          };
          user = await userRepository.createUser(newUser);
        }
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

router.get("/", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/callback", passport.authenticate("google", {
  failureRedirect: "http://localhost:5173/login", 
  session: false,
}), (req, res) => {
  const token = generateToken(req.user); 
  res.redirect(`http://localhost:5173?token=${token}`);
});

router.get("/error", (req, res) => res.send("Google login failed."));

export default router;
