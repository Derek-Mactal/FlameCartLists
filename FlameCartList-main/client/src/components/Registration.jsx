import { useEffect, useState } from "react";
import axios from "axios";
import { navigate, Link } from "@reach/router";
import Cookies from "js-cookie";

export default (props) => {
	useEffect(() => {
		if (Cookies.get().hasOwnProperty("name")) {
			navigate("/dash");
		}
	}, []);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errname, errName] = useState("");
	const [erremail, errEmail] = useState("");
	const [errusername, errUsername] = useState("");
	const [errpassword, errPassword] = useState("");
	const [errconfirmPassword, errConfirmPassword] = useState("");
	const errdict = {
		name: errName,
		email: errEmail,
		username: errUsername,
		password: errPassword,
		confirmPassword: errConfirmPassword,
	};
	const submit = async (e) => {
		e.preventDefault();
		let user = { name, email, username, password, confirmPassword };
		console.log(user);
		try {
			let res = await axios.post("http://localhost:8000/api/users", user, {
				withCredentials: true,
			});
			console.log(res);
			console.log("success");
			props.redraw();
			navigate("/dash");
		} catch (e) {
			console.log(e.response);
			let edic = e.response.data.error.errors;
			for (let x in edic) {
				console.log(edic[x].message);
				errdict[x](edic[x].message);
			}
		}
	};
	let errstyle = {
		color: "red",
		fontSize: "10px",
		flexBasis: "100%",
	};
	return (
		<>
			<form className="form" onSubmit={submit}>
				<h2>Register</h2>
				<div className="formSection" style={{ flexWrap: "wrap" }}>
					<p style={errstyle}>{errname}</p>
					<label>Name: </label>
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div className="formSection" style={{ flexWrap: "wrap" }}>
					<p style={errstyle}>{erremail}</p>
					<label>Email: </label>
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className="formSection" style={{ flexWrap: "wrap" }}>
					<p style={errstyle}>{errusername}</p>
					<label>Username: </label>
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>
				<div className="formSection" style={{ flexWrap: "wrap" }}>
					<p style={errstyle}>{errpassword}</p>
					<label>Password: </label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div className="formSection" style={{ flexWrap: "wrap" }}>
					<p style={errstyle}>{errconfirmPassword}</p>
					<label>Confirm Password: </label>
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
				</div>
				<div className="buttonSection">
					<input style={{marginBottom:"10px"}} type="submit" value="Submit" />
				</div>
				<Link
					style={{ color: "white", textDecorationLine: "none" }}
					to="/login"
				>
					Login to your account instead
				</Link>
			</form>
		</>
	);
};
