//ALL IMPORTS
import express from "express";
import {router as userRouter} from './routes/user.js';
import mongoose from "mongoose";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import { User, userSchema } from "./model/user.js";
import { Journal, journalSchema } from "./model/journal.js";
import passport from "passport";
import { genPassword } from "./helper/passwordUtils.js";
import { strategy } from "./config/passport.js";
import 'dotenv/config'
// ALL ROUTERS
//SERVER RUNNING ON PORT 3000
const app = express()


//DATABASE
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    if (mongoose.connection.readyState === 1){
        console.log("Database is connected")
    }
  })
  .catch(error => console.error(error))






//ALL USES
app.set("view engine", "ejs")
app.use("/user", userRouter)
app.use(express.static("public"))
app.use(express.urlencoded({ extended: false }))
app.use(morgan('tiny'))

app.use(session({
    secret: 'secret123',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URI,
            dbName: 'tradia',
            collection: 'sessions',
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
    },

}))



app.use(passport.initialize())
app.use(passport.session())
passport.use(strategy)



app.get("/", (req, res) => {
    res.render("index")
})

app.get("/register", async (req, res) => {
    res.render("register")
})

app.post("/register", async (req, res) => {
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
        res.send('Sign up successful')
    }catch (error) {
        console.error(error)
        res.send('Error: the user could not be created.')
    }
})

app.get("/login", (req, res) => {
    res.render("login")
})
app.post("/login", passport.authenticate('local', {failureMessage: true, successRedirect:'/' }))
app.get("/journal", (req, res) => {
    res.render(("journal"))
})

app.post("/journal", async (req, res) => {
    try{
        const journal = new Journal({
            asset: req.body.asset,
            price: req.body.price,
            buysell: req.body.buysell,
            description: req.body.description
        })
        await journal.save()
        res.redirect("/portfolio")
    }catch{
        (error) => {
            console.error(error)
        res.send('Error: the journal could not be created.')
        }
    }
})

app.get("/portfolio", async (req, res) => {
    const journals = await Journal.find({}).exec()

    res.render("portfolio", {
        journals: journals
    })
})


app.listen(process.env.PORT, () =>{
    console.log("Server listen at port: " + process.env.PORT)
    
})

