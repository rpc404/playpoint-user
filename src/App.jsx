import React from "react";
import Navbar from "./components/Navbar";
import Topbar from "./components/Topbar";
import { useRPCContext } from "./contexts/WalletRPC/RPCContext";
import { ACTIONS } from "./contexts/WalletRPC/RPCReducer";
import PageRouters from "./utils/Routers";
import Footer from "./components/Footer/index";
import WalletSelection from "./components/WalletSelection";

export default function App() {
  const [, dispatchRPCData] = useRPCContext();
  const [isAuthenticationDrawerOpen, setIsAuthenticationDrawerOpen] =
  React.useState(false);

  const toggleAuthenticationDrawer = () => {
    setIsAuthenticationDrawerOpen(true);
    document.body.style.overflowY = "hidden";
  };

  const [channel] = React.useState({});

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
      {/* <WalletSelection /> */}
      {isAuthenticationDrawerOpen && (
        <WalletSelection
          setIsAuthenticationDrawerOpen={setIsAuthenticationDrawerOpen}
        />
      )}
      <Topbar />
      <Navbar toggleAuthenticationDrawer={toggleAuthenticationDrawer}/>
      <PageRouters socket={channel} />
      <div className="divider"></div>
      <Footer />

      <div className="snowflakes" aria-hidden="true">
        <div className="snowflake">❅</div>
        <div className="snowflake">❆</div>
        <div className="snowflake">❅</div>
        <div className="snowflake">❆</div>
        <div className="snowflake">❅</div>
        <div className="snowflake">❆</div>
        <div className="snowflake">❅</div>
        <div className="snowflake">❆</div>
        <div className="snowflake">❅</div>
        <div className="snowflake">❆</div>
        <div className="snowflake">❅</div>
        <div className="snowflake">❆</div>
        <div className="snowflake">❆</div>
        <div className="snowflake">❅</div>
        <div className="snowflake">❆</div>
        <div className="snowflake">❅</div>
        <div className="snowflake">❆</div>
        <div className="snowflake">❅</div>
        <div className="snowflake">❆</div>
      </div>
    </>
  );
}
