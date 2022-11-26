import React from "react";

import {
  initialMarketplaceState,
  MarketplaceReducer,
} from "./MarketplaceReducer";

const MarketplaceContext = React.createContext();

export const MarketplaceProvider = ({ children }) => {
  const [marketplaceData, dispatchMarketplaceData] = React.useReducer(
    MarketplaceReducer,
    initialMarketplaceState
  );

  return (
    <MarketplaceContext.Provider
      value={[marketplaceData, dispatchMarketplaceData]}
    >
      {children}
    </MarketplaceContext.Provider>
  );
};

export const useMarketplaceContext = () => React.useContext(MarketplaceContext);
