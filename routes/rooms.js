import express from "express";
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom, updateRoomAvailability } from "../controllers/room.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//CRUD dos quartos dos hotéis
router.post("/:hotelid", verifyAdmin, createRoom);

//Update (Atualização do Hotel por meio do seu ID)
router.put("/:id", updateRoomAvailability);

router.put("availability/:id", verifyAdmin, updateRoom);


//Delete (Exclusão d Hotel por meio do seu ID)
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);

//Get (chamar os dados do Hotel pelo ID)
router.get("/:id", getRoom);


//Get All (Chamar todos os dados de todos Hotéis)
router.get("/", getRooms);


export default router;

