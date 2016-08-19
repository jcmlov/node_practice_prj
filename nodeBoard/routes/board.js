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

			res.render('list', {title: '리스트', rows: rows});
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

router.get('/read/:idx', function(req, res, next) {
	var idx = req.params.idx;

	pool.getConnection(function(err, connection) {
		var sqlForReadBoard = "SELECT idx, creator_id, title, content, date_format(modidate,'%Y-%m-%d %H:%i:%s') modidate, hit from board WHERE idx = ?";
		connection.query(sqlForReadBoard, idx, function(err, row) {
			if(err) {
				console.error('err : ' + err);
			}

			console.log('row : ' + row);
			
			res.render('read', {title: '글 조회', row: row[0]});
			connection.release();
		});
	});
});

router.get('/update', function(req, res, next) {
	var idx = req.query.idx;

	pool.getConnection(function(err, connection) {
		var sqlForSelectOneBoard = "SELECT idx, creator_id, title, content, date_format(modidate,'%Y-%m-%d %H:%i:%s') modidate, hit from board WHERE idx = ?";
		connection.query(sqlForSelectOneBoard, idx, function(err, row) {
			if(err) {
				console.error('err : ' + err);
			}

			console.log('row : ' + row);
			
			res.render('update', {title: '글 수정', row: row[0]});
			connection.release();
		});
	});
});

router.post('/update', function(req, res, next) {
	var idx = req.body.idx;
	var creator_id = req.body.creator_id;
	var title = req.body.title;
	var content = req.body.content;
	var passwd = req.body.passwd;
	var datas = [creator_id, title, content, idx, passwd];
	console.log(datas);
	pool.getConnection(function(err, connection) {
		var sqlForUpdateBoard = "UPDATE board SET creator_id = ?, title = ?, content = ?, regdate = now() WHERE idx = ? and passwd = ?";
		connection.query(sqlForUpdateBoard, datas, function(err, result) {
			console.log(result);

			if(err) {
				console.error('err : ' + err);
			}

			if(result.affectedRows == 0) {
				res.send("<script>alert('패스워드가 일치하지 않거나 잘못된 요청입니다.');history.back();</script>");
			} else {
				res.redirect('/board/read/' + idx);
			}
			connection.release();
		});
	});
});

router.get('/delete', function(req, res, next) {
	var idx = req.query.idx;

	pool.getConnection(function(err, connection) {
		var sqlForDeleteBoard = "DELETE FROM board WHERE idx = ?";
		connection.query(sqlForDeleteBoard, idx, function(err, result) {
			if(err) {
				console.error('err : ' + err);
			}

			if(result.affectedRows == 0) {
				res.send("<script>alert('잘못된 요청입니다.');history.back();</script>");
			} else {
				res.redirect('/board');
			}
			
			connection.release();
		});
	});
});

module.exports = router;