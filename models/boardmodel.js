/**
 * Created by Xerato on 2015-04-17.
 */


var mongoose = require('mongoose');
//var FormatDate = mongoose.Schema.Types.FormatDate = require('mongoose-schema-formatdate');
var autoinc = require('mongoose-auto-increment');
var Schema        = mongoose.Schema;
var db = require('../models/db');

var autoIncrement = require('mongoose-auto-increment');
//autoIncrement.initialize(connection);
autoIncrement.initialize(db);


var Board = db.model('Board', BoardSchema);

var BoardSchema = new mongoose.Schema({
    //   _id, title, content, passwd, regdate, hit, id
//         String string  string       date  number string
    title: String,
    content: String,
    passwd: String,
    regdate: {type: Date, default: Date.now},
    hit: {type: Number, default: 0},
    id: String,
    num : Number
});


BoardSchema.plugin(autoinc.plugin, {
    model: 'Board',
    field: 'num',
    start: 1,
    step: 1
});


BoardSchema.plugin(autoIncrement.plugin, {model:'Board', field:'num'});

var Board = mongoose.model('Board', BoardSchema);




