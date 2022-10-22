import { Link, navigate } from "@reach/router";
import axios from 'axios';
import React, { useEffect, useState } from "react";


const Item = (props) => {
    const [list, setList] = useState("");

    useEffect(async ()=>{
        try {
            let res= await axios.get(`http://localhost:8000/api/lists/${props.list_id}`, { withCredentials: true })
            console.log(res)
            setList(res.data.list)
            // setList()
        }
        catch(err){
            console.log(err)
            navigate('/dash')
        }
    },[])
    console.log(props)
    return (

        <div >
            <h6 className="return">
                <Link to="/dash">Return to DashBoard</Link>
            </h6>
            <div className="share-a-list">
                <div>
                    <h3>Share {list.name}</h3>
                    <h3>Send the following link to a friend to share the list</h3>
                    <p className="descriptionWrapper">{`${props.location.origin}/share/recieve/${list._id}`}</p>
                </div>
            </div>
        </div>
    )
}

export default Item;