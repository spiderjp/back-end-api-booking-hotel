import mongoose from 'mongoose';

//criação de um novo Schema dentro do nosso banco de dados MongoDB - "Modelo de Tabela"
const RoomSchema = new mongoose.Schema({

    title:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    maxPeople:{
        type: Number,
        required: true,
    },
    desc:{
        type: String,
        required: true,
    },
    roomNumbers: [{number:Number, unavailableDates: {type: [Date]}}],
}, {timestamps: true});


export default mongoose.model("Room", RoomSchema)