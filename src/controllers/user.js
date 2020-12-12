const ctrl = {}

ctrl.signIn = async(req, res)=>{
    res.render("./signin");
}

module.exports = ctrl;
