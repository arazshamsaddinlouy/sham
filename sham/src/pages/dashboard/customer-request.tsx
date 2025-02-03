import type { TabsProps } from "antd";
import { Tabs, Badge } from "antd";
import { BiMessage } from "react-icons/bi";
import { FaClock } from "react-icons/fa";
import CustomerRequestCard from "../../components/customer-request-card";
import CustomerRequestExpireCard from "../../components/customer-request-expired-card";
export default function CustomerRequests() {
  const onChange = (key: string) => {
    console.log(key);
  };

  const CustomerRequestCartWrapper = () => {
    return (
      <div>
        <CustomerRequestCard />
        <CustomerRequestCard />
        <CustomerRequestCard />
        <CustomerRequestCard />
        <CustomerRequestCard />
      </div>
    );
  };
  const ExpiredPriceReuests = () => {
    return (
      <div>
        <CustomerRequestExpireCard />
        <CustomerRequestExpireCard />
        <CustomerRequestExpireCard />
        <CustomerRequestExpireCard />
        <CustomerRequestExpireCard />
      </div>
    );
  };
  const items: TabsProps["items"] = [
    {
      key: "1",
      icon: <BiMessage size={20} />,
      label: (
        <div className="flex gap-[10px] items-center">
          <div>استعلام های من</div>
          <div>
            <Badge
              count={109}
              style={{ backgroundColor: "#52c41a", borderColor: "#52c41a" }}
            />
          </div>
        </div>
      ),
      children: <CustomerRequestCartWrapper />,
    },
    {
      key: "2",
      icon: <FaClock size={20} />,
      label: "استعلام های گذشته",
      children: <ExpiredPriceReuests />,
    },
  ];

  return (
    <>
      <div className="text-[26px] pb-[15px] mb-[30px] border-b-[1px] border-b-[#ccc]">
        درخواست های من
      </div>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </>
  );
}
