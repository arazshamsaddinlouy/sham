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
  Grid,
  Typography,
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

const { useBreakpoint } = Grid;
const { Text, Paragraph } = Typography;

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
  const [loading, setLoading] = useState<boolean>(false);
  const value: any = useContext(ShamContext);
  const screens = useBreakpoint();

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setIsSubmittable(true))
      .catch(() => setIsSubmittable(false));
  }, [form, values]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const price = form.getFieldValue("suggestedPrice");
      const data = await addPriceInquiryResponse({
        requestId: request.id,
        price: price,
        expiredAt: dateString,
      });

      if (data.status === 200) {
        await refetch();
        value.setNotif({ type: "success", description: "پاسخ ارسال شد" });
        form.resetFields();
        setDateString("");
      } else {
        value.setNotif({ type: "error", description: "خطا در ثبت قیمت" });
      }
    } catch (error) {
      value.setNotif({ type: "error", description: "خطا در ارسال قیمت" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      className="w-full"
    >
      <div className="flex flex-col gap-4 mb-4">
        <Form.Item
          name="suggestedPrice"
          label="قیمت پیشنهادی"
          className="flex-1"
          rules={[
            { required: true, message: "لطفا قیمت پیشنهادی را وارد کنید" },
          ]}
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
            size={screens.xs ? "middle" : "large"}
          />
        </Form.Item>

        <Form.Item name="expiredAt" label="زمان اعتبار قیمت" className="flex-1">
          <JalaliLocaleListener />
          <ConfigProvider locale={fa_IR} direction="rtl">
            <DatePickerJalali
              showTime
              className="w-full"
              size={screens.xs ? "middle" : "large"}
              onChange={(d: Moment | null) =>
                setDateString(d?.toISOString() || "")
              }
              placeholder="انتخاب تاریخ و زمان"
            />
          </ConfigProvider>
          <div className="text-xs text-gray-500 mt-1">
            در صورت اعتبار داشتن تا پایان استعلام آن را خالی بگذارید
          </div>
        </Form.Item>
      </div>

      <ConfigProvider theme={{ token: { colorPrimary: "#4caf50" } }}>
        <Button
          htmlType="submit"
          type="primary"
          disabled={!isSubmittable || loading}
          loading={loading}
          className="w-full rounded-lg font-medium shadow-sm hover:shadow-md transition-all duration-300"
          size={screens.xs ? "middle" : "large"}
          style={{ height: screens.xs ? "40px" : "48px" }}
        >
          {loading ? "در حال ارسال..." : "ارسال قیمت پیشنهادی"}
        </Button>
      </ConfigProvider>
    </Form>
  );
};

export const FormSendMessage = ({
  request,
  refetch,
}: {
  request: any;
  refetch: Function;
}) => {
  const [form] = Form.useForm();
  const values = Form.useWatch([], form);
  const [file, setFile] = useState<File | null>();
  const [image, setImage] = useState<File | null>();
  const [isSubmittable, setIsSubmittable] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const value: any = useContext(ShamContext);
  const screens = useBreakpoint();

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setIsSubmittable(true))
      .catch(() => setIsSubmittable(false));
  }, [form, values]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("message", form.getFieldValue("message"));
      formData.append("requestId", request.id);
      if (file) formData.append("audio", file);
      if (image) formData.append("image", image);

      const data = await addPriceMessageResponse(formData);
      if (data.status === 200) {
        value.setNotif({
          type: "success",
          description: "پیام با موفقیت ارسال شد",
        });
        form.resetFields();
        setFile(null);
        setImage(null);
        refetch();
      } else {
        value.setNotif({ type: "error", description: "خطا در ارسال پیام" });
      }
    } catch (error) {
      value.setNotif({ type: "error", description: "خطا در ارسال پیام" });
    } finally {
      setLoading(false);
    }
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
        label="متن پیام"
        rules={[
          { required: true, message: "لطفا پیام خود را وارد کنید" },
          { min: 10, message: "پیام باید حداقل ۱۰ کاراکتر باشد" },
        ]}
      >
        <TextArea
          rows={screens.xs ? 3 : 4}
          maxLength={500}
          showCount
          className="resize-none"
          placeholder="پیام خود را برای خریدار بنویسید..."
          size={screens.xs ? "middle" : "large"}
        />
      </Form.Item>

      <div className="flex flex-col gap-4 mb-6">
        <div className="space-y-2">
          <Text strong className="text-sm">
            بارگذاری فایل صوتی (اختیاری)
          </Text>
          <FileUploader handleFile={setFile} />
        </div>
        <div className="space-y-2">
          <Text strong className="text-sm">
            بارگذاری تصویر (اختیاری)
          </Text>
          <ImageUploader handleFile={setImage} />
        </div>
      </div>

      <ConfigProvider theme={{ token: { colorPrimary: "#1890ff" } }}>
        <Button
          htmlType="submit"
          type="primary"
          disabled={!isSubmittable || loading || !request.has_message}
          loading={loading}
          className="w-full rounded-lg font-medium shadow-sm hover:shadow-md transition-all duration-300"
          size={screens.xs ? "middle" : "large"}
          style={{ height: screens.xs ? "40px" : "48px" }}
        >
          {loading ? "در حال ارسال..." : "ارسال پیام"}
        </Button>
      </ConfigProvider>

      {!request.has_message && (
        <div className="text-center text-orange-500 text-sm mt-2">
          امکان ارسال پیام برای این درخواست غیرفعال است
        </div>
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
  const screens = useBreakpoint();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getCardPadding = () => {
    if (screens.xs) return "12px";
    if (screens.sm) return "16px";
    return "20px";
  };

  const getImageSize = () => {
    if (screens.xs) return 60;
    if (screens.sm) return 80;
    return 100;
  };

  const getIconSize = () => {
    if (screens.xs) return 16;
    if (screens.sm) return 18;
    return 22;
  };

  const getButtonSize = () => {
    return screens.xs ? "small" : screens.sm ? "middle" : "large";
  };

  return (
    <>
      <Card
        className={`w-full mb-4 shadow-sm hover:shadow-md transition-all duration-300 rounded-xl border-0 ${
          request.hasResponse
            ? "bg-gradient-to-r from-green-50 to-emerald-50 border-r-4 border-r-green-500"
            : "bg-white"
        }`}
        bodyStyle={{
          padding: getCardPadding(),
          paddingBottom: screens.xs ? "8px" : getCardPadding(),
        }}
      >
        {/* Header Section */}
        <div className="flex flex-col gap-3 mb-3">
          <div className="flex items-start gap-3">
            <div
              className={`p-2 rounded-lg flex-shrink-0 ${
                request.hasResponse
                  ? "bg-green-100 text-green-600"
                  : "bg-blue-100 text-blue-600"
              }`}
            >
              <AiFillProduct size={getIconSize()} />
            </div>

            <div className="flex-1 min-w-0">
              <Text
                strong
                className="text-gray-800 block"
                style={{
                  fontSize: screens.xs ? "14px" : screens.sm ? "16px" : "18px",
                  lineHeight: 1.3,
                }}
                ellipsis={{ tooltip: request.title }}
              >
                {request.title}
              </Text>

              <div className="flex items-center gap-1 text-orange-500 mt-1">
                <BsClock size={screens.xs ? 12 : 14} />
                <Text
                  className="text-xs sm:text-sm"
                  style={{ lineHeight: 1.2 }}
                >
                  اعتبار تا: {formatDate(request.expiredAt)}
                </Text>
              </div>
            </div>
          </div>

          {/* Action Buttons - Mobile optimized */}
          <div className="flex gap-2 w-full">
            <Button
              type="primary"
              icon={<IoBagCheckOutline />}
              onClick={() => setIsModalOpen(true)}
              disabled={request.hasResponse}
              className={`flex-1 ${
                request.hasResponse
                  ? "bg-gray-400 border-gray-400"
                  : "bg-green-600 hover:bg-green-700 border-green-600"
              }`}
              size={getButtonSize()}
            >
              {screens.xs ? "" : "ارسال قیمت"}
            </Button>

            <Badge
              count={request.messageCount}
              overflowCount={99}
              style={{ backgroundColor: "#1890ff" }}
              size="small"
              className="flex-1"
            >
              <Button
                icon={<BiMessage />}
                onClick={() => setIsMessageModalOpen(true)}
                disabled={!request.hasResponse}
                type={request.hasResponse ? "default" : "dashed"}
                className="w-full"
                size={getButtonSize()}
              >
                {screens.xs ? "" : "پیام ها"}
              </Button>
            </Badge>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col sm:flex-row gap-3 items-start">
          {/* Image */}
          <div className="flex-shrink-0 mx-auto sm:mx-0">
            {request.attachedImage ? (
              <Image
                src={`${config.BACKEND_IMAGE_URL}/api/${request.attachedImage}`}
                width={getImageSize()}
                height={getImageSize()}
                className="rounded-lg object-cover border"
                preview={false}
                alt={request.title}
              />
            ) : (
              <Avatar
                size={getImageSize()}
                className="rounded-lg bg-gray-100 border flex items-center justify-center"
                icon={
                  <IoImageOutline
                    size={screens.xs ? 20 : screens.sm ? 24 : 30}
                    className="text-gray-400"
                  />
                }
              />
            )}
          </div>

          {/* Description */}
          <div className="flex-1 min-w-0 text-center sm:text-right">
            <Paragraph
              className="text-gray-600 leading-relaxed text-justify"
              ellipsis={{
                rows: screens.xs ? 2 : screens.sm ? 3 : 4,
                expandable: true,
                symbol: "بیشتر",
              }}
              style={{
                fontSize: screens.xs ? "13px" : "14px",
                marginBottom: screens.xs ? "8px" : "12px",
              }}
            >
              {request.description}
            </Paragraph>

            {/* Status Badge */}
            {request.hasResponse && (
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs sm:text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                پاسخ داده شده
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Price Inquiry Modal */}
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        title={
          <div
            className="text-right font-bold text-gray-800"
            style={{
              fontSize: screens.xs ? "16px" : "20px",
            }}
          >
            ارسال قیمت پیشنهادی
          </div>
        }
        width={screens.xs ? "95vw" : screens.sm ? "90vw" : 600}
        centered
        styles={{
          body: {
            padding: screens.xs ? "16px" : "24px",
            paddingTop: screens.xs ? "12px" : "20px",
          },
        }}
      >
        <FormPriceInquiry request={request} refetch={refetch} />
      </Modal>

      {/* Message Modal */}
      <Modal
        open={isMessageModalOpen}
        onCancel={() => setIsMessageModalOpen(false)}
        footer={null}
        title={
          <div
            className="text-right font-bold text-gray-800"
            style={{
              fontSize: screens.xs ? "16px" : "20px",
            }}
          >
            ارسال پیام به خریدار
          </div>
        }
        width={screens.xs ? "95vw" : screens.sm ? "90vw" : 700}
        centered
        styles={{
          body: {
            padding: screens.xs ? "16px" : "24px",
            paddingTop: screens.xs ? "12px" : "20px",
          },
        }}
      >
        <FormSendMessage request={request} refetch={refetch} />
      </Modal>
    </>
  );
}
