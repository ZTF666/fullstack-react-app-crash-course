// verifying the token to make sure the user is logged is


const {verify} = require ('jsonwebtoken')


const validateToken = (req,res,next) =>{
    const accesToken= req.header("accessToken")

    if(!accesToken) return res.json({error:"User Not Logged In !!"})

    try {
        const validToken = verify(accesToken,"mysecret")
        req.user =validToken

        if(validToken){
            return next()
        }

    } catch (error) {
        return res.json({error:error})
    }

}
module.exports = {validateToken}