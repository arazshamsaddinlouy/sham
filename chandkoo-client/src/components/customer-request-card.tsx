import {
  Card,
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
import { IoBagCheckOutline, IoImageOutline } from "react-icons/io5";
import { AiFillProduct } from "react-icons/ai";
import { BsClock } from "react-icons/bs";
import { BiMessage } from "react-icons/bi";
import { config } from "../services/config.service";
import { useContext, useEffect, useState } from "react";
import {
  addPriceInquiryResponse,
  addPriceMessageResponse,
} from "../services/inquiry-response.service";
import { ShamContext } from "../App";
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
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      className="w-full"
    >
      <div className="flex flex-col sm:flex-row gap-4">
        <Form.Item
          name="suggestedPrice"
          label="قیمت پیشنهادی"
          className="flex-1 rtl"
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
            placeholder="مثال: 100,000,000"
          />
        </Form.Item>

        <Form.Item
          name="expiredAt"
          label="زمان اعتبار قیمت"
          className="flex-1 rtl"
        >
          <JalaliLocaleListener />
          <ConfigProvider locale={fa_IR} direction="rtl">
            <DatePickerJalali
              showTime
              className="w-full"
              onChange={(d: Moment | null) =>
                setDateString(d?.toISOString() || "")
              }
            />
          </ConfigProvider>
          <div className="text-sm text-gray-500 mt-1">
            در صورت اعتبار داشتن تا پایان استعلام آن را خالی بزارید.
          </div>
        </Form.Item>
      </div>

      <ConfigProvider theme={{ token: { colorPrimary: "#4caf50" } }}>
        <Button
          htmlType="submit"
          type="primary"
          disabled={!isSubmittable}
          className="w-full mt-4 h-12 rounded-lg shadow-sm hover:shadow-md transition"
        >
          ارسال قیمت
        </Button>
      </ConfigProvider>
    </Form>
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
    if (file) formData.append("audio", file);
    if (image) formData.append("image", image);

    addPriceMessageResponse(formData).then((data) => {
      if (data.status === 200) {
        value.setNotif({ type: "success", description: "پیام ارسال شد" });
      } else {
        value.setNotif({ type: "error", description: "خطا در ثبت پیام" });
      }
    });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      className="w-full"
    >
      <Form.Item
        name="message"
        label="پیام"
        className="rtl"
        rules={[{ required: true, message: "پیام الزامی است" }]}
      >
        <TextArea rows={5} maxLength={300} showCount className="resize-none" />
      </Form.Item>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="text-sm mb-2 mt-2">
            در صورت نیاز فایل پیوست نمایید
          </div>
          <FileUploader handleFile={setFile} />
        </div>
        <div className="flex-1">
          <div className="text-sm mb-2 mt-2">
            در صورت نیاز تصویر پیوست نمایید
          </div>
          <ImageUploader handleFile={setImage} />
        </div>
      </div>

      {request.has_message && (
        <ConfigProvider theme={{ token: { colorPrimary: "#4caf50" } }}>
          <Button
            htmlType="submit"
            type="primary"
            disabled={!isSubmittable}
            className="w-full mt-4 h-12 rounded-lg shadow-sm hover:shadow-md transition"
          >
            ارسال پیام
          </Button>
        </ConfigProvider>
      )}
    </Form>
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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <Card
        className={`w-full mb-4 shadow-sm rounded-xl transition hover:shadow-md ${
          request.hasResponse ? "bg-green-50 border border-green-400" : ""
        } rtl`}
        bodyStyle={{ padding: "16px" }}
        title={
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pl-[20px] sm:gap-4">
            <div className="flex items-center gap-2 min-w-0">
              <AiFillProduct size={22} />
              <span className="truncate">{request.title}</span>
            </div>
            <div className="flex items-center gap-2 text-orange-500 text-sm">
              <BsClock />
              <span>
                {new Date(request.expiredAt).toLocaleDateString("fa-IR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: false,
                })}
              </span>
            </div>
          </div>
        }
        extra={
          <Button
            type="primary"
            icon={<IoBagCheckOutline />}
            onClick={() => setIsModalOpen(true)}
            disabled={request.hasResponse}
          >
            ارسال قیمت
          </Button>
        }
      >
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Left image */}
          {request.attachedImage ? (
            <Image
              src={`${config.BACKEND_IMAGE_URL}/api/${request.attachedImage}`}
              width={100}
              height={100}
              className="rounded-lg flex-shrink-0"
              preview={false}
            />
          ) : (
            <Avatar
              size={100}
              className="rounded-lg flex-shrink-0 bg-gray-100"
              icon={<IoImageOutline size={30} />}
            />
          )}

          {/* Center description */}
          <div className="flex-1 min-w-0">
            <p className="truncate whitespace-pre-wrap">
              {request.description}
            </p>
          </div>

          {/* Right actions */}
          <div className="flex flex-col gap-2 justify-center sm:w-[100px]">
            <Badge
              count={request.messageCount}
              overflowCount={99}
              style={{ backgroundColor: "#1890ff" }}
            >
              <Button
                icon={<BiMessage />}
                onClick={() => setIsMessageModalOpen(true)}
                disabled={!request.hasResponse}
              >
                پیام ها
              </Button>
            </Badge>
          </div>
        </div>
      </Card>

      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        title="ارسال قیمت پیشنهادی"
        width={400}
      >
        <FormPriceInquiry request={request} refetch={refetch} />
      </Modal>

      <Modal
        open={isMessageModalOpen}
        onCancel={() => setIsMessageModalOpen(false)}
        footer={null}
        title="ارسال پیام"
        width={600}
      >
        <FormSendMessage request={request} />
      </Modal>
    </>
  );
}
