import { Avatar, Card, Image } from "antd";
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
    <Card
      className={`w-full mb-4 shadow-sm rounded-xl transition hover:shadow-md ${
        request.hasResponse ? "bg-green-50 border border-green-400" : ""
      } rtl`}
      bodyStyle={{ padding: "16px" }}
      title={
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-2 min-w-0 font-bold text-lg truncate">
            {request.title}
          </div>
          <div className="flex items-center gap-2 text-pink-500 text-sm whitespace-nowrap">
            تاریخ ارسال قیمت:{" "}
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
      }
    >
      <div className="flex flex-col sm:flex-row gap-4 items-start">
        {/* Left: image */}
        {request.attachedImage ? (
          <Image
            src={`${config.BACKEND_IMAGE_URL}/api/${request.attachedImage}`}
            width={100}
            height={100}
            className="rounded-lg flex-shrink-0"
            preview={false}
          />
        ) : (
          <Avatar
            size={100}
            className="rounded-lg flex-shrink-0 bg-gray-100"
            icon={<IoImageOutline size={30} />}
          />
        )}

        {/* Center: description */}
        <div className="flex-1 min-w-0">
          <p className="text-gray-600 truncate whitespace-pre-wrap">
            {request.description}
          </p>
        </div>

        {/* Right: info */}
        <div className="flex flex-col gap-2 justify-center sm:w-[250px]">
          <div className="flex items-center gap-2 text-gray-700">
            <BiUser />
            <span>قیمت تخمین زده شده: ۶ میلیون تومان</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <BsClock />
            <span>منقضی شده</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
