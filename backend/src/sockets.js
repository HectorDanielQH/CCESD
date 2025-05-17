export default (io)=>{
    io.on('connection', (socket) => {
        socket.on('atencion', (data) => {
            io.emit('mensaje', data);
        });

        socket.on('notificarPaciente',(data)=>{
            io.emit('notificacionAtencion',true)
        })
        socket.on('disconnect', () => {
          console.log('user disconnected');
        });
    });
}