import { useState } from "react";
import {
  Check,
  Star,
  Crown,
  Zap,
  Shield,
  Clock,
  Users,
  Headphones,
} from "lucide-react";

interface Package {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  popular?: boolean;
  features: string[];
  icon: React.ReactNode;
  color: string;
  buttonText: string;
}

export default function Packages() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">(
    "monthly"
  );

  const packages: Package[] = [
    {
      id: "basic",
      name: "پکیج پایه",
      price: 290000,
      originalPrice: 490000,
      description: "مناسب برای افراد تازه کار",
      features: [
        "حداکثر ۵ پروژه",
        "آنالیتیکس پایه",
        "پشتیبانی ایمیلی",
        "۱ گیگابایت فضای ذخیره‌سازی",
        "تمپلیت‌های استاندارد",
        "دسترسی به اپلیکیشن موبایل",
      ],
      icon: <Zap className="w-8 h-8" />,
      color: "blue",
      buttonText: "شروع کنید",
    },
    {
      id: "silver",
      name: "پکیج نقره‌ای",
      price: 790000,
      originalPrice: 990000,
      description: "عالی برای تیم‌ها و کسب‌وکارهای در حال رشد",
      popular: true,
      features: [
        "حداکثر ۲۰ پروژه",
        "آنالیتیکس پیشرفته",
        "پشتیبانی ایمیل و چت اولویت‌دار",
        "۱۰ گیگابایت فضای ذخیره‌سازی",
        "تمپلیت‌های پریمیوم",
        "همکاری تیمی",
        "برندینگ اختصاصی",
        "دسترسی به API",
      ],
      icon: <Shield className="w-8 h-8" />,
      color: "purple",
      buttonText: "۱۴ روز试用 رایگان",
    },
    {
      id: "gold",
      name: "پکیج طلایی",
      price: 1490000,
      originalPrice: 1990000,
      description: "برای سازمان‌ها با نیازهای پیشرفته",
      features: [
        "پروژه‌های نامحدود",
        "آنالیتیکس و گزارش‌دهی پیشرفته",
        "پشتیبانی تلفنی ۲۴/۷",
        "۱۰۰ گیگابایت فضای ذخیره‌سازی",
        "تمامی تمپلیت‌های پریمیوم",
        "قابلیت‌های پیشرفته تیمی",
        "راه‌حل سفیدبرچسب",
        "دسترسی پیشرفته به API",
        "مدیر حساب اختصاصی",
        "یکپارچه‌سازی‌های سفارشی",
      ],
      icon: <Crown className="w-8 h-8" />,
      color: "amber",
      buttonText: "تماس با فروش",
    },
  ];

  const getPrice = (price: number) => {
    return billingPeriod === "yearly" ? Math.floor(price * 10 * 0.8) : price;
  };

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "from-blue-500 to-blue-600 border-blue-200 text-blue-600",
      purple: "from-purple-500 to-purple-600 border-purple-200 text-purple-600",
      amber: "from-amber-500 to-amber-600 border-amber-200 text-amber-600",
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getButtonClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
      purple: "bg-purple-600 hover:bg-purple-700 focus:ring-purple-500",
      amber: "bg-amber-600 hover:bg-amber-700 focus:ring-amber-500",
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fa-IR").format(price);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* هدر */}
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            پلن مورد نظر خود را انتخاب کنید
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            پلن مناسب نیازهای خود را انتخاب کنید. تمامی پلن‌ها شامل ویژگی‌های
            اصلی با سطوح مختلف دسترسی و پشتیبانی می‌باشند.
          </p>

          {/* انتخاب دوره پرداخت */}
          <div className="flex items-center justify-center gap-4 mb-2">
            <span
              className={`text-sm font-medium ${
                billingPeriod === "monthly" ? "text-gray-900" : "text-gray-500"
              }`}
            >
              ماهانه
            </span>
            <button
              onClick={() =>
                setBillingPeriod(
                  billingPeriod === "monthly" ? "yearly" : "monthly"
                )
              }
              className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              role="switch"
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  billingPeriod === "yearly" ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
            <span
              className={`text-sm font-medium ${
                billingPeriod === "yearly" ? "text-gray-900" : "text-gray-500"
              }`}
            >
              سالانه
            </span>
            {billingPeriod === "yearly" && (
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                ۲۰٪ ذخیره
              </span>
            )}
          </div>
        </div>

        {/* کارت‌های پکیج */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                pkg.popular
                  ? "border-purple-500 ring-2 ring-purple-200"
                  : "border-gray-200"
              }`}
            >
              {/* نشان محبوب */}
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Star className="w-4 h-4 fill-current" />
                    پرفروش ترین
                  </div>
                </div>
              )}

              <div className="p-6 sm:p-8">
                {/* هدر پکیج */}
                <div className="text-center mb-6">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${getColorClasses(
                      pkg.color
                    )} text-white mb-4`}
                  >
                    {pkg.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {pkg.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {pkg.description}
                  </p>
                </div>

                {/* قیمت */}
                <div className="text-center mb-6">
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-4xl font-bold text-gray-900">
                      {formatPrice(getPrice(pkg.price))}
                    </span>
                    <span className="text-gray-500">تومان</span>
                  </div>
                  {pkg.originalPrice && (
                    <div className="flex items-center justify-center gap-2 mt-1">
                      <span className="text-lg text-gray-400 line-through">
                        {formatPrice(getPrice(pkg.originalPrice))}
                      </span>
                      <span className="text-green-600 text-sm font-medium">
                        {Math.round((1 - pkg.price / pkg.originalPrice) * 100)}%
                        ذخیره
                      </span>
                    </div>
                  )}
                  <p className="text-gray-500 text-sm mt-2">
                    {billingPeriod === "monthly" ? "هر ماه" : "هر سال"}
                  </p>
                </div>

                {/* ویژگی‌ها */}
                <div className="mb-8">
                  <ul className="space-y-3">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* دکمه اقدام */}
                <button
                  className={`w-full py-3 px-6 text-white font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${getButtonClasses(
                    pkg.color
                  )}`}
                >
                  {pkg.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* اطلاعات اضافی */}
        <div className="mt-16 bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              سوالات متداول
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                ضمانت بازگشت وجه
              </h3>
              <p className="text-gray-600 text-sm">
                ۳۰ روز ضمانت بازگشت وجه بدون قید و شرط
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Headphones className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                پشتیبانی ۲۴/۷
              </h3>
              <p className="text-gray-600 text-sm">
                پشتیبانی تمام وقت توسط متخصصان ما
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                بروزرسانی رایگان
              </h3>
              <p className="text-gray-600 text-sm">
                بروزرسانی‌های رایگان در طول دوره اشتراک
              </p>
            </div>

            <div className="text-center">
              <div className="bg-amber-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">جامعه کاربری</h3>
              <p className="text-gray-600 text-sm">
                دسترسی به جامعه متخصصان و توسعه‌دهندگان
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
