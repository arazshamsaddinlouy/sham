import { BiLocationPlus } from "react-icons/bi";
import { GiPriceTag } from "react-icons/gi";
import { Avatar, Card, Space, Button } from "antd";
import { PiPhone } from "react-icons/pi";
import { IoBagCheckOutline } from "react-icons/io5";
export default function ResponseCard() {
  return (
    <Space direction="vertical" className="flex flex-col mb-[20px]" size={16}>
      <Card
        title={
          <div className="font-bold text-[#333] text-[18px] flex items-center gap-[10px]">
            <div>
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            </div>
            <div>سامان محمدی</div>
            <div className="pr-[5px] mr-[5px]">
              <div className="text-[13px] text-[#999]">
                کالای درخواستی : Samsung 25 S Ultra
              </div>
            </div>
          </div>
        }
        extra={
          <Button color="cyan" variant="solid" icon={<IoBagCheckOutline />}>
            پرداخت
          </Button>
        }
        style={{ width: "100%" }}
      >
        <div className="flex flex-row items-center justify-between text-[18px] text-[#357a38]">
          <div className="flex">
            <div className="ml-[15px] flex gap-[5px] items-center">
              <div>
                <GiPriceTag size={22} />
              </div>
              <div>قیمت پیشنهادی : ۳۰ میلیون تومان</div>
            </div>
          </div>
          <div className="flex items-center text-[13px] text-[#333] gap-[15px]">
            <div className="flex gap-[8px] items-center">
              <div>
                <PiPhone />
              </div>
              <div>تماس با فروشنده</div>
            </div>
            <div className="flex gap-[8px] items-center">
              <div>
                <BiLocationPlus />
              </div>
              <div>مکان بر روی نقشه</div>
            </div>
          </div>
        </div>
      </Card>
    </Space>
  );
}
