import  jwt from "jsonwebtoken";
import {promisify} from 'util';
import 'dotenv/config'

//iniciano middleware

async function validarToken(req,res,next){

    const header = req.headers.authorization

    if (!header){
      return res.json({
        error:true,
        mensagem: "error:necessario realizar o login "
      })
     }

    const [bearer, token] = header.split(' ')

    if (!token){
      return res.json({
        error:true,
        mensagem: "error: necessario realizar o login "
      })
     }


   
  try{
    const decod = await promisify(jwt.verify)(token, process.env.SECRET)
    req.userId = decod.id
    
    return next()

  }catch (error){
    return res.json({
      error:true,
      mensagem: "error:token invalido"
    })
  }
    
  }

  export default validarToken