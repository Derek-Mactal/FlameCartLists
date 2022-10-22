import { Link, navigate } from "@reach/router";
import axios from "axios";
import { useEffect, useState } from "react";
import FlameCart from "./images/FlameCart.png";

const NewListForm = () => {
	const [newListName, setNewListName] = useState("");
	const [newListCategory, setNewListCategory] = useState("");

	///////////////////////////////////ERROR MESSAGES\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
	const [newListNameError, setNewListNameError] = useState("");
	const [newListCategoryError, setNewListCategoryError] = useState("");
	const createNewListErrorMessages = {
		name: setNewListNameError,
		category: setNewListCategoryError,
	};
	///////////////////////////////////////////////////////////////////////////////////////
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

	const onCreate = (e) => {
		e.preventDefault();

		axios
			.post(
				"http://localhost:8000/api/lists",
				{
					name: newListName,
					category: newListCategory,
				},
				{ withCredentials: true },
			)
			.then((res) => {
				console.log("I'm New List Form Response Data", res.data);
				navigate("/dash");
			})

			.catch((e) => {
				console.log(e.response);
				let edic = e.response.data.error.errors;
				for (let x in edic) {
					console.log(edic.message);
					createNewListErrorMessages[x](edic[x].message);
				}
			});

		const newListFields = (newListName, newListCategory);
		if (newListFields.length >= 2) {
			//clears input after submit
			setNewListName("");
			setNewListCategory("");
			navigate("/dash");
		}
	};
	/////////////////////////test code for getting list by logged in user
	const getLists = async () => {
		console.log("gettinglists");
		let res = await axios.get("http://localhost:8000/api/lists", {
			withCredentials: true,
		});
		console.log(res);
	};

	let errstyle = {
		color: "red",
		fontSize: "10px",
	};
	return (
		<>
			{" "}
			<h6 className="return">
				<Link to="/dash">Return to Dashboard</Link>
			</h6>
			<form onSubmit={onCreate} className="create-new-list-form">
				<h2>Create A List</h2>
				<p style={errstyle}>{newListNameError}</p>
				<div className="create-new-list-form-section">
					<input
						type="text"
						placeholder="List Name"
						onChange={(e) => setNewListName(e.target.value)}
						value={newListName}
					/>
				</div>

				<p style={errstyle}>{newListCategoryError}</p>
				<div className="create-new-list-form-section">
					<input
						type="text"
						placeholder="Category"
						onChange={(e) => setNewListCategory(e.target.value)}
						value={newListCategory}
					/>
				</div>

				<div className="flame-cart-div" >
					<img className="create-new-list-button-section"
						onClick={onCreate}
						src={FlameCart}
						id="FlameCartImg"
						
					/>
					{/* <input type="submit" value="Create" /> */}
				</div>
			</form>
		</>
	);
};

export default NewListForm;
