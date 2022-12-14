const { ethereum } = window;

export const ACTIONS = {
  WALLET_CONNECT: "wallet-connect",
  WALLET_DISCONNECT: "wallet-disconnect",
  UPDATE_USERNAME: "update-profile",
  GET_WALLET:"get-wallet"
};

export const initialRPCState = {
  userPublicAddress: "",
  isWalletConnected: false,
  userPPTTBalance: 0,
  userETHBalance: 0,
  username: "",
};

export const RPCReducer = (state, action) => {
  switch (action.type) {
    // @note connect wallet
    case ACTIONS.WALLET_CONNECT:
      return {
        ...state,
        userPublicAddress: action.payload.userPublicAddress,
        isWalletConnected: true,
        username: action.payload.username,
        userPPTTBalance: action.payload.userPPTTBalance,
        userETHBalance: action.payload.userETHBalance,
      };

    //   @note disconnect wallet
    case ACTIONS.WALLET_DISCONNECT:
      localStorage.removeItem("isRPCUserAuthenticated");
      localStorage.removeItem("rpcUserData");
      localStorage.removeItem("rpcUserExpiresAt");

      return { ...initialRPCState };

    case ACTIONS.UPDATE_USERNAME:
      return {
        ...state,
        username: action.payload.username,
      };
  }
};
