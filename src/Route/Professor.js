const express = require('express');
const { requireLogin,ProfessorLogin } = require('../app/Controllers/AuthController');
const { addProfessor, removeProfessor, updateProfessor, changeAvatar, Professores, synchronousClass } = require('../app/Controllers/ProfessorController');

const router = express.Router();

router.post('/add_professor',requireLogin,addProfessor)
router.post('/remove_professor',requireLogin,removeProfessor)
router.post('/update_professor',requireLogin,updateProfessor)
router.post('/change_avatar',requireLogin,changeAvatar)
router.post('/syncClass',synchronousClass)
router.get('/professores',requireLogin,Professores)
router.post('/login',ProfessorLogin)

module.exports = router;