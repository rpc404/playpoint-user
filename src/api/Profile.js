import axios from "axios";

export const setProfile = ({data}) => {
    return axios.post(
      import.meta.env.VITE_API_URI + `api/v1/profile`,
      data
    );
};