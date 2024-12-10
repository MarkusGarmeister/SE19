import mongoose from "mongoose";
import { genPassword, validPassword } from '/Users/markus/Desktop/SE_19/utility/passwordUtils.js';



const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true , match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']},
    hash: { type: String, required: true },
    salt: { type: String, required: true }
})
// Method to set the user's password
userSchema.methods.setPassword = function(password) {
    const { salt, hash } = genPassword(password); // Use your utility function
    this.salt = salt;
    this.hash = hash;
};

// Method to validate the user's password
userSchema.methods.validatePassword = function(password) {
    return validPassword(password, this.hash, this.salt); // Use your utility function
};
const User = mongoose.model('User', userSchema)

export { User, userSchema }