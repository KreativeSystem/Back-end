import express from "express";
import User from "./models/User.js";
import bcrypt from 'bcrypt';
import validarToken from "./middlewares/auth.js";
import 'dotenv/config'
import jwt from "jsonwebtoken";
import cors from "cors";


const app = express()
app.use(express.json())

app.use((req, res, next) => {

  res.header("Access-Control-Allow-Origin", "*")// qualquer rota pode ter acesso no momento,mas quando fizermos o deploy iremos especificar as rotas que poderão ter acesso
  res.header("Access-Control-Allow-Credentials", "GET", "POST", "PUT", "DELETE") //definindo metodos de acesso
  res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization") //permitindo acesso aos conteudos
  app.use(cors())
  next()
})

//pegando o nome e email do usuario que será passado para a tela de login
app.get('/users',  async (req, res) => {

  await User.findAll()
    .then((users) => {

      return res.json({
        error: false,
        users
      })

    }).catch(() => {

      return res.json({
        error: true,
        mensagem: "não conseguiu listar "

      })
    })
})

app.get("/val-token", validarToken, async (req, res) => {
  await usuario.findByPk(req.userId, { attributes: ['id', 'name', 'email'] })
      .then((user) => {
          return res.json({
              erro: false,
              user
          });
      }).catch(() => {
          return res.status(400).json({
              erro: true,
              mensagem: "Erro: Necessário realizar o login para acessar a página!"
          });
      });

});

//puxando pelo id
app.get('/users/:id',  async (req, res) => {
  const { id } = req.params

  await User.findOne({ where: { id: id } })
    .then((users) => {

      return res.json({
        error: false,
        users
      })

    }).catch(() => {

      return res.json({
        error: true,
        mensagem: "não conseguiu listar "

      })
    })
})

//cadastra um usuario
app.post('/users',  async (req, res) => {

  var dados = req.body

  dados.password = await bcrypt.hash(dados.password, 8)

  await User.create(dados).then(() => {

    return res.json({
      error: false,
      mensagem: "Usuario foi cadastrado com sucesso!"

    })

  }).catch(() => {

    return res.json({
      error: true,
      mensagem: "Usuario não cadastrado "

    })
  })

})

app.put('/users/:id', async (req, res) => {
  const { id } = req.params
  const { name, email, password, phone, state, dwellingNumber, city, street, CEP } = req.body;
await User.update({ name, email, password, phone, state, dwellingNumber, city, street, CEP }, { where: { id: id } }).then(() => {

    return res.json({
      error: false,
      mensagem: "Usuario foi atualizado com sucesso!"

    })

  }).catch(() => {

    return res.json({
      error: true,
      mensagem: "Usuario não foi atualizado"

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
      mensagem: "Usuario foi atualizado com sucesso!"

    })

  }).catch(() => {

    return res.json({
      error: true,
      mensagem: "Usuario não foi atualizado"

    })
  })
})

app.delete('/users/:id',  async (req, res) => {
  const { id } = req.params

  await User.destroy({ where: { id: id } }).then((users) => {

    return res.json({
      error: false,
      users,
      mensagem: "Usuario foi deletado com sucesso!"


    })

  }).catch(() => {

    return res.json({
      error: true,
      mensagem: "Usuario não foi deletado"

    })
  })


})

//realizar login

app.post('/users-login',  async (req, res) => {

  await tempo(3000)

  function tempo(ms){
    return new Promise((resposta) => {
      setTimeout(resposta,ms)
    })
  }


    const userEmail = await User.findOne({ where: { email: req.body.email } })
    if (!userEmail) {
      return res.status(400).json({
        error: true,
        mensagem: "esse usuario não foi encontrado"

      })
    }
    if (!await bcrypt.compare(req.body.password, userEmail.password)) {
      return res.status(400).json({
        error: true,
        mensagem: "senha invalida"
      })
    }

    const token = jwt.sign({ id: userEmail.id }, process.env.SECRET, {

      expiresIn: "7d" //chave valida por 7d
    })

    return res.json({
      error: false,
      mensagem: "login realizado com sucesso",
      token
    })


})

app.get('/cart', validarToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.userId);
    return res.json({ cart: user.cart });
  } catch (error) {
    console.error("Erro ao obter o carrinho:", error);
    return res.status(500).json({ error: true, message: "Erro interno do servidor" });
  }
});

app.put('/cart', validarToken, async (req, res) => {
  try {
    const { cart } = req.body;
    const user = await User.findByPk(req.userId);
    user.cart = cart;
    await user.save();
    return res.json({ success: true, message: "Carrinho atualizado com sucesso." });
  } catch (error) {
    console.error("Erro ao atualizar o carrinho:", error);
    return res.status(500).json({ error: true, message: "Erro interno do servidor" });
  }
});

//usuarios
app.listen(8081, () => {
  console.log("servidor iniciando na porta 8081 :http://localhost:8081")
})