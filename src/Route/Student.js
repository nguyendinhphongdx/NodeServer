const express = require('express');
const { requireLogin } = require('../app/Controllers/AuthController');
 const { 
    addStudent, 
    removeStudent, 
    Students, 
    updateStudent,
    changeAvatar,
    gradeMark,
    detailStudent,
    markStudent,
    getAllClass,
    Login,
    Test
} = require('../app/Controllers/StudentController');

const router = express.Router();

router.post('/add_student',requireLogin,addStudent)
router.post('/remove_student',requireLogin,removeStudent)
router.post('/update_student',requireLogin,updateStudent)
router.post('/change_avatar',requireLogin,changeAvatar)
router.post('/grade_mark',requireLogin,gradeMark)
router.post('/detail_student',requireLogin,detailStudent)
router.post('/mark_student',requireLogin,markStudent)
router.post('/get_all_class',requireLogin,getAllClass)
router.get('/students',requireLogin,Students)
router.post('/login',Login)
router.get('/test',Test)
module.exports = router;