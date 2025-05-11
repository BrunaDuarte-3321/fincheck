import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useSwiper } from "swiper/react";

interface ISliderNavigation {
  isBeginning: boolean;
  isEnd: boolean;
}
export function SliderNavigation({ isBeginning, isEnd }: ISliderNavigation) {
  const swiper = useSwiper();
  return (
    <div className="flex items-center gap-2 ">
      <button
        disabled={isBeginning}
        onClick={() => swiper.slidePrev()}
        className="py-3 pl-2.5 pr-3.5 rounded-full enabled:hover:bg-black/10 transition-colors disabled:cursor-not-allowed disabled:opacity-40 "
      >
        <ChevronLeftIcon className="text-white w-6 h-6" />
      </button>
      <button
        disabled={isEnd}
        onClick={() => swiper.slideNext()}
        className="py-3 pl-2.5 pr-3.5 rounded-full enabled:hover:bg-black/10 transition-colors disabled:cursor-not-allowed disabled:opacity-40 "
      >
        <ChevronRightIcon className="text-white w-6 h-6" />
      </button>
    </div>
  );
}
