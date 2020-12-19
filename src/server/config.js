const express = require('express');
const ejs = require('ejs');
const path = require('path');
const routes = require('../routes/index');
const multer = require('multer');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const passport_authentication = require('../authentication/passport_authentication');
const user_middlewares = require('../middlewares/user_middlewares');
const morgan = require('morgan');



module.exports = function(app){
    app.set('port', process.env.PORT || 3000);
    app.set('views', path.join(__dirname, '../views'));

    app.set('view engine', 'ejs');
    app.use(multer({
        dest: path.join(__dirname, '../public/upload/temp')
    }).array('images'));

    app.use(express.urlencoded({extended: true}));
    app.use(express.json());

    app.use(express.static(path.join(__dirname, '../public')));

    app.use(session({
        secret: "car2secretkey",
        resave: true,
        saveUninitialized: true,
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    app.use(flash());
 
    app.use(morgan('dev'));


    //Vaiables Globales

    app.use((req, res, next)=>{
        app.locals.message = req.flash('message');
        console.log(app.locals.message);
        app.locals.user = req.user || null;
        next();
    });
    

    routes(app);


    return app;

}





