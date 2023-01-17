// Esse é um contexto exclusivo para informações relacionadas a autenticação do usuário
import { ReactNode, createContext, useEffect, useState } from "react";
import { api } from "@services/api";
import {
  storageUserGet,
  storageUserRemove,
  storageUserSave,
} from "@storage/storageUser";
import { UserDTO } from "@dtos/UserDTO";
import {
  storageAuthTokenGet,
  storageAuthTokenRemove,
  storageAuthTokenSave,
} from "@storage/storageAuthToken";

// essa é a tipagem geral do contexto, por isso ela recebe como um dos vários objetos possiveis, o UserDTO
export type AuthContextDataProps = {
  user: UserDTO;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  checkingUserSession: boolean;
};
// Aqui eu crio o Contexto de fato, passando pra ele, a tipagem geral, de todos os objetos que ele pode receber. Ao passar o tipo no generics e deixar o objeto inicial vazio, ele da erro, por isso é necessário forçar a tipagem do objeto inicial como a mesma do generic
export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

type AuthContextProviderProps = {
  children: ReactNode;
};

// Desestruturo o children das props, e passo pra ele o AuthContextProviderProps, que aponta que a propriedade children será um ReactNode
export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);
  const [checkingUserSession, setCheckingUserSession] = useState(true);

  function userAndTokenUpdate(userData: UserDTO, userToken: string) {
    api.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
    setUser(userData);
  }

  async function storageUserAndTokenSave(userData: UserDTO, userToken: string) {
    try {
      setCheckingUserSession(true);
      await storageUserSave(userData);
      await storageAuthTokenSave(userToken);
    } catch (error) {
      throw error;
    } finally {
      setCheckingUserSession(false);
    }
  }

  async function signIn(email: string, password: string) {
    try {
      // vai até o banco de dados e testa se o email e senha constam na base. Se constarem, a api retorna os dados do usuário, se não, retorna undefined
      const { data } = await api.post("/sessions", { email, password });
      // aqui eu testo se o retorno foi de um usuário valido
      if (data.user && data.token) {
        setCheckingUserSession(true);
        // se for, eu logo o usuário
        await storageUserAndTokenSave(data.user, data.token);
        userAndTokenUpdate(data.user, data.token);
      }
    } catch (error) {
      throw error;
    } finally {
      setCheckingUserSession(false);
    }
  }

  async function signOut() {
    try {
      setCheckingUserSession(true);
      setUser({} as UserDTO);
      await storageUserRemove();
      await storageAuthTokenRemove();
    } catch (error) {
      throw error;
    } finally {
      setCheckingUserSession(false);
    }
  }

  async function loadUserData() {
    try {
      setCheckingUserSession(true);
      const loggedUser = await storageUserGet();
      const token = await storageAuthTokenGet();

      if (loggedUser && token) {
        userAndTokenUpdate(loggedUser, token);
      }
    } catch (error) {
      throw error;
    } finally {
      setCheckingUserSession(false);
    }
  }

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, signIn, checkingUserSession, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}
