const sequelize = require('../database')
const {DataTypes, Model} = require('sequelize')
const Role = require("./role");


class Profile extends Model{}

Profile.init({
    fullName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    phoneNumber:{
        type: DataTypes.STRING,
        allowNull: true
    }
},{
    sequelize,
    modelName: 'Profile',
    tableName: 'profiles'
})

Profile.belongsToMany(Role, {through: 'ProfileRoles'})
Role.belongsToMany(Profile,{through: 'ProfileRoles'})

module.exports = Profile