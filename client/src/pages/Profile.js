import {useParams,useHistory} from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'



const Profile = () => {

    let {id} = useParams()
    let history = useHistory()
    const [userName,setuserName] = useState("")
    const [listOfPosts,setListOfPosts] = useState([])

    useEffect(()=>{

        axios.get(`http://localhost:3001/auth/basicinfo/${id}`)
        .then((res)=>{
            setuserName(res.data.username)
        })
        axios.get(`http://localhost:3001/posts/byuserid/${id}`)
        .then((res)=>{
            setListOfPosts(res.data)
        })

    },[])

    return ( 
        <div className="profilePageContainer">
            <div className="basicInfo">
                <h1>{userName}</h1>
            </div>
            <div className="listOfPosts">
            {listOfPosts.map((value,key)=>{
            return( 
            <div className="post" key={key}>
              <div className='title'> {value.title}</div>
              <div className='body'  onClick={()=>{history.push(`/post/${value.id}`)}}> {value.postText}</div>
              <div className='footer'> 
              <div className="username">{value.username}</div>
              {/* <button onClick={()=>{likePost(value.id)}}>Like</button> */}
              <div className="buttons">

                <label >{value.Likes.length}</label>
              </div>

              </div>
             
            </div>)
        })}
            </div>
        </div>
     );
}
 
export default Profile;
