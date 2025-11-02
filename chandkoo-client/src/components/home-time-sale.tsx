import SectionHeadings from "./section-headings";
import { useEffect, useState } from "react";
import { getAllTrades } from "../services/content.service";

export const SaleTradeItem = ({ trade }: { trade: any }) => {
  return (
    <div className="w-1/2 sm:w-1/2 lg:w-1/6 p-2">
      <div className="relative rounded-[16px] overflow-hidden shadow-md group">
        {/* Full Image */}
        <img
          src={trade.image}
          className="w-full h-[220px] object-cover transition-transform duration-300 group-hover:scale-105"
          alt={trade.product_name}
        />
        <div className="text-[11px] absolute z-[2] left-[15px] top-[15px] bg-[#f44336] text-white font-bold rounded-[5px] inline-block px-2 py-1">
          زمان : ۲۰ ساعت ۱۶ دقیقه و ۱۱ ثانیه
        </div>
        {/* Gradient Overlay */}
        <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-3 text-white transition-all duration-300 group-hover:from-black/90 group-hover:via-black/80 group-hover:to-black/80">
          <div className="transition-transform duration-300 transform translate-y-0 group-hover:translate-y-0">
            <div className="text-[20px] font-semibold mb-1">
              {trade.product_name}
            </div>
            <div className="text-[13px] text-[#ddd] mb-1">
              {trade.shop_name}
            </div>
            <div className="text-[16px] font-medium mb-2">
              {trade.sale_price} تومان
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function HomeTimeSales() {
  const [trades, setTrades] = useState<any[]>([]);

  useEffect(() => {
    getAllTrades().then((res) => {
      if (res.status === 200) {
        setTrades([...res.data.trades, res.data.trades[0]]);
      }
    });
  }, []);

  return (
    <div>
      <SectionHeadings title="جدیدترین مزایده ها" />
      <div className="container mx-auto mb-[20px]">
        <div className="flex flex-wrap -mx-2">
          {trades.map((el) => (
            <SaleTradeItem key={`trade-${el.id}`} trade={el} />
          ))}
        </div>
      </div>
    </div>
  );
}
