const express = require("express")
const router = express.Router()
const {Comments} = require('../models')
const {validateToken} = require('../middleware/AuthMiddleware')



// get one comment by id
router.get("/:postId",async (req,res)=>{
    const postId = req.params.postId
    const comments = await Comments.findAll({where:{PostId: postId}})
    // returning the data
    res.json(comments)
})

// create comment
router.post("/",validateToken,async (req,res)=>{
    const comment  = req.body
    const username = req.user.username
    comment.username=username
    await Comments.create(comment)
    // returning the data
    res.json(comment)
})

// DELETE   COMMENT
router.delete('/:commentId',validateToken,async(req,res)=>{
    const commentId = req.params.commentId

    await Comments.destroy({where:{ id:commentId }})
    res.json('Deleted !')
})



module.exports = router