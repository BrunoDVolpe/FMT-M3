'use strict';

const User = require('../../models/User');
const Role = require('../../models/Role');
const Permission = require('../../models/Permission');
const UserRole = require('../../models/userRole');
const PermissionRole = require('../../models/PermissionRole');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(User.tableName, User.tableAttributes); //diz que tableAttributes não existe, porque recentemente foi substituído por getAttributes()
    await queryInterface.createTable(Role.tableName, Role.tableAttributes);
    await queryInterface.createTable(Permission.tableName, Permission.tableAttributes);
    await queryInterface.createTable(UserRole.tableName, UserRole.tableAttributes);
    await queryInterface.createTable(PermissionRole.tableName, PermissionRole.tableAttributes);
  },
  
  // Aqui excluímos na ordem inversa pra que não dê erro devido aos relacionamentos.
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(PermissionRole.tableName);
    await queryInterface.dropTable(UserRole.tableName);
    await queryInterface.dropTable(Permission.tableName);
    await queryInterface.dropTable(Role.tableName);
    await queryInterface.dropTable(User.tableName);
  }
};
