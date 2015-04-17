/**
 * Created by Xerato on 2015-04-17.
 */

var mongoose = require('mongoose');
var uri = 'mongodb://localhost/test';
var options = {
    server: {poolSize: 100}
};

var db = mongoose.createConnection(uri, options);

db.on('error', function(err){
   if(err) console.error('db err', err);
});

db.once('open', function callback(){
   console.info('MongoDB connected successfully');
});


module.exports = db;
