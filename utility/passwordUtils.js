import crypto from 'node:crypto'

function genPassword(password) {
    const genSalt = crypto.randomBytes(32).toString('hex')
    const genHash = crypto.pbkdf2Sync(password, genSalt, 10000, 64, 'sha512').toString('hex')

    return {
        salt: genSalt,
        hash: genHash
    }
}

function validPassword(password, hash, salt) {
    const hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
    return hash === hashVerify
}

export { genPassword, validPassword}