const express = require('express');
const { requireLogin } = require('../app/Controllers/AuthController');
const { addProfessor, removeProfessor, updateProfessor, changeAvatar, Professores } = require('../app/Controllers/ProfessorController');

const router = express.Router();

router.post('/add_professor',requireLogin,addProfessor)
router.post('/remove_professor',requireLogin,removeProfessor)
router.post('/update_professor',requireLogin,updateProfessor)
router.post('/change_avatar',requireLogin,changeAvatar)
router.get('/professores',requireLogin,Professores)

module.exports = router;