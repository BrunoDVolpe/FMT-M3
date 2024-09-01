const { DataTypes } = require("sequelize")
const { connection } = require("../database/connection")
const User = require("./User")
const Role = require("./Role")

const UserRole = connection.define("usersRole", {
    // Colocamos ID aqui só pra ficar visual e ilustrar, mas quando não colocamos, foi colocado automaticamente.
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    roleId: {
        type: DataTypes.INTEGER,
        references: {
            model: Role,
            key: 'id'
        }
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Date.now()
    },
    updatedAt: {
        type: DataTypes.DATE
    }
})

module.exports = UserRole