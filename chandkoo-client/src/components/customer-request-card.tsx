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
  Tag,
  Space,
  Divider,
} from "antd";
import {
  DatePicker as DatePickerJalali,
  JalaliLocaleListener,
} from "antd-jalali";
import fa_IR from "antd/lib/locale/fa_IR";
import {
  IoBagCheckOutline,
  IoImageOutline,
  IoCalendarOutline,
  IoTimeOutline,
} from "react-icons/io5";
import {
  AiFillProduct,
  AiOutlineMessage,
  AiOutlineDollar,
} from "react-icons/ai";
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
const { Text, Paragraph, Title } = Typography;

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
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <AiOutlineDollar className="text-green-600 text-xl" />
        </div>
        <Title level={4} className="!mb-2">
          ارسال قیمت پیشنهادی
        </Title>
        <Text type="secondary">قیمت خود را برای محصول مورد نظر ارسال کنید</Text>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <Form.Item
            name="suggestedPrice"
            label={
              <span className="flex items-center gap-2">
                <AiOutlineDollar className="text-green-500" />
                قیمت پیشنهادی
              </span>
            }
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
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item
            name="expiredAt"
            label={
              <span className="flex items-center gap-2">
                <IoTimeOutline className="text-blue-500" />
                زمان اعتبار قیمت
              </span>
            }
            className="flex-1"
          >
            <JalaliLocaleListener />
            <ConfigProvider locale={fa_IR} direction="rtl">
              <DatePickerJalali
                showTime
                className="w-full rounded-lg"
                size={screens.xs ? "middle" : "large"}
                onChange={(d: Moment | null) =>
                  setDateString(d?.toISOString() || "")
                }
                placeholder="انتخاب تاریخ و زمان"
                suffixIcon={<IoCalendarOutline className="text-gray-400" />}
              />
            </ConfigProvider>
            <div className="text-xs text-gray-500 mt-2 flex items-center gap-1">
              <IoTimeOutline className="text-gray-400" />
              در صورت عدم نیاز به تاریخ انقضا، این فیلد را خالی بگذارید
            </div>
          </Form.Item>
        </div>

        <ConfigProvider theme={{ token: { colorPrimary: "#10b981" } }}>
          <Button
            htmlType="submit"
            type="primary"
            disabled={!isSubmittable || loading}
            loading={loading}
            className="w-full rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 h-12 text-lg"
            size="large"
            icon={<AiOutlineDollar />}
          >
            {loading ? "در حال ارسال..." : "ارسال قیمت پیشنهادی"}
          </Button>
        </ConfigProvider>
      </Form>
    </div>
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
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <AiOutlineMessage className="text-blue-600 text-xl" />
        </div>
        <Title level={4} className="!mb-2">
          ارسال پیام به خریدار
        </Title>
        <Text type="secondary">پیام خود را برای خریدار ارسال کنید</Text>
      </div>

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
            rows={screens.xs ? 4 : 5}
            maxLength={500}
            showCount
            className="resize-none rounded-lg"
            placeholder="پیام خود را برای خریدار بنویسید..."
            size={screens.xs ? "middle" : "large"}
          />
        </Form.Item>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="space-y-3">
            <Text strong className="text-sm flex items-center gap-2">
              <IoImageOutline className="text-purple-500" />
              بارگذاری تصویر (اختیاری)
            </Text>
            <ImageUploader handleFile={setImage} />
          </div>
          <div className="space-y-3">
            <Text strong className="text-sm flex items-center gap-2">
              <BiMessage className="text-orange-500" />
              بارگذاری فایل صوتی (اختیاری)
            </Text>
            <FileUploader handleFile={setFile} />
          </div>
        </div>

        <ConfigProvider theme={{ token: { colorPrimary: "#3b82f6" } }}>
          <Button
            htmlType="submit"
            type="primary"
            disabled={!isSubmittable || loading || !request.has_message}
            loading={loading}
            className="w-full rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 h-12 text-lg"
            size="large"
            icon={<AiOutlineMessage />}
          >
            {loading ? "در حال ارسال..." : "ارسال پیام"}
          </Button>
        </ConfigProvider>

        {!request.has_message && (
          <div className="text-center text-amber-600 text-sm mt-3 bg-amber-50 py-2 rounded-lg border border-amber-200">
            امکان ارسال پیام برای این درخواست غیرفعال است
          </div>
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

  const getCardStyle = () => {
    if (request.hasResponse) {
      return {
        background: "linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)",
        border: "1px solid #dcfce7",
        borderLeft: "4px solid #10b981",
      };
    }
    return {
      background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
      border: "1px solid #e2e8f0",
      borderLeft: "4px solid #3b82f6",
    };
  };

  return (
    <>
      <Card
        className="w-full mb-6 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden"
        bodyStyle={{ padding: screens.xs ? "16px" : "24px" }}
        style={getCardStyle()}
      >
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row gap-4 items-start mb-4">
          {/* Product Icon and Title */}
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div
              className={`p-3 rounded-xl flex-shrink-0 ${
                request.hasResponse
                  ? "bg-green-100 text-green-600"
                  : "bg-blue-100 text-blue-600"
              }`}
            >
              <AiFillProduct size={screens.xs ? 20 : 24} />
            </div>

            <div className="flex-1 min-w-0">
              <Title
                level={screens.xs ? 5 : 4}
                className="!mb-2 text-gray-800 leading-tight"
                ellipsis={{ tooltip: request.title }}
              >
                {request.title}
              </Title>

              <div className="flex items-center gap-2 text-amber-600">
                <IoTimeOutline size={screens.xs ? 14 : 16} />
                <Text className="text-sm font-medium">
                  اعتبار تا: {formatDate(request.expiredAt)}
                </Text>
              </div>
            </div>
          </div>

          {/* Status Badge */}
          {request.hasResponse && (
            <Badge.Ribbon
              text="پاسخ داده شده"
              color="green"
              className="text-xs font-bold"
            >
              <div></div>
            </Badge.Ribbon>
          )}
        </div>

        <Divider className="my-4" />

        {/* Content Section */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Image Section */}
          <div className="flex-shrink-0 mx-auto lg:mx-0">
            {request.attachedImage ? (
              <div className="relative group">
                <Image
                  src={`${config.BACKEND_IMAGE_URL}/api/${request.attachedImage}`}
                  width={screens.xs ? 100 : screens.sm ? 120 : 140}
                  height={screens.xs ? 100 : screens.sm ? 120 : 140}
                  className="rounded-xl object-cover border-2 border-white shadow-md group-hover:shadow-lg transition-all duration-300"
                  preview={{
                    mask: (
                      <div className="text-white text-sm">مشاهده تصویر</div>
                    ),
                  }}
                  alt={request.title}
                />
              </div>
            ) : (
              <Avatar
                size={screens.xs ? 100 : screens.sm ? 120 : 140}
                className="rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-white shadow-md flex items-center justify-center"
                icon={
                  <IoImageOutline
                    size={screens.xs ? 32 : 40}
                    className="text-gray-400"
                  />
                }
              />
            )}
          </div>

          {/* Description and Actions */}
          <div className="flex-1 min-w-0 space-y-4">
            {/* Description */}
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <Paragraph
                className="text-gray-600 leading-relaxed text-justify"
                ellipsis={{
                  rows: screens.xs ? 3 : 4,
                  expandable: true,
                  symbol: (expanded) => (
                    <Tag color="blue" className="cursor-pointer mt-2">
                      {expanded ? "کمتر" : "بیشتر"}
                    </Tag>
                  ),
                }}
                style={{
                  fontSize: screens.xs ? "14px" : "15px",
                  lineHeight: "1.7",
                }}
              >
                {request.description}
              </Paragraph>
            </div>

            {/* Action Buttons */}
            <Space
              direction={screens.xs ? "vertical" : "horizontal"}
              className="w-full"
              size="middle"
            >
              <Button
                type="primary"
                icon={<IoBagCheckOutline />}
                onClick={() => setIsModalOpen(true)}
                disabled={request.hasResponse}
                className={`rounded-lg font-medium ${
                  request.hasResponse
                    ? "bg-gray-400 border-gray-400 hover:bg-gray-400"
                    : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 border-0 shadow-lg hover:shadow-xl"
                } ${screens.xs ? "w-full h-10" : "px-6 h-11"}`}
                size="large"
              >
                {screens.xs ? "ارسال قیمت" : "ارسال قیمت پیشنهادی"}
              </Button>

              <Badge
                count={request.messageCount}
                overflowCount={99}
                style={{
                  backgroundColor: "#3b82f6",
                  boxShadow: "0 2px 8px rgba(59, 130, 246, 0.3)",
                }}
                size="small"
                className={screens.xs ? "w-full" : ""}
              >
                <Button
                  icon={<AiOutlineMessage />}
                  onClick={() => setIsMessageModalOpen(true)}
                  disabled={!request.hasResponse}
                  type={request.hasResponse ? "default" : "dashed"}
                  className={`rounded-lg font-medium ${
                    screens.xs ? "w-full h-10" : "px-6 h-11"
                  } ${
                    request.hasResponse
                      ? "border-blue-300 text-blue-600 hover:border-blue-400 hover:text-blue-700"
                      : "text-gray-400"
                  }`}
                  size="large"
                >
                  {screens.xs ? "پیام‌ها" : "مدیریت پیام‌ها"}
                </Button>
              </Badge>
            </Space>
          </div>
        </div>
      </Card>

      {/* Price Inquiry Modal */}
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        title={null}
        width={screens.xs ? "95vw" : screens.sm ? "90vw" : 700}
        centered
        styles={{
          body: {
            padding: screens.xs ? "20px" : "32px",
          },
        }}
        className="rounded-2xl"
      >
        <FormPriceInquiry request={request} refetch={refetch} />
      </Modal>

      {/* Message Modal */}
      <Modal
        open={isMessageModalOpen}
        onCancel={() => setIsMessageModalOpen(false)}
        footer={null}
        title={null}
        width={screens.xs ? "95vw" : screens.sm ? "90vw" : 800}
        centered
        styles={{
          body: {
            padding: screens.xs ? "20px" : "32px",
          },
        }}
        className="rounded-2xl"
      >
        <FormSendMessage request={request} refetch={refetch} />
      </Modal>
    </>
  );
}
