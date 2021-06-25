const express = require('express');
const { requireLogin } = require('../app/Controllers/AuthController');
const { addSubject,Subjects, removeSubject, updateSubject } = require('../app/Controllers/SubjectController');
const router = express.Router();

router.post('/add_subject',requireLogin,addSubject)
router.post('/remove_subject',requireLogin,removeSubject)
router.post('/update_subject',requireLogin,updateSubject)

router.get('/subjects',requireLogin,Subjects)

module.exports = router;