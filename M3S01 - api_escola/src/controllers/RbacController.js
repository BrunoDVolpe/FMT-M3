const Permission = require("../models/Permission")
const PermissionRole = require("../models/PermissionRole")
const Role = require("../models/Role")
const User = require("../models/User")
const UserRole = require("../models/userRole")

class RbacController {
    async listPermissions(req, res){
        const data = await Permission.findAll()

        return res.status(200).send(data)
    }
    
    async listRoles(req, res){
        const data = await Role.findAll()

        return res.status(200).send(data)
    }

    async createOnePermission(req, res){
        try {
            const data = req.body

            if(!data.description) {
                return res.status(400).send("A descrição é obrigatória.")
            }

            const permissionExists = await Permission.findOne({where: {description: data.description}})
            if(permissionExists){
                return res.status(400).send("Já existe uma permissão com essa descrição.")
            }

            const novo = await Permission.create(data)

            return res.status(201).send(novo)
        } catch(err) {
            console.log(err.message)
            return res.status(500).send("Algo deu errado.")
        }
    }

    async createOneRole(req, res){
        try {
            const data = req.body

            if(!data.description) {
                return res.status(400).send("A descrição é obrigatória.")
            }

            const roleExists = await Role.findOne({where: {description: data.description}})
            if(roleExists){
                return res.status(400).send("Já existe uma função com essa descrição.")
            }

            const novo = await Role.create(data)

            return res.status(201).send(novo)
        } catch(err) {
            console.log(err.message)
            return res.status(500).send("Algo deu errado.")
        }
    }

    async listPermissionsByRole(req, res){
        try {
            const { id } = req.params

            const role = await Role.findOne({
                where: {id: id},
                include: [{model: Permission}]
            })

            // Outra forma, usando FindByPk
            //const role = await Role.findByPk(id, {
            //    include: [{model: Permission}]
            //})

            if (!role) {
                res.status(404).send("Função não encontrada.")
            }

            return res.status(200).send(role)
        } catch(err) {
            console.log(err.message)
            return res.status(500).send("Algo deu errado.")
        }
    }

    async addPermissionToRole(req, res){
        try {
            const {permissionId, roleId} = req.body

            if (!permissionId || roleId) {
                return res.status(400).send("O id da permissão e/ou da role é obrigatório.")
            }

            const permissionExists = await Permission.findByPk(permissionId)
            const roleExists = await Role.findByPk(roleId)

            if (!permissionExists) {
                return res.status(400).send("Permission não encontrada.")
            }
            if (!roleExists) {
                return res.status(400).send("Role não encontrada.")
            }

            //1ª forma (forma simples)
            const novoPermissionRole = await PermissionRole.create({
                permissionId: permissionId,
                roleId: roleId
            })
            
            //2ª forma (como o sequelize faz, mas pode trazer problemas de relacionamento)
            //await roleExists.addPermissions(permissionExists)
            
            return res.status(201).send(novoPermissionRole)
        } catch(err) {
            console.log(err.message)
            return res.status(500).send("Algo deu errado.")
        }
    }

    async addRoleToUser(req, res){
        try {
            const {userId, roleId} = req.body

            if (!userId || roleId) {
                return res.status(400).send("O id do usuário e/ou da role são obrigatórios.")
            }

            const userExists = await User.findByPk(userId)
            const roleExists = await Role.findByPk(roleId)

            if (!userExists) {
                return res.status(400).send("Usuário não encontrado.")
            }
            if (!roleExists) {
                return res.status(400).send("Role não encontrada.")
            }

            //1ª forma (forma simples)
            const novoUserRole = await UserRole.create({
                userId: userId,
                roleId: roleId
            })
            
            return res.status(201).send(novoUserRole)
        } catch(err) {
            console.log(err.message)
            return res.status(500).send("Algo deu errado.")
        }
    }
}

module.exports = new RbacController()