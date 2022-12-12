import axios from "axios";

export const getuserResults = async (wallet) => {
   return await axios.get(
      import.meta.env.VITE_API_URI + `api/v1/results/${wallet}`,
    );
};
