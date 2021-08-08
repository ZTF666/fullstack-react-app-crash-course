const express = require("express")
const router = express.Router()
const {Posts,Likes} = require('../models')
const {validateToken} = require('../middleware/AuthMiddleware')


// get posts from db
router.get("/",validateToken,async (req,res)=>{
    // the include makes a joins both tables !!! easy and quick
    const listOfPosts = await Posts.findAll({ include:[Likes] })
    // fetching list of likes by users id
    const likedPosts = await Likes.findAll({where : { UserId:req.user.id}})
    // returning the data
    res.json({ 
        listOfPosts:listOfPosts,
        likedPosts:likedPosts
    })
})

// push post to db
router.post("/",validateToken,async (req,res)=>{
    // getting data from the request
    const post = req.body
    post.username = req.user.username
    post.UserId = req.user.id
    // creating the object
    await Posts.create(post)
    res.json(post)
})

// get one post by id
router.get("/byId/:id",async (req,res)=>{
    const id = req.params.id
    const post = await Posts.findByPk(id)
    // returning the data
    res.json(post)
})

// delete post by id 

router.delete("/:postId",validateToken,async (req,res)=>{
const postId = req.params.postId
await Posts.destroy({
    where:{
        id:postId
    }
})
res.json('deleted')
})

// get all posts by user's id
router.get("/byuserId/:id",async (req,res)=>{
    const id = req.params.id
    const listOfPosts = await Posts.findAll({
        where:{
            UserId:id
        },
        include:[Likes]
    })

    res.json(listOfPosts)
})

// updating post title

router.put('/title',validateToken,async(req,res)=>{

        const {newTitle,id} = req.body
        await Posts.update({title:newTitle},{where:{id:id}})
        res.json(newTitle)
})
// updating post text

router.put('/body',validateToken,async(req,res)=>{

        const {newText,id} = req.body
        await Posts.update({postText:newText},{where:{id:id}})
        res.json(newText)
})

module.exports = router