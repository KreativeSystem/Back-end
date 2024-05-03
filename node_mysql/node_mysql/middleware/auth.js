import {promisify} from 'util'
import jwt from "jsonwebtoken";
import 'dotenv/config' 

// #middleware
async function validarToken(req, res, next) {

    const header = await req.headers.authorization
    //return next()
    
    if(!header){
        return res.json({
            error:true,
            mensagem:"Erro: Necessário realizar o login"
        })
    }

    const [bearer, token] = header.split(' ');

    if(!token){
        return res.json({
            error:true,
            mensagem:"Erro: Necessário realizar o login"
        })
    }

    if(header){
        try{
        const decod = await promisify(jwt.verify)(token,process.env.SECRET)
        req.userId = decod.id

        return next()

    } catch(error){
        return res.json({
            error:true,
            mensagem:"Erro Tokin Inválido"           
        })
    }
    }
}

export default validarToken;
