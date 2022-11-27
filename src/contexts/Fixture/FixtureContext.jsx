import React from "react";

import {
  initialFixtureState,
  FixtureReducer,
} from "./FixtureReducer";

const FixtureContext = React.createContext();

export const FixtureProvider = ({ children }) => {
  const [fixtureData, dispatchFixtureData] = React.useReducer(
    FixtureReducer,
    initialFixtureState
  );

  return (
    <FixtureContext.Provider
      value={[fixtureData, dispatchFixtureData]}
    >
      {children}
    </FixtureContext.Provider>
  );
};

export const useFixtureContext = () => React.useContext(FixtureContext);
