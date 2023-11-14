import { Router } from 'express';
import { genPassword } from "../utility/passwordUtils.js";
import { User, userSchema } from "../model/user.js";

const router = Router()


router.get("/", async (req, res) => {
    res.render("register")
})

router.post("/", async (req, res) => {
    try {
        const saltHash = genPassword(req.body.password)

        const salt = saltHash.salt
        const hash = saltHash.hash

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            hash: hash,
            salt: salt
        })
        await user.save()
        res.redirect('/portfolio')
    }catch (error) {
        console.error(error)
        res.send('Error: the user could not be created.')
    }
})





export default router;