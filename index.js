const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port=8000;
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
const session=require('express-session');
const passport=require('passport');
const LocalStrategy=require('./config/passport-local');
const { pass } = require('./config/mongoose');
// const { urlencoded } = require('express');

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayouts);

///extract styles and scripts from the subpages
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);




//set up the view engine
app.set('view engine','ejs');
app.set('views','./views');



app.use(session({
    name:'codeial',
    //TODO change the secret before deployement in production
    secret:'kuchbhi!',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    }
}));


app.use(passport.initialize());
app.use(passport.session());



//use express router
app.use('/', require('./routes'));


app.listen(port,function(err){
    if(err){
        // console.log('error: ',err);
        //instead of above
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`server is running on the port : ${port}`);
});