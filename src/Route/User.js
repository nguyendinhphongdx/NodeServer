const express = require('express');
const { requireLogin } = require('../app/Controllers/AuthController');
const { addUser, Users, removeUser } = require('../app/Controllers/UserController');
const router = express.Router();


router.post('/add_user',addUser)
router.post('/remove_user',requireLogin,removeUser)
router.get('/users',requireLogin,Users)

module.exports = router;