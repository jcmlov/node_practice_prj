var express = require('express');
var router = express.Router();

// GET users listing
router.get('/main', function(req, res, next) {
	res.redirect('/main');
});

module.exports = router;