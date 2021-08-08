const express = require("express")
const router = express.Router()
const {validateToken} = require('../middleware/AuthMiddleware')
const{ Likes }=require('../models')



// like unlike
router.post("/",validateToken,async (req,res)=>{
 
    const {PostId} = req.body
    const UserId = req.user.id 
    const found = await Likes.findOne({where:{PostId: PostId,UserId:UserId}})

    if(!found){
          await Likes.create({
        PostId:PostId,
        UserId:UserId
        })
        res.json({liked:true})
    }else{
        await Likes.destroy({
            where:{PostId: PostId,UserId:UserId}
        })
        res.json({liked:false})
    }
})





module.exports = router