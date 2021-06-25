const express = require('express');
const { getHistory } = require('../app/Controllers/HistoryControlelr');
const router = express.Router();


router.get('/histories',getHistory)


module.exports = router;