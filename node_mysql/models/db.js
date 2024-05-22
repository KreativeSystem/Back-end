import  Sequelize  from "sequelize";
import 'dotenv/config'

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {

    host: process.env.DB_HOST,
    dialect: 'mysql' 
})

sequelize.authenticate().then(function(){
    console.log('meu banco de dados está conectado ')

}).catch(function() {
    console.log("servidor não conectou")
})

export default sequelize