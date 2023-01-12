import React from "react";
import { toast } from "react-toastify";
import { setProfile } from "../api/Profile";
import { useRPCContext } from "../contexts/WalletRPC/RPCContext";
import { ACTIONS } from "../contexts/WalletRPC/RPCReducer";
const { ethereum } = window;
const nonWallet = localStorage.getItem("isNonWalletUser");

export const handleRPCWalletLogin = async () => {
  // const navigate = useNavigate()
  try {
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0xAA36A7" }],
    });
  } catch (switchError) {
    // This error code indicates that the chain has not been added to MetaMask.
    if (switchError.code === 4902) {
      toast.error("Looks like we need to add sepolia test network.");
      try {
        await ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0xAA36A7",
              chainName: "Sepolia Testnet",
              rpcUrls: ["https://sepolia.infura.io/v3/"] /* ... */,
              nativeCurrency: {
                name: "Sepolia",
                symbol: "ETH",
                decimals: 18,
              },
              blockExplorerUrls: ["https://sepolia.etherscan.io"],
              iconUrls: ["https://ethereum.org/en/"],
            },
          ],
        });
      } catch (addError) {
        console.log(addError);
      }
    }
  }

  try {
    if (typeof ethereum !== "undefined") {
      const userAddress = await ethereum.request({
        method: "eth_requestAccounts",
      });

      if (ethereum.isMetaMask)
        console.log(
          "Metamask Says: Other EVM Compatible Wallets not detected!"
        );
      else
        console.log(
          "Metamask Says: Other EVM Compatible wallets maybe installed!"
        );

      const tempRpcData = {
        userPublicAddress: userAddress[0],
        isWalletConnected: true,
        username: "",
        network: "arbitrum",
        isNonWalletUser:false,
      };
      if (userAddress[0]) {
        await setProfile({ data: tempRpcData }).then((res) => {
          tempRpcData.username = res.data.profile.username;
        });
      }
      const currentDate = new Date();
      currentDate.setTime(currentDate.getTime() + 6 * 60 * 60 * 1000);
      localStorage.setItem("rpcUserData", JSON.stringify(tempRpcData));
      localStorage.setItem("isRPCUserAuthenticated", true);
      localStorage.setItem("rpcUserExpiresAt", currentDate);
      return tempRpcData;
    } else navigate("signin?ref=nometamask");
  } catch (error) {
    console.error(error);
  }
};

const url = window.location.protocol+"//"+window.location.host+window.location.pathname

// export const getPPTTBalance = async (userAddress) => {};

if (typeof ethereum !== "undefined" && !nonWallet) {
  // @note - This is the main function that will be called from the frontend on account change on metamask
  ethereum.on("accountsChanged", async (accounts) => {
    const tempRpcData = {
      userPublicAddress: accounts[0],
      isWalletConnected: true,
      username: "",
      network:"arbitrum"
    };
    if (accounts[0]) {
      await setProfile({ data: tempRpcData }).then((res) => {
        tempRpcData.username = res.data.profile.username;
      });
    }
    const currentDate = new Date();
    currentDate.setTime(currentDate.getTime() + 6 * 60 * 60 * 1000);
    localStorage.setItem("rpcUserData", JSON.stringify(tempRpcData));
    localStorage.setItem("isRPCUserAuthenticated", true);
    localStorage.setItem("rpcUserExpiresAt", currentDate);
    console.log(url)
    window.location.assign(url+"?ref=switchAccount")
  });
  ethereum.on("chainChanged", (chainId) => {
    window.location.reload();
  });
}

export const handleTRONWALLETLogin = async () => {
  let tronExists = new Promise((resolve, reject) => {
    let attempts = 0,
      maxAttempts = 1000;
    const checkTron = () => {
      if (window.tronWeb) {
        resolve(true);
        return;
      }
      attempts++;
      if (attempts >= maxAttempts) {
        reject(false);
        return;
      }
      setTimeout(checkTron, 100);
    };
    checkTron();
  });

  
  const tempRpcData = {
    userPublicAddress: "",
    isWalletConnected: false,
    username: "",
    network: "shasta",
    isNonWalletUser:false
  };
  
  if (!tronExists) {
    alert("Please login into Tronlink wallet extension!");
    return tempRpcData;
  }

  let tronWeb;
  if (window.tronLink.ready) {
    tronWeb = tronLink.tronWeb;
  } else {
    const res = await tronLink.request({ method: "tron_requestAccounts" });
    if (res.code === 200) {
      tronWeb = tronLink.tronWeb;
    } else {
      return toast("Make sure tronlink is unlocked!");
    }
  }

  await setProfile({ data: tempRpcData }).then((res) => {
    tempRpcData.username = res.data.profile.username;
  });
  tempRpcData.userPublicAddress = tronWeb.defaultAddress.base58;
  tempRpcData.isWalletConnected =true;
  const currentDate = new Date();
  currentDate.setTime(currentDate.getTime() + 6 * 60 * 60 * 1000);
  localStorage.setItem("rpcUserExpiresAt", currentDate);
  localStorage.setItem("isRPCUserAuthenticated", true);
  localStorage.setItem("rpcUserData", JSON.stringify(tempRpcData));
  
  return tempRpcData;
};
