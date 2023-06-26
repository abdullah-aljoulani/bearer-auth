'use strict'

const express = require('express')

const router = express.Router();

const bcrypt = require('bcrypt')

const bearerToken = require('../middleware/token')

const isAuth = require('../middleware/basic')

const user = require('../models/user.model')

router.get('/', handelHome)

router.post('/signin', isAuth, handelSignIn)

router.post('/signup', handelSignUp)

router.get('/secretstuff',bearerToken, handelToken)

async function handelSignIn(req, res) {
    res.status(200).json(req.users)
}

function handelHome(req, res) {
    res.status(200).json({
        message: 'welcome to home page'
    })
}

async function handelSignUp(req, res) {
    const { userName, password } = req.body;
    const hashPass = await bcrypt.hash(password, 5)
    const obj = {
        userName: userName,
        password: hashPass
    }
    const record = await user.create(obj)
    res.status(201).json(record)
}

function handelToken(req, res) {
    res.status(200).json(`welcome to back ${req.users}`)
}
module.exports = router;