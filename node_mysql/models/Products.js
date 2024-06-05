// models/Products.js
import sequelize from "./db.js";
import { DataTypes } from "sequelize";

const Products = sequelize.define('products', {

    id:
    {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },

    name:
    {
        type: DataTypes.STRING,
        allowNull: false
    },

    price:
    {
        type: DataTypes.STRING,
        allowNull: false
    },

})

Products.sync({alter: true})

export default Products
