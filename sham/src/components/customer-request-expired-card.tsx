import { Card, Space } from "antd";
import { BiUser } from "react-icons/bi";
import { BsClock } from "react-icons/bs";

export default function CustomerRequestExpireCard() {
  return (
    <Space direction="vertical" className="flex flex-col mb-[20px]" size={16}>
      <Card
        title={
          <div className="font-bold text-[#333] text-[18px]">سامسونگ A51</div>
        }
        extra={
          <div className="text-[#f50057] font-bold text-[13px]">
            تاریخ ارسال قیمت : ۲۲ اسفند ۱۴۰۳
          </div>
        }
        style={{ width: "100%" }}
      >
        <div className="flex flex-row items-center justify-between text-[#666]">
          <div className="flex">
            <div className="ml-[15px] flex gap-[5px] items-center">
              <div>
                <BiUser size={16} />
              </div>
              <div>قیمت تخمین زده شده: ۶ میلیون تومان</div>
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
