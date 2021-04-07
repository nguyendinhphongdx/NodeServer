const express = require('express');
const { getAllSchedule, Login, getAllSubject, getAllClass, getScheduleStudent } = require('../app/Controllers/MobileController');
const router = express.Router();

router.post('/login',Login)
router.post('/get_all_subject',getAllSubject)
router.post('/get_all_class',getAllClass)
router.post('/get_all_Schedule',getScheduleStudent)
module.exports = router;