import { Card, Space } from "antd";
import { BiShield, BiUser } from "react-icons/bi";
import { BsBicycle, BsClock } from "react-icons/bs";
import { GiCheckMark, GiPriceTag } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import formatPersianNumber from "../utils/numberPriceFormat";

export default function PriceRequestCard({ request }: { request: any }) {
  return (
    <Space direction="vertical" className="flex flex-col mb-5" size={16}>
      <Card
        className={`${
          request.hasRead === 0
            ? "bg-[rgba(51,235,145,0.2)] border border-[rgba(51,235,145,1)]"
            : ""
        }`}
        title={
          <div>
            <div className="font-bold text-[#111] pt-2.5 text-lg sm:text-base">
              {request.title}
            </div>
            <div className="font-bold text-[#666] pl-7 whitespace-nowrap overflow-hidden text-ellipsis leading-6 text-xs mt-1 mb-1">
              {request.inquiry_description}
            </div>
          </div>
        }
        extra={
          <Link
            to={`/dashboard/responses/${request.id}`}
            className="text-xs sm:text-[10px]"
          >
            مشاهده پاسخ ها
          </Link>
        }
        style={{ width: "100%" }}
      >
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 text-[#666] text-xs">
          <div className="flex items-center gap-1">
            <BiShield size={16} />
            <span>دارای گارانتی باشد؟</span>
            {request.hasGuarantee ? (
              <GiCheckMark color="green" size={12} />
            ) : (
              <RxCross2 color="red" size={14} />
            )}
          </div>

          <div className="flex items-center gap-1">
            <BsBicycle size={16} />
            <span>دارای ارسال رایگان؟</span>
            {request.includeDelivery ? (
              <GiCheckMark color="green" size={12} />
            ) : (
              <RxCross2 color="red" size={14} />
            )}
          </div>

          <div className="flex items-center gap-1">
            <BiUser size={16} />
            <span>تعداد پاسخ‌ها:</span>
            {formatPersianNumber(request.responseCount)}
          </div>

          <div className="flex items-center gap-1">
            <GiPriceTag size={16} />
            <span>ارزان‌ترین قیمت:</span>
            {formatPersianNumber(request.lowestPrice)} ریال
          </div>
        </div>

        <div className="flex items-center gap-1 text-[11px] text-[#52c41a] mt-3">
          <BsClock size={14} />
          <span>
            زمان انقضا درخواست:{" "}
            {new Date(request.expiredAt).toLocaleDateString("fa-IR", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: false,
            })}
          </span>
        </div>
      </Card>
    </Space>
  );
}
