import { toast } from "react-toastify";
import { setProfile } from "../api/Profile";
// import { useNavigate } from "react-router-dom";
const { ethereum } = window;

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

export const getPPTTBalance = async (userAddress) => {};

if (typeof ethereum !== "undefined") {
  // @note - This is the main function that will be called from the frontend on account change on metamask
  ethereum.on("accountsChanged", async (accounts) => {
    const tempRpcData = {
      userPublicAddress: accounts[0],
      isWalletConnected: true,
      username: "",
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
    window.location.reload();
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

  if (!tronExists) {
    alert("Please login into Tronlink wallet extension!");
    return null;
  }

  const tempRpcData = {
    userPublicAddress: "",
    isWalletConnected: true,
    username: "",
    network: "shasta",
  };

  let tronWeb;
  if (window.tronLink.ready) {
    tronWeb = tronLink.tronWeb;
  } else {
    const res = await tronLink.request({ method: "tron_requestAccounts" });
    if (res.code === 200) {
      tronWeb = tronLink.tronWeb;
    } else {
      return toast("Tronlink not installed!");
    }
  }

  await setProfile({ data: tempRpcData }).then((res) => {
    tempRpcData.username = res.data.profile.username;
    tempRpcData.userPublicAddress = tronWeb.defaultAddress.base58;
  });

  const currentDate = new Date();
  currentDate.setTime(currentDate.getTime() + 6 * 60 * 60 * 1000);
  localStorage.setItem("rpcUserData", JSON.stringify(tempRpcData));
  localStorage.setItem("isRPCUserAuthenticated", true);
  localStorage.setItem("rpcUserExpiresAt", currentDate);
  return tempRpcData;
};
