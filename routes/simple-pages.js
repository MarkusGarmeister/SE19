import express from "express";
import { Router } from 'express';

const router = Router()

router.use(express.static("public"))
router.get("/", (req, res) => {

    res.render("index")
})



export default router;