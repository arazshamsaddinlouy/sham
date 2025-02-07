import { Card, Space } from "antd";
import { BiUser } from "react-icons/bi";
import { BsClock } from "react-icons/bs";
import { GiPriceTag } from "react-icons/gi";
import { Link } from "react-router-dom";

export default function PriceRequestCard({ isRead }: { isRead: boolean }) {
  return (
    <Space direction="vertical" className={`flex flex-col mb-[20px]`} size={16}>
      <Card
        className={`${
          !isRead &&
          "bg-[rgba(51,235,145,0.2)] border-[1px] border-[rgba(51,235,145,1)]"
        }`}
        title={
          <div className="font-bold text-[#333] text-[18px]">سامسونگ A51</div>
        }
        extra={<Link to={"/dashboard/responses"}>مشاهده پاسخ ها</Link>}
        style={{ width: "100%" }}
      >
        <div className="flex flex-row items-center justify-between text-[#666]">
          <div className="flex">
            <div className="ml-[15px] flex gap-[5px] items-center">
              <div>
                <BiUser size={16} />
              </div>
              <div>تعداد پاسخ ها: ۲۲</div>
            </div>
            <div className="ml-[15px]  flex gap-[5px] items-center">
              <div>
                <GiPriceTag size={16} />
              </div>
              <div>ارزانترین قیمت : ۲۲ میلیون تومان</div>
            </div>
          </div>
          <div className="flex text-[12px] gap-[10px] text-[#52c41a] items-center text-green">
            <BsClock /> زمان باقی مانده :‌ ۲ ساعت و ۱۶ دقیقه
          </div>
        </div>
      </Card>
    </Space>
  );
}
