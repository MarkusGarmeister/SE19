import express from "express";

const router = express.Router()


router.get("/register", (req, res) => {
    res.render("register")
})
router.post("/register", (req, res) => {
    console.log(req.body.name)
    console.log(req.body.email)
    console.log(req.body.password)
})


router.get("/login", (req, res) => {
    res.render("login")
})
router.post("/login", (req, res) => {
    res.send("Login successful")
})
export { router };