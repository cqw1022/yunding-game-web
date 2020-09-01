var express = require('express');
var router = express.Router();
const api = require('../controllers/api')


router.get('/api/getUserInfo', api.getUserInfo)
router.get('/api/getAllMonster', api.getAllMonster)
router.get('/api/getAllCombatMap', api.getAllCombatMap)
// router.post('/api/by', api.by)

module.exports = router;