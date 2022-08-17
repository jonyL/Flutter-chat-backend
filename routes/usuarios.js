/*
    path : api/usuarios
*/

const { Router } = require('express');
const { renewToken } = require('../controllers/auth');
const { getUsuarios } = require('../controllers/usuarios');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();


router.get('/' , validarJWT, getUsuarios)


//validarJWT
router.get('/renew', validarJWT,  renewToken);





module.exports = router;

