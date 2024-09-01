const { DataTypes } = require("sequelize");
const { connection } = require("../database/connection");
const { password } = require("../config/database.config");

const User = connection.define('user', {
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        //validate: {
            //len: {args: [1,100], msg: "Senha precisa ter entre 5 a 10 caracteres."},
            //is: {args: "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$",
            //    msg: "Senha muito fraca"
            //}
        //}
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
})

module.exports = User