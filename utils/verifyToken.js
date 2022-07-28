import jwt from "jsonwebtoken";
import {createError} from "../utils/error.js";


export const verifyToken = (req, res, next) =>{

    const token = req.cookies.access_token;
    //Se não tiver token, não estamos autenticados
    if(!token){

        return next(createError(401, "You aren't authenticated!"));
    }

    //verificará se o token existente é o mesmo do .env e depois responder com err (erro) ou o usuário (user)
    jwt.verify(token, process.env.JWT, (err, user) =>{
 
        if(err) return next(createError(403, "Token isn't valid!"));
        
    //Propriedade de solicitação        
        req.user = user;
        next()
        
    });
};


//Verificação do ID do usuário e também se é administrador - acontecerá depois de verificar o token
export const verifyUser = (req, res, next) =>{

  verifyToken(req, res, next, () =>{

    if (req.user.id === req.params.id || req.user.isAdmin){

        next();
    }else{

        return  next(createError(403, "You aren't authorized!"));
    }
  }); 
};

//Verificação do usuário, se ele for admin e estiver usando o token, terá autorização
export const verifyAdmin = (req, res, next) =>{

    verifyToken(req, res, next, () =>{
  
      if (req.user.isAdmin){
  
          next();
      }else{
  
          return  next(createError(403, "You aren't authorized!"));
      }
    }); 
  };