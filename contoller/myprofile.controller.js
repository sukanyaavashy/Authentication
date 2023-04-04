const Registeruser = require('../model')

exports.get = async(req,res) => {
    try {
        let exist = await Registeruser.findById(req.user.id)
        if(!exist){
            return res.status(400).send('user not found')
        }
        res.json(exist)
        
    } catch (error) {
        console.log(error);
        return res.status(500).send('Server Error')
    }
}