import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useSwiper } from "swiper/react";

export function AccountSliderNavigation() {
  const swiper = useSwiper();

  return (
    <div className="flex items-center gap-2 ">
      <button
        onClick={() => swiper.slidePrev()}
        className="cursor-pointer py-3 pl-2.5 pr-3.5 rounded-full enabled:hover:bg-black/10 transition-colors disabled:cursor-not-allowed disabled:opacity-40 "
      >
        <ChevronLeftIcon className="text-white w-6 h-6" />
      </button>
      <button
        onClick={() => swiper.slideNext()}
        className="cursor-pointer py-3 pl-2.5 pr-3.5 rounded-full enabled:hover:bg-black/10 transition-colors disabled:cursor-not-allowed disabled:opacity-40 "
      >
        <ChevronRightIcon className="text-white w-6 h-6" />
      </button>
    </div>
  );
}
