require('dotenv').config();
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const connectDB = require('./server/config/db');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');
const methodOverride = require('method-override');
const app = express();
const port = 5000 || process.env.PORT;
const morgan = require('morgan');

app.use(morgan('dev'));

app.use((req,res,next) => {
    req.requestTime = new Date().toISOString();
    //console.log(req.headers);
    next();
});


app.use(express.urlencoded({extended: true}));
app.use(express.json());

//CONNECT TO DATABASE
connectDB();

// Google
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    }),
}));

app.use(passport.initialize());
// init passport on every route call.

app.use(passport.session());


// Static Files
//app.use(express.static('public', { maxAge: 86400000 }));
app.use(express.static('public'));




//Templating Engine
app.use(expressLayouts);
app.set('layout', './layouts/index.ejs');
app.set('view engine', 'ejs');




// Routes
const auth      =   require('./server/routes/auth');
const homePage  =   require('./server/routes/main');
const toursPage =   require('./server/routes/tours');
const dashboard =   require('./server/routes/dashboardRoute');


app.use('/' , auth);
app.use('/', homePage);
app.use('/' ,toursPage);
app.use('/' , dashboard);

//app.use('/', bookPage);


app.get('*', (req,res)=>{
    res.status(404).render('404.ejs');
});

// Server
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});