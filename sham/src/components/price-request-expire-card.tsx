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
              hour12: false, // 24-hour format
            })}
          </div>
        }
        style={{ width: "100%" }}
      >
        <div className="flex flex-row items-center justify-between text-[#666]">
          <div className="flex">
            <div className="ml-[15px] flex gap-[5px] items-center">
              <div>
                <BiShield size={16} />
              </div>
              <div className="flex items-center gap-[10px]">
                دارای گارانتی باشد؟{" "}
                {request.hasGuarantee ? (
                  <GiCheckMark color="green" size={12} />
                ) : (
                  <RxCross2 color="red" size={15} />
                )}
              </div>
            </div>
            <div className="ml-[15px] flex gap-[5px] items-center">
              <div>
                <BsBicycle size={18} />
              </div>
              <div className="flex items-center gap-[10px]">
                دارای ارسال رایگان باشد؟{" "}
                {request.includeDelivery ? (
                  <GiCheckMark color="green" size={12} />
                ) : (
                  <RxCross2 color="red" size={15} />
                )}
              </div>
            </div>
            <div className="ml-[15px] flex gap-[5px] items-center">
              <div>
                <GiPriceTag size={16} />
              </div>
              <div>
                ارزانترین قیمت :{formatPersianNumber(request.lowestPrice)} ریال
              </div>
            </div>
            <div className="ml-[15px] flex gap-[5px] items-center">
              <div>
                <BiUser size={16} />
              </div>
              <div>
                تعداد پاسخ ها: {formatPersianNumber(request.responseCount)}
              </div>
            </div>
          </div>
          <div className="flex text-[14px] font-bold gap-[10px] text-[#999] items-center">
            <BsClock /> منقضی شده
          </div>
        </div>
      </Card>
    </Space>
  );
}
