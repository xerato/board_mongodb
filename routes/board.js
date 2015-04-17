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
        res.json({result: doc});
    });

});

router.get('/list', function (req, res, next) {
    BoardModel.find({}).sort('-regdate').exec(function (err, docs) {
        if (err) console.error('err', err);
        console.log('docs', docs);
        res.json({docs: docs});
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
        console.log('err:',err);
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


module.exports = router;
