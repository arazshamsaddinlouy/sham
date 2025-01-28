import type { TabsProps } from "antd";
import { Tabs } from "antd";
import { BiMessage } from "react-icons/bi";
import { FaClock } from "react-icons/fa";
export default function MyRequests() {
  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      icon: <BiMessage size={20} />,
      label: "استعلام های فعال",
      children: "Content of Tab Pane 1",
    },
    {
      key: "2",
      icon: <FaClock size={20} />,
      label: "استعلام های منقضی شده",
      children: "Content of Tab Pane 2",
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
