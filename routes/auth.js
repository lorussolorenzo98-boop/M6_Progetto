import express from "express"
import login, { me } from "../controllers/auth.js"
import { authentication } from "../middlewares/authentication.js"
import passport from "passport"

const authRouter = express.Router()
//definiamo le rotte
authRouter.post('/login', login)
authRouter.get('/me', authentication, me)
authRouter.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);
authRouter.get(
    "/google/callback",
    passport.authenticate("google", { session: false }),
    (req, res) => {
        res.redirect(`http://localhost:3001/login?token=${req.user.token}`);
    }
);


export default authRouter