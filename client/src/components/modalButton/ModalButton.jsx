import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Form, Button, Modal } from "react-bootstrap";

export default function ModalButton({ buttonName, onClickFunction, color }) {
  if (!buttonName)
    return (null);
  return (
    <Button
      variant="primary"
      onClick={() => {
        onClickFunction()
      }}
      style={{ backgroundColor: color, borderColor: color }}
    >
      {buttonName}
    </Button>
  );
}