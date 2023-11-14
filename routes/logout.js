import { Router } from 'express';
import passport from "passport";

const router = Router()


router.post('/', function(req, res, next){
    req.logout((error) => {
        if (error) {
            return next(error)
        }
    })
    res.redirect('/')
})


export default router;
