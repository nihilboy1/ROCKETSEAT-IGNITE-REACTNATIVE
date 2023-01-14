import { AppError } from "@utils/AppError";
import axios from "axios";

const api = axios.create({
  baseURL: "http://10.0.0.227:3333",
});

//intercepta a REQUISIÇÃO e excecuta uma função
api.interceptors.request.use(
  (requestConfig) => {
    console.log("Intercepted request | DATA: ", requestConfig.data);
    return requestConfig;
  },
  (error) => {
    console.log("Intercepted request | ERROR: ", error);
    return Promise.reject(error);
  }
);

//intercepta a RESPOSTA e excecuta uma função
api.interceptors.response.use(
  (responseConfig) => {
    console.log("Intercepted response | DATA: ", responseConfig.data);
    return responseConfig;
  },
  (error) => {
    console.log("Intercepted response | ERROR: ", error);
    if (error.response && error.response.data) {
      return Promise.reject(new AppError(error.response.data.message));
    }
    return Promise.reject(error);
  }
);

export { api };
