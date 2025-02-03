import {
  Avatar,
  Button,
  ConfigProvider,
  Modal,
  Table,
  TableColumnsType,
  TableProps,
  Tag,
} from "antd";
import { useState } from "react";
import { Status, Wrapper } from "@googlemaps/react-wrapper";
import MapComponent from "../../components/google-map";
import { BiLocationPlus, BiPhone } from "react-icons/bi";
import { TiUserOutline } from "react-icons/ti";
import { MdMessage } from "react-icons/md";
interface DataType {
  key: React.Key;
  sellerName: string;
  suggestedPrice: number;
  distanceFromYou: number;
  branch: string;
  actions: any;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "نام فروشنده",
    dataIndex: "sellerName",
    filters: [
      {
        text: "Joe",
        value: "Joe",
      },
      {
        text: "Category 1",
        value: "Category 1",
        children: [
          {
            text: "Yellow",
            value: "Yellow",
          },
          {
            text: "Pink",
            value: "Pink",
          },
        ],
      },
      {
        text: "Category 2",
        value: "Category 2",
        children: [
          {
            text: "Green",
            value: "Green",
          },
          {
            text: "Black",
            value: "Black",
          },
        ],
      },
    ],
    filterMode: "tree",
    filterSearch: true,
    onFilter: (value: any, record: any) =>
      record.name.includes(value as string),
    width: "250px",
    render: () => (
      <div className="flex items-center gap-[10px] p-[3px_0]">
        <Avatar icon={<TiUserOutline />} />
        سامان شمس الدین
      </div>
    ),
  },
  {
    title: "قیمت پیشنهادی",
    dataIndex: "suggestedPrice",
    sorter: (a: any, b: any) => a.suggestedPrice - b.suggestedPrice,
    render: () => (
      <Tag color="blue" className="text-[15px] font-yekan p-[5px_15px]">
        ۳۰ میلیون تومان
      </Tag>
    ),
  },
  {
    title: "فاصله از شما",
    dataIndex: "distanceFromYou",
    sorter: (a: any, b: any) => a.distanceFromYou - b.distanceFromYou,
    render: () => <>۲۰۰ متر</>,
  },
  {
    title: "غرفه",
    dataIndex: "branch",
    render: () => (
      <Tag
        color="#f0f0f0"
        className="text-[15px] font-yekan p-[5px_15px] rounded-[30px]"
      >
        <div className="text-[#666] text-[12px]">لوازم الکترونیک</div>
      </Tag>
    ),
  },
  {
    title: "",
    dataIndex: "acions",
    render: () => (
      <div className="flex gap-[10px]">
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#00b96b",
            },
          }}
        >
          <Button type="primary">
            <BiPhone /> تماس
          </Button>
        </ConfigProvider>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#f50057",
            },
          }}
        >
          <Button type="primary">
            <BiLocationPlus /> مکان
          </Button>
        </ConfigProvider>
        <Button type="primary">
          <MdMessage /> پیام
        </Button>
      </div>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    sellerName: "John Brown",
    suggestedPrice: 3000,
    distanceFromYou: 32,
    branch: "",
    actions: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    sellerName: "John Brown",
    suggestedPrice: 3000,
    distanceFromYou: 32,
    branch: "",
    actions: "New York No. 1 Lake Park",
  },
  {
    key: "3",
    sellerName: "John Brown",
    suggestedPrice: 3000,
    distanceFromYou: 32,
    branch: "",
    actions: "New York No. 1 Lake Park",
  },
  {
    key: "4",
    sellerName: "John Brown",
    suggestedPrice: 3000,
    distanceFromYou: 32,
    branch: "",
    actions: "New York No. 1 Lake Park",
  },
  {
    key: "5",
    sellerName: "John Brown",
    suggestedPrice: 3000,
    distanceFromYou: 32,
    branch: "",
    actions: "New York No. 1 Lake Park",
  },
  {
    key: "6",
    sellerName: "John Brown",
    suggestedPrice: 3000,
    distanceFromYou: 32,
    branch: "",
    actions: "New York No. 1 Lake Park",
  },
  {
    key: "7",
    sellerName: "John Brown",
    suggestedPrice: 3000,
    distanceFromYou: 32,
    branch: "",
    actions: "New York No. 1 Lake Park",
  },
  {
    key: "8",
    sellerName: "John Brown",
    suggestedPrice: 3000,
    distanceFromYou: 32,
    branch: "",
    actions: "New York No. 1 Lake Park",
  },
];

const onChange: TableProps<DataType>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra
) => {
  console.log("params", pagination, filters, sorter, extra);
};
export default function Responses() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const render = (status: Status) => <h1>{status}</h1>;
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

      <Table<DataType>
        columns={columns}
        dataSource={data}
        onChange={onChange}
      />
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
    </div>
  );
}
