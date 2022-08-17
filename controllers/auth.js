const { response } = require("express");
const Usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");

const crearUsuario = async (req, res= response) => {

    const {email, password} = req.body;

    try {

        const existeEmail = await Usuario.findOne({email});

        if(existeEmail){
            return res.status(400).json({
                ok: false,
                msg : 'Credenciales no válidas.'
            });
        }

        const usuario = new Usuario( req.body);

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        await usuario.save();
    
        //Generar WJT
        const token =  await generarJWT(usuario.id);

        res.json({
            ok:true,
            usuario,
            token
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
    
   
}

const login = async (req, res= response) => { 
    const {email, password} = req.body;

    try {

        const usuarioDB = await Usuario.findOne({email});
        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg : 'Credenciales no válidas.'
            });
        }

        const validPassworrd = bcrypt.compareSync(password, usuarioDB.password);
        if(!validPassworrd){
            return res.status(400).json({
                ok: false,
                msg : 'Credenciales no válidas.'
            });
        }

        //Generar el WJT
        const token = await generarJWT(usuarioDB.id);
                

       
        res.json({
            ok:true,
            usuario: usuarioDB,
            token          
            
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
};

const renewToken = async (req, res = response) => {
    const uid = req.uid;

     //Generar el nuevo WJT
     const token = await generarJWT(uid); 
     
     const usuario = await Usuario.findById({_id: uid});
     
    res.json({
        ok:true,
        usuario,
        token                      
    });
}

module.exports = {
    crearUsuario, login, renewToken
}