import React from "react";
import QRCode from "qrcode.react";
import "bootstrap/dist/css/bootstrap.min.css";
import './qrModal.css';
import { Container, Form, Button, Modal } from "react-bootstrap";

export default function QrModal(props) {
	const {componentProps} = props;
	// User
	const myAddress = componentProps.myAddress; 

	// Modal
	const showModal = componentProps.showModal;
	const setShowModal = componentProps.setShowModal;
	const modalProps = componentProps.modalProps;
	const modalInputRef = componentProps.modalInputRef;
	const qrvalue = componentProps.qrvalue; 

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
			<Modal.Header style={{ display: "flex", justifyContent: "center", alignItems: "center", border: 0, opacity: 0.8 }}>
				<Modal.Title>{modalProps.title}</Modal.Title>
			</Modal.Header>
			<Modal.Body style={{ border: 0, opacity: 0.8 }}>
				<Container style={{ backgroundColor: "white", width: 200, height: 200, padding: 10 }} >
					<QRCode value={qrvalue} size={180} style={{ margin: "auto" }} />
				</Container>
				{modalProps.title === "Register" ?
					<Form style={{ padding: 20 }}>
						<Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
							<Form.Label>User name</Form.Label>
							<Form.Control
								type="name"
								placeholder=""
								autoFocus
								ref={modalInputRef}
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
						modalProps.onConfirm(myAddress, modalInputRef);
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