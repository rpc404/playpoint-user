import React from "react";
import Navbar from "./components/Navbar";
import Topbar from "./components/Topbar";
import PageRouters from "./utils/Routers";
import { handleRPCLogin, handleRPCLogout } from "./utils/RPC";
const { ethereum } = window;

export default function App() {
  /**
   * @dev Web3 Authentication Modules
   */
  const [rpcData, setRPCData] = React.useState({
    rpcAccountAddress: "",
    isWalletSet: false,
  });

  React.useEffect(() => {
    const isUserAuthenticated = localStorage.getItem("isRPCUserAuthenticated");

    if (isUserAuthenticated) {
      const rpcData = localStorage.getItem("rpcUserData");
      const rpcDataExpiresAt = localStorage.getItem("rpcExpiresAt");
      const parsedData = JSON.parse(rpcData);

      const currentDate = new Date();
      if (currentDate > new Date(rpcDataExpiresAt)) handleRPCLogin(setRPCData);
      else setRPCData(parsedData);
    }
  }, []);

  if (typeof window.ethereum !== "undefined")
    ethereum.on("accountsChanged", (accounts) => {
      const tempRpcData = {
        rpcAccountAddress: accounts[0],
        isWalletSet: true,
      };

      localStorage.setItem("rpcUserData", JSON.stringify(tempRpcData));
      localStorage.setItem("isRPCUserAuthenticated", true);
      setRPCData(tempRpcData);
    });
  else
    alert(
      "Consider using Metamask Extension on browsers, or use Metamask Phone."
    );

  /**
   *************************************************************************************************
   */

  return (
    <>
      <Topbar />
      <Navbar
        rpcAPI={{
          rpcData,
          handleLogin: () => handleRPCLogin(setRPCData),
          handleLogout: () => handleRPCLogout(setRPCData),
        }}
      />
      <PageRouters />
    </>
  );
}
