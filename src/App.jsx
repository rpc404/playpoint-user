import React from "react";
const Navbar = React.lazy(() => import("./components/Navbar"));
const Topbar = React.lazy(() => import("./components/Topbar"));
import { useRPCContext } from "./contexts/WalletRPC/RPCContext";
const PageRouters = React.lazy(() => import("./utils/Routers"));
const Footer = React.lazy(() => import("./components/Footer/index"));
const WalletSelection = React.lazy(() =>
  import("./components/WalletSelection")
);

import  {Orbis}  from "@orbisclub/orbis-sdk";
let orbis = new Orbis();

export default function App() {
  const [, dispatchRPCData] = useRPCContext();
  const [isAuthenticationDrawerOpen, setIsAuthenticationDrawerOpen] =
    React.useState(false);

  const toggleAuthenticationDrawer = () => {
    setIsAuthenticationDrawerOpen(true);
    document.body.style.overflowY = "hidden";
  };
  React.useEffect(() => {
    toggleAuthenticationDrawer;
  }, [isAuthenticationDrawerOpen]);

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
          type: (
            await import("./contexts/WalletRPC/RPCReducer")
          ).ACTIONS.WALLET_CONNECT,
          payload: data,
        });
        console.info(import.meta.env.VITE_ORBIS_GROUP)
        let g = await orbis.getGroup(import.meta.env.VITE_ORBIS_GROUP);
        console.log(g);
        // let res = await orbis.connect_v2({ 
        //   provider: window.ethereum,
        //   lit: true
        // });

        // /** Check if connection is successful or not */
        // if(res.status == 200) {
        //   console.log(res);
        //   // let res2 = await orbis.createPost({
        //   //   body: "gm!",
        //   //   context: "playpoint-app"
        //   // });
        //   // console.log(res2);
        // } else {
        //   console.log("Error connecting to Ceramic: ", res);
        //   alert("Error connecting to Ceramic.");
        // }

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
      <PageRouters socket={channel} toggleAuthenticationDrawer={toggleAuthenticationDrawer} />
      <div className="divider"></div>
      <Footer />
      
{/* 
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
      </div> */}
    </>
  );
}
