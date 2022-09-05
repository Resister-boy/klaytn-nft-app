import React, { useState, useEffect } from "react";
import QRCode from "qrcode.react";
import * as CaverAPI from "../../api/UseCaver";
import * as KlipAPI from "../../api/UseKlip";
import "bootstrap/dist/css/bootstrap.min.css";
import './market.css';
import { Alert, Container, Form, Button, Modal } from "react-bootstrap";
import axios from "axios";

const DEFAULT_QR_CODE = "DEFAULT";
const DEFAULT_ADDRESS = "0x0000000000000000";

export default function Market() {
	// User
	const [myBalance, setMyBalance] = useState("0");
	const [myAddress, setMyAddress] = useState(DEFAULT_ADDRESS)
	const [myName, setMyName] = useState("");
	const [qrvalue, setQrvalue] = useState(DEFAULT_QR_CODE);

	// Modal
	const [showModal, setShowModal] = useState(false);
	const [modalInput, setModalInput] = useState("");
	const [modalProps, setModalProps] = useState({
		title: "Modal",
		buttonName: "close",
		onClick: () => { },
	});

	const registerUser = async (address, username) => {
		const response = await axios.post("/auth/register", { walletAddress: address, username: username })
			.catch(function (error) {
				if (error.response) {
					alert("server error");
					return ;
				}
			})
		if (response && response.data && response.data.username)
		{
			alert(response.data.username);
			setMyName(response.data.username);
			setShowModal(false);
		}
	}

	const getUserData = () => {
		KlipAPI.getAddress(setQrvalue, async (address) => {
			const response = await axios.post("/auth/login", { walletAddress: address })
				.catch(function (error) {
					if (error.response && error.response.status === 404) {
						alert("회원가입이 필요합니다.");
					}
					else if (error.response) {
						alert("server error");
					}
				})
			setMyAddress(address);
			const _balance = await CaverAPI.getBalance(address);
			setMyBalance(_balance);
			if (response && response.data && response.data.username)
			{
				setMyName(response.data.username);
				setShowModal(false);
			}
			else
			{
				setModalProps({
					title: "Register",
					buttonName: "sign up",
					onClick: (address, username) => {
						registerUser(address, username);
					}
				});
			}
		});
		setModalProps({
			title: "Login",
			buttonName: "close",
			onClick: () => {
				setShowModal(false);
			},
		});
	}

	useEffect(() => {
		getUserData();
		setShowModal(true);
	}, []);

	return (
		<div className="App">
			<div style={{ backgroundColor: "black", padding: 10 }}>
				<div style={{ fontSize: 30, fontWeight: "bold", paddingLeft: 5, marginTop: 10, }}>{myName} 지갑</div>
				<br />
				<Alert
					variant={"balance"}
					style={{ backgroundColor: "#f40075", fontSize: 25 }}
					onClick={getUserData}>{myBalance}
				</Alert>
				<Modal
					centered
					size="sm"
					show={showModal}
					onHide={() => {
						setShowModal(false);
					}}
				>
					<Modal.Header
						style={{ display: "flex", justifyContent: "center", alignItems: "center", border: 0, backgroundColor: "black", opacity: 0.8 }}
					>
						<Modal.Title>{modalProps.title}</Modal.Title>
					</Modal.Header>
					<Modal.Body
						style={{ border: 0, backgroundColor: "black", opacity: 0.8 }}
					>
						<Container style={{ backgroundColor: "white", width: 200, height: 200, padding: 10 }} >
							<QRCode value={qrvalue} size={180} style={{ margin: "auto" }} />
						</Container>
						{modalProps.title === "Register" ?
							<Form style={{ padding: 20 }}>
								<Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
									<Form.Label>Wallet address</Form.Label>
									<Form.Control
										type="wallet"
										placeholder={myAddress}
										autoFocus
										disabled
									/>
									<Form.Label>User name</Form.Label>
									<Form.Control
										type="name"
										placeholder=""
										onChange={e => setModalInput(e.target.value)}
										autoFocus
									/>
								</Form.Group>
							</Form> : null
						}
					</Modal.Body>
					<Modal.Footer
						style={{ display: "flex", justifyContent: "center", alignItems: "center", border: 0, backgroundColor: "black", opacity: 0.8 }}
					>
						<Button
							variant="primary"
							onClick={() => {
								modalProps.onClick(myAddress, modalInput);
								setShowModal(false);
							}}
							style={{ backgroundColor: "#810034", borderColor: "#810034" }}
						>
							{ modalProps.buttonName }
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
		</div>
	);
}