import { BiUser } from "react-icons/bi";
import { GiPriceTag } from "react-icons/gi";
import { Link } from "react-router-dom";
import { Avatar, Card, Space, Modal } from "antd";
export default function ResponseCard() {
  return (
    <Space direction="vertical" className="flex flex-col mb-[20px]" size={16}>
      <Card
        title={
          <div className="font-bold text-[#333] text-[18px]">
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            سامان محمدی
          </div>
        }
        extra={<Link to={"/"}>تماس با فروشنده</Link>}
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
        </div>
      </Card>
    </Space>
  );
}
