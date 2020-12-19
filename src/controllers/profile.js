const ctrl = {}

ctrl.showProfile =  async (req, res)=>{
    res.render('../views/profile')
}


ctrl.Islogged = async (req, res, next)=>{
    if(req.isAuthenticated()){
        next();
    }else{
        res.redirect('/logIn');
    }
}

module.exports =  ctrl;