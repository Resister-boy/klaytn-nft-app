import { createContext, useState } from 'react';

const INITIAL_STATE = {
	showModal: false,
	setShowModal: () => { },
	qrvalue: undefined,
	setQrvalue: () => { },
	modalProps: {
		title: "Modal",
		buttonName: "button",
		onConfirm: () => {
		}
	},
	setModalProps: () => { },
	DEFAULT_ADDRESS: "0x0000000000000000",
	DEFAULT_QR_CODE: "DEFAULT",
}

export const ModalContext = createContext(INITIAL_STATE);

export const ModalContextProvider = ({ children }) => {
	const [showModal, setShowModal] = useState(false);
	const [qrvalue, setQrvalue] = useState(DEFAULT_QR_CODE);
	const [modalProps, setModalProps] = useState({
		title: "Modal",
		buttonName: "button",
		onConfirm: () => {
		}
	});

	return (
		<ModalContext.Provider
			value={{
				showModal: showModal,
				setShowModal: setShowModal,
				qrvalue: qrvalue,
				setQrvalue: setQrvalue,
				modalProps: modalProps,
				setModalProps: setModalProps,
			}}
		>
			{children}
		</ModalContext.Provider>
	);
};
