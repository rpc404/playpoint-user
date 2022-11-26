import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "remixicon/fonts/remixicon.css";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { RPCProvider } from "./contexts/WalletRPC/RPCContext";
import { MarketplaceProvider } from "./contexts/Marketplace/MarketplaceContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <RPCProvider>
      <MarketplaceProvider>
        <App />
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </MarketplaceProvider>
    </RPCProvider>
  </BrowserRouter>
);
