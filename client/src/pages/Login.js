import { useState,useContext} from "react"
import axios from "axios"
import {useHistory} from "react-router-dom"
import { AuthContext } from "../helpers/AuthContext"


const Login = () => {
    
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const {setauthState} = useContext(AuthContext)

    let history = useHistory()

  const login=()=>{
      const data={username:username,password:password}
        axios.post('http://localhost:3001/auth/login',data)
        .then((res)=>{
            if(res.data.error){
                 alert(res.data.error)
            }else{
                localStorage.setItem("accessToken",res.data.token)
                setauthState({username:res.data.username,id:res.data.id,status:true})
                history.push("/")
            }
            
        })
  }

    return ( 
        <div className="loginContainer">
            <label >Username</label>
            <input type="text"  onChange={(event)=>{setUsername(event.target.value)}}/>
            <label >Password</label>
            <input type="password" onChange={(event)=>{setPassword(event.target.value)}} />
            <button onClick={login}>Login</button>
        </div>
     );
}
 
export default Login;