import React, { useState, useEffect } from "react";
import QRCode from "qrcode.react";
import * as CaverAPI from "../../api/UseCaver";
import * as KlipAPI from "../../api/UseKlip";
import "bootstrap/dist/css/bootstrap.min.css";
import './myModal.css';
import { Alert, Container, Form, Button, Modal } from "react-bootstrap";
import axios from "axios";
import Feed from "../../components/feed/Feed";

const DEFAULT_QR_CODE = "DEFAULT";
const DEFAULT_ADDRESS = "0x0000000000000000";

export default function MyModal() {
	// User
	const [qrvalue, setQrvalue] = useState(DEFAULT_QR_CODE);

	// Modal
	const [showModal, setShowModal] = useState(false);
	const [modalInput, setModalInput] = useState("");
	const [modalProps, setModalProps] = useState({
		title: "Modal",
		buttonName: "close",
		onClick: () => { },
	});

	useEffect(() => {
		getUserData();
		setShowModal(true);
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
				<Form style={{ padding: 20 }}>
					<Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
						<Form.Label>To Address</Form.Label>
						<Form.Control
							type="address"
							autoFocus
							onChange={e => setModalInput(e.target.value)}
						/>
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer
				style={{ display: "flex", justifyContent: "center", alignItems: "center", border: 0, opacity: 0.8 }}
			>
				<Button
					variant="primary"
					onClick={() => {
						modalProps.onClick(modalInput);
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