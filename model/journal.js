import mongoose from "mongoose";

const journalSchema = new mongoose.Schema({
    asset: { type: String, required: true},
    price: { type: Number, required: true},
    buysell: { type: String, enum: ['buy', 'sell'], required: true},
    description: { type: String }
})


const Journal = mongoose.model('Journal', journalSchema)

export {Journal, journalSchema}