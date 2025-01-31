import { BiLocationPlus, BiUserCheck } from "react-icons/bi";
import { Avatar, Card, Space, Button } from "antd";
import { PiPhone } from "react-icons/pi";
import { IoBagCheckOutline, IoPricetag } from "react-icons/io5";
import { AiFillProduct } from "react-icons/ai";
export default function CustomerRequestCard() {
  return (
    <Space direction="vertical" className="flex flex-col mb-[20px]" size={16}>
      <Card
        title={
          <div className="font-bold text-[#333] text-[18px] flex items-center gap-[10px]">
            <div>
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            </div>
            <div>سامان محمدی</div>
          </div>
        }
        extra={
          <Button color="cyan" variant="solid" icon={<IoBagCheckOutline />}>
            ارسال تخمین قیمت
          </Button>
        }
        style={{ width: "100%" }}
      >
        <div className="flex flex-row items-center justify-between text-[18px]">
          <div className="flex">
            <div className="ml-[15px] flex gap-[5px] items-center">
              <div>
                <AiFillProduct size={22} />
              </div>
              <div className="pr-[5px] mr-[5px]">
                <div className="text-[18px] text-[#333]">
                  کالای درخواستی : Samsung 25 S Ultra
                </div>
              </div>
            </div>
            <div className="ml-[15px] flex gap-[5px] items-center">
              <div>
                <IoPricetag size={18} />
              </div>
              <div className="text-[14px] text-[#888]">
                کمترین قیمت پیشنهادی : ۳۰ میلیون تومان
              </div>
            </div>
          </div>
          <div className="flex items-center text-[13px] text-[#333] gap-[15px]">
            <div className="flex gap-[8px] items-center">
              <div>
                <BiUserCheck size={24} />
              </div>
              <div>اطلاعات خریدار</div>
            </div>
          </div>
        </div>
      </Card>
    </Space>
  );
}
