/**
 * Created by Xerato on 2015-04-17.
 */
var express = require('express');
var router = express.Router();
var db = require('../models/db');
require('../models/boardmodel');
var BoardModel = db.model('Board');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('board', {title: '개씨판'});
});

router.get('/write', function (req, res, next) {
    res.render('board/write', {title: "글쓰기"});
});

router.post('/write', function (req, res, next) {
    console.log('req.body', req.body);
    var title = req.body.title;
    var content = req.body.content;
    var passwd = req.body.passwd;
    var board = new BoardModel({
        title: title,
        content: content,
        passwd: passwd,
        id: "test"
    });
    board.save(function (err, doc) {
        if (err) console.error('err', err);
        console.log('doc', doc);
        //res.json({result: doc});
        res.redirect('/board/list/1');
    });

});

router.get('/list', function (req, res, next) {
    res.redirect('/board/list/1');
});

/*router.get('/list', function (req, res, next) {
    BoardModel.find({}).sort('-regdate').exec(function (err, docs) {
        if (err) console.error('err', err);
        console.log('docs', docs);
        res.json({docs: docs});
    });


});*/
router.get('/list/:page', function(req, res, next){
    var page = req.params.page;
    page = parseInt(page, 10);
    console.log('page', page);
    BoardModel.count(function(err, cnt){
        var size = 10;
        var begin = (page-1) * size;
        var totalPage = Math.ceil(cnt / size);
        var pageSize = 10;
        var startPage = Math.floor((page-1) / pageSize) * pageSize + 1;
        var endPage = startPage + (pageSize - 1);
        if(endPage > totalPage){
            endPage = totalPage ;
        }
        var max = cnt - ((page - 1) * size);
        /*
         select * from board order by num desc limit begin, size와 같다.
         */
        BoardModel.find({}).sort('-num').skip(begin).limit(size).exec(function(err, docs){
            if(err)	console.error('err', err);
            console.log('docs', docs);
            // res.json({ "docs" : docs });

            var datas = {
                "title" : "게시판 리스트",
                "data" : docs,	//mysql에서는 rows 를 썼지.
                "page" : page,
                "pageSize" : pageSize,
                "startPage" : startPage,
                "endPage" : endPage,
                "totalPage" : totalPage,
                "max" : max
            };
            res.render('board/list', datas);
        });
    });
});

router.get('/write300', function(req,res,next){
    for(i=1; i<=300; i++){
        var title = '제목'+i;
        var content = '내용'+i;
        var passwd = '1234';
        var id = 'test';
        var board = new BoardModel({
            title : title,
            content : content,
            passwd : passwd,
            id : id
            });
        board.save(function (err,doc){
            if(err) console.error('err', err);
        });
    }//for
    res.send('<script>alert("300개 글저장 성공");location.herf="/board/list/1";</script>')

});

router.get('/read/:page/:num', function (req, res, next) {
    var page = req.params.page;
    var num = req.params.num;
    var condition = {num: num};
    var affect = {$inc: {hit: 1}};

    BoardModel.update({num: num}, {$inc: {hit: 1}}, function (err, doc) {
        if(err) console.error('err',err);
        BoardModel.find({num:num}, function(err, docs){
            if(err) console.error('err', err);
            console.log('docs',docs);
            res.render('board/read', {title:'글읽기', data:docs[0], page:page});
        })
    });
});


router.get('/update/:_id', function (req, res, next) {
    var num = req.params.num;
    var query = BoardModel.findOne({_id: _id});
    query.exec(function (err, doc) {
        if (err) console.error('err', err);
        console.log('doc', doc);
        res.json({doc: doc});

    });

});


router.post('/update', function (req, res, next) {

    var _id = req.body._id;
    var title = req.body.title;
    var content = req.body.content;
    var passwd = req.body.passwd;

    var data = {
        title: title,
        content: content,
        passwd: passwd
    };

    BoardModel.findOne({_id: _id}, function (err, doc) {
        doc.update(data, function (err) {
            if (err) {
                console.error('err', err);
                res.json({result: 'fail'});
            } else {
                res.json({result: 'ok'});
            }
        });
    });


});

router.post('/delete', function (req, res, next) {
    var _id = req.body._id;
    var passwd = req.body.passwd;

    BoardModel.remove({_id: _id, passwd: passwd}, function (err) {

        console.log('a');
        console.log('err:', err);
        if (err) {
            console.log('b');
            console.error('err', err);
            res.json({result: 'fail'});
        } else {
            console.log('c');
            res.json({result: 'ok'});
        }
    });


});


router.post('/delete', function(req, res, next){
    var num = req.body.num;
    var page = req.body.page;
    var passwd = req.body.passwd;
    BoardModel.remove({num : num, passwd : passwd }, function(err, doc){
        if(err) console.error('err', err);
        console.log('doc', doc);
        //res.json({result : doc});
        /*
         {
         result: {
         ok: 1,
         n: 0
         }
         }
         */
        if(doc.result.n == 1){
            res.redirect('/board/list/' + page);
        }else{
            res.send("<script>alert('되돌아갑니다.');history.back();</script>");
        }
    });
});

module.exports = router;
