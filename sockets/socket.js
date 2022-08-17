const { comprobarJWT } = require('../helpers/jwt');
const { io } = require('../index');
const {usuarioConectado, usuarioDesconectado, grabarMensaje} = require('../controllers/socket')

// Mensajes de Sockets
io.on('connection',  (client) => {
    console.log('Cliente conectado');
    
    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token'])
    //Verificar autenticación
    if(!valido) {return client.disconnect();}

    //Cliente autenticado
    usuarioConectado(uid);


    // Ingresar al usuario a una sala especifica
    //Sala global, Client.id,  sala con uid del usuario

    client.join(uid);

    //Escuchar del cliente el mensaje personal
    client.on('mensaje-personal', async (payload)  => {
        console.log(payload);
        await grabarMensaje(payload);

        io.to(payload.para).emit('mensaje-personal', payload);
    });

    //client.to(uid).emit('')

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
        usuarioDesconectado(uid);
    });

    // client.on('mensaje', ( payload ) => {
    //     console.log('Mensaje', payload);

    //     io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );

    // });


});
