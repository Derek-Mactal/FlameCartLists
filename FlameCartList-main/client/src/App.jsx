import "./App.css";
import FlameCart from './components/FlameCart.png'
import { Link, navigate, Redirect, Router } from "@reach/router";
import Cookies from 'js-cookie';
import Login from "./components/Login";
import Registration from "./components/Registration";
import Dash from "./components/Dash";
import List from "./components/List";
import Item from "./components/Item";
import AddItem from "./components/AddItem";
import EditItem from "./components/EditItem";
import NewListForm from "./components/NewListForm";
import Share from './components/Share'
import Recieve from './components/Recieve'
import About from './components/About'
import Contact from './components/Contact'

import axios from "axios";
import { useState } from "react";
import Logout from "./components/Logout";
function App() {
    const [cookies,setCookies]=useState(Cookies.get())
    const redraw=()=>{
        setCookies(Cookies.get())
    }
    console.log(Cookies.get())
    const logout = async (e) => {
        // e.preventDefault();
        // console.log('logout')
        // let res=await axios.get('http://localhost:8000/api/users/logout',{ withCredentials: true })
        // redraw()
        // console.log(res)
        // navigate('/login')
        navigate('/logout')
    }
    return (
        <div className="App">
            {/* ///////////////////MAIN HEADER STUFF\\\\\\\\\\\\\\ */}
            <div className="main-header">
                <div className="main-header-left">
                    <h1>FlameCart Lists<img src={FlameCart} id='FlameCartImg' style={{height:'50px', marginBottom:'-10px', marginLeft:'20px'}}/></h1>
                </div>
                <div className="main-header-right">
                    <p>
                        {
                            cookies.hasOwnProperty('name')&&<><Link  style={{color:"white"}}  className="main-header-link" to="/dash">Welcome {cookies.name}!</Link> | <a  style={{color:"white"}}  className="main-header-link" href="#" onClick={logout}> log out </a></>
                        }
                    </p>
                </div>
            </div>
            {/* ////////////////////////////////////////////////// */}
            <Router>
                <Redirect from='/*' to='/login' noThrow/>
                <Login path="/login" redraw={redraw}/>
                <Registration path="/register" redraw={redraw}/>
                <Logout path='/logout' redraw={redraw}/>
                <Dash path="/dash" />
                <NewListForm path="/newlist" />
                <List path="/list/:list_id" />
                <Item path="/item/:item_id/listid/:list_id" />
                <AddItem path="/list/additem/:list_id" />
                <EditItem path="/list/edititem/:item_id/listid/:list_id" />
                <Recieve path='/share/recieve/:list_id'/>
                <Share path='/share/:list_id'/>
                <About path='/about'/>
                <Contact path='/contact'/>
            </Router>
        </div>
    );
}

export default App;
