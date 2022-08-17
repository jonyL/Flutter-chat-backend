const { response, query } = require("express");
const Usuario = require('../models/usuario');


const getUsuarios = async (req, res = response) => {

    const desde = Number(req.query.desde) || 0;

    // {$ne } => Not Existing
    const usuarios = await Usuario
    .find({_id : {$ne : req.uid }})
    .sort('-online')
    .skip(desde)
    .limit(10)
    res.json({
        ok:true,
        usuarios,
        desde             
    });
}

module.exports = {
    getUsuarios
}