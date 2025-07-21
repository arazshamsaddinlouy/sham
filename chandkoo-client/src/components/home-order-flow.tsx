import useIsMobile from "../hooks/useIsMobile";
import SectionHeadings from "./section-headings";

export default function HomeOrderFlow() {
  const isMobile = useIsMobile();
  return (
    <div className="mb-[90px]">
      <div className="pb-[30px]">
        <SectionHeadings title={"ثبت سفارش"} />
      </div>
      {!isMobile ? (
        <div className="">
          <div className="h-[460px] pt-[30px]">
            <div className="relative overflow-hidden">
              <div className="container mx-auto">
                <div className="flex h-[460px] items-center">
                  <div className="flex-1 relative">
                    <div className="h-[3px] w-full bg-[#eee] reltive top-[15px]"></div>
                    <div className="border-dashed border-[2px] border-[#eee] absolute right-[15px] bottom-[0px] h-[200px] w-[2px]" />
                    <div className="border-dashed border-[2px] border-[#eee] absolute right-[20px] bottom-[200px] h-[2px] w-[40px]" />
                    <div className="text-[#666] text-[18px] absolute right-[80px] bottom-[190px]">
                      ثبت سفارش
                    </div>
                    <div className="absolute w-[36px] h-[36px] rounded-[35px] mt-[-20px] bg-[#fff] p-[6px] border-[3px] border-blue-400 overflow-hidden">
                      <div className="w-[22px] h-[22px] rounded-[16px] bg-blue-400 relative top-[-2px] left-[2px]"></div>
                    </div>
                  </div>
                  <div className="flex-1 relative">
                    <div className="h-[3px] w-full bg-[#eee] reltive top-[15px]"></div>
                    <div className="border-dashed border-[2px] border-[#eee] absolute right-[15px] top-[0px] h-[200px] w-[2px]" />
                    <div className="border-dashed border-[2px] border-[#eee] absolute right-[20px] top-[200px] h-[2px] w-[40px]" />
                    <div className="text-[#666] text-[18px] absolute right-[80px] top-[190px]">
                      تخمین قیمت
                    </div>
                    <div className="absolute w-[36px] h-[36px] rounded-[35px] mt-[-20px] bg-[#fff] p-[6px] border-[3px] border-blue-400 overflow-hidden">
                      <div className="w-[22px] h-[22px] rounded-[16px] bg-blue-400 relative top-[-2px] left-[2px]"></div>
                    </div>
                  </div>
                  <div className="flex-1 relative">
                    <div className="h-[3px] w-full bg-[#eee] reltive top-[15px]"></div>
                    <div className="border-dashed border-[2px] border-[#eee] absolute right-[15px] bottom-[0px] h-[200px] w-[2px]" />
                    <div className="border-dashed border-[2px] border-[#eee] absolute right-[20px] bottom-[200px] h-[2px] w-[40px]" />
                    <div className="text-[#666] text-[18px] absolute right-[80px] bottom-[190px]">
                      یافتن ارزان ترین قیمت
                    </div>
                    <div className="absolute w-[36px] h-[36px] rounded-[35px] mt-[-20px] bg-[#fff] p-[6px] border-[3px] border-blue-400 overflow-hidden">
                      <div className="w-[22px] h-[22px] rounded-[16px] bg-blue-400 relative top-[-2px] left-[2px]"></div>
                    </div>
                  </div>
                  <div className="flex-1 relative">
                    <div className="h-[3px] w-full bg-[#eee] reltive top-[15px]"></div>
                    <div className="border-dashed border-[2px] border-[#eee] absolute right-[15px] top-[0px] h-[200px] w-[2px]" />
                    <div className="border-dashed border-[2px] border-[#eee] absolute right-[20px] top-[200px] h-[2px] w-[40px]" />
                    <div className="text-[#666] text-[18px] absolute right-[80px] top-[190px]">
                      تخمین قیمت
                    </div>
                    <div className="absolute w-[36px] h-[36px] rounded-[35px] mt-[-20px] bg-[#fff] p-[6px] border-[3px] border-blue-400 overflow-hidden">
                      <div className="w-[22px] h-[22px] rounded-[16px] bg-blue-400 relative top-[-2px] left-[2px]"></div>
                    </div>
                  </div>
                  <div className="flex-1 relative">
                    <div className="h-[3px] w-full bg-[#eee] reltive top-[15px]"></div>
                    <div className="border-dashed border-[2px] border-[#eee] absolute right-[15px] bottom-[0px] h-[200px] w-[2px]" />
                    <div className="border-dashed border-[2px] border-[#eee] absolute right-[20px] bottom-[200px] h-[2px] w-[40px]" />
                    <div className="text-[#666] text-[18px] absolute right-[80px] bottom-[190px]">
                      انتخاب فروشنده
                    </div>
                    <div className="absolute w-[36px] h-[36px] rounded-[35px] mt-[-20px] bg-[#fff] p-[6px] border-[3px] border-blue-400 overflow-hidden">
                      <div className="w-[22px] h-[22px] rounded-[16px] bg-blue-400 relative top-[-2px] left-[2px]"></div>
                    </div>
                  </div>
                  <div className="flex-1 relative">
                    <div className="h-[3px] w-full bg-[#eee] reltive top-[15px]"></div>
                    <div className="border-dashed border-[2px] border-[#eee] absolute right-[15px] top-[0px] h-[200px] w-[2px]" />
                    <div className="border-dashed border-[2px] border-[#eee] absolute right-[20px] top-[200px] h-[2px] w-[40px]" />
                    <div className="text-[#666] text-[18px] absolute right-[80px] top-[190px]">
                      پرداخت و دریافت کالا
                    </div>
                    <div className="absolute w-[36px] h-[36px] rounded-[35px] mt-[-20px] bg-[#fff] p-[6px] border-[3px] border-blue-400 overflow-hidden">
                      <div className="w-[22px] h-[22px] rounded-[16px] bg-blue-400 relative top-[-2px] left-[2px]"></div>
                    </div>
                    <div className="text-[#666] text-[18px] absolute right-[170px] w-[105px] top-[30px]">
                      تکمیل سفارش
                    </div>
                    <div className="absolute w-[36px] h-[36px] left-[0px] rounded-[35px] mt-[-20px] bg-[#fff] p-[6px] border-[3px] border-blue-400 overflow-hidden">
                      <div className="w-[22px] h-[22px] rounded-[16px] bg-blue-400 relative top-[-2px] left-[2px]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center px-4 py-8 text-right">
          <div className="flex flex-col relative">
            {[
              "تخمین قیمت",
              "یافتن ارزان‌ترین قیمت",
              "انتخاب فروشنده",
              "پرداخت و دریافت کالا",
            ].map((label, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 rtl:space-x-revers"
              >
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full border-4 border-blue-500 bg-white" />
                  {index !== 3 && <div className="w-px h-10 bg-gray-300" />}
                </div>
                <span
                  className={`text-base ${
                    index !== 3 ? "mt-[-40px]" : "mt-[-5px]"
                  } pr-[10px]`}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
