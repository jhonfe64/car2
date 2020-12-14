const ctrl = {}

ctrl.showProfile =  async (req, res)=>{
    res.render('../views/profile')
}

module.exports =  ctrl;