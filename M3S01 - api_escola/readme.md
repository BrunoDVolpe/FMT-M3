# Semana 10 - Introdução ao Sequelize

## Rodar o repositório:

### Na primeira vez é necessário instalar as dependências:
1. `npm install`
2. Se for em ambiente local: `npm install --dev`
3. `cp .env_example .env`

### Para rodar o repositório em ambiente local
1. `npm run start:dev`

## Trabalhando com migrations:

### Criar uma migration
1. `sequelize migration:generate --name alter_table_adicionar_login_alunos`
2. `npx sequelize-cli migration:generate --name criar_tabela_alunos`
### Rodar uma migration. Opções:
1. Opção nº 1: `sequelize db:migrate`
2. Opção nº 2: `npx sequelize db:migrate`

### Reverter a última migration:
1. `sequelize-cli db:migrate:undo`
2. `npx sequelize-cli db:migrate:undo`

## Documentação do Sequelize:
https://sequelize.org/docs/v6/core-concepts/model-basics/

## RBAC
Faz o controle de acesso nos endpoints através das permissões que compõe um papel. Neste caso, um usuário pode ter mais de um papel (role) e cada papel terá suas próprias permissões.

A validação será feita através de middleware que verificará se nos papéis do usuário, ele tem a permissão necessária para seguir determinada rota (endpoint) e, se tiver, vai deixar acessar. Se não, retornará um erro para o usuário.

O controle disso é feito através de tabelas no banco de dados que controlam usuários, papéis (roles), permissões e suas respectivas tabelas de controle, que são usuários e roles; e roles e permissões.

Este projeto ainda não tem os usuários criados e associados com seus papéis e permissões.

## Novas Bibliotecas utilizadas:

### instalar o sequelize
`npm install sequelize` 
### instalar o driver do PostgreSQL
`npm install pg` 
### instalar o CLI do sequelize
`npm install -g sequelize-cli` 
### instalar o dotenv
`npm install dotenv`
### instalar o JsonWebToken ( JWT )
`npm install jsonwebtoken`
### instalar o Bcrypt
`npm install bcrypt`