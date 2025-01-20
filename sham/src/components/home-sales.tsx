import { BiBasket } from "react-icons/bi";
import SectionHeadings from "./section-headings";

export default function HomeSales() {
  const SaleItem = () => {
    return (
      <div className="flex-1 max-w-[20%]">
        <div>
          <div className="relative aspect-[3/2] rounded-[16px] overflow-hidden mb-[15px]">
            <img
              src={"/images/product.webp"}
              className="absolute w-[100%] rounded-[16px] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
            />
            <div className="text-[16px] mb-[10px] absolute right-[10px] top-[10px] p-[5px_15px] rounded-[16px] text-[11px] bg-[rgba(255,255,255,0.2)] text-[#fff] backdrop-blur-md">
              فروشگاه دوستان الکترونیک
            </div>
          </div>
          <div className="relative">
            <div className="absolute left-[0px] bg-[#f50057] rounded-[20px] font-bold top-[0px] p-[5px_8px] text-[15px] text-[#fff]">
              ۲۰٪
            </div>
            <div className="text-[20px] mb-[10px]">ایر پاد ۲۰۲۵ اپل</div>
            <div className="text-[12px] text-[#999] line-through mb-[5px]">
              ۱۲,۰۰۰,۰۰۰ تومان
            </div>
            <div className="text-[16px] text-[#222]">۸,۰۰۰,۰۰۰ تومان</div>
            <div className="text-[12px] text-[#666] bg-[#f0f0f0] border-[1px] border-[#ccc] rounded-[20px] absolute bottom-[0px] left-[0px] p-[4px_10px]">
              لوازم الکترونیک
            </div>
          </div>
        </div>
        <button className="bg-[#6fbf73] gap-[10px] mt-[10px] flex text-[#fff] justify-center items-center w-full outline-none border-none rounded-[8px] p-[10px_0]">
          <div>
            <BiBasket size={22} />
          </div>
          <div>افزودن به سبد خرید</div>
        </button>
      </div>
    );
  };
  return (
    <div>
      <SectionHeadings title="جدیدترین تخفیف ها" />
      <div className="container mx-auto mb-[20px]">
        <div className="flex gap-[15px]">
          <SaleItem />
          <SaleItem />
          <SaleItem />
          <SaleItem />
          <SaleItem />
        </div>
      </div>
    </div>
  );
}
