import { Router } from 'express';
import passport from "passport";

const router = Router()

router.get("/", (req, res) => {
    res.render("login")
})
router.post("/", passport.authenticate('local', {failureMessage: true, successRedirect:'/portfolio' }))






export default router;

