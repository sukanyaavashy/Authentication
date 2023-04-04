const Registeruser = require('../model')

exports.post = async(req,res) => {
    try{
        const{username,email,password,confirmpassword} = req.body
        let exist = await Registeruser.findOne({email})
        if(exist){
            return res.status(400).send('User allready exist')
        }
        if(password !== confirmpassword){
            return res.status(400).send('Password not mathching')
        }
        let newUser = Registeruser({
            username,
            email,
            password,
            confirmpassword
        })
        await newUser.save()
        res.status(200).send('Register Successfull')

    }catch(err){
        console.log(err)
        return res.status(500).send('Internal server Error')

    } 
}