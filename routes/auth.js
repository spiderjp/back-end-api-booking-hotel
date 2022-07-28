import express from "express";
import { login, register } from "../controllers/auth.js";

const router = express.Router();

//Chamando função para registrar usuário
router.post("/register", register);
//Chamando função de login do usuário
router.post("/login", login);


export default router;

