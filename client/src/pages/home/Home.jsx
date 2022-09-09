import React from "react";
import { useNavigate } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import { Alert } from "react-bootstrap";
import { useContext } from "react";

import './home.css';
import Feed from "../../components/feed/Feed";
import { AuthContext } from "../../context/AuthContext";

export default function Home() {
	const navigate = useNavigate();
	// User
	const { user, myBalance } = useContext(AuthContext);

	return (
		<div className="App">
			<div style={{ padding: 10 }}>	
				<div style={{ fontSize: 30, fontWeight: "bold", paddingLeft: 5, marginTop: 10, }}>
					{user.username} 지갑
					<br />
					{user ? <button style={{borderRadius: 10}} onClick={() => {navigate("/user")}}>My Posts</button> : null}
				</div>
				<br />
				<Alert
					variant={"balance"}
					style={{ backgroundColor: "#278ef5", fontSize: 25 }}
				>
					{myBalance}
				</Alert>
			</div>
			<div className="homeContainer">
				<Feed />
			</div>
		</div>
	);
}