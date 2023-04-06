const Registeruser = require('../model')
const jwt = require('jsonwebtoken')

exports.post = async (req,res) => {
    try {
        const {email,password} = req.body
        let exist = await Registeruser.findOne({email})
        if(!exist){
            return res.status(400).json({error:'User Not found'})
        }
        if(exist.password !== password){
            return res.status(400).json({error:'Authentication failed'})
        }
        let payload = {
            user:{
                id: exist.id
            }
        }
        jwt.sign(payload,'jwtSecret',{expiresIn:3600000},
            (err,token) =>{
                if(err) throw err;
                res.json({token})
            })
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:'Server Error'})
    }
}