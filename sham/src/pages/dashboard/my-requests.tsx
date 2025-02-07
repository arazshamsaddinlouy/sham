import type { TabsProps } from "antd";
import { Tabs, Badge } from "antd";
import { BiMessage } from "react-icons/bi";
import { FaClock } from "react-icons/fa";
import PriceRequestCard from "../../components/price-request-card";
import PriceRequestExpireCard from "../../components/price-request-expire-card";
export default function MyRequests() {
  const onChange = (key: string) => {
    console.log(key);
  };

  const CurrentPriceReuests = () => {
    return (
      <div>
        <PriceRequestCard isRead={false} />
        <PriceRequestCard isRead={false} />
        <PriceRequestCard isRead={true} />
        <PriceRequestCard isRead={true} />
        <PriceRequestCard isRead={true} />
      </div>
    );
  };
  const ExpiredPriceReuests = () => {
    return (
      <div>
        <PriceRequestExpireCard />
        <PriceRequestExpireCard />
        <PriceRequestExpireCard />
        <PriceRequestExpireCard />
        <PriceRequestExpireCard />
      </div>
    );
  };
  const items: TabsProps["items"] = [
    {
      key: "1",
      icon: <BiMessage size={20} />,
      label: (
        <div className="flex gap-[10px] items-center">
          <div>استعلام های فعال</div>
          <div>
            <Badge
              count={109}
              style={{ backgroundColor: "#52c41a", borderColor: "#52c41a" }}
            />
          </div>
        </div>
      ),
      children: <CurrentPriceReuests />,
    },
    {
      key: "2",
      icon: <FaClock size={20} />,
      label: "استعلام های منقضی شده",
      children: <ExpiredPriceReuests />,
    },
  ];

  return (
    <>
      <div className="text-[26px] pb-[15px] mb-[30px] border-b-[1px] border-b-[#ccc]">
        استعلام های قیمت
      </div>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </>
  );
}
