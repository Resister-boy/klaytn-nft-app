import React from "react";
import { useNavigate } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import { Alert } from "react-bootstrap";

import './home.css';
import Feed from "../../components/feed/Feed";
import LoginModal from "../../components/loginModal/LoginModal";

export default function Home(props) {
	const {componentProps} = props;
	const navigate = useNavigate();

	// User
	const user = componentProps.user;
	const myBalance = componentProps.myBalance;

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
				<LoginModal componentProps={componentProps}></LoginModal>	
			</div>
			<div className="homeContainer">
				<Feed />
			</div>
		</div>
	);
}