import { EyeIcon } from "../../../components/icons/EyeIcon";
import { AccountCard } from "./AccountCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { AccountSliderNavigation } from "./AccountSliderNavigation";

export function Accounts() {
  return (
    <div className="flex  flex-col bg-teal-900 rounded-2xl w-full h-full px-4 py-8 md:p-10">
      <div className="">
        <span className="tracking-[-0.5px] text-white block">Saldo total</span>
        <div className="flex items-center gap-2">
          <strong className="text-2xl tracking-[-1px] text-white">
            R$ 100,00
          </strong>

          <button className="w-8 h-8 flex items-center justify-center">
            <EyeIcon open />
          </button>
        </div>
      </div>
      <div className="flex-col flex-1 flex justify-end">
        <div>
          <Swiper spaceBetween={16} slidesPerView={2.1}>
            <div
              className="flex items-center justify-between mb-4"
              slot="container-start"
            >
              <strong className="text-white tracking-[-1px] text-lg">
                Minhas Contas
              </strong>
              <AccountSliderNavigation />
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
                <AccountCard balance={50000} name="XP" type="INVESTMENT" />
              </SwiperSlide>
              <SwiperSlide>
                <AccountCard balance={50000} name="XP" type="INVESTMENT" />
              </SwiperSlide>
            </div>
          </Swiper>
        </div>
      </div>
    </div>
  );
}
