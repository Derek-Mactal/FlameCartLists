import { navigate } from "@reach/router";
import axios from "axios";
import { useEffect } from "react";

export default (props)=>{
    const logout = async () => {
        console.log('logout')
        let res=await axios.get('http://localhost:8000/api/users/logout',{ withCredentials: true })
        props.redraw()
        console.log(res)
        navigate('/login')
    }
    useEffect(()=>{
        logout();
    },[])
    return(
        <></>
    )
}