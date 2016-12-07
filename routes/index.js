var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {});
});

/* GET admin page. */
router.get('/admin', function(req, res, next) {
    res.render('admin', {})
});

module.exports = router;
