import Hotel from "../models/Hotel.js";

export const createHotel = async (req, res, next) =>{

    const newHotel = new Hotel(req.body);
    
    try{
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    }catch(err){
        //Recebendo o erro dentro do parâmetro next() da função assíncrona criada
        next(err);
    }
};

export const updateHotel = async (req, res, next) =>{

    try{
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, 
            {$set: req.body}, 
            {new: true}
            );
        res.status(200).json(updatedHotel);
    }catch(err){
        //Recebendo o erro dentro do parâmetro next() da função assíncrona criada
        next(err);
    }
};

export const deleteHotel = async (req, res, next) =>{

    try{
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel has been deleted");
    }catch(err){
        //Recebendo o erro dentro do parâmetro next() da função assíncrona criada
        next(err);
    }
};

export const getHotel = async (req, res, next) =>{

    try{
        const hotel =  await Hotel.findById(req.params.id);
         res.status(200).json(hotel);
     }catch(err){
        //Recebendo o erro dentro do parâmetro next() da função assíncrona criada
        next(err);
     }
};

export const getHotels = async (req, res, next) =>{

    //Os dados que irão ser buscados na requisição
    const { min, max, ...others } = req.query;

    try{
        const hotels =  await Hotel.find({...others,
        //mínimo ou um e máximo ou 999 | o limite de hotéis a serem recebidos    
        cheapestPrice:{$gt: min | 1, $lt: max || 999},}).limit(req.query.limit); //$gt e $lt são do mongoDB (greater than e less than)
         res.status(200).json(hotels);
     }catch(err){
         //Recebendo o erro dentro do parâmetro next() da função assíncrona criada
         next(err);
     }
};

export const countByCity = async (req, res, next) =>{

    //Requisição por cidades separadas em vírgula
    const cities = req.query.cities.split(","); 
    
    try{

        //Lista que será armazenará os hotéis
        const list =  await Promise.all(cities.map(city=>{
            return Hotel.countDocuments({city:city}) 
            ////countDocuments é do MongoDB
        }));
         res.status(200).json(list);
     }catch(err){
         //Recebendo o erro dentro do parâmetro next() da função assíncrona criada
         next(err);
     }
};

export const countByType = async (req, res, next) => {
    
    try {
      const hotelCount = await Hotel.countDocuments({ type: "hotel" });
      const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
      const resortCount = await Hotel.countDocuments({ type: "resort" });
      const villaCount = await Hotel.countDocuments({ type: "villa" });
      const cabinCount = await Hotel.countDocuments({ type: "cabin" });
  
      res.status(200).json([
        { type: "hotel", count: hotelCount },
        { type: "apartments", count: apartmentCount },
        { type: "resorts", count: resortCount },
        { type: "villas", count: villaCount },
        { type: "cabins", count: cabinCount },
      ]);
    } catch (err) {
      next(err);
    }
  };


  export const getHotelRooms = async (req, res, next) => {
    try {
      const hotel = await Hotel.findById(req.params.id);
      const list = await Promise.all(
        hotel.rooms.map((room) => {
          return Room.findById(room);
        })
      );
      res.status(200).json(list)
    } catch (err) {
      next(err);
    }
  };