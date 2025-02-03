import { Modal } from "antd";
import { Status, Wrapper } from "@googlemaps/react-wrapper";
import MapComponent from "../../components/google-map";
import { useState } from "react";
import { Flex, Input } from "antd";
import type { GetProps } from "antd";

type OTPProps = GetProps<typeof Input.OTP>;
export default function Register() {
  const render = (status: Status) => <h1>{status}</h1>;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const onChange: OTPProps["onChange"] = (text) => {
    console.log("onChange:", text);
  };

  const onInput: OTPProps["onInput"] = (value) => {
    console.log("onInput:", value);
  };

  const sharedProps: OTPProps = {
    onChange,
    onInput,
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleChange = (e: any) => {
    console.log(e);
  };
  return (
    <div className="container mx-auto flex justify-center items-center min-h-[calc(100vh-350px)]">
      <div className="w-[1000px] h-[700px] flex rounded-[32px] bg-[#f9f9f9] overflow-hidden">
        <div className="w-[400px] relative">
          <div className="h-[100%] w-[100%] bg-[url('/images/login-wallpaper.jpg')] bg-cover bg-center absolute left-[0px] top-[0px]" />
        </div>
        <div className="w-[600px] overflow-auto p-[60px] h-[700px] flex flex-col pb-[60px] items-center rounded-[16px] p-[10px]">
          <div className="text-[22px] text-center mt-[0px] mb-[30px]">
            ثبت نام
          </div>
          <form className="w-full mx-auto p-[0px_15px]">
            <div className="flex gap-[15px] mb-[15px]">
              <div className="flex-1">
                <label className="text-[13px] text-[#444] block mb-[10px]">
                  نوع کاربری خود را مشخص نمایید
                </label>
                <select
                  onChange={handleChange}
                  className="resize-none outline-none w-full bg-[#f0f0f0] focus:bg-[#f0f0f0] rounded-[8px] p-[10px] border-box"
                >
                  <option>فروشنده هستم</option>
                  <option>خریدار هستم</option>
                </select>
              </div>
            </div>
            <div className="flex gap-[15px] mb-[15px]">
              <div className="flex-1">
                <label className="text-[13px] text-[#444] block mb-[10px]">
                  نام
                </label>
                <input
                  type="text"
                  placeholder="مثال: محمد"
                  className="h-[50px] outline-none w-full bg-[#f0f0f0] focus:bg-[#f0f0f0] rounded-[8px] p-[10px] border-box"
                />
              </div>
              <div className="flex-1">
                <label className="text-[13px] text-[#444] block mb-[10px]">
                  نام خانوادگی
                </label>
                <input
                  type="text"
                  placeholder="مثال: محمدی"
                  className="h-[50px] outline-none w-full bg-[#f0f0f0] focus:bg-[#f0f0f0] rounded-[8px] p-[10px] border-box"
                />
              </div>
            </div>
            <div className="flex gap-[15px] mb-[15px]">
              <div className="flex-1">
                <label className="text-[13px] text-[#444] block mb-[10px]">
                  شماره موبایل
                </label>
                <input
                  type="text"
                  placeholder="مثال: 09123456789"
                  className="h-[50px] outline-none w-full bg-[#f0f0f0] focus:bg-[#f0f0f0] rounded-[8px] p-[10px] border-box"
                />
              </div>
            </div>
            <div className="flex gap-[15px] mb-[15px]">
              <div className="flex-1">
                <label className="text-[13px] text-[#444] block mb-[10px]">
                  استان
                </label>
                <select className="resize-none outline-none w-full bg-[#f0f0f0] focus:bg-[#f0f0f0] rounded-[8px] p-[10px] border-box">
                  <option>تهران</option>
                  <option>تهران</option>
                  <option>تهران</option>
                  <option>تهران</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="text-[13px] text-[#444] block mb-[10px]">
                  شهر
                </label>
                <select className="resize-none outline-none w-full bg-[#f0f0f0] focus:bg-[#f0f0f0] rounded-[8px] p-[10px] border-box">
                  <option>تهران</option>
                  <option>تهران</option>
                  <option>تهران</option>
                  <option>تهران</option>
                </select>
              </div>
            </div>
            <div className="flex gap-[15px] mb-[15px]">
              <div className="flex-1">
                <label className="text-[13px] text-[#444] block mb-[10px]">
                  آدرس دقیق
                </label>
                <textarea
                  placeholder="مثال: 09123456789"
                  className="h-[70px] resize-none outline-none w-full bg-[#f0f0f0] focus:bg-[#f0f0f0] rounded-[8px] p-[10px] border-box"
                ></textarea>
              </div>
            </div>
            <div className="flex gap-[15px] mb-[15px]">
              <div className="flex-1">
                <label className="text-[13px] text-[#444] block mb-[10px]">
                  پلاک
                </label>
                <input
                  placeholder="مثال: 40"
                  className="resize-none outline-none w-full bg-[#f0f0f0] focus:bg-[#f0f0f0] rounded-[8px] p-[10px] border-box"
                />
              </div>
              <div className="flex-1">
                <label className="text-[13px] text-[#444] block mb-[10px]">
                  واحد
                </label>
                <input
                  placeholder="مثال: 2"
                  className="resize-none outline-none w-full bg-[#f0f0f0] focus:bg-[#f0f0f0] rounded-[8px] p-[10px] border-box"
                />
              </div>
            </div>
            <div className="flex gap-[15px] mb-[15px] h-[180px] overflow-hidden">
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
            <button
              onClick={(e) => {
                e.preventDefault();
                showModal();
              }}
              className="w-full h-[42px] leading-[42px] bg-[#4caf50] outline-none mt-[30px] mb-[20px] rounded-[8px] text-[#fff]"
            >
              ارسال پیامک
            </button>
          </form>
        </div>
      </div>
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div className="flex gap-[15px] mb-[15px] overflow-hidden">
          <div className="flex-1">
            <label className="text-[13px] text-[#444] block mb-[10px]">
              پیامک وارد شده را وارد نمایید
            </label>
            <div>
              <Flex
                gap="middle"
                className="w-full flex-reverse"
                align="flex-start"
                vertical
              >
                <Input.OTP
                  formatter={(str) => str.toUpperCase()}
                  {...sharedProps}
                />
              </Flex>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
