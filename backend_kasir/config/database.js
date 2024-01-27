import { Sequelize } from "sequelize";

const db = new Sequelize('mhcafe', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

export default db;