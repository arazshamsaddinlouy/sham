import {
  Avatar,
  Card,
  Image,
  Tag,
  Grid,
  Typography,
  Space,
  Divider,
  Tooltip,
} from "antd";
import { BiCalendarExclamation } from "react-icons/bi";
import { BsCurrencyDollar } from "react-icons/bs";
import { IoImageOutline, IoTimeOutline } from "react-icons/io5";
import { TbClockOff } from "react-icons/tb";
import { MdColorLens } from "react-icons/md";
import { config } from "../services/config.service";

const { useBreakpoint } = Grid;
const { Text, Paragraph } = Typography;

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

export default function CustomerRequestExpireCard({
  request,
}: {
  request: any;
}) {
  const screens = useBreakpoint();

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getEstimatedPrice = () => {
    return "۶ میلیون تومان";
  };

  const getCardStyle = () => {
    if (request.hasResponse) {
      return {
        background: "linear-gradient(135deg, #fefce8 0%, #fef3c7 100%)",
        border: "1px solid #fcd34d",
        borderLeft: "4px solid #d97706",
      };
    }
    return {
      background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
      border: "1px solid #e2e8f0",
      borderLeft: "4px solid #94a3b8",
    };
  };

  return (
    <Card
      className="w-full mb-6 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden relative"
      bodyStyle={{
        padding: screens.xs ? "16px" : "24px",
        position: "relative",
      }}
      style={getCardStyle()}
    >
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row gap-4 items-start mb-4">
        {/* Title and Info */}
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="p-3 rounded-xl bg-amber-100 text-amber-600 flex-shrink-0">
            <BiCalendarExclamation size={screens.xs ? 18 : 22} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
              <Text
                strong
                className="text-gray-800 block text-lg lg:text-xl leading-tight"
                ellipsis={{ tooltip: request.title }}
              >
                {request.title}
              </Text>

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
            </div>

            <div className="flex items-center gap-2 text-amber-600">
              <IoTimeOutline size={screens.xs ? 14 : 16} />
              <Text className="text-sm font-medium">
                تاریخ انقضا: {formatDate(request.expiredAt)}
              </Text>
            </div>
          </div>
        </div>

        {/* Status Badge */}
        {request.hasResponse && (
          <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-2">
            <div className="flex items-center gap-2 text-green-700">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <Text strong className="text-sm">
                پاسخ داده شده
              </Text>
            </div>
          </div>
        )}
      </div>

      <Divider className="my-4" />

      {/* Content Section */}
      <div className="flex flex-col xl:flex-row gap-6 items-start">
        {/* Image Section */}
        <div className="flex-shrink-0 mx-auto xl:mx-0">
          {request.attachedImage ? (
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Image
                src={`${config.BACKEND_IMAGE_URL}/api/${request.attachedImage}`}
                width={screens.xs ? 100 : screens.sm ? 120 : 140}
                height={screens.xs ? 100 : screens.sm ? 120 : 140}
                className="rounded-xl object-cover border-2 border-white shadow-md group-hover:shadow-lg transition-all duration-300"
                preview={{
                  mask: <div className="text-white text-sm">مشاهده تصویر</div>,
                }}
                alt={request.title}
              />
              <div className="absolute -top-2 -right-2 bg-amber-500 text-white rounded-full p-1 shadow-lg">
                <TbClockOff size={12} />
              </div>
            </div>
          ) : (
            <div className="relative">
              <Avatar
                size={screens.xs ? 100 : screens.sm ? 120 : 140}
                className="rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-white shadow-md flex items-center justify-center"
                icon={
                  <IoImageOutline
                    size={screens.xs ? 32 : 40}
                    className="text-gray-400"
                  />
                }
              />
              <div className="absolute -top-2 -right-2 bg-amber-500 text-white rounded-full p-2 shadow-lg">
                <TbClockOff size={screens.xs ? 12 : 14} />
              </div>
            </div>
          )}
        </div>

        {/* Description Section */}
        <div className="flex-1 min-w-0 space-y-4">
          {/* Color Display Card */}
          {colorInfo && (
            <div className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                <div
                  className="p-2 rounded-lg border-2 border-white shadow-sm flex-shrink-0"
                  style={{ backgroundColor: colorInfo.hex }}
                >
                  <MdColorLens
                    size={16}
                    className="sm:w-4 sm:h-4"
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

          {/* Description */}
          {cleanDescription && (
            <div className="bg-white/80 rounded-xl p-4 border border-gray-100 shadow-sm">
              <Paragraph
                className="text-gray-600 leading-relaxed text-justify"
                ellipsis={{
                  rows: screens.xs ? 3 : 4,
                  expandable: true,
                  symbol: (expanded) => (
                    <Tag color="orange" className="cursor-pointer mt-2">
                      {expanded ? "کمتر" : "بیشتر"}
                    </Tag>
                  ),
                }}
                style={{
                  fontSize: screens.xs ? "14px" : "15px",
                  lineHeight: "1.7",
                }}
              >
                {cleanDescription}
              </Paragraph>
            </div>
          )}

          {/* Info Cards */}
          <div
            className={`grid ${
              colorInfo ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"
            } gap-3`}
          >
            {/* Price Card */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-2">
                <BsCurrencyDollar className="text-green-600" />
                <Text strong className="text-green-800 text-sm">
                  قیمت تخمینی
                </Text>
              </div>
              <div className="text-lg font-bold text-green-700 text-center">
                {getEstimatedPrice()}
              </div>
            </div>

            {/* Status Card - Only show if no color to maintain layout */}
            {!colorInfo && (
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-2">
                  <TbClockOff className="text-amber-600" />
                  <Text strong className="text-amber-800 text-sm">
                    وضعیت درخواست
                  </Text>
                </div>
                <div className="text-center">
                  <Tag color="orange" className="font-bold text-xs">
                    منقضی شده
                  </Tag>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Side Info Panel - Desktop */}
        {!screens.xs && (
          <div className="flex-shrink-0 w-full xl:w-[200px] space-y-4">
            {/* Summary Card */}
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <Text strong className="text-gray-800 block mb-3 text-center">
                خلاصه درخواست
              </Text>

              <Space direction="vertical" className="w-full" size="small">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <Text className="text-gray-600 text-sm">وضعیت:</Text>
                  <Tag color="red">منقضی شده</Tag>
                </div>

                {colorInfo && (
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <Text className="text-gray-600 text-sm">رنگ:</Text>
                    <div
                      className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: colorInfo.hex }}
                      title={colorInfo.label}
                    />
                  </div>
                )}

                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <Text className="text-gray-600 text-sm">پاسخ:</Text>
                  <Tag color={request.hasResponse ? "green" : "default"}>
                    {request.hasResponse ? "دارد" : "ندارد"}
                  </Tag>
                </div>

                <div className="flex justify-between items-center py-2">
                  <Text className="text-gray-600 text-sm">قیمت:</Text>
                  <Text strong className="text-green-600 text-sm">
                    {getEstimatedPrice()}
                  </Text>
                </div>
              </Space>
            </div>

            {/* Warning Card */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
              <div className="flex items-start gap-2">
                <TbClockOff className="text-amber-600 mt-0.5 flex-shrink-0" />
                <Text className="text-amber-800 text-xs leading-relaxed">
                  این درخواست منقضی شده است. امکان ارسال پاسخ جدید وجود ندارد.
                </Text>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Bottom Info */}
      {screens.xs && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div
            className={`grid ${
              colorInfo ? "grid-cols-3" : "grid-cols-2"
            } gap-3`}
          >
            <div className="text-center">
              <Text strong className="text-gray-600 text-xs block mb-1">
                قیمت تخمینی
              </Text>
              <Text strong className="text-green-600 text-sm">
                {getEstimatedPrice()}
              </Text>
            </div>

            {colorInfo && (
              <div className="text-center">
                <Text strong className="text-gray-600 text-xs block mb-1">
                  رنگ
                </Text>
                <div
                  className="w-6 h-6 rounded-full border-2 border-white shadow-sm mx-auto"
                  style={{ backgroundColor: colorInfo.hex }}
                  title={colorInfo.label}
                />
              </div>
            )}

            <div className="text-center">
              <Text strong className="text-gray-600 text-xs block mb-1">
                وضعیت
              </Text>
              <Tag color="red" className="text-xs">
                منقضی شده
              </Tag>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
