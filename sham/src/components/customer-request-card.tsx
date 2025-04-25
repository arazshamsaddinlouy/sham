import {
  Card,
  Space,
  Button,
  Badge,
  Image,
  Avatar,
  Modal,
  Form,
  ConfigProvider,
  InputNumber,
} from "antd";
import {
  DatePicker as DatePickerJalali,
  JalaliLocaleListener,
} from "antd-jalali";
import fa_IR from "antd/lib/locale/fa_IR";
import { IoBagCheckOutline, IoImageOutline, IoPricetag } from "react-icons/io5";
import { AiFillProduct } from "react-icons/ai";
import { BsClock } from "react-icons/bs";
import { CgAttachment } from "react-icons/cg";
import { BiMessage } from "react-icons/bi";
import { config } from "../services/config.service";
import { useContext, useEffect, useState } from "react";
import {
  addPriceInquiryResponse,
  addPriceMessageResponse,
} from "../services/inquiry-response.service";
import { ShamContext } from "../App";
import formatPersianNumber from "../utils/numberPriceFormat";
import TextArea from "antd/es/input/TextArea";
import FileUploader from "./file-uploader";
import ImageUploader from "./image-uploader";
import { Moment } from "moment";
export const FormPriceInquiry = ({
  request,
  refetch,
}: {
  request: any;
  refetch: Function;
}) => {
  const [dateString, setDateString] = useState<string>("");
  const [form] = Form.useForm();
  const values = Form.useWatch([], form);
  const [isSubmittable, setIsSubmittable] = useState<boolean>(false);
  const value: any = useContext(ShamContext);
  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setIsSubmittable(true))
      .catch(() => setIsSubmittable(false));
  }, [form, values]);
  const handleSubmit = () => {
    const price = form.getFieldValue("suggestedPrice");
    addPriceInquiryResponse({
      requestId: request.id,
      price: price,
      expiredAt: dateString,
    }).then((data) => {
      if (data.status === 200) {
        refetch();
        value.setNotif({ type: "success", description: "پاسخ ارسال شد" });
      } else {
        value.setNotif({ type: "error", description: "خطا در ثبت قیمت" });
      }
    });
  };
  return (
    <div>
      <Form
        onFinish={() => handleSubmit()}
        form={form}
        layout={"vertical"}
        className="w-full mx-auto p-[0px_5px]"
      >
        <div className="flex gap-[15px]">
          <div className="flex-1">
            <Form.Item
              name="suggestedPrice"
              label="قیمت پیشنهادی"
              className="rtl"
              rules={[{ required: true, message: "قیمت پیشنهاد" }]}
            >
              <InputNumber
                formatter={(value) =>
                  value
                    ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    : ""
                }
                parser={(value) =>
                  value ? parseFloat(value.replace(/,/g, "")) : 0
                }
                addonAfter="ریال"
                style={{ width: "100%" }}
                placeholder="مثال : 100,000,000"
              />
            </Form.Item>
            <Form.Item
              name="productCount"
              label="زمان اعتبار قیمت"
              className="rtl"
            >
              <JalaliLocaleListener />
              <ConfigProvider locale={fa_IR} direction="rtl">
                <DatePickerJalali
                  showTime
                  className={"w-full h-[40px]"}
                  onChange={(d: Moment | null) => {
                    if (d) {
                      setDateString(d?.toISOString());
                    }
                  }}
                />
              </ConfigProvider>

              <div className="text-[12px] text-[#666] mt-[5px]">
                در صورت اعتبار داشتن تا پایان استعلام آن را خالی بزارید.
              </div>
            </Form.Item>
          </div>
        </div>
        <Form.Item>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#4caf50",
              },
            }}
          >
            <Button
              htmlType="submit"
              className="w-full mt-[40px] h-[40px]"
              type="primary"
              disabled={!isSubmittable}
            >
              ارسال قیمت
            </Button>
          </ConfigProvider>
        </Form.Item>
      </Form>
    </div>
  );
};
export const FormSendMessage = ({ request }: { request: any }) => {
  const [form] = Form.useForm();
  const values = Form.useWatch([], form);
  const [file, setFile] = useState<File | null>();
  const [image, setImage] = useState<File | null>();
  const [isSubmittable, setIsSubmittable] = useState<boolean>(false);
  const value: any = useContext(ShamContext);
  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setIsSubmittable(true))
      .catch(() => setIsSubmittable(false));
  }, [form, values]);
  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("message", form.getFieldValue("message"));
    formData.append("requestId", request.id);
    if (file) {
      formData.append("audio", file);
    }
    if (image) {
      formData.append("image", image);
    }
    addPriceMessageResponse(formData).then((data) => {
      if (data.status === 200) {
        value.setNotif({ type: "success", description: "پیام ارسال شد" });
      } else {
        value.setNotif({ type: "error", description: "خطا در ثبت پیام" });
      }
    });
  };
  const handleAudio = (audio: File | null) => {
    if (audio) {
      setFile(audio);
    }
  };
  const handleImage = (img: File | null) => {
    if (img) {
      setImage(img);
    }
  };
  return (
    <div>
      <Form
        onFinish={() => handleSubmit()}
        form={form}
        layout={"vertical"}
        className="w-full mx-auto p-[0px_5px]"
      >
        <div className="flex gap-[5px]">
          <div className="flex-1">
            <Form.Item
              name="message"
              label="پیام"
              className="rtl"
              rules={[{ required: true, message: "پیام" }]}
            >
              <TextArea
                rows={5}
                maxLength={300}
                showCount
                style={{ resize: "none" }}
              />
            </Form.Item>
          </div>
        </div>
        <div className="flex">
          <div className="flex-1">
            <div className="text-[14px] mb-[10px] mt-[20px]">
              در صورت نیاز فایل پیوست نمایید
            </div>
            <FileUploader handleFile={handleAudio} />
          </div>
          <div className="flex-1">
            <div className="text-[14px] mb-[10px] mt-[20px]">
              در صورت نیاز تصویر پیوست نمایید
            </div>
            <ImageUploader handleFile={handleImage} />
          </div>
        </div>
        {request.has_message && (
          <Form.Item>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#4caf50",
                },
              }}
            >
              <Button
                htmlType="submit"
                className="w-full mt-[40px] h-[40px]"
                type="primary"
                disabled={!isSubmittable}
              >
                ارسال پیام
              </Button>
            </ConfigProvider>
          </Form.Item>
        )}
      </Form>
    </div>
  );
};
export default function CustomerRequestCard({
  request,
  refetch,
}: {
  request: any;
  refetch: Function;
}) {
  const [isMessageModalOpen, setIsMessageModalOpen] = useState<boolean>(false);
  const showMessageModal = () => {
    setIsMessageModalOpen(true);
  };

  const handleMessageOk = () => {
    setIsMessageModalOpen(false);
  };

  const handleMessageCancel = () => {
    setIsMessageModalOpen(false);
  };
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Space
        direction="vertical"
        className="flex overflow-hidden flex-col mb-[20px] lower-card-body"
        size={16}
      >
        <div className="flex overflow-hidden gap-[10px]">
          {request.attachedImage ? (
            <div className="h-[105px] relative bg-[#fff] p-[15px] overflow-hidden rounded-[8px]">
              <Image
                width={75}
                height={75}
                src={`${config.BACKEND_IMAGE_URL}/${request.attachedImage}`}
                className="h-[75px] w-[75px] absolute"
              />
            </div>
          ) : (
            <Avatar className="w-[105px] rounded-[8px] h-[105px] bg-[#f0f0f0]">
              <IoImageOutline size={30} color="#333" />
            </Avatar>
          )}
          <div className="flex-1">
            <Card
              className={`${
                request.hasResponse &&
                "bg-[rgba(51,235,145,0.2)] border-[1px] border-[rgba(51,235,145,1)]"
              }`}
              title={
                <div className="font-bold text-[#333] text-[18px] flex items-center justify-between gap-[10px]">
                  <div>
                    <div className="flex items-center">
                      <div>
                        <AiFillProduct size={22} />
                      </div>
                      <div className="pr-[5px]">
                        <div className="text-[18px] text-[#333]">
                          کالای درخواستی : {request.title}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex gap-[5px] items-center p-[0_15px] text-[13px] text-[#ff5722]">
                      <div className="flex items-center gap-[5px]">
                        <BsClock /> زمان انقضای استعلام :
                      </div>
                      <div>
                        {" "}
                        {new Date(request.expiredAt).toLocaleDateString(
                          "fa-IR",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                            hour12: false, // 24-hour format
                          }
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              }
              extra={
                <Button
                  color="cyan"
                  onClick={showModal}
                  variant="solid"
                  disabled={request.hasResponse}
                  icon={<IoBagCheckOutline />}
                >
                  ارسال قیمت
                </Button>
              }
              style={{ width: "100%" }}
            >
              <div className="flex flex-row items-center justify-between text-[18px]">
                <div className="flex">
                  <div className="ml-[15px] flex gap-[5px] items-center">
                    <div>
                      <IoPricetag size={14} />
                    </div>
                    <div className="text-[14px] text-[#000]">
                      کمترین قیمت پیشنهادی :{" "}
                      {formatPersianNumber(request.lowestPrice)} ریال
                    </div>
                  </div>
                </div>
                <div className="flex items-center text-[13px] text-[#333] gap-[15px]">
                  <div className="flex gap-[8px] items-center">
                    {request.has_message && (
                      <Button
                        icon={<BiMessage />}
                        className="primary"
                        disabled={!request.hasResponse}
                        onClick={showMessageModal}
                      >
                        ارسال پیام
                      </Button>
                    )}
                  </div>
                  {request.attachedAudio && (
                    <div className="flex gap-[8px] items-center">
                      <a
                        className="flex gap-[8px] items-center"
                        download
                        target="_blank"
                        href={`${config.BACKEND_IMAGE_URL}/${request.attachedAudio}`}
                      >
                        <div>
                          <CgAttachment />
                        </div>
                        <Badge color="green" count={1} />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Space>
      <Modal
        title="ارسال قیمت"
        open={isModalOpen}
        onOk={handleOk}
        footer={null}
        onCancel={handleCancel}
      >
        <FormPriceInquiry refetch={refetch} request={request} />
      </Modal>
      <Modal
        title="ارسال پیام"
        open={isMessageModalOpen}
        onOk={handleMessageOk}
        footer={null}
        onCancel={handleMessageCancel}
      >
        <FormSendMessage request={request} />
      </Modal>
    </>
  );
}
