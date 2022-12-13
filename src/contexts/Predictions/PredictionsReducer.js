import { getuserResults } from "../../api/Results";

export const ACTIONS = {
  SET_PREDICTIONS: "set-predictions",
  GET_PREDICTION_BY_FIXTURE: "get-prediction-by-fixture",
  GET_PREDICTION_BY_USER: "get-prediction-by-user",
  GET_RESULTS: "get-results",
};

export const initialPredictionsState = {
  predictions: [],
  results: [],
  woat: 0,
};

const filterData = (all, search) => {
  return all.filter((_all) => _all.predictedBy == search);
};

export const PredictionsReducer = (state, action) => {
  switch (action.type) {
    // @note set all predictions
    case ACTIONS.SET_PREDICTIONS:
      return {
        ...state,
        predictions: action.payload,
      };
    case ACTIONS.GET_PREDICTION_BY_FIXTURE:
      return state.predictions;

    case ACTIONS.GET_RESULTS:
      let woat = 0;
      action.payload.map((res) => (woat += parseInt(res.rewardAmount)));
      return {
        ...state,
        results: action.payload,
        woat: woat,
      };
    case ACTIONS.GET_PREDICTION_BY_USER:
      return filterData(state.predictions, action.payload.userid);
  }
};
