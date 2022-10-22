import { Link, navigate } from "@reach/router";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Item = (props) => {
	const { item_id, list_id } = props;
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [quantity, setQuantity] = useState("");
	const [list, setList] = useState("");

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
		axios
			.get(`http://localhost:8000/api/items/${item_id}/lsid/${list_id}`, {
				withCredentials: true,
			})
			.then((res) => {
				setName(res.data.item.name);
				setQuantity(res.data.item.quantity);
				setDescription(res.data.item.description);
			})
			.catch((err) => {
				console.log(err);
			});
	},[]);
	return (
		<div>
			<h6 className="return">
				<Link to="/dash">Return to DashBoard</Link>
			</h6>
			<div className="display-main">
				<div className="details">
					<h3>Name of Item:</h3>
					<div className="descriptionWrapper">{name}</div>
					<div className="quantitySection">
						<h3>Quantity of Item:</h3>
						<div className="descriptionWrapper">{quantity}</div>
					</div>
					<div className="descriptionSection">
						<h3>Description of Item:</h3>
						<p className="descriptionWrapper">{description}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Item;
