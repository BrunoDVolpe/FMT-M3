const jwt = require("jsonwebtoken")
const PermissionRole = require("../models/PermissionRole")

// permissions vai ser um array de permissões. Ex: ['criar_usuario', 'ler_usuario']
function hasPermission(permissions) {
    return async(req, res, next) => {
        // Verificar se cabeçalho de autorização está presente
        if (!req.headers.authorization) {
            return res.status(401).send("Token não fornecido")
        }

        // Verificar se o token está presente (acabou sendo uma dupla verificação)
        const token = req.headers.authorization
        if (!token) {
            return res.status(401).send("Token não fornecido")
        }

        // Desestruturação do token e verificação se ele é válido
        const decoded = jwt.verify(token, process.env.SECRET_JWT)
        // Guarda a lista de roles na payload da request
        req.payload = decoded

        try {
            // Busca todas as permissões com base nas roles do usuário
            const roles = await PermissionRole.findAll({
                where: {
                    // Recupera a lista de roles que veio no token
                    roleId: request.payload.roles.map((role) => role.id)
                },
                attributes: ['permissionId'],
                include: [{model: Permission, as: 'permissions'}]
            })

            // Procura se existe nas roles
            const existPermission = roles.some((role) => {
                const hasPermission = role.permissions.some((permissao) => {
                    return permissions.includes(permissao.description)
                })

                return hasPermission
            })

            if (!existPermission) {
                return res.status(401).send("Você não tem permissão para acessar")
            }

            next()
        } catch(err) {
            console.log(err)
            return res.status(401).send({
                message: "Autenticação falhou",
                cause: err.message
            })
        }
    }
}

module.exports = { hasPermission }