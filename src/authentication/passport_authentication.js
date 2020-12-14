const passport = require('passport');
//del modulo localStrategy requiero solo la estrategia de autenticacion
const localStrategy = require('passport-local').Strategy;
const Users =  require('../models/users');
const bcrypt = require('bcrypt');

//definimos las estrategia de autenticación, requiere una funcion callback
//el callback como paramtro recibe la info del form el email, password y un callback para terminar con la autenticación
passport.use(new localStrategy({
    usernameField: 'email',
}, async (email, password, done)=>{
    //encuentre donde el campo email del modlo sea igual a el email del usuario
    const user = await Users.findOne({'email': email});
    //si no encontro usuario con ese email
    if(!user){
        //termine el proceso con el callback done()
        //recibe tres parametros  1error, como no hay ninguno colocamos null,  si no hay usuario = false, y un mensaje
        return done(null, false, {message: 'user not found'})
    }else{
        //compare  el passsword que se trajo con el que envia el usuario
        const compare_password = bcrypt.compareSync(password, user.password);
        //si la comparacion es true
        if(compare_password){
            //no hay error colocamos null,  si encontro un usuario entonces el param es user
            return done(null, user);
            //si la comparacion es falsa la comtraseña del usuario esta mal
        }else{
            return done(null, false, {message: 'Incorrect password'});
        }
    }
}));

//Guardano en sesión
//serialize user toma como parametro el usuario y el callback
passport.serializeUser((user, done)=>{
    //no hay error null, del usuario requerimos el id
    done(null, user.id);
});

//toma un id y genera un usuario
passport.deserializeUser((id, done)=>{
    //importante las consultas se deben hacer con objetos en este caso el parametro id no los es
    //en la constante userId creamos el objeto con propiedad id y  con valor id del usuario
    const userId = {
        id: id
    }
    //ahora si hacemos la consulta con ese id del objeto
    Users.find(userId, (err, user)=>{
        done(err, user);
    });
});
