
const {generateMessage} = require('../utils/message');

let ioHandler = (io) => {
    io.on('connection', (socket) => {
        console.log('New user connected');
        
        socket.on('join', (callback) => {
            // if (!isRealString(params.name) || !isRealString(params.room)) {
            //     return callback('Name and room name are required.');
            // }
            
            socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
         
            //TODO
            //callback();
        });

        // socket.on('createMessage', (message, callback) => {
        //     var user = users.getUser(socket.id);

        //     if (user && isRealString(message.text)) {
        //         io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        //     }

        //     callback();
        // });

        // socket.on('createLocationMessage', (coords) => {
        //     var user = users.getUser(socket.id);

        //     if (user) {
        //         io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
        //     }
        // });

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