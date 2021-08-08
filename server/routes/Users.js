const express = require("express")
const router = express.Router()
const {Users} = require('../models')
const bcrypt = require('bcrypt')
const {sign} = require("jsonwebtoken")
const {validateToken} = require('../middleware/AuthMiddleware')

// gesitration
router.post("/",async (req,res)=>{
    const {username,password} = req.body
    // hashing and salting the password
    bcrypt.hash(password,10).then((hash)=>{
        Users.create({
            username:username,
            password:hash
        })
        res.json("Success")
    })
})

// Login

router.post('/login',async(req,res)=>{
    const{username,password} = req.body
    const user = await Users.findOne({where:{username:username}})
    if(!user) res.json({error:"Username does not exist !!"})
    bcrypt.compare(password,user.password).then((match)=>{
        if(!match) res.json({error:"wrong password and username combination"})
        
        // generating jwt
        const accessToken = sign({username:user.username,id:user.id},"mysecret")
        // returning our accesstoken

        res.json({token:accessToken,username:username,id:user.id})
    })
})
// auth
router.get('/auth',validateToken,(req,res)=>{
    res.json(req.user)
})

router.get('/basicinfo/:id',async(req,res)=>{
    const id = req.params.id
    const basicInfo = await Users.findByPk(id,{
        attributes:{
            exclude:['password']
        }
    })
    res.json(basicInfo)


})

module.exports = router