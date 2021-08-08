const express = require ("express")
const app = express()
const cors = require('cors')


app.use(express.json())
app.use(cors())

const db = require("./models")

// router
// posts
const postRouter = require("./routes/Posts")
app.use("/posts",postRouter)
// comments
const commentsRouter = require("./routes/Comments")
app.use("/comments",commentsRouter)
// users
const usersRouter = require("./routes/Users")
app.use("/auth",usersRouter)
// likes
const likesRouter = require("./routes/Likes")
app.use("/likes",likesRouter)


// init database /create it if doesnt exist
db.sequelize.sync().then(()=>{

    // starts server
    app.listen(3001,()=>{
    console.log("Running...")

})

})



