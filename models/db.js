/**
 * Created by Xerato on 2015-04-17.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var uri = 'mongodb://192.168.205.196/test';
var uri = 'mongodb://localhost/test';
var options = {
    server: {poolSize: 100}
};
var db = mongoose.createConnection(uri, options);

//var autoinc = require('mongoose-id-autoinc');
//autoinc.init(db); // √ ±‚»≠

//var connection = mongoose.createConnection("mongodb://localhost/myDatabase");






db.on('error', function (err) {
    if (err) console.error('db err', err);
});

db.once('open', function callback() {
    console.info('MongoDB connected successfully');
});


module.exports = db;
