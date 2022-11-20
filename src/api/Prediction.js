import axios from "axios";

export const getQuestionaireByFixtureId = (fixtureId) => {
  return axios.get(
    import.meta.env.VITE_API_URI + `api/v1/questionaires/${fixtureId}`
  );
};

export const setPrediction = (data) => {
  return axios.post(
    import.meta.env.VITE_API_URI + `api/v1/prediction`,{
      "data": data
    }
  );
};

export const getAllPredictions = () => {
  return axios.get(import.meta.env.VITE_API_URI + `api/v1/prediction`);
}

