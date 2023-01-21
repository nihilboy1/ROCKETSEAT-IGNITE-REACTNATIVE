import { AppError } from "@utils/AppError";
import axios from "axios";

const api = axios.create({
  baseURL: "http://10.0.0.227:3333",
});

//intercepta a REQUISIÇÃO e excecuta uma função
api.interceptors.request.use(
  (requestConfig) => {
    return requestConfig;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//intercepta a RESPOSTA e excecuta uma função
api.interceptors.response.use(
  (responseConfig) => {
    return responseConfig;
  },
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(new AppError(error.response.data.message));
    }
    return Promise.reject(error);
  }
);

export { api };
