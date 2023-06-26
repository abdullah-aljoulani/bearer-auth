'use strict'
const users = require('../models/user.model')
module.exports = function bearerToken(req,res,next){
    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ").pop();
        users.checkToken(token).then(data =>{
            req.users = data
            next();
        }).catch(err => next(err))
    }
}