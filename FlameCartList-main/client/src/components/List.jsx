import { Link, navigate } from "@reach/router";
import axios from 'axios';
import React, { useEffect, useState } from "react";

const List = (props) => {
    // List Attributes
    const { list_id } = props;
    const [ name, setName ] = useState("");
    // const [ authorizedUsers, setAuthorizedUsers] = useState([]);
    const [ category, setCategory ] = useState("");
    const [ items, setItems] = useState([]);
    

    //Item Attributes
    // const {itemId} = items; 
    // const [itemName, setItemName] = useState("");
    // const [description, setDescription] = useState("");
    // const [quantity, setQuantity] = useState("");
    // const [list, setList] = useState("");

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
    
    const getListItems=async ()=>{
        try{
            let res= await axios.get(`http://localhost:8000/api/items/lsid/${list_id}`,{ withCredentials: true })
            console.log(res)
            setItems(res.data.item)
        }
        catch(e){
            console.log(e)
        }
    }
    useEffect(async ()=>{
        axios.get('http://localhost:8000/api/lists/' + list_id, { withCredentials: true })
        .then(res=>{
            setName(res.data.list.name)
            // setAuthorizedUsers(res.data.list.authorizedUsers)
            setCategory(res.data.list.category)
            // setItems(res.data.list.items)
            console.log(res.data.list.items.name)
        })
        .catch(err=>{
            console.log(err)
        })
        getListItems()
    }, [])

    // console.log("this is id" + itemId)
    // useEffect(()=>{
    //     axios.get('http://localhost:8000/api/items/' + itemId)
    //     .then(res=>{
    //         setItemName(res.data.item.name)
    //         setAuthorizedUsers(res.data.item.authorizedUsers)
    //         setCategory(res.data.item.category)
    //         setItems(res.data.item.items)

    //     })
    // }, [])
    return (
        <>
            <h6 className="return">
                <Link to="/dash">Return to Dashboard</Link>
            </h6>
            <div className="form">
                <h3>{name}</h3>
                <h5>Category: {category}</h5>
                <table>
                    <thead>
                        <tr className="list">
                            <th>List Item</th>
                            <th>Quantity</th>
                            <th>Added On</th>
                            <th>Complete</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item,i)=><ItemLs key={i} item={item} list_id={list_id} update={getListItems}/>)}
                    </tbody>
                </table>
                <div className="buttonWrapper">
                    <button onClick={()=>{
                        navigate(`/list/additem/${list_id}`)
                    }} className="addButton">Add item to list</button>
                    <button className="shareButton" onClick={()=>navigate(`/share/${list_id}`)}>Share List</button>
                </div>
            </div>
        </>
    );
};

export default List;

const ItemLs=(props)=>{
    let date=new Date(Date.parse(props.item.createdAt))
    console.log(date)
    // console.log("this is the item id"+ props.item._id);
    // console.log("this is the list it belong to"+ props.item.list)
    const updateCheck= async (e)=>{
        let item={...props.item}
        item.completed=e
        try{
            let res= await axios.put(`http://localhost:8000/api/items/${props.item._id}/lsid/${props.list_id}`, item, {withCredentials: true})
            console.log(res)
            props.update()
        }
        catch(e){
            console.log(e)
        }
    }
    const remove= async (e)=>{
        try{
            let res= await axios.delete(`http://localhost:8000/api/items/${props.item._id}/lsid/${props.list_id}`, {withCredentials: true})
            console.log(res)
            props.update()
        }
        catch(e){
            console.log(e)
        }
    }
    return (
        <tr className="listBorder">
            <td><Link style={{color:"white", textDecorationLine:"none"}} to={`/item/${props.item._id}/listid/${props.list_id}`}>{props.item.name}</Link></td>
            <td>{props.item.quantity}</td>
            <td>{date.toDateString()}</td>
            <td><input type="checkbox" name="complete" id="complete" checked={props.item.completed} onChange={(e)=>updateCheck(e.target.checked)}/></td>
            <td>
                <button onClick={()=>{
                    navigate(`/list/edititem/${props.item._id}/listid/${props.item.list}`)
                    }} className="completeButton">Edit</button>
                <button className="removeButton" onClick={remove}>Remove</button>
            </td>
        </tr>
    )
}