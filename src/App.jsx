import React from "react";
import Navbar from "./components/Navbar";
import Topbar from "./components/Topbar";
import { useRPCContext } from "./contexts/WalletRPC/RPCContext";
import { ACTIONS } from "./contexts/WalletRPC/RPCReducer";
import PageRouters from "./utils/Routers";

export default function App() {
  const [, dispatchRPCData] = useRPCContext();

  const [channel, setChannel] = React.useState({});

  React.useEffect(() => {
    (async () => {
     
      const expiryDate = new Date(localStorage.getItem("rpcUserExpiresAt"));
      if (
        localStorage.getItem("isRPCUserAuthenticated") &&
        expiryDate.getTime() > Date.now()
      ) {
        const data = JSON.parse(localStorage.getItem("rpcUserData"));
        await dispatchRPCData({
          type: ACTIONS.WALLET_CONNECT,
          payload: data,
        });
      }
    })();
  }, [dispatchRPCData]);

  return (
    <>
      <Topbar />
      <Navbar />
      <PageRouters socket={channel} />
    </>
  );
}
