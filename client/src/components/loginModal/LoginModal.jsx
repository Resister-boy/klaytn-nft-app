import React, { useState, useEffect } from "react";
import QRCode from "qrcode.react";
import * as CaverAPI from "../../api/UseCaver";
import * as KlipAPI from "../../api/UseKlip";
import "bootstrap/dist/css/bootstrap.min.css";
import './loginModal.css';
import { Alert, Container, Form, Button, Modal } from "react-bootstrap";
import axios from "axios";

const DEFAULT_QR_CODE = "DEFAULT";
const DEFAULT_ADDRESS = "0x0000000000000000";

export default function LoginModal(props) {
	const {componentProps} = props;

	// User
	const user = componentProps.user;
	const setUser = componentProps.setUser;
	const setMyBalance = componentProps.setMyBalance;
	const myAddress = componentProps.myAddress;
	const setMyAddress = componentProps.setMyAddress;

	// Modal
	const [modalInput, setModalInput] = useState("");
	const [qrvalue, setQrvalue] = useState(DEFAULT_QR_CODE);
	const showModal = componentProps.showModal;
	const setShowModal = componentProps.setShowModal;
	const modalProps = componentProps.modalProps;
	const setModalProps = componentProps.setModalProps; 

	const registerUser = async (address, username) => {
		const response = await axios.post("/auth/register", { walletAddress: address, username: username })
			.catch(function (error) {
				if (error.response) {
					alert("server error");
					return ;
				}
			})
		if (response && response.data)
		{
			alert(response.data.username);
			setUser(response.data);
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
			if (response && response.data)
			{
				setUser(response.data);
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
		if (!user)
		{
			getUserData();
			setShowModal(true);
		}
	}, []);

	return (
		<Modal
			centered
			size="sm"
			show={showModal}
			onHide={() => {
				setShowModal(false);
			}}
			style={{ border: 0 }}
		>
			<Modal.Header
				style={{ display: "flex", justifyContent: "center", alignItems: "center", border: 0, opacity: 0.8 }}
			>
				<Modal.Title>{modalProps.title}</Modal.Title>
			</Modal.Header>
			<Modal.Body
				style={{ border: 0, opacity: 0.8 }}
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
				style={{ display: "flex", justifyContent: "center", alignItems: "center", border: 0, opacity: 0.8 }}
			>
				<Button
					variant="primary"
					onClick={() => {
						modalProps.onClick(myAddress, modalInput);
						setShowModal(false);
					}}
					style={{ backgroundColor: "#278ef5", borderColor: "#278ef5" }}
				>
					{modalProps.buttonName}
				</Button>
			</Modal.Footer>
		</Modal>
	);
}