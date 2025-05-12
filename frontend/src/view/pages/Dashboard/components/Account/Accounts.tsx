import { EyeIcon } from "../../../../components/icons/EyeIcon";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { AccountCard } from "./AccountCard";
import { SliderNavigation } from "./SliderNavigation";
import { useAccountsController } from "./useAccountsController";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { cn } from "../../../../../app/utils/cn";

export function Accounts() {
  const {
    sliderState,
    setSliderState,
    useWidth,
    areValuesVisible,
    toggleValueVisibility,
  } = useAccountsController();
  return (
    <div className="flex  flex-col bg-teal-900 rounded-2xl w-full h-full px-4 py-8 md:p-10">
      <div className="">
        <span className="tracking-[-0.5px] text-white block">Saldo total</span>
        <div className="flex items-center gap-2">
          <strong
            className={cn(
              "text-2xl tracking-[-1px] text-white",
              !areValuesVisible && "blur-md"
            )}
          >
            {formatCurrency(10000)}
          </strong>

          <button
            onClick={toggleValueVisibility}
            className="w-8 h-8 flex items-center justify-center"
          >
            <EyeIcon open={!areValuesVisible} />
          </button>
        </div>
      </div>
      <div className="flex-col flex-1 flex justify-end mt-10 md:mt-0">
        <div>
          <Swiper
            spaceBetween={16}
            slidesPerView={useWidth <= 500 ? 1.1 : 2.1}
            onSlideChange={(swiper) => {
              setSliderState({
                isBeginning: swiper.isBeginning,
                isEnd: swiper.isEnd,
              });
            }}
          >
            <div
              className="flex items-center justify-between mb-4"
              slot="container-start"
            >
              <strong className="text-white tracking-[-1px] text-lg">
                Minhas Contas
              </strong>
              <SliderNavigation
                isBeginning={sliderState.isBeginning}
                isEnd={sliderState.isEnd}
              />
            </div>
            <div>
              <SwiperSlide>
                <AccountCard
                  color="#7950F2"
                  balance={1000.23}
                  name="Nubank"
                  type="CASH"
                />
              </SwiperSlide>
              <SwiperSlide>
                <AccountCard
                  color="#7950F2"
                  balance={50000}
                  name="XP"
                  type="INVESTMENT"
                />
              </SwiperSlide>
              <SwiperSlide>
                <AccountCard
                  color="#7950F2"
                  balance={50000}
                  name="XP"
                  type="INVESTMENT"
                />
              </SwiperSlide>
            </div>
          </Swiper>
        </div>
      </div>
    </div>
  );
}
