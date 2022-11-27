export const ACTIONS = {
  SET_ALL_FIXTURE: "set-all-fixture",
};

export const initialFixtureState = {
  fixtures: [],
};

export const FixtureReducer = (state, action) => {
  switch (action.type) {
    // @note set all fixtures
    case ACTIONS.SET_ALL_FIXTURE:
      return {
        ...state,
        fixtures: action.payload,
      };
  }
};
