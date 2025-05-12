import { createContext, useCallback, useState } from "react";

interface IDashboardContext {
  areValuesVisible: boolean;
  toggleValueVisibility: () => void;
}

export const DashboardContext = createContext({} as IDashboardContext);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [areValuesVisible, setAreValuesVisible] = useState(true);

  const toggleValueVisibility = useCallback(() => {
    setAreValuesVisible((prevState) => !prevState);
  }, []);
  return (
    <DashboardContext.Provider
      value={{ areValuesVisible, toggleValueVisibility }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
