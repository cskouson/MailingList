var express = require('express');
var router = express.Router();

require('dotenv').config();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.set('Cache-control', 'no-store');
  res.sendFile('index.html', { root: '../MailingList/public/html/' });
});

module.exports = router;
