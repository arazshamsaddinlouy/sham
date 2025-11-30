import { Card, Tag, Badge, Tooltip } from "antd";
import { BiShield, BiUser } from "react-icons/bi";
import { BsBicycle, BsExclamationCircle } from "react-icons/bs";
import { GiCheckMark, GiPriceTag } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineDescription, MdColorLens } from "react-icons/md";
import formatPersianNumber from "../utils/numberPriceFormat";

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
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                  <h2 className="text-xl font-bold text-gray-800 truncate line-through">
                    {request.title}
                  </h2>

                  {/* Color Badge */}
                  {colorInfo && (
                    <Tooltip title={`رنگ: ${colorInfo.label}`}>
                      <div
                        className="flex items-center gap-2 px-3 py-1 rounded-full border-2 border-white shadow-sm font-semibold text-xs transition-all duration-300 hover:scale-105 flex-shrink-0"
                        style={{
                          backgroundColor: colorInfo.hex,
                          color: colorInfo.textColor,
                        }}
                      >
                        <MdColorLens size={12} />
                        <span className="font-bold">{colorInfo.label}</span>
                      </div>
                    </Tooltip>
                  )}

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

                {cleanDescription && (
                  <Tooltip title={cleanDescription}>
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <MdOutlineDescription className="text-red-500" />
                      <p className="truncate leading-relaxed">
                        {cleanDescription}
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
            <div
              className={`grid ${
                colorInfo
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
                  : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
              } gap-4`}
            >
              {/* Color Display - Only show if color exists */}
              {colorInfo && (
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 opacity-75">
                  <div className="flex items-center gap-3 flex-1">
                    <div
                      className="p-2 rounded-lg border-2 border-white shadow-sm flex-shrink-0"
                      style={{ backgroundColor: colorInfo.hex }}
                    >
                      <MdColorLens
                        size={18}
                        style={{ color: colorInfo.textColor }}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-gray-600 font-medium truncate">
                        رنگ محصول
                      </div>
                      <div
                        className="font-bold text-sm truncate px-2 py-1 rounded-full w-fit mt-1"
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

              {/* Response Count - Only show if we don't have color to maintain 4 columns */}
              {!colorInfo && (
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
              )}
            </div>

            {/* Additional Info Footer */}
            <div className="mt-4 pt-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-3">
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
