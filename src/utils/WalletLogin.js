import { ethers } from "ethers";
import { toast } from "react-toastify";
import { handleRPCWalletLogin, handleTRONWALLETLogin } from "./RPC";
import ERC20BasicAPI from "./ERC20BasicABI.json";
import { useRPCContext } from "../contexts/WalletRPC/RPCContext";

/**
 * @dev User wallet authentication
 */
export const handleWalletLogin = async (network) => {
  const [, dispatchRPCData] = useRPCContext();

  if (network === "arbitrum") {
    const resData = await handleRPCWalletLogin();
    const provider = new ethers.providers.Web3Provider(ethereum);
    const contract = new ethers.Contract(
      import.meta.env.VITE_BETA_PPTT_CONTRACT_ADDRESS,
      ERC20BasicAPI,
      provider
    );

    const ethBalance = await provider.getBalance(resData.userPublicAddress);
    const PPTTBalance = await contract.balanceOf(resData.userPublicAddress);

    const data = {
      ...resData,
      userPPTTBalance: ethers.utils.formatEther(PPTTBalance),
      userETHBalance: ethers.utils.formatEther(ethBalance),
    };

    localStorage.setItem("rpcUserData", JSON.stringify(resData));

    await dispatchRPCData({ type: ACTIONS.WALLET_CONNECT, payload: data });
    toast("Wallet Connected!");
  }

  if (network === "shasta") {
    const resData = await handleTRONWALLETLogin();

    const data = {
      ...resData,
      userPPTTBalance: 0,
      userETHBalance: 0,
    };

    localStorage.setItem("rpcUserData", JSON.stringify(resData));

    await dispatchRPCData({ type: ACTIONS.WALLET_CONNECT, payload: data });
    toast("Wallet Connected!");
  }
};
