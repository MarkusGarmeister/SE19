import crypto from 'node:crypto'


//Creating a Password using SHA512 Algorithm, 10000 iterations if higher more secure but more resources, length 64 bytes
function genPassword(password, salt = crypto.randomBytes(32).toString('hex')) {
    if (password.length < 6 || password.length > 12) {
        throw new Error("Password must be between 6 and 12 characters long");
    }
    const genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
    console.log(genHash)

    return {
        salt,
        hash: genHash
    }
}
//Checking if the password is valid or not 
function validPassword(password, hash, salt) {
    const hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
    return hash === hashVerify
}

export { genPassword, validPassword }