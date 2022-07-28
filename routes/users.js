import express from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//CRUD
//A função fora separada em um arquivo a parte, para apenas pessoas autorizadas e autenticadas usarem

//Endpoint para verificar o nosso token por meio da função verifyToken e depois enviar uma resposta
//router.get("/checkauthentication", verifyToken, (req,res,next) =>{

//    res.send("Hello user, you're logged in!");
//});

//Endpoint para verificar o usuário por meio do ID e fazer login em sua conta, depois de verificar o token 
//router.get("/checkuser/:id", verifyUser, (req,res,next) =>{

//    res.send("Hello user, you're logged in and you can delete your account");
//});


//Endpoint para verificar se o usuário é admin depois de verificar o token - caso seja, ele poderá deletar qualquer conta 
//router.get("/checkadmin/:id", verifyAdmin, (req,res,next) =>{

//    res.send("Hello user, you're logged in and you can delete all accounts");
//});



//Update (Atualização do User por meio da verificação do seu ID, status de Admin e do token)
router.put("/:id", verifyUser, updateUser);


//Delete (Exclusão d User por meio do seu ID, status de Admin e do token)
router.delete("/:id", verifyUser, deleteUser);


//Get (chamar os dados do User pelo ID, status de Admin e do token)
router.get("/:id", verifyUser, getUser);


//Get All (Chamar todos os dados de todos Usuários - apenas admin com token verificado pode fazer)
router.get("/", verifyAdmin, getUsers)

export default router;

