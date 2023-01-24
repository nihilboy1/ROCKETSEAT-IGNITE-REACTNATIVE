import {
  storageAuthTokenGet,
  storageAuthTokenSave,
} from "@storage/storageAuthToken";
import { AppError } from "@utils/AppError";
import axios, { AxiosInstance } from "axios";

// veja se estou certo: Nesse código, eu declaro que a api tem uma função nova, chamada registerInterceptTokenManager, e que ela recebe um parâmetro chamado signOut. Sim, você está correto. O código cria uma instância do axios e a tipa como uma nova tipagem, chamada APIInstanceProps, que inclui a função registerInterceptTokenManager. Essa função, por sua vez, adiciona um interceptador na instância do axios, que é usado para lidar com erros que possam ocorrer na resposta da API. Ela também tem a capacidade de remover esse interceptador quando é chamado, usando a função eject.

type SignOut = () => void;

type processQueueParams = {
  error: Error | null;
  token: string | null;
};
type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (signOut: SignOut) => () => void;
};

type PromiseType = {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
};

const api = axios.create({
  baseURL: "http://10.0.0.227:3333",
}) as APIInstanceProps;

let isRefreshing = false;
let failedRequestQueue: Array<PromiseType> = [];

const processQueue = ({ error, token = null }: processQueueParams): void => {
  failedRequestQueue.forEach((request) => {
    if (error) {
      request.reject(error);
    } else {
      request.resolve(token);
    }
  });

  failedRequestQueue = [];
};

api.registerInterceptTokenManager = (signOut) => {
  const InterceptTokenManager = api.interceptors.response.use(
    (response) => response,
    async (requestError) => {
      if (requestError?.response?.status === 401) {
        // Se entrar aqui, significa que a requisição não foi autorizada
        if (
          requestError.response.data?.message === "token.expired" ||
          requestError.response.data?.message === "token.invalid"
        ) {
          const currentToken = await storageAuthTokenGet();

          if (!currentToken) {
            signOut();
            return Promise.reject(requestError);
          }

          const originalRequest = requestError.config;

          if (isRefreshing) {
            return new Promise((resolve, reject) => {
              failedRequestQueue.push({ resolve, reject });
            })
              .then((token) => {
                originalRequest.headers["Authorization"] = `Bearer ${token}`;
                return axios(originalRequest);
              })
              .catch((error) => {
                throw error;
              });
          }
          isRefreshing = true;

          return new Promise(async (resolve, reject) => {
            try {
              const { data } = await api.post("/sessions/refresh-token", {
                token: currentToken,
              });

              await storageAuthTokenSave(data.token);

              api.defaults.headers.common[
                "Authorization"
              ] = `Bearer ${data.token}`;

              originalRequest.headers["Authorization"] = `Bearer ${data.token}`;

              processQueue({ error: null, token: data.token });
              console.log("Token atualizado");

              resolve(axios(originalRequest));
            } catch (error: any) {
              processQueue({ error, token: null });
              signOut();
              reject(error);
            } finally {
              isRefreshing = false;
            }
          });
        }
        //Se o erro for de requisição não foi autorizada, mas não é de token expirado ou invalido, deslogamos o usuário pra ele poder gerar um token novo
        signOut();
      }

      if (requestError.response && requestError.response.data) {
        return Promise.reject(new AppError(requestError.response.data.message));
      }
      return Promise.reject(requestError);
    }
  );

  return () => {
    api.interceptors.response.eject(InterceptTokenManager);
  };
};
export { api };
