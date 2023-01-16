// Esse é um contexto exclusivo para informações relacionadas a autenticação do usuário
import { ReactNode, createContext, useEffect, useState } from "react";
import { api } from "@services/api";
import {
  storageUserGet,
  storageUserSave,
  storageUserRemove,
} from "@storage/storageUser";
import { UserDTO } from "@dtos/UserDTO";

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

  async function signIn(email: string, password: string) {
    try {
      // vai até o banco de dados e testa se o email e senha constam na base. Se constarem, a api retorna os dados do usuário, se não, retorna undefined
      console.log("Entrou no try do login");
      const {
        data: { user },
      } = await api.post("/sessions", { email, password });
      // aqui eu testo se o retorno foi de um usuário valido
      console.log("Retornou com os dados da api");
      if (user) {
        // se for, eu logo o usuário
        setUser(user);
        await storageUserSave(user);
        console.log("Salvou o usuário logado no AS");
      }
    } catch (error) {
      throw error;
    }
  }

  async function signOut() {
    try {
      setCheckingUserSession(true);
      setUser({} as UserDTO);
      await storageUserRemove();
    } catch (error) {
      throw error;
    } finally {
      setCheckingUserSession(false);
    }
  }

  async function loadUserData() {
    try {
      const loggedUser = await storageUserGet();

      if (loggedUser) {
        setUser(loggedUser);
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
