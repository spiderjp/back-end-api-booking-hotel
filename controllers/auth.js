import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


//Função de registrar usuário
export const register = async (req,res,next)=>{

    try{

        //Depois de instalada a biblioteca bcryptjs para criptografar a senha do usário por meio do hash
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({

            ...req.body,
            password: hash,
        });

        await newUser.save();

        res.status(200).send("User has been created!");
    }catch(err){
        next(err);
    }
};


//Função de login do usuário
export const login = async (req,res,next)=>{

    try{

        //Encontrado o usuário específico (com o nome especificado) no nosso banco de dados
        const user = await User.findOne({username:req.body.username});

        //Se o usuário especificado não for encontrado, para retornar o erro criado
        if(!user) return next(createError(404, "User not found!"));
        
        //Comparando e checando se a senha do usuário tem ligação com o hash criado quando cadastrado (para liberar a entrada)
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);

        //Se a senha estiver errada:
        if(!isPasswordCorrect) return next(createError(400, "Wrong password or username!"));

        //Se a senha e usuário estiverem corretos, criaremos um token para ele
        //Utilizaremos o ID e isAdmin do usuário e daremos uma chave secreta para ele
        const token = jwt.sign({id:user._id, isAdmin: user.isAdmin}, process.env.JWT);

        //Desestruturação para quando fazer a requisição, não receber a senha e o status de administrador, apenas os outros detalhes
        const {password, isAdmin, ...otherdetails} = user._doc; //_doc é onde estão as informações que precisamos do Objeto (Usuário) 

        //Se o usuário especificado for encontrado, então retorne a seguinte mensagem
        res.cookie("access_token", token, {
            httpOnly: true, //Aumenta a segurança e não permite nenhum cliente misterioso acessar o cookie - acesso por meio apenas do HTTP.
        }).status(200).json({details:{...otherdetails}, isAdmin});   
    }catch(err){
        next(err);
    }
}