import { Router } from 'express';
import passport from "passport";

const router = Router()

// Deletes the session, cookie connect.sid will be deleted and the redirect create a new session 
router.post('/', function(req, res, next){
    req.logout((error) => {
        if (error) {
            return next(error)
        }
    })
    res.redirect('/')
})


export default router;
