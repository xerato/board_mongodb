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
    id: String



});



BoardSchema.virtual('myregdate')
    .get(function(){
       return formatDate(this.regdate);
    });
BoardSchema.set('toJSON', {virtuals : true });

BoardSchema.plugin(autoIncrement.plugin, {
    model: 'Board',
    field: 'num',
    startAt: 1,
    incrementBy: 1
});

var Board = mongoose.model('Board', BoardSchema);

function formatDate(date){
    var y = date.getFullYear();
    var m = date.getMonth()+1;
    var d = date.getDate();
    var h = date.getHours();
    var i = date.getMinutes();
    var s = date.getSeconds();
    // yyyy-MM-dd hh:mm:ss
    var day =  y + '-' + (m>9?m: '0'+m) + '-' + (d>9?d:+'0'+d) + ' '
    + (h>9?h: '0'+h) +':' + (i>9?i: '0'+i) +':'+ (s>9?s: '0'+s);
    return day;

};


