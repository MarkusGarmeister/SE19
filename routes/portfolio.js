import { Router } from 'express';
import { Journal, journalSchema } from "../model/journal.js";
import { isAuth } from "../middleware/authentification.js";


const router = Router()


router.get("/", isAuth, async (req, res) => {
    const journals = await Journal.find({ user: req.user._id }).exec()

    res.render("portfolio", {
        journals: journals
    })
})

router.get("/new", isAuth, (req, res) => {
    res.render(("journal"))
})

router.post("/new", async (req, res) => {
    try{
        const journal = new Journal({
            asset: req.body.asset,
            price: req.body.price,
            amount: req.body.amount,
            date: req.body.date,
            buysell: req.body.buysell,
            description: req.body.description,
            user: req.user._id
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

router.get("/edit/:id", async (req, res) => {
    try {
        const id = req.params.id
        const journal = await Journal.findOne({_id : id }).exec()
        if (!journal) throw new Error("Couldn't find this Journal")

        res.render("edit" , {journal : journal})

    }catch(error) {
        console.log(error)
        res.status(404).send("Couldn't find this Journal")
    }
})

router.post("/edit/:id", async (req, res) => {
    try{
        const id = req.params.id
        const journal = await Journal.findOneAndUpdate(
            { _id : req.params.id },
            req.body
        )
        res.redirect("/portfolio")

    }catch(error) {
        console.log(error)
        res.status(404).send("Couldn't find this Journal")
    }
})


router.post("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id
        const journal = await Journal.findByIdAndDelete(
            { _id : req.params.id }
        )

        res.redirect("/portfolio")
        
    } catch (error) {
        console.log(error)
        res.status(404).send("Couldn't delete this Journal")
    }
})

export default router;