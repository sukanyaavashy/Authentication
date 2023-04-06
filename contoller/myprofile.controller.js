const Registeruser = require('../model')

exports.get = async(req,res) => {
    try {
        let exist = await Registeruser.findById(req.user.id)
        if(!exist){
            return res.status(400).json({error:'user not found'})
        }
        res.json({ username: exist.username, email: exist.email })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:'Server Error'})
    }
}