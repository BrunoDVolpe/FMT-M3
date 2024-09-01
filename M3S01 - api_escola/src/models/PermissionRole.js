const { DataTypes } = require("sequelize")
const { connection } = require("../database/connection")
const Permission = require("./Permission")
const Role = require("./Role")

const PermissionRole = connection.define("permissionsRole", {
    // Colocamos ID aqui só pra ficar visual e ilustrar, mas quando não colocamos, foi colocado automaticamente.
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    permissionId: {
        type: DataTypes.INTEGER,
        references: {
            model: Permission,
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

module.exports = PermissionRole