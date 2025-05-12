import { useState } from "react";
import { useWindowWidth } from "../../../../../app/hooks/useWindowWidth";
import { useDashboard } from "../DashboardContext/useDashboard";

export function useAccountsController() {
  const { areValuesVisible, toggleValueVisibility } = useDashboard();
  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });
  const useWidth = useWindowWidth();
  return {
    sliderState,
    setSliderState,
    useWidth,
    areValuesVisible,
    toggleValueVisibility,
  };
}
