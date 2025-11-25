import { useEffect, useState } from "react";
import SectionHeadings from "./section-headings";
import formatPersianNumber from "../utils/numberPriceFormat";
import { getAllPublishedSales, Sale } from "../services/sales.service";
import SalesProductModal from "./sales-product-modal";

export const SaleItem = ({ sale }: { sale: any }) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="w-full max-[768px]:px-[15px] relative"
      >
        <div className="flex items-center border rounded-[12px] overflow-hidden shadow-sm bg-white">
          <div
            className={`absolute left-[15px] px-[5px] py-[2px] text-[#666] ${
              sale.saleType === "market" ? "top-[15px]" : "bottom-[15px]"
            } text-[11px] bg-[#f0f0f0] rounded-full`}
          >
            {sale.saleType === "market" ? "حراج فروشگاه" : "حراج محصول"}
          </div>
          <div className="w-[130px] h-[130px] flex-shrink-0 overflow-hidden">
            {sale.saleType !== "market" ? (
              Array.isArray(sale.images) && sale.images.length > 0 ? (
                <img
                  src={`https://chandkoo.ir/api/${sale.images[0]}`}
                  className="w-full h-full object-cover"
                  alt={sale.marketSaleDescription}
                />
              ) : (
                <img
                  src={"/logo.png"}
                  className="w-full h-full object-cover"
                  alt={sale.marketSaleDescription}
                />
              )
            ) : (
              <img
                src={"/logo.png"}
                className="w-full h-full object-cover"
                alt={sale.marketSaleDescription}
              />
            )}
          </div>

          {/* Content section */}
          <div className="flex-1 p-3 relative">
            {/* Sale percent badge */}
            {sale.saleType !== "market" ? (
              <div className="absolute left-3 top-3 bg-[#f50057] rounded-[12px] font-bold px-2 py-1 text-[12px] text-white">
                {formatPersianNumber(
                  Math.ceil((Number(sale.salePrice) / sale.primaryPrice) * 100)
                )}
                %
              </div>
            ) : (
              <div className="absolute left-3 top-3 bg-[#f50057] rounded-[12px] font-bold px-2 py-1 text-[12px] text-white">
                {formatPersianNumber(sale.salePercentFrom)}% -{" "}
                {formatPersianNumber(sale.salePercentTo)}%
              </div>
            )}

            <div className="text-[16px] font-semibold mb-1">
              {sale.saleType === "market"
                ? sale.marketSaleDescription
                : sale.description}
            </div>
            {sale.saleType !== "market" ? (
              <>
                <div className="text-[12px] text-[#999] line-through mb-[2px]">
                  {formatPersianNumber(sale.primaryPrice)} تومان
                </div>
                <div className="text-[14px] text-[#222] font-medium">
                  {formatPersianNumber(sale.salePrice)} تومان
                </div>
              </>
            ) : (
              <>
                <div className="text-[12px] text-[#999] mb-[2px]">
                  {sale.notes}
                </div>
              </>
            )}

            {/* Category badge */}
            {sale.saleType !== "market" && (
              <div className="text-[11px] text-[#666] bg-[#f0f0f0] border border-[#ccc] rounded-[12px] inline-block mt-2 px-3 py-1">
                {sale?.category?.title}
              </div>
            )}
          </div>
        </div>
      </div>
      <SalesProductModal
        open={open}
        onClose={() => setOpen(false)}
        id={sale.id}
      />
    </>
  );
};

export default function HomeSales() {
  const [sales, setSales] = useState<any[]>([]);

  useEffect(() => {
    getAllPublishedSales().then((res) => {
      if (res.data.success) {
        const salesData = res.data.data.sales as Sale[];

        // Parse the images field from string to array
        const parsedSales = salesData.map((sale) => ({
          ...sale,
          images:
            typeof sale.images === "string"
              ? JSON.parse(sale.images)
              : sale.images,
        }));

        setSales(parsedSales);
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
