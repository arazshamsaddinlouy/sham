import { Button, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import MapComponent from "../../components/google-map";
import { BiSend } from "react-icons/bi";
import { Status, Wrapper } from "@googlemaps/react-wrapper";
import type { InputNumberProps } from "antd";
import { InputNumber, Space } from "antd";

export default function RequestPrice() {
  const render = (status: Status) => <h1>{status}</h1>;
  const onChange: InputNumberProps["onChange"] = (value) => {
    console.log("changed", value);
  };

  return (
    <>
      <div className="text-[26px] pb-[15px] mb-[30px] border-b-[1px] border-b-[#ccc]">
        درخواست استعلام قیمت
      </div>
      <div className="text-[14px] mb-[10px]">
        لطفا دسته بندی خود را انتخاب نمایید:
      </div>
      <div className="flex mb-[20px]">
        <Select onChange={onChange} className="flex-1 h-[40px]">
          <Select.Option value="1">الکترونیک</Select.Option>
          <Select.Option value="2">لوازم منز</Select.Option>
          <Select.Option value="3">موبایل</Select.Option>
          <Select.Option value="4">تستی</Select.Option>
          <Select.Option value="5">همینطوری</Select.Option>
        </Select>
      </div>
      <div className="text-[14px] mb-[10px]">مشخصات محصول خود را بنویسید:</div>
      <div className="flex">
        <TextArea
          className="flex-1"
          showCount
          maxLength={300}
          style={{ height: 80, resize: "none" }}
        ></TextArea>
      </div>
      <div className="text-[12px] mt-[5px] mb-[5px] text-[#999]">
        مشخصات کالای خود از جمله رنگ مدل و غیره را به صورت دقیق وارد نمایید.
      </div>
      <div className="flex gap-[15px] mb-[15px] overflow-hidden">
        <div className="flex-1">
          <div className="text-[14px] mb-[10px] mt-[20px]">
            تعداد کالای خود را انتخاب نمایید
          </div>
          <Space wrap className="flex w-full">
            <InputNumber
              className="w-full flex-1"
              size="large"
              min={1}
              max={100000}
              defaultValue={3}
              onChange={onChange}
            />
          </Space>
        </div>
      </div>
      <div className="flex gap-[15px] mb-[15px] h-[400px] overflow-hidden">
        <div className="flex-1">
          <div className="text-[14px] mb-[10px] mt-[20px]">
            مکان خود روی نقشه را مشخص نمایید:
          </div>
          <Wrapper
            apiKey={"AIzaSyAtOnE4vyEvfJxG268WbsUlK9EphptwyWo"}
            render={render}
          >
            <MapComponent />
          </Wrapper>
        </div>
      </div>
      <div className="pt-[20px] mt-[20px] border-t-[1px] border-t-[#ccc]">
        <Button
          icon={<BiSend size={18} />}
          className="!h-[50px] !w-[180px]"
          type="primary"
        >
          <div className="text-[18px]">ثبت استعلام</div>
        </Button>
      </div>
    </>
  );
}
