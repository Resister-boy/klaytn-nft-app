import React from "react";
import styles from "./ModalButton.module.scss";

export default function ModalButton({ buttonName, onClickFunction }) {
  if (!buttonName)
    return (null);
  return (
    <div className={styles.container}>
      <button
        variant="primary"
        className={styles.modalButton}
        onClick={() => {
          onClickFunction()
        }}
      >
        {buttonName}
      </button>
    </div>
  );
}