import axios from "axios";

export const subscribe = (data) => {
    var res = axios.post(
      import.meta.env.VITE_API_URI + `api/v1/subscribe`,
      data
    );
    return res;
};


