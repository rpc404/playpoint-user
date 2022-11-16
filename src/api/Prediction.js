import axios from "axios";

export const getQuestionaireByFixtureId = (fixtureId) => {
  return axios.get(
    import.meta.env.VITE_API_URI + `api/v1/questionaires/${fixtureId}`
  );
};
