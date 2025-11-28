import { Button, Card, Tag, Badge, Tooltip } from "antd";
import { BiShield, BiUser } from "react-icons/bi";
import { BsBicycle, BsEye, BsClock } from "react-icons/bs";
import { GiCheckMark, GiPriceTag } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineDescription, MdLockClock } from "react-icons/md";
import formatPersianNumber from "../utils/numberPriceFormat";
import { useNavigate } from "react-router-dom";

export default function PriceRequestExpireCard({ request }: { request: any }) {
  const navigate = useNavigate();

  // Calculate time remaining
  const getTimeRemaining = () => {
    const now = new Date();
    const expireDate = new Date(request.expiredAt);
    const diff = expireDate.getTime() - now.getTime();

    if (diff <= 0) return { expired: true, text: "منقضی شده" };

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0)
      return { expired: false, text: `${days} روز و ${hours} ساعت` };
    if (hours > 0) return { expired: false, text: `${hours} ساعت` };

    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return { expired: false, text: `${minutes} دقیقه` };
  };

  const timeRemaining = getTimeRemaining();

  return (
    <div className="group mb-6 transition-all duration-300 hover:transform hover:scale-[1.02]">
      <Badge.Ribbon
        text={timeRemaining.expired ? "منقضی شده" : "فعال"}
        color={timeRemaining.expired ? "red" : "green"}
        className={`${timeRemaining.expired ? "opacity-80" : ""}`}
      >
        <Card
          className="shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-blue-300 rounded-2xl overflow-hidden"
          bodyStyle={{ padding: 0 }}
        >
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100 p-6">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              {/* Title and Description */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-xl font-bold text-gray-900 truncate">
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
                      <MdOutlineDescription className="text-blue-500" />
                      <p className="truncate leading-relaxed">
                        {request.inquiry_description}
                      </p>
                    </div>
                  </Tooltip>
                )}
              </div>

              {/* Action Buttons and Date */}
              <div className="flex flex-col sm:flex-row items-end lg:items-center gap-3">
                <Button
                  type="primary"
                  icon={<BsEye />}
                  onClick={() => navigate(`/dashboard/responses/${request.id}`)}
                  className="bg-blue-600 hover:bg-blue-700 border-0 shadow-sm font-semibold h-10 px-6 rounded-xl"
                  size="large"
                >
                  مشاهده پاسخ‌ها
                </Button>

                <div
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                    timeRemaining.expired
                      ? "bg-red-50 text-red-700"
                      : "bg-green-50 text-green-700"
                  }`}
                >
                  {timeRemaining.expired ? (
                    <MdLockClock className="text-lg" />
                  ) : (
                    <BsClock className="text-lg" />
                  )}
                  <div className="text-sm font-medium">
                    <div className="font-bold">{timeRemaining.text}</div>
                    <div className="text-xs opacity-80">
                      {new Date(request.expiredAt).toLocaleDateString("fa-IR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Guarantee */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
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
                  <span className="text-gray-700 font-medium">گارانتی</span>
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
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
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
                  <span className="text-gray-700 font-medium">
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
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                    <GiPriceTag size={20} />
                  </div>
                  <div>
                    <div className="text-gray-700 font-medium">
                      ارزانترین قیمت
                    </div>
                    <div className="text-blue-600 font-bold text-sm">
                      {formatPersianNumber(request.lowestPrice)} ریال
                    </div>
                  </div>
                </div>
              </div>

              {/* Response Count */}
              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl border border-purple-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-100 text-purple-600">
                    <BiUser size={20} />
                  </div>
                  <div>
                    <div className="text-gray-700 font-medium">
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
                  <Tag color="green" className="font-semibold">
                    دارای پیشنهاد
                  </Tag>
                  <Button
                    type="link"
                    onClick={() =>
                      navigate(`/dashboard/responses/${request.id}`)
                    }
                    className="text-blue-600 font-semibold p-0 h-auto"
                  >
                    مشاهده {formatPersianNumber(request.responseCount)} پیشنهاد
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Card>
      </Badge.Ribbon>
    </div>
  );
}
