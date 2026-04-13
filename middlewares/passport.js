import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import Author from "../models/Author.js";
import jwt from "jsonwebtoken";

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const { id, name, emails } = profile;

      let user = await Author.findOne({ googleId: id });

      if (!user) {
        user = new Author({
          name: name.givenName,
          surname: name.familyName,
          email: emails[0].value,
          googleId: id
        });

        await user.save();
      }

      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return done(null, { token });

    } catch (error) {
      return done(error, null);
    }
  }
));

export default passport;