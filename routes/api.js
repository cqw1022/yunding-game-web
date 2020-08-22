var express = require('express');
var router = express.Router();
const api = require('../controllers/api')


router.get('/api/getUserInfo', api.getUserInfo)
// router.post('/api/by', api.by)

module.exports = router;