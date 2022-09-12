import React, { useContext } from "react";
import QRCode from "qrcode.react";
import { Container, Form, Modal } from "react-bootstrap";
import { ModalContext } from "../../context/ModalContext";
import ModalButton from "../modalButton/ModalButton";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function QrModal() {
  // Modal
  const { showModal, setShowModal, modalPrefference, modalInputRefusername, modalInputReftokenIdHead, modalInputReftokenIdTail, qrvalue } = useContext(ModalContext);

  return (
    <Modal
      show={showModal}
      onHide={() => { setShowModal(false) }}
      size="sm"
      centered
    >
      <div style={{ backgroundColor: "black", border: "1px solid #00ffff", color: "white", borderRadius: "5px" }}>
        <Modal.Header style={{ display: "flex", justifyContent: "center", border: "none" }}>
          <Modal.Title>{modalPrefference.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ display: "flex", justifyContent: "center", border: "none" }}>
          <Container style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ backgroundColor: "white", width: "160", height: "160", padding: 5 }}>
              <QRCode value={qrvalue} size={150} style={{ margin: "auto", backgroundColor: "white" }} />
            </div>
          </Container>
        </Modal.Body>
        <Modal.Footer style={{ display: "flex", justifyContent: "center", alignItems: "center", border: "none" }}>
          {modalPrefference.title === "Register" ?
            <Form>
              <Form.Group>
                <Form.Label>
                  User name
                </Form.Label>
                <Form.Control
                  type="name"
                  autoFocus
                  ref={modalInputRefusername}
                  style={{border: "none", height: "25px"}}
                />
                <Form.Label>
                  Write Accessable TokenId (first)
                </Form.Label>
                <Form.Control
                  type="name"
                  autoFocus
                  ref={modalInputReftokenIdHead}
                  style={{border: "none", height: "25px"}}
                />
                <Form.Label>
                  Write Accessable TokenId (last)
                </Form.Label>
                <Form.Control
                  type="name"
                  autoFocus
                  ref={modalInputReftokenIdTail}
                  style={{border: "none", height: "25px"}}
                />
              </Form.Group>
            </Form> : null
          }
          <ModalButton buttonName={modalPrefference.kasButton} onClickFunction={modalPrefference.onClickKas} />
          <ModalButton buttonName={modalPrefference.klipButton} onClickFunction={modalPrefference.onClickKlip} />
          <ModalButton buttonName={modalPrefference.confirmButton} onClickFunction={modalPrefference.onConfirm} />
          <ModalButton buttonName="close" onClickFunction={() => { setShowModal(false) }} />
        </Modal.Footer>
      </div>
    </Modal>
  );
}