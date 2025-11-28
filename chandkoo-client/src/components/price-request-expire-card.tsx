import { Card, Tag, Badge, Tooltip } from "antd";
import { BiShield, BiUser } from "react-icons/bi";
import { BsBicycle, BsClock, BsExclamationCircle } from "react-icons/bs";
import { GiCheckMark, GiPriceTag } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineDescription } from "react-icons/md";
import formatPersianNumber from "../utils/numberPriceFormat";

export default function PriceRequestExpireCard({ request }: { request: any }) {
  // Format expiration date for display
  const formattedExpireDate = new Date(request.expiredAt).toLocaleDateString(
    "fa-IR",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  return (
    <div className="group mb-6 transition-all duration-300 opacity-80 hover:opacity-100">
      <Badge.Ribbon text="منقضی شده" color="red" className="opacity-90">
        <Card
          className="shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-red-200 rounded-2xl overflow-hidden bg-white"
          bodyStyle={{ padding: 0 }}
        >
          {/* Header Section with Red Theme */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 border-b border-gray-100 p-6">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              {/* Title and Description */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-xl font-bold text-gray-800 truncate line-through">
                    {request.title}
                  </h2>
                  {request.responseCount > 0 && (
                    <Tag
                      color="blue"
                      className="flex items-center gap-1 text-xs font-semibold"
                    >
                      <BiUser className="text-xs" />
                      {formatPersianNumber(request.responseCount)} پاسخ
                    </Tag>
                  )}
                </div>

                {request.inquiry_description && (
                  <Tooltip title={request.inquiry_description}>
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <MdOutlineDescription className="text-red-500" />
                      <p className="truncate leading-relaxed">
                        {request.inquiry_description}
                      </p>
                    </div>
                  </Tooltip>
                )}
              </div>

              {/* Expiration Date */}
              <div className="flex items-center gap-2 px-4 py-3 bg-red-100 border border-red-200 rounded-xl">
                <BsExclamationCircle className="text-red-600 text-lg" />
                <div className="text-right">
                  <div className="text-red-700 font-bold text-sm">
                    منقضی شده
                  </div>
                  <div className="text-red-600 text-xs">
                    {formattedExpireDate}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Guarantee */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200 opacity-75">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      request.hasGuarantee
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    <BiShield size={20} />
                  </div>
                  <span className="text-gray-600 font-medium">گارانتی</span>
                </div>
                {request.hasGuarantee ? (
                  <GiCheckMark
                    color="#10b981"
                    size={18}
                    className="font-bold"
                  />
                ) : (
                  <RxCross2 color="#ef4444" size={18} className="font-bold" />
                )}
              </div>

              {/* Delivery */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200 opacity-75">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      request.includeDelivery
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    <BsBicycle size={20} />
                  </div>
                  <span className="text-gray-600 font-medium">
                    ارسال رایگان
                  </span>
                </div>
                {request.includeDelivery ? (
                  <GiCheckMark
                    color="#10b981"
                    size={18}
                    className="font-bold"
                  />
                ) : (
                  <RxCross2 color="#ef4444" size={18} className="font-bold" />
                )}
              </div>

              {/* Lowest Price */}
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-200 opacity-75">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                    <GiPriceTag size={20} />
                  </div>
                  <div>
                    <div className="text-gray-600 font-medium">
                      ارزانترین قیمت
                    </div>
                    <div className="text-blue-600 font-bold text-sm">
                      {formatPersianNumber(request.lowestPrice)} ریال
                    </div>
                  </div>
                </div>
              </div>

              {/* Response Count */}
              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl border border-purple-200 opacity-75">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-100 text-purple-600">
                    <BiUser size={20} />
                  </div>
                  <div>
                    <div className="text-gray-600 font-medium">
                      تعداد پاسخ‌ها
                    </div>
                    <div className="text-purple-600 font-bold text-sm">
                      {formatPersianNumber(request.responseCount)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Info Footer */}
            <div className="mt-4 pt-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-3">
              <div className="text-sm text-gray-500 flex items-center gap-2">
                <BsClock className="text-gray-400" />
                ایجاد شده در{" "}
                {new Date(request.createdAt).toLocaleDateString("fa-IR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>

              {request.responseCount > 0 && (
                <div className="flex items-center gap-2">
                  <Tag color="green" className="font-semibold opacity-75">
                    دارای {formatPersianNumber(request.responseCount)} پیشنهاد
                  </Tag>
                </div>
              )}

              {request.responseCount === 0 && (
                <Tag color="default" className="font-semibold opacity-75">
                  بدون پیشنهاد
                </Tag>
              )}
            </div>

            {/* Expired Notice */}
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-center">
              <div className="flex items-center justify-center gap-2 text-red-700">
                <BsExclamationCircle className="text-lg" />
                <span className="font-semibold">
                  این درخواست منقضی شده و دیگر فعال نیست
                </span>
              </div>
              <p className="text-red-600 text-sm mt-1">
                امکان ارسال پیشنهاد جدید برای این درخواست وجود ندارد
              </p>
            </div>
          </div>
        </Card>
      </Badge.Ribbon>
    </div>
  );
}
