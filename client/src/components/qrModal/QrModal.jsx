import React, { useContext } from "react";
import QRCode from "qrcode.react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Form, Button, Modal } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";

export default function QrModal(props) {
	// Modal
	const { modalProps } = props;
	const { showModal, setShowModal, modalPrefference, modalInputRef, qrvalue } = modalProps;

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
				<Modal.Title>{modalPrefference.title}</Modal.Title>
			</Modal.Header>
			<Modal.Body style={{ border: 0, opacity: 0.8 }}>
				<Container style={{ backgroundColor: "white", width: 200, height: 200, padding: 10 }} >
					<QRCode value={qrvalue} size={180} style={{ margin: "auto" }} />
				</Container>
				{modalPrefference.title === "Register" ?
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
						modalPrefference.onConfirm();
					}}
					style={{ backgroundColor: "#278ef5", borderColor: "#278ef5" }}
				>
					{modalPrefference.buttonName}
				</Button>
				<Button
					variant="primary"
					onClick={() => {
						setShowModal(false);
					}}
					style={{ backgroundColor: "#494d52", borderColor: "#494d52" }}
				>
					close
				</Button>
			</Modal.Footer>
		</Modal>
	);
}