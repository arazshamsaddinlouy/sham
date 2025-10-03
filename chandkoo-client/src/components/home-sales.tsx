import { useEffect, useState } from "react";
import SectionHeadings from "./section-headings";
import { getAllSales } from "../services/content.service";

export const SaleItem = ({ sale }: { sale: any }) => {
  return (
    <div className="w-full max-[768px]:px-[15px]">
      <div className="flex items-center border rounded-[12px] overflow-hidden shadow-sm bg-white">
        {/* Image section */}
        <div className="w-[130px] h-[130px] flex-shrink-0 overflow-hidden">
          <img
            src={sale.image}
            className="w-full h-full object-cover"
            alt={sale.product_name}
          />
        </div>

        {/* Content section */}
        <div className="flex-1 p-3 relative">
          {/* Sale percent badge */}
          <div className="absolute left-3 top-3 bg-[#f50057] rounded-[12px] font-bold px-2 py-1 text-[12px] text-white">
            {sale.sale_percent}
          </div>

          <div className="text-[16px] font-semibold mb-1">
            {sale.product_name}
          </div>
          <div className="text-[12px] text-[#999] line-through mb-[2px]">
            {sale.non_sale_price} تومان
          </div>
          <div className="text-[14px] text-[#222] font-medium">
            {sale.sale_price} تومان
          </div>

          {/* Category badge */}
          <div className="text-[11px] text-[#666] bg-[#f0f0f0] border border-[#ccc] rounded-[12px] inline-block mt-2 px-3 py-1">
            {sale.category}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function HomeSales() {
  const [sales, setSales] = useState<any[]>([]);

  useEffect(() => {
    getAllSales().then((res) => {
      if (res.status === 200) {
        setSales([...res.data.sales, res.data.sales[0]]);
      }
    });
  }, []);

  return (
    <div>
      <SectionHeadings title="جدیدترین حراج ها" />
      <div className="container mx-auto mb-[20px]">
        {/* Grid with 3 columns and gap */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sales.slice(0, 6).map((el) => (
            <SaleItem sale={el} key={`sales-${el.id}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
