import { createContext, useState, useRef } from 'react';

const INITIAL_STATE = {
  showModal: false,
  setShowModal: () => { },
  qrvalue: undefined,
  setQrvalue: () => { },
  modalPrefference: {
    title: "Modal",
    buttonName: "button",
    onConfirm: () => {
    }
  },
  setModalPrefference: () => { },
  DEFAULT_ADDRESS: "0x0000000000000000",
  DEFAULT_QR_CODE: "DEFAULT",
}

export const ModalContext = createContext(INITIAL_STATE);

export const ModalContextProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const DEFAULT_QR_CODE = "DEFAULT";
  const [qrvalue, setQrvalue] = useState(DEFAULT_QR_CODE);
  const [modalPrefference, setModalPrefference] = useState({
    title: "Modal",
    buttonName: "button",
    onConfirm: () => {
    }
  });
  const modalInputRefusername = useRef("");
  const modalInputReftokenIdHead = useRef("");
  const modalInputReftokenIdTail = useRef("");
  

  return (
    <ModalContext.Provider
      value={{
        showModal: showModal,
        setShowModal: setShowModal,
        qrvalue: qrvalue,
        setQrvalue: setQrvalue,
        modalPrefference: modalPrefference,
        setModalPrefference: setModalPrefference,
        modalInputRefusername: modalInputRefusername,
        modalInputReftokenIdHead: modalInputReftokenIdHead,
        modalInputReftokenIdTail: modalInputReftokenIdTail,
        DEFAULT_QR_CODE: DEFAULT_QR_CODE,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
