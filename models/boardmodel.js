/**
 * Created by Xerato on 2015-04-17.
 */

var mongoose = require('mongoose');
var FormatDate = require('mongoose-schema-formatdate');
var autoinc = require('mongoose-id-autoinc');

var BoardSchema = new mongoose.Schema({
    //   _id, title, content, passwd, regdate, hit, id
//         String string  string       date  number string
    title: String,
    content: String,
    passwd: String,
    regdate: {type: FormatDate, format: 'YYYY-MM-DD HH:mm:ss', default: Date.now},
    hit: {type: Number, default: 0},
    id: String
});

BoardSchema.plugin(autoinc.plugin, {
    model: 'Board',
    field: 'num',
    start: 1,
    step: 1
});



var Board = mongoose.model('Board', BoardSchema);

