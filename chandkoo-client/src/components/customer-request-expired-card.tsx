import { Avatar, Card, Image, Tag, Grid } from "antd";
import { BiUser } from "react-icons/bi";
import { BsClock } from "react-icons/bs";
import { IoImageOutline } from "react-icons/io5";
import { config } from "../services/config.service";

const { useBreakpoint } = Grid;

export default function CustomerRequestExpireCard({
  request,
}: {
  request: any;
}) {
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const isTablet = !screens.lg;

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
    // You can replace this with actual price calculation from your data
    return "۶ میلیون تومان";
  };

  return (
    <Card
      className={`w-full mb-6 shadow-sm hover:shadow-lg transition-all duration-300 rounded-2xl border-0 ${
        request.hasResponse
          ? "bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-l-green-500"
          : "bg-gradient-to-r from-gray-50 to-slate-50 border-l-4 border-l-gray-400"
      }`}
      bodyStyle={{
        padding: isMobile ? "12px" : "20px",
        position: "relative",
      }}
    >
      {/* Expired Badge */}
      <div className="absolute -top-2 -left-2 z-10">
        <Tag color="red" className="text-xs font-bold px-3 py-1 shadow-md">
          منقضی شده
        </Tag>
      </div>

      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3 mb-4 pt-2">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div
            className={`p-2 rounded-lg ${
              request.hasResponse
                ? "bg-green-100 text-green-600"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            <BsClock size={isMobile ? 16 : 20} />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-bold text-gray-800 text-lg lg:text-xl truncate">
              {request.title}
            </h3>
            <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
              <BsClock size={12} />
              <span>تاریخ ارسال قیمت: {formatDate(request.expiredAt)}</span>
            </div>
          </div>
        </div>

        {/* Status Indicator */}
        {request.hasResponse && (
          <Tag color="green" className="text-sm font-medium px-3 py-1">
            پاسخ داده شده
          </Tag>
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-col md:flex-row gap-4 items-start">
        {/* Image Section */}
        <div className="flex-shrink-0">
          {request.attachedImage ? (
            <Image
              src={`${config.BACKEND_IMAGE_URL}/api/${request.attachedImage}`}
              width={isMobile ? 80 : 120}
              height={isMobile ? 80 : 120}
              className="rounded-lg object-cover border shadow-sm"
              preview={false}
              alt={request.title}
            />
          ) : (
            <div className="relative">
              <Avatar
                size={isMobile ? 80 : 120}
                className="rounded-lg bg-gray-100 border flex items-center justify-center"
                icon={
                  <IoImageOutline
                    size={isMobile ? 24 : 32}
                    className="text-gray-400"
                  />
                }
              />
              <div className="absolute -bottom-1 -right-1 bg-gray-500 text-white rounded-full p-1">
                <BsClock size={10} />
              </div>
            </div>
          )}
        </div>

        {/* Description Section */}
        <div className="flex-1 min-w-0">
          <p className="text-gray-600 leading-relaxed text-justify text-sm lg:text-base line-clamp-3 lg:line-clamp-4">
            {request.description}
          </p>

          {/* Additional Info - Mobile Layout */}
          {isMobile && (
            <div className="mt-3 space-y-2">
              <div className="flex items-center gap-2 text-gray-700 text-sm">
                <BiUser size={14} />
                <span>قیمت تخمینی: {getEstimatedPrice()}</span>
              </div>
            </div>
          )}
        </div>

        {/* Info Section - Desktop */}
        {!isMobile && (
          <div className="flex-shrink-0 w-full md:w-[200px] lg:w-[250px]">
            <div className="bg-white rounded-lg p-4 border space-y-3 shadow-sm">
              <div className="flex items-center gap-2 text-gray-700 text-sm lg:text-base">
                <BiUser size={16} className="text-blue-500" />
                <span className="font-medium">قیمت تخمینی:</span>
              </div>
              <div className="text-lg font-bold text-green-600 text-center">
                {getEstimatedPrice()}
              </div>

              <div className="border-t pt-2">
                <div className="flex items-center gap-2 text-red-500 text-sm">
                  <BsClock size={12} />
                  <span>وضعیت: منقضی شده</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Additional Info - Tablet Layout */}
      {isTablet && !isMobile && (
        <div className="mt-4 pt-3 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-700">
              <BiUser size={14} />
              <span>قیمت تخمینی: {getEstimatedPrice()}</span>
            </div>
            <div className="flex items-center gap-2 text-red-500 text-sm">
              <BsClock size={12} />
              <span>منقضی شده</span>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
