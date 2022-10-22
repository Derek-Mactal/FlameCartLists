import { Link, navigate} from "@reach/router";
import axios from "axios";
import React, { useState, useEffect } from 'react';

const AddItem = props => {

    const {list_id} = props

    const [itemName, setItemName] = useState("")
    const [itemDescription, setItemDescription] = useState("")
    const [itemQuantity, setItemQuantity] = useState(1)
    const [list, setList] = useState({})
    const [err, setErr] = useState([])

    useEffect(async () => {
		try {
			let res = await axios.get("http://localhost:8000/api/users/auth", {
				withCredentials: true,
			});
			console.log(res);
		} catch (e) {
			console.log(e.response);
			if (e.response.status === 401) {
				navigate("/logout");
			}
		}
	}, []);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/lists/${list_id}`, { withCredentials: true })
            .then(res => {
                console.log(res.data.list)
                setList(res.data.list)
            })
            .catch(err => console.log(err))
    },[])

    const onAdd = (e) => {
		e.preventDefault();

        const newItem = {
            "name": itemName,
            "description": itemDescription,
            "quantity": itemQuantity,
            "list": list_id
        }

        console.log(newItem)

        axios.post(`http://localhost:8000/api/items/lsid/${list_id}`, newItem,{ withCredentials: true })
            .then(res => {
                console.log(res)
                navigate(`/list/${list_id}`);
            })
            .catch(err => {
                console.log(err.response)
                const errResponse = err.response.data.error.errors
                const errorArr = []
                for (const key of Object.keys(errResponse)) {
                    errorArr.push(errResponse[key].message)
                }
                setErr(errorArr)
            })
	};

    return(

        <>
            <h6 className="return">
                <Link to="/dash">Return to Dashboard</Link>
            </h6>
            <form onSubmit={onAdd} className="form">
                <h2>Add item to: {list.name}</h2>
                {err.map((e, i) => <p key={i} style={{color:"red", fontSize: "10px"}}>{e}</p>)}
                <div className="formSection">
                    <label>Item Name: </label>
                    <input type="text" onChange={(e) => setItemName(e.target.value)} />
                </div>
                <div className="formSection">
                    <label>Quantity: </label>
                    <input type="number" onChange={(e) => setItemQuantity(e.target.value)} />
                </div>
                <div className="formSection">
                    <label>Description: </label>
                    <textarea onChange={(e) => setItemDescription(e.target.value)} />
                </div>
                <div className="buttonSection">
                    <button onClick={()=>{
                        navigate(`/list/${list_id}`)
                    }}>Cancel</button>
                    <input type="submit" value="Submit"/>
                </div>
            </form>
        </>

    )

}
export default AddItem;