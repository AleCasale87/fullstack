import { Sequelize } from "sequelize";
 
const db = new Sequelize('authentication_db', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});
 
export default db;
