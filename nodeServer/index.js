//Node server for iChat application for handling socketio connections
const io = require('socket.io')(8000);

const users = {};

io.on('connection', socket => {
    socket.on('new-user-joined', (user_name) =>{
        users[socket.id] = user_name;
        socket.broadcast.emit('user-joined',user_name);
    });
    socket.on('send', message=>{
        socket.broadcast.emit('receive',{message : message , name : users[socket.id]});
    });
    socket.on('disconnect', message=>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
});
