const express = require('express');
const ChatController = require('../app/Controllers/ChatController');

const chatRoute = express.Router();

chatRoute.post('/write-message',ChatController.writeMessage)
chatRoute.post('/queryAll',ChatController.queryMessage)
chatRoute.get('/users',ChatController.queryUserOnline)


module.exports = chatRoute;