'use strict'

require('dotenv').config()

const PORT = process.env.PORT || 3009

const {start} = require('./src/server')

const {sequelize} = require('./src/models/index')

sequelize.sync().then(()=>{
    start(PORT)
}).catch(error => console.log(error))