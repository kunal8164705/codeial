const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/codeial_development');

const db=mongoose.connection;

db.on('error',console.error.bind(console,"error connecting to mongo db"));

db.on('open',function(){
    console.log('connected to database:: mongo db');
});

module.exports=db;
