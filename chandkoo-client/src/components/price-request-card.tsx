import { Button, Card, Tag, Badge, Tooltip } from "antd";
import { BiShield, BiUser } from "react-icons/bi";
import { BsBicycle, BsEye, BsClock } from "react-icons/bs";
import { GiCheckMark, GiPriceTag } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineDescription, MdLockClock, MdColorLens } from "react-icons/md";
import formatPersianNumber from "../utils/numberPriceFormat";
import { useNavigate } from "react-router-dom";

// Color mapping for consistent display
const colorMap = {
  red: { label: "قرمز", hex: "#FF0000", textColor: "#FFFFFF" },
  blue: { label: "آبی", hex: "#0000FF", textColor: "#FFFFFF" },
  green: { label: "سبز", hex: "#008000", textColor: "#FFFFFF" },
  yellow: { label: "زرد", hex: "#FFFF00", textColor: "#000000" },
  orange: { label: "نارنجی", hex: "#FFA500", textColor: "#000000" },
  purple: { label: "بنفش", hex: "#800080", textColor: "#FFFFFF" },
  pink: { label: "صورتی", hex: "#FFC0CB", textColor: "#000000" },
  black: { label: "مشکی", hex: "#000000", textColor: "#FFFFFF" },
  white: { label: "سفید", hex: "#FFFFFF", textColor: "#000000" },
  gray: { label: "خاکستری", hex: "#808080", textColor: "#FFFFFF" },
  brown: { label: "قهوه‌ای", hex: "#8B4513", textColor: "#FFFFFF" },
  gold: { label: "طلایی", hex: "#FFD700", textColor: "#000000" },
  silver: { label: "نقره‌ای", hex: "#C0C0C0", textColor: "#000000" },
};

export default function PriceRequestExpireCard({ request }: { request: any }) {
  const navigate = useNavigate();

  // Extract color from description
  const extractColorInfo = () => {
    if (!request.inquiry_description) return null;

    const colorMatch = request.inquiry_description.match(/\\ رنگ: (.+)$/);
    if (colorMatch && colorMatch[1]) {
      const colorLabel = colorMatch[1].trim();
      // Find the color by label
      const colorEntry = Object.entries(colorMap).find(
        ([, value]) => value.label === colorLabel
      );
      if (colorEntry) {
        return {
          label: colorLabel,
          value: colorEntry[0],
          hex: colorEntry[1].hex,
          textColor: colorEntry[1].textColor,
        };
      }
    }
    return null;
  };

  // Get clean description without color info
  const getCleanDescription = () => {
    if (!request.inquiry_description) return "";
    return request.inquiry_description.replace(/\\\\ رنگ: .+$/, "").trim();
  };

  const colorInfo = extractColorInfo();
  const cleanDescription = getCleanDescription();

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
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100 p-4 sm:p-6">
            <div className="flex flex-col gap-4">
              {/* Title and Description */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 break-words">
                    {request.title}
                  </h2>

                  {/* Color Badge */}
                  {colorInfo && (
                    <Tooltip title={`رنگ: ${colorInfo.label}`}>
                      <div
                        className="flex items-center gap-2 px-3 py-1 rounded-full border-2 border-white shadow-sm font-semibold text-xs transition-all duration-300 hover:scale-105"
                        style={{
                          backgroundColor: colorInfo.hex,
                          color: colorInfo.textColor,
                        }}
                      >
                        <MdColorLens size={14} />
                        <span className="font-bold">{colorInfo.label}</span>
                      </div>
                    </Tooltip>
                  )}

                  {request.responseCount > 0 && (
                    <Tag
                      color="blue"
                      className="flex items-center gap-1 text-xs font-semibold w-fit"
                    >
                      <BiUser className="text-xs" />
                      {formatPersianNumber(request.responseCount)} پاسخ
                    </Tag>
                  )}
                </div>

                {cleanDescription && (
                  <Tooltip title={cleanDescription}>
                    <div className="flex items-start gap-2 text-gray-600 text-sm">
                      <MdOutlineDescription className="text-blue-500 mt-0.5 flex-shrink-0" />
                      <p className="break-words leading-relaxed line-clamp-2">
                        {cleanDescription}
                      </p>
                    </div>
                  </Tooltip>
                )}
              </div>

              {/* Action Buttons and Date */}
              <div className="flex flex-col xs:flex-row items-stretch xs:items-center justify-between gap-3">
                <Button
                  type="primary"
                  icon={<BsEye />}
                  onClick={() => navigate(`/dashboard/responses/${request.id}`)}
                  className="bg-blue-600 hover:bg-blue-700 border-0 shadow-sm font-semibold h-10 px-4 sm:px-6 rounded-xl text-sm sm:text-base order-2 xs:order-1"
                  size="large"
                >
                  مشاهده پاسخ‌ها
                </Button>

                <div
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg min-w-0 flex-1 xs:flex-none ${
                    timeRemaining.expired
                      ? "bg-red-50 text-red-700"
                      : "bg-green-50 text-green-700"
                  } order-1 xs:order-2`}
                >
                  {timeRemaining.expired ? (
                    <MdLockClock className="text-lg flex-shrink-0" />
                  ) : (
                    <BsClock className="text-lg flex-shrink-0" />
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-sm truncate">
                      {timeRemaining.text}
                    </div>
                    <div className="text-xs opacity-80 truncate">
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
          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
              {/* Color Display - Only show if color exists */}
              {colorInfo && (
                <div className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                    <div
                      className="p-2 rounded-lg border-2 border-white shadow-sm flex-shrink-0"
                      style={{ backgroundColor: colorInfo.hex }}
                    >
                      <MdColorLens
                        size={18}
                        className="sm:w-5 sm:h-5"
                        style={{ color: colorInfo.textColor }}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-gray-700 font-medium text-sm sm:text-base truncate">
                        رنگ محصول
                      </div>
                      <div
                        className="font-bold text-xs sm:text-sm truncate px-2 py-1 rounded-full w-fit"
                        style={{
                          backgroundColor: colorInfo.hex,
                          color: colorInfo.textColor,
                        }}
                      >
                        {colorInfo.label}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Guarantee */}
              <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                  <div
                    className={`p-2 rounded-lg flex-shrink-0 ${
                      request.hasGuarantee
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    <BiShield size={18} className="sm:w-5 sm:h-5" />
                  </div>
                  <span className="text-gray-700 font-medium text-sm sm:text-base truncate">
                    گارانتی
                  </span>
                </div>
                {request.hasGuarantee ? (
                  <GiCheckMark
                    color="#10b981"
                    size={16}
                    className="font-bold flex-shrink-0"
                  />
                ) : (
                  <RxCross2
                    color="#ef4444"
                    size={16}
                    className="font-bold flex-shrink-0"
                  />
                )}
              </div>

              {/* Delivery */}
              <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                  <div
                    className={`p-2 rounded-lg flex-shrink-0 ${
                      request.includeDelivery
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    <BsBicycle size={18} className="sm:w-5 sm:h-5" />
                  </div>
                  <span className="text-gray-700 font-medium text-sm sm:text-base truncate">
                    ارسال رایگان
                  </span>
                </div>
                {request.includeDelivery ? (
                  <GiCheckMark
                    color="#10b981"
                    size={16}
                    className="font-bold flex-shrink-0"
                  />
                ) : (
                  <RxCross2
                    color="#ef4444"
                    size={16}
                    className="font-bold flex-shrink-0"
                  />
                )}
              </div>

              {/* Lowest Price */}
              <div className="flex items-center justify-between p-3 sm:p-4 bg-blue-50 rounded-xl border border-blue-200">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                  <div className="p-2 rounded-lg bg-blue-100 text-blue-600 flex-shrink-0">
                    <GiPriceTag size={18} className="sm:w-5 sm:h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-gray-700 font-medium text-sm sm:text-base truncate">
                      ارزانترین قیمت
                    </div>
                    <div className="text-blue-600 font-bold text-xs sm:text-sm truncate">
                      {formatPersianNumber(request.lowestPrice)} ریال
                    </div>
                  </div>
                </div>
              </div>

              {/* Response Count - Only show if we have color to maintain 4 columns */}
              {!colorInfo && (
                <div className="flex items-center justify-between p-3 sm:p-4 bg-purple-50 rounded-xl border border-purple-200">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                    <div className="p-2 rounded-lg bg-purple-100 text-purple-600 flex-shrink-0">
                      <BiUser size={18} className="sm:w-5 sm:h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-gray-700 font-medium text-sm sm:text-base truncate">
                        تعداد پاسخ‌ها
                      </div>
                      <div className="text-purple-600 font-bold text-xs sm:text-sm truncate">
                        {formatPersianNumber(request.responseCount)}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Additional Info Footer */}
            <div className="mt-4 pt-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              {request.responseCount > 0 && (
                <div className="flex flex-col xs:flex-row items-start xs:items-center gap-2 order-1 sm:order-2 w-full sm:w-auto">
                  <Tag color="green" className="font-semibold w-fit">
                    دارای پیشنهاد
                  </Tag>
                  <Button
                    type="link"
                    onClick={() =>
                      navigate(`/dashboard/responses/${request.id}`)
                    }
                    className="text-blue-600 font-semibold p-0 h-auto text-right xs:text-left text-sm sm:text-base"
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
