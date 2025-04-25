import type { TabsProps } from "antd";
import { Tabs, Badge } from "antd";
import { BiMessage } from "react-icons/bi";
import { FaClock } from "react-icons/fa";
import CustomerRequestCard from "../../components/customer-request-card";
import CustomerRequestExpireCard from "../../components/customer-request-expired-card";
import { useEffect, useState } from "react";
import {
  getAllActiveRequests,
  getAllExpiredRequests,
} from "../../services/price-inquiry.service";
import { useSelector } from "react-redux";
export default function CustomerRequests() {
  const [activeTab, setActiveTab] = useState<string>("1");
  const [activeRequests, setActiveRequests] = useState<any[]>([]);
  const [expiredRequests, setExpiredRequests] = useState<any[]>([]);
  const requestCount = useSelector((state: any) => {
    return state?.user?.requestCount || 0;
  });
  const onChange = (key: string) => {
    setActiveTab(key);
  };
  useEffect(() => {
    if (activeTab == "1") {
      getAllActiveRequests().then((data) => {
        if (data.status === 200) {
          setActiveRequests(data.data);
        }
      });
    } else {
      getAllExpiredRequests().then((data) => {
        if (data.status === 200) {
          setExpiredRequests(data.data);
        }
      });
    }
  }, [activeTab]);
  const refetch = () => {
    getAllActiveRequests().then((data) => {
      if (data.status === 200) {
        setActiveRequests(data.data);
      }
    });
  };
  const CustomerRequestCartWrapper = ({ refetch }: { refetch: Function }) => {
    return (
      <div>
        {activeRequests.map((req: any) => (
          <CustomerRequestCard request={req} refetch={refetch} />
        ))}
      </div>
    );
  };
  const ExpiredPriceReuests = () => {
    return (
      <div>
        {expiredRequests.map((req: any) => (
          <CustomerRequestExpireCard request={req} />
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
          <div>استعلام های جاری</div>
          <div>
            <Badge
              count={requestCount}
              style={{ backgroundColor: "#52c41a", borderColor: "#52c41a" }}
            />
          </div>
        </div>
      ),
      children: <CustomerRequestCartWrapper refetch={refetch} />,
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
        استعلام های دریافتی
      </div>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </>
  );
}
