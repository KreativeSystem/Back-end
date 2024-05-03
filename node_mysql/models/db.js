import Sequelize from "sequelize";
import 'dotenv/config'

const dotenv = process.env


const sequelize = new Sequelize(dotenv.NAME_db, dotenv.USER_db, dotenv.PASS_db, {
    host:dotenv.HOST_db,
    dialect:'mysql'
})

sequelize.authenticate().then(function() {
    console.log("meu banco esta conectado")
}).catch(function() {
    console.log("não foi possivel conectar o banco")
})

export default sequelize;