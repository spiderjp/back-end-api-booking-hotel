import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import authRouter from "./routes/auth.js";
import usersRouter from "./routes/users.js";
import hotelsRouter from "./routes/hotels.js";
import roomsRouter from "./routes/rooms.js";
import cookieParser from "cookie-parser";

/*Para invocar diretamente o express, eu preciso utilizar os moódulos do ES6+,
que está especificado dentro do package.json em "type": "modules*/

const app = express();

//Configuração das variáveis de ambiente para a produção da aplicação
dotenv.config();

//Fazendo uma conexão inicial ao banco de dados por meio da lib mongoose
const connect = async() =>{
    try{
        await mongoose.connect(process.env.MONGO);
        console.log("First connection with mongoDB!")
    }catch (error){
        throw error;
    }
};

//Mostrando se está conectado ou desconectado o back-end com o mongoDB
//Para saber, veremos se existe um IP existente e conectado ao mongoDB, nesse caso 0.0.0.0/0

mongoose.connection.on("disconnected", ()=>{

    console.log("MongoDB disconnected.")
});

mongoose.connection.on("connected", ()=>{

    console.log("MongoDB connected.")
});


//Primeira rota - usuários
app.get("/users", (re,res)=>{

    res.send("hello, first request!");
});

//Midleware para cookie-parser
app.use(cookieParser());

//Especificando qual será o formato de uso do express use
app.use(express.json());

//Criação de middlewares
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/hotels", hotelsRouter);
app.use("/api/rooms", roomsRouter);

//Criação de tratamento para erro de manipulação (handler) dos middlewares
app.use((err, req, res, next)=>{

    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong!"
    return res.status(errorStatus).json({
        
        success:false,
        status:errorStatus,
        message:errorMessage,
        //Stack são os detalhes do erro
        stack: err.stack,
    });
});


app.listen(8800, ()=>{

    connect()
    console.log("Back-end connected!");
});
