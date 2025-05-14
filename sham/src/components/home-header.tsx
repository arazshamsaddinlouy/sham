import { useNavigate } from "react-router-dom";

export default function HomeHeader() {
  const navigate = useNavigate();
  return (
    <div className="relative h-[550px] max-lg:h-[400px] overflow-hidden bg-[#444]">
      <div className="flex max-md:flex-col">
        <div className="flex-1 bg-[#f5f5f5] max-lg:mt-[-90px]">
          <div className="text-right p-[0_60px] max-lg:p-[0px] max-lg:pt-[10px] relative overflow-hidden">
            <div className="relative z-[3] flex flex-col gap-[10px] h-[550px] justify-center">
              <h1 className="text-[40px] mb-[20px] text-[#111] font-bold max-lg:text-[25px] max-lg:px-[30px]">
                سامانه خرید و فروش آنلاین
              </h1>

              <h2 className="text-[16px] text-[#666] mb-[10px] leading-[36px] max-lg:text-[16px] max-lg:px-[30px]">
                <p>
                  شما از طریق این سامانه میتوانید محصولات خود را خرید و فروش
                  نمایید.
                </p>
                <p>
                  همچنین روی نقشه میتوانین نزدیک ترین فروشندگان را یافت و بهترین
                  قیمت را پیدا کنید.  
                </p>
              </h2>
              <div>
                <div className="rounded-full border-[10px] mr-[30px] inline-block border-[rgba(33,150,243,0.3)]">
                  <button
                    onClick={() => navigate("/dashboard/request-price")}
                    type="button"
                    className="bg-blue-600 h-[60px] rounded-full text-[22px] text-white p-[5px_40px] max-lg:p-[5px_15px] max-lg:text-[15px]"
                  >
                    استعلام قیمت
                    <span aria-hidden="true" className="mr-[5px]">
                      &larr;
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 max-lg:hidden bg-[#eee] h-[550px] relative overflow-hidden">
          <div className="absolute w-[150%] h-[150%] left-[-25%] top-[-25%] opacity-[0.04] bg-[url('/images/header-pattern.jpg')] bg-cover bg-center" />
          <div className="flex flex-col h-[550px] justify-center">
            <div className="flex">
              <div className="flex-1">
                <div className="text-center">
                  <div className="flex flex-col items-center justify-center p-[10px]">
                    <div>
                      <svg
                        className="size-8 w-[90px] h-[90px] text-gray-600 group-hover:text-indigo-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                        data-slot="icon"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
                        />
                      </svg>
                    </div>
                    <div className="text-[42px] text-[#333]">
                      +۴۰ <span className="text-[16px]"> هزار</span>
                    </div>
                    <div className="text-[15px] text-[#666]">کاربر فعال</div>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div className="text-center">
                  <div className="flex flex-col items-center justify-center p-[10px]">
                    <div>
                      <svg
                        className="size-8 w-[90px] h-[90px] text-gray-600 group-hover:text-indigo-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                        data-slot="icon"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
                        />
                      </svg>
                    </div>
                    <div className="text-[42px] text-[#333]">
                      +۱۰۰ <span className="text-[16px]"> هزار</span>
                    </div>
                    <div className="text-[15px] text-[#666]">
                      خرید و فروش موفق
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex">
              <div className="flex-1">
                <div className="text-center">
                  <div className="flex flex-col items-center justify-center p-[30px]">
                    <div>
                      <svg
                        className="size-8 w-[90px] h-[90px] text-gray-600 group-hover:text-indigo-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                        data-slot="icon"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
                        />
                      </svg>
                    </div>
                    <div className="text-[42px] text-[#333]">
                      +۲۰ <span className="text-[16px]"> هزار</span>
                    </div>
                    <div className="text-[15px] text-[#666]">فروشنده</div>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div className="text-center">
                  <div className="flex flex-col items-center justify-center p-[30px]">
                    <div>
                      <svg
                        className="size-8 w-[90px] h-[90px] text-gray-600 group-hover:text-indigo-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                        data-slot="icon"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
                        />
                      </svg>
                    </div>
                    <div className="text-[42px] text-[#333]">
                      +۴۰ <span className="text-[16px]"> هزار</span>
                    </div>
                    <div className="text-[15px] text-[#666]">خریدار</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
