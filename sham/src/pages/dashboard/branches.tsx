import {
  Button,
  ConfigProvider,
  Input,
  Modal,
  Select,
  Table,
  TableColumnsType,
  TableProps,
  Tag,
} from "antd";
import { useState } from "react";
import { Status, Wrapper } from "@googlemaps/react-wrapper";
import MapComponent from "../../components/google-map";
import { BiLocationPlus, BiPencil } from "react-icons/bi";
import TextArea from "antd/es/input/TextArea";
interface DataType {
  key: React.Key;
  category: string;
  phone: string;
  address: string;
  actions: any;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "دسته بندی",
    dataIndex: "category",
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
      <Tag
        color="#f0f0f0"
        className="text-[15px] font-yekan p-[5px_15px] rounded-[30px]"
      >
        <div className="text-[#666] text-[12px]">لوازم الکترونیک</div>
      </Tag>
    ),
  },
  {
    title: "تلفن",
    dataIndex: "phone",
    sorter: (a: any, b: any) => a.suggestedPrice - b.suggestedPrice,
    render: () => <>021-2255331</>,
  },
  {
    title: "آدرس",
    dataIndex: "distanceFromYou",
    sorter: (a: any, b: any) => a.distanceFromYou - b.distanceFromYou,
    render: () => <>تهران - پاسداران - دروس - فلان جا - بهمان جا</>,
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
            <BiPencil /> ویرایش
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
      </div>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    category: "John Brown",
    phone: "0321321321",
    address: "dsadsadsada",
    actions: "",
  },
  {
    key: "1",
    category: "John Brown",
    phone: "0321321321",
    address: "dsadsadsada",
    actions: "",
  },
  {
    key: "1",
    category: "John Brown",
    phone: "0321321321",
    address: "dsadsadsada",
    actions: "",
  },
  {
    key: "1",
    category: "John Brown",
    phone: "0321321321",
    address: "dsadsadsada",
    actions: "",
  },
  {
    key: "1",
    category: "John Brown",
    phone: "0321321321",
    address: "dsadsadsada",
    actions: "",
  },
  {
    key: "1",
    category: "John Brown",
    phone: "0321321321",
    address: "dsadsadsada",
    actions: "",
  },
  {
    key: "1",
    category: "John Brown",
    phone: "0321321321",
    address: "dsadsadsada",
    actions: "",
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
export default function Branches() {
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
      <div className="text-[26px] pb-[15px] mb-[30px] border-b-[1px] border-b-[#ccc]">
        تنظیمات غرفه
      </div>
      <div className="flex justify-end">
        <Button
          color="cyan"
          variant="solid"
          icon={<BiLocationPlus />}
          onClick={() => showModal()}
          className="h-[40px] text-[18px] mt-[0px] mb-[30px]"
        >
          افزودن غرفه
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
        <div className="flex h-[720px] gap-[15px] mb-[15px] h-[480px] overflow-hidden">
          <div className="flex-1">
            <label className="text-[13px] text-[#444] block mb-[10px]">
              افزودن غرفه
            </label>
            <div>
              <div className="flex gap-[15px]">
                <div className="flex-1">
                  <div className="text-[12px] text-[#333] mb-[5px] mt-[5px]">
                    نام
                  </div>
                  <div>
                    <Input className="h-[40px]" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-[12px] text-[#333] mb-[5px] mt-[5px]">
                    نام خانوادگی
                  </div>
                  <div>
                    <Input className="h-[40px]" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-[12px] text-[#333] mb-[5px] mt-[5px]">
                    تلفن
                  </div>
                  <div>
                    <Input className="h-[40px]" />
                  </div>
                </div>
              </div>
              <div className="flex">
                <div className="flex-1">
                  <div className="text-[12px] text-[#333] mb-[5px] mt-[5px]">
                    آدرس
                  </div>
                  <TextArea className="resize-none h-[150px]"></TextArea>
                </div>
              </div>
              <div className="flex">
                <div className="flex-1">
                  <div className="text-[12px] text-[#333] mb-[5px] mt-[5px]">
                    دسته بندی
                  </div>
                  <Select className="w-full h-[40px]">
                    <Select.Option value="simple1">الکترونیک</Select.Option>
                    <Select.Option value="simple2">الکترونیک</Select.Option>
                    <Select.Option value="simple3">الکترونیک</Select.Option>
                    <Select.Option value="simple4">الکترونیک</Select.Option>
                    <Select.Option value="simple5">الکترونیک</Select.Option>
                  </Select>
                </div>
              </div>
              <div className="flex">
                <div className="flex-1">
                  <div className="text-[12px] text-[#333] mb-[-10px] mt-[15px]">
                    مکان غرفه بر روی نقشه را انتخاب نمایید
                  </div>
                  <Wrapper
                    apiKey={"AIzaSyAtOnE4vyEvfJxG268WbsUlK9EphptwyWo"}
                    render={render}
                  >
                    <MapComponent />
                  </Wrapper>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
