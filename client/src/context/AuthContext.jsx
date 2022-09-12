import { createContext, useState } from 'react';

const INITIAL_STATE = {
  user: undefined,
  setUser: () => { },
  myAddress: undefined,
  setMyAddress: () => { },
  networkVersion: undefined,
  myBlance: undefined,
  setMyBalance: () => { },
  DEFAULT_ADDRESS: "",
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const DEFAULT_ADDRESS = "0x0000000000000000";
  const [user, setUser] = useState("");
  const [myAddress, setMyAddress] = useState(DEFAULT_ADDRESS);
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
        DEFAULT_ADDRESS: DEFAULT_ADDRESS,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
