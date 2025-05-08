import { createContext } from "react";

interface IAuthContext {
  signedIn: boolean;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <AuthContext.Provider value={{ signedIn: false }}>
      {children}
    </AuthContext.Provider>
  );
}
