var express = require('express');
var router = express.Router();
const open_api = require('../controllers/open_api')


router.get('/api/getUserInfo', open_api.getUserInfo)
// router.get('/api/getAllMonster', open_api.getAllMonster)
// router.get('/api/getAllCombatMap', open_api.getAllCombatMap)
// router.get('/api/getGoods',open_api.getGoods)
// router.post('/api/by', api.by)

module.exports = router;