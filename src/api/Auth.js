import axios from "axios";

export const authenticate = (data) => {
    var res = axios.post(
      import.meta.env.VITE_API_URI + `api/v1/authenticate`,
      data
    );
    return res;
};

export const _verify = async (data) => {
    var res = await axios.post(
      import.meta.env.VITE_API_URI + `api/v1/verify`,
      data
    );
    return res;
};

export const otplogin = (data) => {
    var res = axios.post(
      import.meta.env.VITE_API_URI + `api/v1/otplogin`,
      data
    );
    return res;
};

