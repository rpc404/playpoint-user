const { ethereum } = window;

export const handleRPCLogin = async (dispatch) => {
  try {
    if (typeof ethereum !== "undefined") {
      console.log("MetaMask is installed!");

      const userAddress = await ethereum.request({
        method: "eth_requestAccounts",
      });

      if (ethereum.isMetaMask)
        console.log("Other EVM Compatible Wallets not detected!");
      else console.log("Other EVM Compatible wallets maybe installed!");

      const tempRpcData = {
        rpcAccountAddress: userAddress[0],
        isWalletSet: true,
      };

      const currentDate = new Date();
      currentDate.setTime(currentDate.getTime() + 6 * 60 * 60 * 1000);

      localStorage.setItem("rpcUserData", JSON.stringify(tempRpcData));
      localStorage.setItem("isRPCUserAuthenticated", true);
      localStorage.setItem("rpcExpiresAt", currentDate);

      dispatch(tempRpcData);
    } else alert("Metamask is not installed!");
  } catch (error) {
    console.error(error);
  }
};

export const handleRPCLogout = (dispatch) => {
  localStorage.removeItem("isRPCUserAuthenticated");
  localStorage.removeItem("rpcUserData");

  dispatch({
    rpcAccountAddress: "",
    isWalletSet: false,
  });
};
