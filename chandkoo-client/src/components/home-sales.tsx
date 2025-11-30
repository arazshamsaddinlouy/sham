import { useEffect, useState } from "react";
import SectionHeadings from "./section-headings";
import formatPersianNumber from "../utils/numberPriceFormat";
import { getAllPublishedSales, Sale } from "../services/sales.service";
import SalesProductModal from "./sales-product-modal";

export const SaleItem = ({ sale }: { sale: any }) => {
  const [open, setOpen] = useState<boolean>(false);

  // Helper function to parse images array
  const getImages = () => {
    try {
      if (sale.images && typeof sale.images === "string") {
        return JSON.parse(sale.images);
      }
      return sale.images || [];
    } catch {
      return [];
    }
  };

  const images = getImages();
  const hasImage = images.length > 0 && sale.saleType !== "market";
  const discountPercent =
    sale.saleType === "market"
      ? formatPersianNumber(`${sale.salePercentFrom}% - ${sale.salePercentTo}%`)
      : formatPersianNumber(
          100 - Math.ceil((Number(sale.salePrice) / sale.primaryPrice) * 100)
        ) + "%";

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="group cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
      >
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:border-gray-200 h-full flex flex-col">
          {/* Image Section */}
          <div className="relative h-48 sm:h-52 md:h-56 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
            {hasImage ? (
              <img
                src={`https://chandkoo.ir/api/${images[0]}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                alt={sale.description || sale.marketSaleDescription}
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-2 bg-white rounded-2xl shadow-sm flex items-center justify-center">
                    <span className="text-2xl">🏪</span>
                  </div>
                  <p className="text-sm text-gray-600 font-medium">
                    حراج فروشگاه
                  </p>
                </div>
              </div>
            )}

            {/* Discount Badge */}
            <div className="absolute top-3 left-3">
              <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                {discountPercent} تخفیف
              </div>
            </div>

            {/* Sale Type Badge */}
            <div className="absolute top-3 right-3">
              <div
                className={`text-xs px-3 py-1.5 rounded-full font-medium ${
                  sale.saleType === "market"
                    ? "bg-blue-100 text-blue-700 border border-blue-200"
                    : "bg-green-100 text-green-700 border border-green-200"
                }`}
              >
                {sale.saleType === "market" ? "حراج فروشگاه" : "حراج محصول"}
              </div>
            </div>

            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
          </div>

          {/* Content Section */}
          <div className="flex-1 p-4 sm:p-5 flex flex-col">
            {/* Title */}
            <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
              {sale.saleType === "market"
                ? sale.marketSaleDescription
                : sale.description}
            </h3>

            {/* Notes */}
            {sale.notes && (
              <p className="text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">
                {sale.notes}
              </p>
            )}

            {/* Price Section */}
            {sale.saleType !== "market" && (
              <div className="mt-auto space-y-2">
                <div className="flex items-center gap-3">
                  <div className="text-lg font-bold text-gray-900">
                    {formatPersianNumber(sale.salePrice)} تومان
                  </div>
                  <div className="text-sm text-gray-500 line-through">
                    {formatPersianNumber(sale.primaryPrice)}
                  </div>
                </div>

                {/* Savings */}
                <div className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-lg inline-block">
                  {formatPersianNumber(sale.primaryPrice - sale.salePrice)}{" "}
                  تومان صرفه‌جویی
                </div>
              </div>
            )}

            {/* Market Sale Info */}
            {sale.saleType === "market" && (
              <div className="mt-auto">
                <div className="text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-600">🏷️</span>
                    <span>
                      تخفیف {sale.salePercentFrom}% تا {sale.salePercentTo}%
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Category & Stats */}
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
              {sale.saleType !== "market" && sale?.category?.title && (
                <div className="text-xs text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200">
                  {sale.category.title}
                </div>
              )}

              {/* Stats */}
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <span>👁️</span>
                  <span>{formatPersianNumber(sale.viewCount)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>❤️</span>
                  <span>{formatPersianNumber(sale.likeCount)}</span>
                </div>
              </div>
            </div>

            {/* Seller Info */}
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs">
                  {sale.seller?.first_name?.[0] || "ف"}
                </div>
                <span>
                  {sale.seller?.first_name} {sale.seller?.last_name}
                </span>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="px-4 sm:px-5 pb-4">
            <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white py-3 rounded-xl font-semibold text-sm transition-all duration-300 transform hover:shadow-lg active:scale-95">
              مشاهده جزئیات و خرید
            </button>
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
