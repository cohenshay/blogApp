
const { generateMessage } = require('../utils/message');

let ioHandler = (io) => {
    const users = [];
    io.on('connection', (socket) => {
      

        socket.on('join', (userName) => {
        
            users.push({
                id: socket.id,
                userName: userName
            });

            let len = users.length;
            len--;

            io.emit('userList', users, users[len].id);
            
            socket.emit('getMsg', generateMessage('Admin', 'Welcome to the chat app'));
          
        });

        socket.on('getMsg', (data) => {
            socket.broadcast.to(data.toid).emit('sendMsg', {
                msg: data.msg,
                name: data.name
            });
        });

        socket.on('getRoomMsg', (data) => {
            socket.to(data.roomName).emit('sendRoomMsg', {
                msg: data.msg,
                name: data.name
            });
        });

        socket.on('disconnect', () => {

            for (let i = 0; i < users.length; i++) {

                if (users[i].id === socket.id) {
                    users.splice(i, 1);
                }
            }
            io.emit('exit', users);
        });


        // socket.on('disconnect', () => {
        //     var user = users.removeUser(socket.id);

        //     if (user) {
        //         io.to(user.room).emit('updateUserList', users.getUserList(user.room));
        //         io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
        //     }
        // });
    });

}



module.exports = ioHandler;