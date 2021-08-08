import axios from 'axios'
import {useEffect,useState,useContext } from 'react'
import {Link, useHistory} from 'react-router-dom'
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import { AuthContext } from "../helpers/AuthContext";

const Home = () => {

    
  const [listOfPosts,setlistOfPosts]=useState([])
  const [likedPosts,setlikedPosts]=useState([])
  const { authState } = useContext(AuthContext);
  let history = useHistory()

  useEffect(()=>{
    if(!localStorage.getItem('accessToken')){
      history.push('/login')
    }else{
          axios
    .get("http://localhost:3001/posts",{
      headers:{ accessToken:localStorage.getItem('accessToken') }
    })
    .then((res)=>{
      setlistOfPosts(res.data.listOfPosts)
      setlikedPosts(res.data.likedPosts.map((like)=>{
        return like.postId
      }))

    })
    }




  },[])

  const likePost =(postId) =>{
    axios
    .post("http://localhost:3001/likes",
    {PostId:postId},
    {
      headers:{
        accessToken:localStorage.getItem('accessToken')
      }
    }).then((res)=>{
      setlistOfPosts(listOfPosts.map((post)=>{
        if(post.id === postId){
          if(res.data.liked){
            return {...post,Likes:[...post.Likes,0]}
          }else{
            const likesArray = post.Likes
            likesArray.pop()
            return {...post,Likes:likesArray}
          }
         
        }else{
          return post
        }
      }))
      if(likedPosts.includes(postId)){
        setlikedPosts(likedPosts.filter((id)=>{
          return id !=postId
        }))
      }else{
        setlikedPosts([...likedPosts,postId])
      }
    })
  }

    return ( 
        <div>
        {listOfPosts.map((value,key)=>{
            return( 
            <div className="post" key={key}>
              <div className='title'> {value.title}</div>
              <div className='body'  onClick={()=>{history.push(`/post/${value.id}`)}}> {value.postText}</div>
              <div className='footer'> 
              <div className="username">
                <Link to={`/profile/${value.UserId}`}>
                {value.username}
                </Link>
                
                </div>
              {/* <button onClick={()=>{likePost(value.id)}}>Like</button> */}
              <div className="buttons">

                <ThumbUpAltIcon 
                onClick={()=>{likePost(value.id)}} 
                className={likedPosts.includes(value.id) ? "unlikeBttn" : "likeBttn"}
                />
                
            

                <label >{value.Likes.length}</label>
              </div>

              </div>
             
            </div>)
        })}
        </div>
     );
}
 
export default Home;