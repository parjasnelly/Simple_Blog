const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('blogdb', 'root', '7231', {
    dialect: 'mysql'
})


module.exports = sequelize