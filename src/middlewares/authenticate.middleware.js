import jwt from 'jsonwebtoken'
import 'dotenv/config'

export function authenticateToken(req,res,next){
    //obtener el token q viene en la cabecera de autorizacion
    const authHeader=req.headers['authorization'];
    //header auth
    const token =authHeader && authHeader.split(' ')[1];

    if(token===null) return res.sendStatus('401');

    jwt.verify(token, process.env.JWT_SECRET,(err,user)=>{
        if(err) return res.sendStatus(403)

        console.log('user', user);
        req.user=user;
        next();
    })
}