import { Button, Card, Space } from "antd";
import { BiShield, BiUser } from "react-icons/bi";
import { BsBicycle, BsEye } from "react-icons/bs";
import { GiCheckMark, GiPriceTag } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import formatPersianNumber from "../utils/numberPriceFormat";
import { useNavigate } from "react-router-dom";

export default function PriceRequestExpireCard({ request }: { request: any }) {
  const navigate = useNavigate();
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
          <div className="flex flex-col justify-end items-end">
            <div>
              <Button
                type="primary"
                icon={<BsEye />}
                onClick={() => navigate(`/dashboard/responses/${request.id}`)}
              >
                مشاهده پاسخ ها
              </Button>
            </div>
            <div className="flex flex-col sm:flex-row justify-end items-end text-[12px] mt-[10px] gap-[5px] text-[#666] items-center">
              <div className="hidden sm:block">تاریخ انقضا :</div>
              <div>
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
            </div>
          </div>
        }
        style={{ width: "100%" }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#666] mt-[10px] text-[12px]">
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
      </Card>
    </Space>
  );
}
