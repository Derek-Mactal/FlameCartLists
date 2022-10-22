import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { Link, navigate} from "@reach/router";

const EditItem = props => {

    const {item_id, list_id} = props

    const [thisItemName, setThisItemName] = useState("")
    const [thisItemDescription, setThisItemDescription] = useState("")
    const [thisItemQuantity, setThisItemQuantity] = useState(0)
    const [thisListId, setThisListId] = useState("")
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
        axios.get(`http://localhost:8000/api/items/${item_id}/lsid/${list_id}`, {withCredentials: true})
            .then(res => {
                console.log(res.data.item)
                setThisItemName(res.data.item.name)
                setThisItemDescription(res.data.item.description)
                setThisItemQuantity(res.data.item.quantity)
                setThisListId(res.data.item.list)
            })
            .catch(err => console.log(err))

        axios.get(`http://localhost:8000/api/lists/${list_id}`, { withCredentials: true })
            .then(res => {
                console.log(res.data.list)
                setList(res.data.list)
            })
            .catch(err => console.log(err))
    }, [])

    const onEdit = (e) => {
		e.preventDefault();
        const updatedItem = {
            "name": thisItemName,
            "description": thisItemDescription,
            "quantity": thisItemQuantity,
            "list": thisListId
        }
        axios.put(`http://localhost:8000/api/items/${item_id}/lsid/${list_id}`, updatedItem, {withCredentials: true})
            .then(res => {
                console.log(res)
                navigate("/item");
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
            <form onSubmit={onEdit} className="form">
                <h2>Edit {thisItemName} in {list.name}</h2>
                {err.map((e, i) => <p key={i} style={{color:"red", fontSize: "10px"}}>{e}</p>)}
                <div className="formSection">
                    <label>Item Name: </label>
                    <input type="text" onChange={(e) => setThisItemName(e.target.value)} value={thisItemName}/>
                </div>
                <div className="formSection">
                    <label>Quantity: </label>
                    <input type="number" onChange={(e) => setThisItemQuantity(e.target.value)} value={thisItemQuantity}/>
                </div>
                <div className="formSection">
                    <label>Description: </label>
                    <textarea onChange={(e) => setThisItemDescription(e.target.value)} value={thisItemDescription}/>
                </div>
                <div className="buttonSection">
                    <button onClick={()=>{
                        navigate(`/list/${list_id}`)
                    }} >Cancel</button>
                    <input type="submit" value="Submit"/>
                </div>
            </form>
        </>

    )

}
export default EditItem;