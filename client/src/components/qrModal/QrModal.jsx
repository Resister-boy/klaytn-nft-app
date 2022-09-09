import React, { useContext } from "react";
import QRCode from "qrcode.react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Form, Button, Modal } from "react-bootstrap";
import { ModalContext } from "../../context/ModalContext";
import ModalButton from "../modalButton/ModalButton";

export default function QrModal() {
  // Modal
  const { showModal, setShowModal, modalPrefference, modalInputRef, qrvalue } = useContext(ModalContext);

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
        <ModalButton buttonName={modalPrefference.kasButton} onClickFunction={modalPrefference.onClickKas} color="#278ef5" />
        <ModalButton buttonName={modalPrefference.klipButton} onClickFunction={modalPrefference.onClickKlip} color="#278ef5" />
        <ModalButton buttonName={modalPrefference.confirmButton} onClickFunction={modalPrefference.onConfirm} color="#278ef5" />
        <ModalButton buttonName="close" onClickFunction={() => { setShowModal(false) }} color="#494d52" />
      </Modal.Footer>
    </Modal>
  );
}