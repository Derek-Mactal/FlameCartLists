import { useEffect, useState } from "react"
import axios from 'axios'
import { Link, navigate } from "@reach/router"
import Cookies from 'js-cookie';

export default (props)=>{
    useEffect(()=>{
        if(Cookies.get().hasOwnProperty('name')){
            navigate('/dash')
        }
    },[])
    const [username, setUsername]=useState('')
    const [password, setPassword]=useState('')
    const [err, seterr]=useState('')
    const submit=async (e)=>{
        e.preventDefault()
        let user={username,password}
        console.log(user)
        try{
            let res= await axios.post("http://localhost:8000/api/users/login",user,{ withCredentials: true })
            console.log(res)
            console.log('success')
            props.redraw()
            navigate('/dash')
        }
        catch(e){
            console.log(e.response)
            seterr(e.response.data.message)
        }
    }
    let errstyle={
        color:'red',
        fontSize:'10px',
        flexBasis:'100%'
    }
    return (
        <>
            <form className="form" onSubmit={submit}>
                <h2>Login</h2>
                <div className="formSection" style={{flexWrap:'wrap'}}>
                    <p style={errstyle}>{err}</p>
                    <label>Username: </label>
                    <input type="text" value={username}  onChange={e=>setUsername(e.target.value)}/>
                </div>
                <div className="formSection" style={{flexWrap:'wrap'}}>
                    <label>Password: </label>
                    <input type="password" value={password}  onChange={e=>setPassword(e.target.value)}/>
                </div>
                <div className="buttonSection">
                    <input style={{marginBottom:"10px"}} type="submit" value="Submit"/>
                </div>
                <link rel="stylesheet" href=""/>
                <Link style={{ color: "white", textDecorationLine: "none" }} to="/register">Register a new Account</Link>
            </form>
        </>
    )
}
