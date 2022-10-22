import { Link, navigate } from "@reach/router";
import { useEffect, useState } from "react";
import axios from "axios";

const Dash = () => {
	const [UserLists, setLists] = useState([]);

	const updateLists = async () => {
		console.log("gettinglists");
		try {
			let res = await axios.get("http://localhost:8000/api/lists", {
				withCredentials: true,
			});
			console.log(res);
			setLists(res.data.list);
		} catch (e) {
			console.log(e);
		}
	};
	useEffect(async () => {
		try {
			let res = await axios.get("http://localhost:8000/api/users/auth", {
				withCredentials: true,
			});
			console.log(res);
			updateLists();
		} catch (e) {
			console.log(e.response);
			if (e.response.status === 401) {
				navigate("/logout");
			}
		}
	}, []);

	const ulssort = (a, b) => {
		if (a.category > b.category) return 1;
		if (a.category < b.category) return -1;
		return 0;
	};

	return (
		<div className="dashboard-main-wrapper">
			<h1 className="dashboard-main-list-header">
				My Lists{" "}
				
			</h1>

			<div className="dashboard-sub-wrapper">
				{UserLists.sort(ulssort).map((list, i) => (
					<MiniList key={i} list={list} />
				))}
			</div>

			<button
				className="dashboard-create-btn"
				onClick={() => {
					navigate("/newlist");
				}}
				type="submit"
			>
				Create New List
			</button>
			

			<div className="dashboard-contact-wrapper">
				<Link style={{color:"white", textDecorationLine:"none"}} to="/contact">Contact Us</Link>
				<Link style={{color:"white", textDecorationLine:"none"}} to="/about">About Us</Link>
			</div>
		</div>
	);
};

export default Dash;

const MiniList = (props) => {
	console.log("I'm props", props.list);
	const [items, setItems] = useState([]);
	const getListItems = async () => {
		try {
			let res = await axios.get(
				`http://localhost:8000/api/items/lsid/${props.list._id}`,
				{ withCredentials: true },
			);
			console.log(res);
			setItems(res.data.item.slice(0, 4));
		} catch (e) {
			console.log(e);
		}
	};
	useEffect(() => {
		getListItems();
	}, []);
	return (
		<div className="dashboard-list-content-wrapper">
			<Link
				className="dashboard-list-header-link"
				to={`/list/${props.list._id}`}
			>
				{" "}
				<h3 className="dashboard-list-header">{props.list.name}</h3>
			</Link>
			<div className="dashboard-list-content">
				<h5>Category: {props.list.category}</h5>
				{items.map((item, i) => (
					<ListItms key={i} item={item} list_id={props.list._id} />
				))}
			</div>
		</div>
	);
};

const ListItms = (props) => {
	return (
		<div className="dashboard-list-content-items" >
			<li>
				<Link style={{color:"white", textDecorationLine:"none"}} to={`/item/${props.item._id}/listid/${props.list_id}`}>
					{props.item.name}
				</Link>
			</li>
		</div>
	);
};
