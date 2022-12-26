export const ACTIONS = {
  SET_ALL_MARKETPLACE: "set-all-marrketplace",
  SET_MARKETPLACE_STAT: "set-marketplace-stat",
};

export const initialMarketplaceState = {
  marketplaces: [],
  marketplaceStats: [],
};

export const MarketplaceReducer = (state, action) => {
  switch (action.type) {
    // @note set all marketplace
    case ACTIONS.SET_ALL_MARKETPLACE:
      return {
        ...state,
        marketplaces: action.payload,
      };
    case ACTIONS.SET_MARKETPLACE_STAT:
      return {
        ...state,
        marketplaceStats: action.payload,
      };
  }
};
