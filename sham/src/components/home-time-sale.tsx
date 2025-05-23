import { FaAngleLeft } from "react-icons/fa";
import SectionHeadings from "./section-headings";
import useIsMobile from "../hooks/useIsMobile";
export const SaleTradeItem = () => {
  const isMobile = useIsMobile();
  return (
    <div className={`p-2 ${isMobile ? "w-1/2" : "w-1/5"}`}>
      <div>
        <div className="relative aspect-[3/2] rounded-[16px] overflow-hidden mb-[15px]">
          <img
            src={"/images/product.webp"}
            className="absolute w-[100%] rounded-[16px] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
          />
          <div className="text-center flex items-center justify-center gap-[10px] w-full leading-[30px] absolute bottom-[0] right-[0] p-[5px_15px] rounded-[16px] h-[40px] text-[14px] bg-[rgba(255,255,255,0.1)] text-[#fff] backdrop-blur-md">
            <div>شرکت در مزایده</div>
            <div>
              <FaAngleLeft />
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="text-[20px] mb-[10px]">ایر پاد ۲۰۲۵ اپل</div>
          <div className="text-[13px] mb-[10px] text-[13px] text-[#999]">
            فروشگاه دوستان الکترونیک
          </div>
          <div className="text-[16px] text-[#222]">۸,۰۰۰,۰۰۰ تومان</div>
          <div className="text-[11px] bg-[#f44336] text-[#fff] font-bold rounded-[5px] absolute bottom-[0px] left-[0px] p-[4px_10px]">
            زمان : ۲۰ ساعت ۱۶ دقیقه و ۱۱ ثانیه
          </div>
        </div>
      </div>
    </div>
  );
};

export default function HomeTimeSales() {
  const isMobile = useIsMobile();
  return (
    <div>
      <SectionHeadings title="جدیدترین مزایده ها" />
      <div className="container mx-auto mb-[20px]">
        <div className={`flex mb-[30px] ${isMobile ? "flex-wrap" : ""}`}>
          <SaleTradeItem />
          <SaleTradeItem />
          <SaleTradeItem />
          <SaleTradeItem />
          <SaleTradeItem />
        </div>
      </div>
    </div>
  );
}
