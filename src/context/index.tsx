import { createContext, ReactNode, useEffect, useState } from "react";
import { User } from "../types";
import { loginUser, registerUser, verifyEmail } from "../services/auth";
import { useNavigate } from "react-router-dom";

export type AppContextType = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  login: (email: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<boolean>;
  logout: () => void;
  verifyUserEmail: (token: string) => Promise<boolean>;
};

const AuthContext = createContext<AppContextType>({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  setUser: () => {},
  setToken: () => {},
  setIsAuthenticated: () => {},
  setIsLoading: () => {},
  setError: () => {},
  login: async () => {},
  register: async () => false,
  logout: () => {},
  verifyUserEmail: async () => false,
});

type ContextProviderProps = {
  children: ReactNode;
};

const ContextProvider = ({ children }: ContextProviderProps) => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      try {
        if (storedUser !== "undefined") {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setToken(storedToken);
          setIsAuthenticated(true);
        } else {
          console.warn("Stored user is 'undefined', clearing storage.");
          localStorage.removeItem("user");
        }
      } catch (err) {
        console.error("Error parsing stored user:", err);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await loginUser({ email, password });
      setUser(data.token.user);
      setToken(data.token.token);
      setIsAuthenticated(true);
      localStorage.setItem("token", data.token.token);
      localStorage.setItem("user", JSON.stringify(data.token.user));
      navigate("/chat-rooms");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      await registerUser({ username, email, password });
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  const verifyUserEmail = async (token: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await verifyEmail(token);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verification failed");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.setItem("isAuthenticated", "true");

    navigate("/login");
  };

  const values: AppContextType = {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    setUser,
    setToken,
    setIsAuthenticated,
    setIsLoading,
    setError,
    login,
    register,
    logout,
    verifyUserEmail,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
export { AuthContext, ContextProvider };
