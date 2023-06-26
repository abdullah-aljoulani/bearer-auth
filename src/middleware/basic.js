'use strict'

const base64 = require('base-64')

const user  = require('../models/user.model')

module.exports = async function isAuth(req, res, next) {

    const split = await req.headers.authorization.split(" ")

    const auth = split[1]

    if (auth) {
        const decrypted = base64.decode(auth)
        const [userName, password] = decrypted.split(":")  
        user.checker(userName,password).then(data => {
            req.users = data
            next();
        })  
    } else {
        next('please enter the username and password')
    }

}