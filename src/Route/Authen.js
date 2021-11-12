const express = require('express');
const { login,VerifyOTP,GetOTP } = require('../app/Controllers/AuthController');
const router = express.Router();

// post login
router.post('/verify',VerifyOTP)
router.post('/opt',GetOTP)

router.post('/',login)


module.exports = router;