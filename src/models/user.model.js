'use strict'

require('dotenv').config();

const bcrypt = require('bcrypt')

const { sequelize, DataTypes } = require('./index')

const jwt = require('jsonwebtoken')

const SECRET = process.env.SECRET

const user = sequelize.define('users', {
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token: {
        type: DataTypes.VIRTUAL
    }
})

user.checker = async function (userName, password) {
    const users = await user.findOne({ where: { userName } })
    const isValid = await bcrypt.compare(password, users.password)
    if (isValid) {
        const userToken = jwt.sign({ userName: users.userName }, SECRET)
        return {
            users,
            token: userToken
        }

    } else {
        throw new Error('user not exists')
    }
}

user.checkToken = async function (token) {
    const parseToken = jwt.verify(token, SECRET)
    const users = await user.findOne({ where: { userName: parseToken.userName } })
    if(users){
        return users.userName
    }else {
        throw new Error('Invalid Token');
    }
}
module.exports = user