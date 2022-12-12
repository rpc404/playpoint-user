import React from "react";

import {
  initialPredictionsState,
  PredictionsReducer,
} from "./PredictionsReducer";

const PredictionContext = React.createContext();

export const PredictionsProvider = ({ children }) => {
  const [predictionsData, dispatchPredictionsData] = React.useReducer(
    PredictionsReducer,
    initialPredictionsState
  );

  return (
    <PredictionContext.Provider
      value={[predictionsData, dispatchPredictionsData]}
    >
      {children}
    </PredictionContext.Provider>
  );
};

export const usePredictionsContext = () => React.useContext(PredictionContext);
