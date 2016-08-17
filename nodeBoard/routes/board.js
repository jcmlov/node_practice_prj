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

// GET users listing
router.get('/', function(req, res, next) {
	res.redirect('/board/list/1');
});

router.get('/list/:page', function(req, res, next) {
	pool.getConnection(function(err, connection) {
		var sqlForSelectList = "SELECT idx, creator_id, title, date_format(modidate,'%Y-%m-%d %H:%i:%s') modidate, hit FROM board";
		connection.query(sqlForSelectList, function(err, rows) {
			if(err) {
				console.error('err : ' + err);
			}

			console.log('rows : ' + JSON.stringify(rows));

			res.render('list', {title: '게시판 전체 글 조회', rows: rows});
			connection.release();
		});
	});
});

router.get('/write', function(req, res, next) {
	res.render('write', {title: '게시판 글쓰기'});
});

router.post('/write', function(req, res, next) {
	var creator_id = req.body.creator_id;
	var title = req.body.title;
	var content = req.body.content;
	var passwd = req.body.passwd;
	var datas = [creator_id, title, content, passwd];

	pool.getConnection(function(err, connection) {
		// user the connection
		var sqlForInsertBoard = "INSERT INTO board(creator_id, title, content, passwd) VALUES(?,?,?,?)";
		connection.query(sqlForInsertBoard, datas, function(err, rows) {
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