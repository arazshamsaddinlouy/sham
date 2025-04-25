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
  const onChange = (key: string) => {
    setActiveTab(key);
  };
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
  const CurrentPriceReuests = () => {
    return (
      <div className="lower-card-body">
        {activeRequests.map((req: any) => (
          <PriceRequestCard request={req} />
        ))}
      </div>
    );
  };
  const ExpiredPriceReuests = () => {
    return (
      <div className="lower-card-body">
        {expiredRequests.map((req: any) => (
          <PriceRequestExpireCard request={req} />
        ))}
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
              count={activeRequests.length}
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
