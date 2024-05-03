import sequelize from "./db.js";
import {DataTypes} from "sequelize";

const User = sequelize.define('user', {

    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    phone:{
        type: DataTypes.STRING,
        allowNull: false
    },
    CEP:{
        type: DataTypes.STRING,
        allowNull: false
    },
    state:{
        type: DataTypes.STRING,
        allowNull: false
    },
    city:{
        type: DataTypes.STRING,
        allowNull: false
    },
    street:{
        type: DataTypes.STRING,
        allowNull: false
    },
    dwellingNumber:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
   
})
User.sync({ alter: true })
export default User