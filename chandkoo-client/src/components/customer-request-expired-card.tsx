import { Avatar, Card, Image, Space } from "antd";
import { BiUser } from "react-icons/bi";
import { BsClock } from "react-icons/bs";
import { IoImageOutline } from "react-icons/io5";
import { config } from "../services/config.service";

export default function CustomerRequestExpireCard({
  request,
}: {
  request: any;
}) {
  return (
    <Space
      direction="vertical"
      className="flex lower-card-body flex-col mb-[20px]"
      size={16}
    >
      <div className="flex overflow-hidden gap-[10px]">
        {request.attachedImage ? (
          <div className="h-[105px] w-[105px] relative bg-[#fff] p-[15px] overflow-hidden rounded-[8px]">
            <Image
              width={75}
              height={75}
              src={`${config.BACKEND_IMAGE_URL}/api/${request.attachedImage}`}
              className="h-[75px] w-[75px] absolute"
            />
          </div>
        ) : (
          <Avatar className="w-[105px] rounded-[8px] h-[105px] bg-[#f0f0f0]">
            <IoImageOutline size={30} color="#333" />
          </Avatar>
        )}
        <Card
          className={`${
            request.hasResponse &&
            "bg-[rgba(51,235,145,0.2)] border-[1px] border-[rgba(51,235,145,1)]"
          }`}
          title={
            <div className="font-bold flex-1 text-[#333] text-[18px]">
              {request.title}
            </div>
          }
          extra={
            <div className="text-[#f50057] font-bold text-[13px]">
              تاریخ ارسال قیمت : ۲۲{" "}
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
      </div>
    </Space>
  );
}
