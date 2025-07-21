import type { TabsProps } from "antd";
import { Tabs, Badge } from "antd";
import { BiMessage } from "react-icons/bi";
import { FaClock } from "react-icons/fa";
import PriceRequestCard from "../../components/price-request-card";
import PriceRequestExpireCard from "../../components/price-request-expire-card";
import { useEffect, useState } from "react";
import {
  getActiveRequests,
  getExpiredRequests,
} from "../../services/price-inquiry.service";
import { useDispatch } from "react-redux";
import { setActiveRequest } from "../../store/slices/userSlice";

export default function MyRequests() {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState<string>("1");
  const [activeRequests, setActiveRequests] = useState<any[]>([]);
  const [expiredRequests, setExpiredRequests] = useState<any[]>([]);

  const onChange = (key: string) => setActiveTab(key);

  useEffect(() => {
    if (activeTab === "1") {
      getActiveRequests().then((data) => {
        if (data.status === 200) {
          setActiveRequests(data.data);
          dispatch(setActiveRequest(data.data.length));
        }
      });
    } else {
      getExpiredRequests().then((data) => {
        if (data.status === 200) {
          setExpiredRequests(data.data);
        }
      });
    }
  }, [activeTab]);

  const CurrentPriceRequests = () => (
    <div className="lower-card-body grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {activeRequests.map((req: any) => (
        <PriceRequestCard key={req.id} request={req} />
      ))}
    </div>
  );

  const ExpiredPriceRequests = () => (
    <div className="lower-card-body grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {expiredRequests.map((req: any) => (
        <PriceRequestExpireCard key={req.id} request={req} />
      ))}
    </div>
  );

  const items: TabsProps["items"] = [
    {
      key: "1",
      icon: <BiMessage size={20} />,
      label: (
        <div className="flex flex-wrap gap-2 items-center text-sm sm:text-xs">
          <div>استعلام های فعال</div>
          <Badge
            count={activeRequests.length}
            style={{ backgroundColor: "#52c41a", borderColor: "#52c41a" }}
          />
        </div>
      ),
      children: <CurrentPriceRequests />,
    },
    {
      key: "2",
      icon: <FaClock size={20} />,
      label: <span className="text-sm sm:text-xs">استعلام های منقضی شده</span>,
      children: <ExpiredPriceRequests />,
    },
  ];

  return (
    <div className="px-2 sm:px-1">
      <div className="text-2xl sm:text-lg pb-3 mb-5 border-b border-[#ccc] text-center sm:text-right">
        استعلام های قیمت
      </div>
      <Tabs
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
        tabBarGutter={8}
        size="small"
      />
    </div>
  );
}
