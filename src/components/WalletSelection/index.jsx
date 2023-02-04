import { Button } from "@mui/material";
import { formatEther, BrowserProvider, Contract } from "ethers";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useRPCContext } from "../../contexts/WalletRPC/RPCContext";
import { ACTIONS } from "../../contexts/WalletRPC/RPCReducer";
import { handleRPCWalletLogin, handleTRONWALLETLogin } from "../../utils/RPC";
import "./styles/style.css";

export default function WalletSelection({ setIsAuthenticationDrawerOpen }) {
  const navigate = useNavigate();
  const [
    { isWalletConnected, username, userPublicAddress, network },
    dispatchRPCData,
  ] = useRPCContext();
  const [loading, setLoading] = React.useState(false);

  const handleWalletDrawer = () => {
    setIsAuthenticationDrawerOpen(false);
    document.body.style.overflowY = "scroll";
  };

  const handleWalletLogin = async (network) => {
    if (network === "arbitrum") {
      setLoading(true);
      const resData = await handleRPCWalletLogin();
      const provider = new BrowserProvider(ethereum);
      const contract = new Contract(
        import.meta.env.VITE_BETA_PPTT_CONTRACT_ADDRESS,
        await import("../../utils/ERC20BasicABI.json"),
        provider
      );

      const ethBalance = await provider.getBalance(resData.userPublicAddress);
      const PPTTBalance = await contract.balanceOf(resData.userPublicAddress);

      const data = {
        ...resData,
        userPPTTBalance: formatEther(PPTTBalance),
        userETHBalance: formatEther(ethBalance),
        isNonWalletUser: false,
      };

      localStorage.setItem("rpcUserData", JSON.stringify(resData));

      await dispatchRPCData({ type: ACTIONS.WALLET_CONNECT, payload: data });
      toast("Wallet Connected!");
      handleWalletDrawer();
      setLoading(false);
    }

    if (network === "shasta") {
      setLoading(true);
      const data = await handleTRONWALLETLogin();
      if (data.isWalletConnected) {
        await dispatchRPCData({ type: ACTIONS.WALLET_CONNECT, payload: data });
        handleWalletDrawer();
        setLoading(false);
      }
    }
  };

  return (
    <div className="walletSelection__container">
      <div className="walletSelectionItems__container">
        <div className="header">
          <h2>Authentication Methods</h2>
          <Button onClick={() => handleWalletDrawer()}>❌</Button>
        </div>

        <p>Choose any one option from below.</p>

        <div className="wallets">
          <Button onClick={() => handleWalletLogin("arbitrum")}>
            🦊 Metamask
          </Button>
          <Button onClick={() => handleWalletLogin("shasta")}>
            👛 TronLink
          </Button>
          <Button
            onClick={() => {
              handleWalletDrawer(), navigate("/signin");
            }}
          >
            ✉️ Email
          </Button>
        </div>

        <p>
          ⚠️ We don't redirect the page, except sign in request to wallet for
          wallet authentication. Beware of phising attacks.
        </p>
      </div>
    </div>
  );
}
