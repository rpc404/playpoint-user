const { ethereum } = window;

export const ACTIONS = {
  WALLET_CONNECT: "wallet-connect",
  WALLET_DISCONNECT: "wallet-disconnect",
};

export const initialRPCState = {
  userPublicAddress: "",
  isWalletConnected: false,
  userPPTTBalance: 0,
  userETHBalance: 0,
};

export const RPCReducer = (state, action) => {
  switch (action.type) {
    // @note connect wallet
    case ACTIONS.WALLET_CONNECT:
      return {
        ...state,
        userPublicAddress: action.payload.userPublicAddress,
        isWalletConnected: true,
      };

    //   @note disconnect wallet
    case ACTIONS.WALLET_DISCONNECT:
      localStorage.removeItem("isRPCUserAuthenticated");
      localStorage.removeItem("rpcUserData");
      localStorage.removeItem("rpcUserExpiresAt");

      return { ...initialRPCState };
  }
};
