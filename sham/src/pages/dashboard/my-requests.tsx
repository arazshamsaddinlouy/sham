import type { TabsProps } from "antd";
import { Button, Tabs, Modal, Badge } from "antd";
import { BiLocationPlus, BiMessage } from "react-icons/bi";
import { FaClock } from "react-icons/fa";
import PriceRequestCard from "../../components/price-request-card";
import { useState } from "react";
import { Status, Wrapper } from "@googlemaps/react-wrapper";
import MapComponent from "../../components/google-map";
import PriceRequestExpireCard from "../../components/price-request-expire-card";
export default function MyRequests() {
  const onChange = (key: string) => {
    console.log(key);
  };

  const CurrentPriceReuests = () => {
    return (
      <div>
        <div className="flex justify-end">
          <Button
            color="cyan"
            variant="solid"
            icon={<BiLocationPlus />}
            onClick={() => showModal()}
            className="h-[40px] text-[18px] mt-[10px] mb-[30px]"
          >
            مشاهده استعلام ها بر روی نقشه
          </Button>
        </div>
        <PriceRequestCard />
        <PriceRequestCard />
        <PriceRequestCard />
        <PriceRequestCard />
        <PriceRequestCard />
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const render = (status: Status) => <h1>{status}</h1>;

  return (
    <>
      <div className="text-[26px] pb-[15px] mb-[30px] border-b-[1px] border-b-[#ccc]">
        درخواست های من
      </div>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      <Modal
        open={isModalOpen}
        width={1000}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="flex h-[400px] gap-[15px] mb-[15px] h-[480px] overflow-hidden">
          <div className="flex-1">
            <label className="text-[13px] text-[#444] block mb-[10px]">
              آدرس روی نقشه
            </label>
            <Wrapper
              apiKey={"AIzaSyAtOnE4vyEvfJxG268WbsUlK9EphptwyWo"}
              render={render}
            >
              <MapComponent />
            </Wrapper>
          </div>
        </div>
      </Modal>
    </>
  );
}
