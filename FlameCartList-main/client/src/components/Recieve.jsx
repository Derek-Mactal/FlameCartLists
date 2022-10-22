import { Link, navigate } from "@reach/router";
import axios from 'axios';
import React, { useEffect, useState } from "react";
import FlameCart from "./images/FlameCart.png";


const Item = (props) => {
    const [list, setList] = useState("");

    useEffect(async ()=>{
        try {
            let res= await axios.get(`http://localhost:8000/api/rec/${props.list_id}`, { withCredentials: true })
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
    const recieve=async ()=>{
        try{
            console.log('recieve')
            let res= await axios.get(`http://localhost:8000/api/share/${list._id}`, { withCredentials: true })
            console.log(res)
            navigate('/dash')
        }
        catch(err){
            console.log(err)
        }
    }
    return (

        <div >
            <h6 className="return">
                <Link to="/dash">Return to DashBoard</Link>
            </h6>
            <div className="display-main">
                <div className="details">
                    <h3>Recieve {list.name}</h3>
                    <h3>Click the button to recieve the list</h3>
                    <div className="flame-cart-div" >
                        <img className="create-new-list-button-section"
                            onClick={recieve}
                            src={FlameCart}
                            id="FlameCartImg"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Item;