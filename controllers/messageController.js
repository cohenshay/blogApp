const mongoose = require("mongoose");

require('../models/message');
require('../models/user');

const Message = mongoose.model("messages");
const User = mongoose.model("users");

let controller = {
    saveMessage: async (req, res) => {
        var sender = req.decoded._id;
        const { text, receiver, roomName } = req.body;
        const createdAt = new Date().getDate();

        const message = new Message({
            text, sender, receiver, roomName, createdAt
        })
        message = await message.save();
        res.status(200).send(message);
    },
    getPrivateMessages: async (req, res) => {
        //TODO filters
        var userId = req.decoded._id;

        const user = await User.findById(userId);
        const messages = await Message.find({ _id: user._id });


        res.status(200).send(messages);
    },
    getRoomMessages: async (req, res) => {

        var userId = req.decoded._id;
     
        const user = await User.findById(userId);
        if (user) {
            //TODO permissions
            const roomName = req.query.roomName;
            console.log("roomName", roomName);
            const messages = await Message.find({ roomName });

            res.status(200).send(messages);
        }
        else {
            res.status(500).send({
                error: "user does not registered to this room"
            })
        }
    },
}

module.exports = controller;