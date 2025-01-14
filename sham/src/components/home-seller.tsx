import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import SectionHeadings from "./section-headings";
function HomerSellerItem(): JSX.Element {
  return (
    <div className="flex gap-[10px] justify-between p-[15px] border-[1px] border-[#eee] rounded-[8px]">
      <div className="flex-1">
        <div className="flex flex-col gap-[10px] text-right">
          <div className="text-[22px] font-bold">
            آراز شمس الدین
            <span className="text-[13px] text-[#444]">
              {" "}
              / <span>لوازم الکتریکی</span>
            </span>
          </div>
          <div className="text-[15px] text-[#222] rtl">۱۲ فروش موفق</div>
          <div className="text-[15px] text-[#222] rtl">۴ شعبه</div>
          <div className="text-[15px] text-[#222] rtl flex justify-between items-center">
            <div>منطقه تهران پاسداران</div>
            <div>
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                مشاهده محصولات
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[150px] relative overflow-hidden">
        <img src="/images/avatar.avif" className="h-[150px]" />
      </div>
    </div>
  );
}
export default function HomeSeller() {
  return (
    <div className="container mx-auto ltr">
      <SectionHeadings title={"فروشندگان"} />
      <Carousel
        infiniteLoop={true}
        centerMode={true}
        showIndicators={false}
        centerSlidePercentage={40}
      >
        <HomerSellerItem />
        <HomerSellerItem />
        <HomerSellerItem />
        <HomerSellerItem />
        <HomerSellerItem />
      </Carousel>
    </div>
  );
}
