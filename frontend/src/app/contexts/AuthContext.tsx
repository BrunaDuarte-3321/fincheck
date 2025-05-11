import { createContext, useCallback, useEffect, useState } from "react";
import { localStorageKeys } from "../../config/localStorageKeys";
import { useQuery } from "@tanstack/react-query";

import { usersService } from "../services/usersServices";
import toast from "react-hot-toast";
import { LaunchScreen } from "../../view/components/LaunchScreen";
import { CONST_QUERY_KEYS } from "../../config/constants/queryKeys";

interface IAuthContext {
  signedIn: boolean;
  signin: (accessToken: string) => void;
  signout: () => void;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storageAccessToken = localStorage.getItem(
      localStorageKeys.ACCESS_TOKEN
    );
    return !!storageAccessToken;
  });

  const signin = useCallback((accessToken: string) => {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken);
    setSignedIn(true);
  }, []);

  const signout = useCallback(() => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
    setSignedIn(false);
  }, []);

  const { isError, isFetching, isSuccess } = useQuery({
    queryKey: [CONST_QUERY_KEYS.QK_USER_ME],
    queryFn: () => {
      return usersService.me();
    },
    enabled: signedIn,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (isError) {
      toast.error("Sua sessão expirou");
      signout();
    }
  }, [isError, signout]);

  return (
    <AuthContext.Provider
      value={{ signedIn: isSuccess && signedIn, signin, signout }}
    >
      <LaunchScreen isLoading={isFetching} />
      {!isFetching && children}
    </AuthContext.Provider>
  );
}
