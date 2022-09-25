import { Sequelize } from "sequelize";
import db from "../config/database.js";
 
const { DataTypes } = Sequelize;
 
const User = db.define('users',{
    username:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
    subscription:{
        type: DataTypes.DATE
    },
    refresh_token:{
        type: DataTypes.TEXT
    }
},{
    freezeTableName: true
});
 
export default User;
