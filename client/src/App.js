
import './App.css';
import {BrowserRouter as Router,Route,Switch,Link} from 'react-router-dom'
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Login from './pages/Login';
import Register from './pages/Register';
import {AuthContext} from './helpers/AuthContext'
import {useState,useEffect} from "react"
import axios from 'axios';
import PageNotFound from './pages/PageNotFound';
import Profile from './pages/Profile';



function App() {

  const [authState,setauthState] = useState({
    username:"",
    id:0,
    status:false})


  useEffect(()=>{
  
      axios.get('http://localhost:3001/auth/auth',{
        headers:{
          accessToken:localStorage.getItem('accessToken')
        }
      }).then((res)=>{
    if(res.data.error){
      setauthState({...authState,status:false})

    }else{
         setauthState({
          username:res.data.username,
          id:res.data.id,
          status:true})
    }
      })
  },[])

  const logout=()=>{
    localStorage.removeItem('accessToken')
    setauthState(
      {
        username:"",
        id:"",
        status:false}
    )
    window.location.pathname = "/login"


  }

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState,setauthState }}>
        <Router>
        <div className="navbar">
            <div className="links">
              {!authState.status ? (
                <>
                  <Link to="/login"> Login</Link>
                  <Link to="/register"> Register</Link>
                </>
              ) : (
                <>
                  <Link to="/"> Home Page</Link>
                  <Link to="/createpost"> Create A Post</Link>
                </>
              )}
            </div>
            <div className="loggedInContainer">
              <h1>{authState.username} </h1>
              {authState.status && <button onClick={logout}> Logout</button>}
            </div>
          </div>
              <Switch>
                <Route path='/' exact component={Home}/>
                <Route path='/createpost' exact component={CreatePost}/>
                <Route path='/post/:id' exact component={Post}/>
                <Route path='/login' exact component={Login}/>
                <Route path='/register' exact component={Register}/>
                <Route path='/profile/:id' exact component={Profile}/>
                <Route path='*' exact component={PageNotFound}/>
              </Switch>

        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
