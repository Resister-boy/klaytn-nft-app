import React from "react";
import { Button } from "react-bootstrap";
import styles from "./ModalButton.module.scss";

export default function ModalButton({ buttonName, onClickFunction }) {
  if (!buttonName)
    return (null);
  return (
    <div className={styles.container}>
      <Button
        variant="primary"
        className={styles.modalButton}
        onClick={() => {
          onClickFunction()
        }}
      >
        {buttonName}
      </Button>
    </div>
  );
}