import { createContext, useState } from 'react';

const INITIAL_STATE = {
	user: undefined,
	setUser: () => { },
	myAddress: undefined,
	setMyAddress: () => { },
	networkVersion: undefined,
	myBlance: undefined,
	setMyBalance: () => { },
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState("");
	const [myAddress, setMyAddress] = useState("0x000000000000");
	const [myBalance, setMyBalance] = useState(0);

	return (
		<AuthContext.Provider
			value={{
				user: user,
				setUser: setUser,
				myAddress: myAddress,
				setMyAddress: setMyAddress,
				myBalance: myBalance,
				setMyBalance: setMyBalance,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
