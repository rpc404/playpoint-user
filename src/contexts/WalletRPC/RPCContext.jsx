import React from "react";
import { initialRPCState, RPCReducer } from "./RPCReducer";

const RPCContext = React.createContext();

export const RPCProvider = ({ children }) => {
  const [rpcData, dispatchRPCData] = React.useReducer(RPCReducer, initialRPCState);

  return (
    <RPCContext.Provider value={[rpcData, dispatchRPCData]}>
      {children}
    </RPCContext.Provider>
  );
};

export const useRPCContext = () => React.useContext(RPCContext);