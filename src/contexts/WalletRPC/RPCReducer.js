export const ACTIONS = {
  WALLET_CONNECT: "wallet-connect",
  WALLET_DISCONNECT: "wallet-disconnect",
  UPDATE_USERNAME: "update-profile",
  GET_WALLET: "get-wallet",
  GET_NETWORK: "get-network",
};

export const initialRPCState = {
  userPublicAddress: "",
  isWalletConnected: false,
  userPPTTBalance: 0,
  userETHBalance: 0,
  username: "",
  network: "",
  isNonWalletUser:false,

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
        network: action.payload.network,
        isNonWalletUser: action.payload.network
      };

    //   @note disconnect wallet
    case ACTIONS.WALLET_DISCONNECT:
      localStorage.removeItem("isRPCUserAuthenticated");
      localStorage.removeItem("rpcUserData");
      localStorage.removeItem("rpcUserExpiresAt");
      localStorage.clear();
      return { ...initialRPCState };

    case ACTIONS.UPDATE_USERNAME:
      return {
        ...state,
        username: action.payload.username,
      };
  }
};
