const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port=8000;
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
const session=require('express-session');
const passport=require('passport');
const JwtStrategy=require('./config/passport-jwt-strategy');
const LocalStrategy=require('./config/passport-local');
const passportGoogle=require('./config/passport-google-oauth-strategy');
const { pass } = require('./config/mongoose');
const MongoStore=require('connect-mongo')(session);
const sassMiddleware=require('node-sass-middleware');
const flash=require('connect-flash');
const customMware=require('./config/middleware')
// const { urlencoded } = require('express');


app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}));


app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));

//make the uploads path available to the browser
app.use('/uploads',express.static(__dirname+'/uploads'));

app.use(expressLayouts);

///extract styles and scripts from the subpages
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);




//set up the view engine
app.set('view engine','ejs');
app.set('views','./views');


//mongo store is used to store the session cookie in the db
app.use(session({
    name:'codeial',
    //TODO change the secret before deployement in production
    secret:'kuchbhi!',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: new MongoStore(
        {
            mongooseConnection:db,
            autoRemove:'disabled'
        },
        function(err){
            console.log(err||'connect-mongodb setup ok');
        }
    )
}));

//using passport js 
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);
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