const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    nombre : {
        type : String, 
        required: true
    },
    email : {
        type : String, 
        required: true,
        unique: true
    },
    password : {
        type : String, 
        required: true
    },
    online : {
        type : Boolean, 
        default: false
    },
});

//Sobreescribir el método para no regresar todo
UsuarioSchema.method('toJSON', function()  {
    //Se está excluyendo la versión, el id y el password y todo lo demás se asigna a objeto con el operador ...
    const {__v, _id, password,  ...object} = this.toObject();

    //Se agrega una nueva propiedad con el _id excluido 
    object.uid = _id;
    return object;
});


module.exports = model('Usuario', UsuarioSchema)