import React, { useContext } from "react";
import QRCode from "qrcode.react";
import { Container, Form, Modal } from "react-bootstrap";
import { ModalContext } from "../../context/ModalContext";
import ModalButton from "../modalButton/ModalButton";
import styles from './QrModal.module.scss';

export default function QrModal() {
  // Modal
  const { showModal, setShowModal, modalPrefference, modalInputRef, qrvalue } = useContext(ModalContext);

  return (
    <Modal
      show={showModal}
      onHide={() => {setShowModal(false)}}
      className={styles.container}
    >
      <Modal.Header className={styles.titleContainer}>
        <Modal.Title className={styles.title}>{modalPrefference.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.bodyContainer}>
        <Container className={styles.qrContainer}>
          <div style={{backgroundColor: "white", width: "160", height: "160", padding: 5}}>
          <QRCode value={qrvalue} size={150} style={{ margin: "auto", backgroundColor: "white"}} />
          </div>
        </Container>
        {modalPrefference.title === "Register" ?
          <Form className={styles.inputContainer}>
            <Form.Group>
              <Form.Label className={styles.inputTitle}>
                User name
              </Form.Label>
              <Form.Control
                type="name"
                className={styles.inputItem}
                autoFocus
                ref={modalInputRef}
              />
            </Form.Group>
          </Form> : null
        }
      </Modal.Body>
      <Modal.Footer className={styles.footerContainer}>
        <ModalButton buttonName={modalPrefference.kasButton} onClickFunction={modalPrefference.onClickKas} color="#278ef5" />
        <ModalButton buttonName={modalPrefference.klipButton} onClickFunction={modalPrefference.onClickKlip} color="#278ef5" />
        <ModalButton buttonName={modalPrefference.confirmButton} onClickFunction={modalPrefference.onConfirm} color="#278ef5" />
        <ModalButton buttonName="close" onClickFunction={() => { setShowModal(false) }} color="#494d52" />
      </Modal.Footer>
    </Modal>
  );
}