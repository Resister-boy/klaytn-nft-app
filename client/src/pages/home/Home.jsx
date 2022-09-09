import React from "react";
import { useNavigate } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import { Alert } from "react-bootstrap";
import { useRef, useState, useContext } from "react";

import './home.css';
import Feed from "../../components/feed/Feed";
import LoginModal from "../../components/loginModal/LoginModal";
import { AuthContext } from "../../context/AuthContext";

const DEFAULT_QR_CODE = "DEFAULT";

export default function Home() {
	const navigate = useNavigate();

	// User
	const { user, myBalance } = useContext(AuthContext);

	// Modal
	const [showModal, setShowModal] = useState(false);
	const [modalPrefference, setModalPrefference] = useState({
		title: "Login",
		buttonName: "login",
		onConfirm: () => { },
	});
	const [qrvalue, setQrvalue] = useState(DEFAULT_QR_CODE);
	const modalInputRef = useRef();

	const modalProps = {
		showModal: showModal, setShowModal: setShowModal,
		modalPrefference: modalPrefference, setModalPrefference: setModalPrefference,
		qrvalue: qrvalue, setQrvalue: setQrvalue,
		modalInputRef: modalInputRef
	}

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
				<LoginModal modalProps={modalProps} />
			</div>
			<div className="homeContainer">
				<Feed />
			</div>
		</div>
	);
}