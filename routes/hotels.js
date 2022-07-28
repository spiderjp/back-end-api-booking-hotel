import express from "express";
import { createHotel, deleteHotel, getHotels, getHotel, updateHotel, countByCity, countByType, getHotelRooms } from "../controllers/hotel.js";
import Hotel from "../models/Hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//CRUD
//Create (Chamada do Esquema - Modelo Hotel, tentativa de enviar (salvar) os dados para o BD, e enviar uma resposta caso dê certo ou não)
//A função fora separada em um arquivo a parte, para apenas pessoas autorizadas e autenticadas usarem
router.post("/", verifyAdmin, createHotel);

//Update (Atualização do Hotel por meio do seu ID)
router.put("/:id", verifyAdmin, updateHotel);

//Delete (Exclusão d Hotel por meio do seu ID)
router.delete("/:id", verifyAdmin, deleteHotel);

//Get (chamar os dados do Hotel pelo ID)
router.get("/find/:id", getHotel);


//Get All (Chamar todos os dados de todos Hotéis)
router.get("/", getHotels);

router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms);



export default router;


/*
    //Invocação da função criada para retornar uma mensagem, caso exista erros na comunicação
    const failed = true;
   Se for verdade que falhou, então retornará o status como a mensagem de erro 
    por meio do parâmetro next(), que recebe a função com parâmetros definidos
    if(failed) return next(createError(401, "You aren't authenticated!"));
*/
