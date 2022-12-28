import axios from "axios";

export const mkaeDuo = async (data) => {
  var challenges = await axios.post(
    import.meta.env.VITE_API_URI +
      `api/v1/new-challenge`,
      data
  );

  return challenges;
};

