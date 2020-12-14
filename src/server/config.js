const express = require('express');
const ejs = require('ejs');
const path = require('path');
const routes = require('../routes/index');
const multer = require('multer');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const passport_authentication = require('../authentication/passport_authentication');


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
        secret: "car2 secret key",
        resave: true,
        saveUninitialized: true,
    }));

    app.use(passport.initialize());
    app.use(passport.session());


    app.use(flash());
 
    routes(app);

    return app
}