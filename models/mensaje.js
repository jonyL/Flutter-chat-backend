const {Schema, model} = require('mongoose');

const MensajeSchema = Schema({
    de : {
        type : Schema.Types.ObjectId, 
        ref :'Usuario',
        required: true
    },
    para : {
        type : Schema.Types.ObjectId, 
        ref :'Usuario',
        required: true        
    },
    mensaje : { 
        type : String, 
        required: true
    }
   
}, {
    timestamps: true
});


//Sobreescribir el método para no regresar todo
MensajeSchema.method('toJSON', function()  {
    //Se está excluyendo la versión, el id y el password y todo lo demás se asigna a objeto con el operador ...
    const {__v, _id, ...object} = this.toObject();

    //Se agrega una nueva propiedad con el _id excluido 
    object.uid = _id;
    return object;
});


module.exports = model('Mensaje', MensajeSchema)