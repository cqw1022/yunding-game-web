var express = require('express');
var router = express.Router();
const index = require('../controllers/index')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('home');
});

router.get('/login', function (req, res, next) {
  res.render('new_login');
});

// router.get('/test', function (req, res, next) {
//   res.render('index', { title: 'Express' });
// });


router.get('/user', function (req, res, next) {
  res.render('other/user_info');
});

router.get('/exchange', function (req, res, next) {
  res.render('exchange');
});
router.get('/test', function (req, res, next) {
  res.render('test');
});
router.get('/update', function (req, res, next) {
  res.render('update');
})

router.post('/api/sendMailCode', index.sendMailCode)

router.post('/api/exchangeVolume', index.exchangeVolume)

// router.get('/api/getWordLog',index.get)
module.exports = router;
