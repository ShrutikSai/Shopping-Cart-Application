import express from "express";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import AdminRepository from "../repositories/adminReposiory.js";
import generateToken from "../utils/generateToken.js";
import dotenv from "dotenv";
import Admin from "../models/admin.js";

dotenv.config();

const router = express.Router();
const adminRepository = new AdminRepository();

passport.use(
  "admin-google",
  new GoogleStrategy(
    {
      clientID: process.env.ADMIN_GOOGLE_CLIENT_ID,
      clientSecret: process.env.ADMIN_GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.ADMIN_GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
         const existingUser = await Admin.findOne({ googleId: profile.id });
            if (existingUser) return done(null, existingUser);
        
            const email = profile.emails?.[0]?.value;
            let username = email ? email.split('@')[0] : null;
            let usernameExists = await Admin.findOne({ username });
            while (usernameExists) {
              const randomSuffix = crypto.randomBytes(2).toString('hex'); 
              username = `${username}_${randomSuffix}`;
              usernameExists = await Admin.findOne({ username });
            }
        let admin = await adminRepository.getAdminByGoogle(profile.id);
        if (!admin) {
          const newAdmin = {
            googleId: profile.id,
            username,
            email: profile.emails?.[0]?.value,
            name: profile.displayName,
            avatar: profile.photos?.[0]?.value,
            oauthProvider: "google",
            storeName: "Default Store",
            storeDescription: "Default Description",
          };
          admin = await adminRepository.createAdmin(newAdmin);
        }
        return done(null, admin);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((admin, done) => done(null, admin));
passport.deserializeUser((obj, done) => done(null, obj));

router.get(
  "/",
  passport.authenticate("admin-google", { scope: ["profile", "email"] })
);

router.get(
  "/callback",
  passport.authenticate("admin-google", {
    failureRedirect: "http://localhost:3030/login",
    session: false,
  }),
  (req, res) => {
    const token = generateToken(req.user);
    res.redirect(`http://localhost:3030/orders/?token=${token}`);
  }
);

router.get("/error", (req, res) => res.send("Google admin login failed."));

export default router;
