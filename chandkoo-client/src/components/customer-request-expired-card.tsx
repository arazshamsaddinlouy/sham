import {
  Avatar,
  Card,
  Image,
  Tag,
  Grid,
  Typography,
  Space,
  Divider,
} from "antd";
import { BiCalendarExclamation } from "react-icons/bi";
import { BsCurrencyDollar } from "react-icons/bs";
import { IoImageOutline, IoTimeOutline } from "react-icons/io5";
import { TbClockOff } from "react-icons/tb";
import { config } from "../services/config.service";

const { useBreakpoint } = Grid;
const { Text, Paragraph } = Typography;

export default function CustomerRequestExpireCard({
  request,
}: {
  request: any;
}) {
  const screens = useBreakpoint();

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
            <Text
              strong
              className="text-gray-800 block text-lg lg:text-xl leading-tight mb-2"
              ellipsis={{ tooltip: request.title }}
            >
              {request.title}
            </Text>

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
          {/* Description */}
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
              {request.inquiry_description}
            </Paragraph>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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

            {/* Status Card */}
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
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center">
              <Text strong className="text-gray-600 text-xs block mb-1">
                قیمت تخمینی
              </Text>
              <Text strong className="text-green-600 text-sm">
                {getEstimatedPrice()}
              </Text>
            </div>
            <div className="text-center">
              <Text strong className="text-gray-600 text-xs block mb-1">
                وضعیت
              </Text>
              <Tag color="red">منقضی شده</Tag>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
