'use strict'

const {Sequelize,DataTypes} = require('sequelize') 

const DATA_BASE_URL = process.env.DATA_BASE_URI

let sequelize = new Sequelize(DATA_BASE_URL,{});

module.exports = {
    sequelize,
    DataTypes
}