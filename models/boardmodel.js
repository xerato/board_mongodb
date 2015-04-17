/**
 * Created by Xerato on 2015-04-17.
 */


var mongoose = require('mongoose');
//var FormatDate = mongoose.Schema.Types.FormatDate = require('mongoose-schema-formatdate');
var Schema        = mongoose.Schema;
var db = require('../models/db');
//var FormatDate = Schema.Types.FormatDate = require('mongoose-schema-formatdate');

var autoIncrement = require('mongoose-auto-increment');
//autoIncrement.initialize(connection);
autoIncrement.initialize(db);


var BoardSchema = new Schema({
    //   _id, title, content, passwd, regdate, hit, id
//         String string  string       date  number string
    title: String,
    content: String,
    passwd: String,
    //regdate: {type: FormatDate, format: 'YYYY-MM-DD', default: Date.now},
    regdate: {type: Date, default: Date.now},
    hit: {type: Number, default: 0},
    id: String,

});

BoardSchema.plugin(autoIncrement.plugin, {
    model: 'Board',
    field: 'num',
    startAt: 1,
    incrementBy: 1
});


BoardSchema.plugin(autoIncrement.plugin, {model:'Board', field:'num'});

var Board = mongoose.model('Board', BoardSchema);




