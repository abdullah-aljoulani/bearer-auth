
'use strict'

const express = require('express')
const app = express();

const cors = require('cors')

app.use(cors());
app.use(express.json())

const Error404 = require('./middleware/404')
const Error500 = require('./middleware/500')
const userRouter = require('./routes/route')

app.use(userRouter)
app.use(Error404)
app.use(Error500)

function start(PORT){
    app.listen(PORT,()=> console.log(`running on port ${PORT}`))
}

module.exports = {
    app,
    start
}