import express from "express";
import User from "./models/User.js";
import bcrypt, { hash } from 'bcrypt'
import validarToken from "./middleware/auth.js";
import jwt from "jsonwebtoken";
import 'dotenv/config' 
import cors from 'cors';

const app = express()

app.use(express.json())

app.use((req, res, next)=>{

    res.header("Access-Control-Allow-Origin", "*")/* Qualquer rota pode ter acesso nomento, mas queado fizermos
    o deply iremos especifixar as rotas que poderão ter acesso*/
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE")
    res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization")
    app.use(cors())
    next()
}) 

// #getAll
app.get('/users', async (req, res) => {
    await User.findAll().then((users) => {
        return res.json({
            error: false,
            users
        })
    }).catch(() => {
        return res.json({
            error: true,
            mensagem: "Doesn't is posible get all"
        })
    })
})

// #getById
app.get('/users/:id', async (req, res) => {
    const { id } = req.params
    await User.findOne({ where: { id: id } }).then((users) => {
        return res.json({
            error: false,
            users
        })
    }).catch(() => {
        return res.json({
            erro: true,
            mensagem: "Doesn't is posible get all"
        })
    })
})

// #post
app.post('/users', async (req, res) => {
    // const { name, email } = req.body
    var dados = req.body

    dados.password = await bcrypt.hash(dados.password, 8)

    await User.create(dados).then(() => {
        return res.json({
            error: false,
            mensagem: "Usuario cadastrado"
        })
    }).catch(() => {
        return res.json({
            error: true,
            mensagem: "Usuario não cadastrado"
        })
    })
})

// #put
app.put('/users/:id', async (req, res) => {
    const { id } = req.params
    await User.update(req.body, { where: { id: id } }).then(() => {
        return res.json({
            error: false,
            mensagem: "User Updated"
        })
    }).catch(() => {
        return res.json({
            error: true,
            mensagem: "User doesn't Updated"
        })
    })
})

app.put('/users-senha/:id', async (req, res) => {
    const { id } = req.params
    var dados = req.body
    dados.password = await bcrypt.hash(dados.password, 8)
    await User.update({ password: dados.password }, { where: { id: id } }).then(() => {
        return res.json({
            error: false,
            mensagem: "User Updated"
        })
    }).catch(() => {
        return res.json({
            error: true,
            mensagem: "User doesn't Updated"
        })
    })
})

// #delete
app.delete('/users/:id', validarToken, async (req, res) => {
    const { id } = req.params
    await User.destroy({ where: { id: id } }).then(() => {
        return res.json({
            error: false,
            mensagem: "User Deleted"
        })
    }).catch(() => {
        return res.json({
            error: true,
            mensagem: "User doesn't Deleted"
        })
    })
})

// #loguin
app.post('/user-login', async (req, res) => {
    var InfoLogin = await User.findOne({ where: { email: req.body.email } })
    if (!InfoLogin) {
        return res.status(400).json({
            error: true,
            mensagem: "email incorreto"
        })
    }
    if (!await bcrypt.compare(req.body.password, InfoLogin.password)) {
        return res.status(400).json({
            error: true,
            mensagem: "senha incorreta"
        })
    }
    
    const token = jwt.sign({ id: InfoLogin.id }, process.env.SECRET,{
        expiresIn: '7d' // chave valida por 7 dias
    })

    return res.json({
        error: false,
        mensagem: "login efetuado",
        token
    })
})


// #server
app.listen(8081, () => {
    console.log("is runing")
})