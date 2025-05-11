import { useState } from "react";
import { useWindowWidth } from "../../../../../app/hooks/useWindowWidth";

export function useAccountsController() {
  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });
  const useWidth = useWindowWidth();
  return { sliderState, setSliderState, useWidth };
}
