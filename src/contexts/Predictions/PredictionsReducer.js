export const ACTIONS = {
    SET_PREDICTIONS: "set-predictions",
    GET_PREDICTION_BY_FIXTURE: "get-prediction-by-fixture",
    GET_PREDICTION_BY_USER: "get-prediction-by-user",
  };
  
  export const initialPredictionsState = {
    predictions: [],
  };

  const filterData = (all, search) =>{
    return all.filter(_all => _all.predictedBy==search)
  }
  
  export const PredictionsReducer = (state, action) => {
    switch (action.type) {
      // @note set all predictions
      case ACTIONS.SET_PREDICTIONS:
        return {
            ...state,
            predictions: action.payload
        }
      case ACTIONS.GET_PREDICTION_BY_FIXTURE:
        return state.predictions;

      case ACTIONS.GET_PREDICTION_BY_USER:
        return filterData(state.predictions, action.payload.userid)
    }
  };
  