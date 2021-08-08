import {useParams,useHistory} from 'react-router-dom'
import { useEffect,useState,useContext } from 'react'
import axios from 'axios'
import { AuthContext } from "../helpers/AuthContext"



const Post = () => {

    let {id} = useParams()
    let history = useHistory()
    const {authState} = useContext(AuthContext)
    const [postObject,setpostObject] = useState({})
    const [comments,setComments] = useState([])
    const [newComment,setNewComment] = useState("")

    useEffect(()=>{
        axios.get(`http://localhost:3001/posts/byId/${id}`)
        .then((res)=>{
            setpostObject(res.data)
        })
        
        axios.get(`http://localhost:3001/comments/${id}`)
        .then((res)=>{
            setComments(res.data)
        })
    
    },[])

    const addComment=()=>{
        axios.post("http://localhost:3001/comments",{
            commentBody:newComment,
            PostId:id
        },
        {
            headers:{
                accessToken: localStorage.getItem("accessToken")
            }
        }
        ).then((res)=>{
                if(res.data.error){
                    alert(res.data.error.message)
                }
                else{
            const commentToAdd={commentBody:newComment,username:res.data.username}
            setComments([...comments,commentToAdd])
            setNewComment('')
                }
        })
    }

    const deleteComment =(id)=>{
        axios.delete(`http://localhost:3001/comments/${id}`,{
            headers:{
                accessToken: localStorage.getItem("accessToken")
            }
        }).then(()=>{
            setComments(comments.filter((val)=>{
                return val.id !== id
            }))
        })
    }

    const deletePost =(id)=>{
        axios.delete(`http://localhost:3001/posts/${id}`,{
            headers:{
                accessToken: localStorage.getItem("accessToken")
            }
        })
        .then((res)=>{
            history.push('/')
        })
    }
    const editPost =(opt)=>{
        if(opt==="title"){
            let newTitle = prompt("New Title :")
            axios.put(`http://localhost:3001/posts/title`,{
            newTitle:newTitle,id:id},{
                headers:{
                    accessToken: localStorage.getItem("accessToken")
                }
            })
            setpostObject({...postObject,title:newTitle})

        }else{
            let newText = prompt("New Text :")
            axios.put(`http://localhost:3001/posts/body`,{
                newText:newText,id:id},{
                    headers:{
                        accessToken: localStorage.getItem("accessToken")
                    }
                })
                setpostObject({...postObject,postText:newText})
        }
    }

    return ( 

            <div className="postPage">
                <div className="leftSide">
                    <div className="post" id="individual">
                        <div className="title" onClick={()=>{
                            if(authState.username===postObject.username){
                            editPost("title")}
                        }}>{postObject.title}</div>
                        <div className="body" onClick={()=>{
                            if(authState.username===postObject.username){
                            editPost("body")}
                        }}>{postObject.postText}</div>
                        <div className="footer">
                            {postObject.username}
                            {authState.username ===postObject.username &&(
                        <button onClick={()=>{deletePost(postObject.id)}}>Delete Post</button>
                            )}
                        </div>
                    </div>
                </div>
                <div className="rightSide">
                    <div className="addCommentContainer">
                        <input type="text" 
                        placeholder="Comment..." 
                        onChange={(event)=>{setNewComment(event.target.value)}}
                        value={newComment} />
                        <button onClick={addComment}>Add Comment</button>
                    </div>
                    <div className="listOfComments">
                        {comments.map((comment , key)=>{
                            return(
                                <div className="comment" key={key}>
                                    {comment.commentBody}
                                    <label >   | By :{comment.username}</label>
                                    {authState.username === comment.username && (
                                    <button onClick={()=>{deleteComment(comment.id)}}>X</button>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
     );
}
 
export default Post;