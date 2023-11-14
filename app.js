//ALL IMPORTS
import express from "express";
import portfolioRouter from './routes/portfolio.js';
import loginRouter from './routes/login.js';
import registerRouter from './routes/register.js';
import simplepagesRouter from './routes/simple-pages.js';
import logoutRouter from './routes/logout.js';
import mongoose from "mongoose";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
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


app.use("/", simplepagesRouter)
app.use("/login", loginRouter)
app.use("/register", registerRouter)
app.use("/portfolio", portfolioRouter)
app.use("/logout", logoutRouter)




app.listen(process.env.PORT, () =>{
    console.log("Server listen at port: " + process.env.PORT)
    
})

