var express = require('express');
var router = express.Router();

// MySQL 로드
var mysql = require('mysql');
var pool = mysql.createPool({
	connectionLimit: 3,
	host: 'localhost',
	user: 'testUsr',
	password: 'testUsr',
	database: 'study'
});

router.post('/login/', function(req, res, next) {
	var sess;
	sess = req.session;
});

router.post('/account', function(req, res, next) {
	var id = req.body.member_id;
	var name = req.body.member_name;
	var email = req.body.member_email;
	var age = req.body.member_age;
	var pw = req.body.member_pw;
	var datas = [id, name, email, age, pw];
	
	pool.getConnection(function(err, connection) {
		var sqlForInsertMember = "INSERT INTO member(member_id, member_name, member_email, member_age, member_pw) VALUES(?, ?, ?, ?, ?) ";
		connection.query(sqlForInsertMember, datas, function(err, rows) {
			if(err) {
				console.error('err : ' + err);
			}

			console.log('rows : ' + JSON.stringify(rows));

			res.redirect('/board');
			connection.release();
		});
	});
});


module.exports = router;