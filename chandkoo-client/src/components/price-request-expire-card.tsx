import { Card, Space } from "antd";
import { BiShield, BiUser } from "react-icons/bi";
import { BsBicycle, BsClock } from "react-icons/bs";
import { GiCheckMark, GiPriceTag } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import formatPersianNumber from "../utils/numberPriceFormat";

export default function PriceRequestExpireCard({ request }: { request: any }) {
  return (
    <Space direction="vertical" className="flex flex-col mb-[20px]" size={16}>
      <Card
        title={
          <div>
            <div className="font-bold text-[#111] pt-[10px] text-[22px]">
              {request.title}
            </div>
            <div className="font-bold text-[#666] pl-[30px] whitespace-nowrap overflow-hidden text-ellipsis leading-[25px] text-[12px] mt-[5px] mb-[5px]">
              {request.inquiry_description}
            </div>
          </div>
        }
        extra={
          <div className="text-[#f50057] font-bold text-[13px]">
            تاریخ انقضا :{" "}
            {new Date(request.expiredAt).toLocaleDateString("fa-IR", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: false,
            })}
          </div>
        }
        style={{ width: "100%" }}
      >
        <div className="grid grid-cols-2 gap-2 text-[#666] text-[12px]">
          <div className="flex items-center gap-[5px]">
            <BiShield size={16} />
            <span>دارای گارانتی؟</span>
            {request.hasGuarantee ? (
              <GiCheckMark color="green" size={12} />
            ) : (
              <RxCross2 color="red" size={14} />
            )}
          </div>

          <div className="flex items-center gap-[5px]">
            <BsBicycle size={16} />
            <span>ارسال رایگان؟</span>
            {request.includeDelivery ? (
              <GiCheckMark color="green" size={12} />
            ) : (
              <RxCross2 color="red" size={14} />
            )}
          </div>

          <div className="flex items-center gap-[5px]">
            <GiPriceTag size={16} />
            <span>
              ارزانترین قیمت : {formatPersianNumber(request.lowestPrice)} ریال
            </span>
          </div>

          <div className="flex items-center gap-[5px]">
            <BiUser size={16} />
            <span>
              تعداد پاسخ‌ها : {formatPersianNumber(request.responseCount)}
            </span>
          </div>
        </div>

        <div className="flex text-[13px] font-bold gap-[5px] text-[#999] items-center mt-2">
          <BsClock /> <span>منقضی شده</span>
        </div>
      </Card>
    </Space>
  );
}
