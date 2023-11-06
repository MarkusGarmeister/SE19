//ALL IMPORTS
import express from "express";
import {router as userRouter} from './routes/user.js';
import mongoose from "mongoose";
import morgan from "morgan";



// ALL ROUTERS
//SERVER RUNNING ON PORT 3000
const app = express()
const port = 3000

//DATABASE
mongoose.connect('mongodb://localhost:27017/tradia')
  .then(() => console.log('💽 Database connected'))
  .catch(error => console.error(error))


const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
})

const journalSchema = new mongoose.Schema({
    asset: { type: String, required: true},
    price: { type: Number, required: true},
    buysell: { type: String, enum: ['buy', 'sell'], required: true},
    description: { type: String }
})

const User = mongoose.model('User', userSchema)
const Journal = mongoose.model('Journal', journalSchema)

//ALL USES
app.set("view engine", "ejs")
app.use("/user", userRouter)
app.use(express.static("public"))
app.use(express.urlencoded({ extended: false }))
app.use(morgan('tiny'))

app.get("/", (req, res) => {
    res.render("index")
})

app.get("/register", async (req, res) => {
    res.render("register")
})

app.post("/register", async (req, res) => {
    try {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
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
app.post("/login", (req, res) => {
    res.send("Login successful")
})

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


app.listen(port, () =>{
    console.log("Server listen at port: " + port)
})

