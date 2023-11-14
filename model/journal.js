import mongoose from "mongoose";

const journalSchema = new mongoose.Schema({
    asset: { type: String, required: true},
    price: { type: Number, required: true},
    buysell: { type: String, enum: ['buy', 'sell'], required: true},
    amount: { type: Number, required: true},
    date: { type: Date, required: true},
    description: { type: String },
    user: {type: mongoose.Schema.Types.ObjectId, ref:'User'}
})


const Journal = mongoose.model('Journal', journalSchema)

export {Journal, journalSchema} 