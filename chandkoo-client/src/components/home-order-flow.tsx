import SectionHeadings from "./section-headings";

const steps = [
  {
    title: "درخواست تخمین قیمت",
    subtitle: "کاربر درخواست خود را برای دریافت تخمین قیمت ثبت می‌کند",
  },
  {
    title: "ارسال قیمت توسط فروشنده",
    subtitle: "فروشنده قیمت پیشنهادی خود را ارائه می‌دهد",
  },
  {
    title: "مقایسه قیمت ها و شرایط",
    subtitle: "کاربر قیمت‌ها و شرایط فروشندگان مختلف را بررسی می‌کند",
  },
  {
    title: "انتخاب فروشنده",
    subtitle: "کاربر فروشنده مناسب را انتخاب می‌کند",
  },
  {
    title: "سفارش نهایی و دریافت کالا",
    subtitle: "سفارش ثبت و کالا به کاربر تحویل داده می‌شود",
  },
];

export default function HomeOrderFlow() {
  return (
    <div className="mb-24">
      <div className="pb-8">
        <SectionHeadings title={"ثبت سفارش"} />
      </div>
      <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-8">
        {/* Left image */}
        <div className="flex-1 flex justify-center lg:justify-start">
          <img
            src={"/images/shop-process.png"}
            className="max-h-[500px] lg:max-h-[600px] w-auto object-contain"
            alt="shop process"
          />
        </div>

        {/* Steps timeline */}
        <div className="flex-1 rtl">
          <div className="flex flex-col space-y-10">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start gap-4">
                {/* Circle + line */}
                <div className="flex flex-col items-center">
                  {/* Number circle */}
                  <div className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-green-600 text-green-600 bg-white font-bold text-base">
                    {index + 1}
                  </div>
                  {/* Connector line */}
                  {index !== steps.length - 1 && (
                    <div className="flex-1 w-px min-h-[60px] mt-2 border-dashed border-l-2 border-green-400 mb-[-30px]"></div>
                  )}
                </div>

                {/* Text */}
                <div className="flex-1">
                  <h3 className="text-green-600 font-semibold text-base sm:text-lg">
                    {step.title}
                  </h3>
                  <p className="text-green-500 text-sm mt-1">{step.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
