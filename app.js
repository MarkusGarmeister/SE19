//ALL IMPORTS
import express from "express";
import {router as userRouter} from './routes/user.js';
import mongoose from "mongoose";


// ALL ROUTERS
//SERVER RUNNING ON PORT 3000
const app = express()
const port = 3000

//DATABASE
mongoose.connect('mongodb://localhost:27017/tradia')
  .then(() => console.log('💽 Database connected'))
  .catch(error => console.error(error))


//ALL USES
app.set("view engine", "ejs")
app.use("/user", userRouter)
app.use(express.static("public"))
app.use(express.urlencoded({ extended: false }))


app.get("/", (req, res) => {
    res.render("index")
})

app.get("/register", (req, res) => {
    res.render("register")
})
app.post("/register", (req, res) => {
    console.log(req.body.name)
    console.log(req.body.email)
    console.log(req.body.password)
})


app.get("/login", (req, res) => {
    res.render("login")
})
app.post("/login", (req, res) => {
    res.send("Login successful")
})





app.listen(port, () =>{
    console.log("Server listen at port: " + port)
})

