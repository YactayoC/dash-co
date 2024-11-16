import { useState } from "react";
import { axiosInstance } from "../config/awsAPI";

type LoginFormInputs = {
  username: string;
  password: string;
};

type RegisterFormInputs = {
  username: string;
  password: string;
  fullName: string;
};

type UseAuthResponse = {
  onLogin: (data: LoginFormInputs) => Promise<void>;
  onRegister: (data: RegisterFormInputs) => Promise<void>;
  isLoading: boolean;
  error: string | null;
};

export const useAuth = (): UseAuthResponse => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onLogin = async (data: LoginFormInputs): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post("/auth/login", data);
      const username = response.data.user.username;

      if (!username) {
        throw new Error("Error al iniciar sesión");
      }

      localStorage.setItem("username", response.data.token);
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al iniciar sesión");
      throw new Error(err.response?.data?.message || "Error al iniciar sesión");
    } finally {
      setIsLoading(false);
    }
  };

  const onRegister = async (data: RegisterFormInputs): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      await axiosInstance.post("/auth/register", data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al registrarse");
      throw new Error(err.response?.data?.message || "Error al registrarse");
    } finally {
      setIsLoading(false);
    }
  };

  return { onLogin, onRegister, isLoading, error };
};
