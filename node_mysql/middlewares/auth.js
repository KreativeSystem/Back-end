import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import 'dotenv/config';

async function validarToken(req, res, next) {
    const header = req.headers.authorization;

    if (!header) {
        return res.status(401).json({
            error: true,
            mensagem: "Necessário realizar o login"
        });
    }

    const [bearer, token] = header.split(' ');

    if (!token) {
        return res.status(401).json({
            error: true,
            mensagem: "Necessário realizar o login"
        });
    }

    try {
        const decod = await promisify(jwt.verify)(token, process.env.SECRET);
        req.userId = decod.id;
        return next();
    } catch (error) {
        return res.status(401).json({
            error: true,
            mensagem: "Erro: Token inválido"
        });
    }
}

export default validarToken;
