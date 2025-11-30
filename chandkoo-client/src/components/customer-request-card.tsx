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
  Input,
  message as antMessage,
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
  IoDownload,
} from "react-icons/io5";
import {
  AiFillProduct,
  AiOutlineMessage,
  AiOutlineDollar,
} from "react-icons/ai";
import { BiSend } from "react-icons/bi";
import { MdColorLens } from "react-icons/md";
import { config } from "../services/config.service";
import { useContext, useEffect, useState } from "react";
import {
  addPriceInquiryResponse,
  addPriceMessageResponse,
} from "../services/inquiry-response.service";
import { ShamContext } from "../App";
import FileUploader from "./file-uploader";
import ImageUploader from "./image-uploader";
import { Moment } from "moment";

const { useBreakpoint } = Grid;
const { Text, Paragraph, Title } = Typography;

// Color mapping for consistent display
const colorMap = {
  red: { label: "قرمز", hex: "#FF0000", textColor: "#FFFFFF" },
  blue: { label: "آبی", hex: "#0000FF", textColor: "#FFFFFF" },
  green: { label: "سبز", hex: "#008000", textColor: "#FFFFFF" },
  yellow: { label: "زرد", hex: "#FFFF00", textColor: "#000000" },
  orange: { label: "نارنجی", hex: "#FFA500", textColor: "#000000" },
  purple: { label: "بنفش", hex: "#800080", textColor: "#FFFFFF" },
  pink: { label: "صورتی", hex: "#FFC0CB", textColor: "#000000" },
  black: { label: "مشکی", hex: "#000000", textColor: "#FFFFFF" },
  white: { label: "سفید", hex: "#FFFFFF", textColor: "#000000" },
  gray: { label: "خاکستری", hex: "#808080", textColor: "#FFFFFF" },
  brown: { label: "قهوه‌ای", hex: "#8B4513", textColor: "#FFFFFF" },
  gold: { label: "طلایی", hex: "#FFD700", textColor: "#000000" },
  silver: { label: "نقره‌ای", hex: "#C0C0C0", textColor: "#000000" },
};

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

export const ChatModal = ({
  request,
  refetch,
  isOpen,
  onClose,
}: {
  request: any;
  refetch: Function;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [form] = Form.useForm();
  const [message, setMessage] = useState<string>("");
  const [file, setFile] = useState<File | null>();
  const [image, setImage] = useState<File | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const value: any = useContext(ShamContext);
  const screens = useBreakpoint();

  const isMobile = !screens.md;
  const isTablet = screens.md && !screens.lg;

  const handleSubmit = async () => {
    if (!message.trim() && !file && !image) {
      antMessage.warning("لطفا پیام یا فایل پیوستی وارد کنید");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      if (message.trim()) formData.append("message", message.trim());
      formData.append("requestId", request.id);
      formData.append("isMine", "false");
      if (file) formData.append("audio", file);
      if (image) formData.append("image", image);

      const data = await addPriceMessageResponse(formData);
      if (data.status === 200) {
        value.setNotif({ type: "success", description: "پیام ارسال شد" });
        refetch();
        setMessage("");
        setFile(null);
        setImage(null);
        form.resetFields();
      } else {
        throw new Error("خطا در ثبت پیام");
      }
    } catch (error) {
      value.setNotif({ type: "error", description: "خطا در ثبت پیام" });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setMessage("");
    setFile(null);
    setImage(null);
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onCancel={handleCancel}
      footer={null}
      width={isMobile ? "95%" : isTablet ? 800 : 1000}
      centered
      styles={{
        body: { padding: isMobile ? "16px" : "24px" },
      }}
    >
      <Form form={form} layout="vertical">
        <div
          className="flex flex-col"
          style={{ height: isMobile ? "70vh" : "60vh" }}
        >
          <Title level={4} className="!mb-4">
            مکاتبات - {request.title}
          </Title>

          {/* Messages List */}
          <div className="flex-1 overflow-hidden mb-4">
            <div className="h-full overflow-y-auto pr-2 space-y-3">
              {(request.messages || []).map((message: any, index: number) => (
                <div key={index} className="flex flex-col gap-2">
                  <div
                    className={`flex ${
                      message.isMine ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`flex gap-2 sm:gap-3 max-w-[90%] sm:max-w-[80%] ${
                        message.isMine ? "flex-row-reverse" : ""
                      }`}
                    >
                      <Avatar
                        size={isMobile ? "small" : "large"}
                        className="flex-shrink-0"
                      >
                        {message.user?.first_name?.charAt(0) || "ف"}
                      </Avatar>
                      <div
                        className={`flex flex-col ${
                          message.isMine ? "items-end" : "items-start"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Text strong className="text-xs sm:text-sm">
                            {message.isMine ? "شما" : "خریدار"}
                          </Text>
                          <Text className="text-xs text-gray-500">
                            {new Date(message.createdAt).toLocaleTimeString(
                              "fa-IR"
                            )}
                          </Text>
                        </div>
                        <div
                          className={`rounded-2xl px-3 py-2 sm:px-4 sm:py-2 ${
                            message.isMine
                              ? "bg-blue-500 text-white rounded-tr-none"
                              : "bg-gray-100 text-gray-800 rounded-tl-none"
                          }`}
                        >
                          <Text className="text-sm">{message.message}</Text>
                        </div>

                        {(message.attachedAudio || message.attachedImage) && (
                          <Space size="small" className="mt-2">
                            {message.attachedImage && (
                              <a
                                download
                                target="_blank"
                                rel="noopener noreferrer"
                                href={`${config.BACKEND_IMAGE_URL}/api/${message.attachedImage}`}
                                className="flex items-center gap-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded transition-colors"
                              >
                                <IoDownload />
                                تصویر
                              </a>
                            )}
                            {message.attachedAudio && (
                              <a
                                download
                                target="_blank"
                                rel="noopener noreferrer"
                                href={`${config.BACKEND_IMAGE_URL}/${message.attachedAudio}`}
                                className="flex items-center gap-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded transition-colors"
                              >
                                <IoDownload />
                                فایل صوتی
                              </a>
                            )}
                          </Space>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {(!request.messages || request.messages.length === 0) && (
                <div className="text-center py-8 text-gray-500">
                  <AiOutlineMessage className="text-4xl mx-auto mb-2 opacity-50" />
                  <Text>هنوز پیامی ارسال نشده است</Text>
                </div>
              )}
            </div>
          </div>

          {/* Message Input */}
          <Form.Item className="mb-0">
            <div className="flex gap-2 flex-col sm:flex-row">
              <div className="flex gap-2 flex-shrink-0 order-2 sm:order-1">
                <ImageUploader handleFile={setImage} />
                <FileUploader handleFile={setFile} />
              </div>
              <Input.TextArea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="پیام خود را وارد کنید..."
                rows={isMobile ? 2 : 3}
                className="flex-1 resize-none order-1 sm:order-2"
                size={isMobile ? "small" : "middle"}
                onPressEnter={(e) => {
                  if (e.shiftKey) return;
                  e.preventDefault();
                  handleSubmit();
                }}
              />
              <Button
                type="primary"
                icon={<BiSend className="rotate-180" />}
                onClick={handleSubmit}
                loading={loading}
                disabled={!message.trim() && !file && !image}
                className="flex-shrink-0 h-auto px-3 sm:px-4 order-3"
                size={isMobile ? "small" : "middle"}
              >
                {isMobile ? "" : "ارسال"}
              </Button>
            </div>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default function CustomerRequestCard({
  request,
  refetch,
}: {
  request: any;
  refetch: Function;
}) {
  const [isChatModalOpen, setIsChatModalOpen] = useState<boolean>(false);
  const [isPriceModalOpen, setIsPriceModalOpen] = useState<boolean>(false);
  const screens = useBreakpoint();

  // Extract color from description
  const extractColorInfo = () => {
    if (!request.inquiry_description) return null;

    const colorMatch = request.inquiry_description.match(/\\ رنگ: (.+)$/);
    if (colorMatch && colorMatch[1]) {
      const colorLabel = colorMatch[1].trim();
      // Find the color by label
      const colorEntry = Object.entries(colorMap).find(
        ([, value]) => value.label === colorLabel
      );
      if (colorEntry) {
        return {
          label: colorLabel,
          value: colorEntry[0],
          hex: colorEntry[1].hex,
          textColor: colorEntry[1].textColor,
        };
      }
    }
    return null;
  };

  // Get clean description without color info
  const getCleanDescription = () => {
    if (!request.inquiry_description) return "";
    return request.inquiry_description.replace(/\\\\ رنگ: .+$/, "").trim();
  };

  const colorInfo = extractColorInfo();
  const cleanDescription = getCleanDescription();

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

  const getMessageCount = () => {
    return request.messages?.length || 0;
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
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                <Title
                  level={screens.xs ? 5 : 4}
                  className="!mb-0 text-gray-800 leading-tight"
                  ellipsis={{ tooltip: request.title }}
                >
                  {request.title}
                </Title>

                {/* Color Badge */}
                {colorInfo && (
                  <div
                    className="flex items-center gap-2 px-3 py-1 rounded-full border-2 border-white shadow-sm font-semibold text-xs transition-all duration-300 hover:scale-105 flex-shrink-0"
                    style={{
                      backgroundColor: colorInfo.hex,
                      color: colorInfo.textColor,
                    }}
                  >
                    <MdColorLens size={14} />
                    <span className="font-bold">{colorInfo.label}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 text-amber-600">
                <IoTimeOutline size={screens.xs ? 14 : 16} />
                <Text className="text-sm font-medium">
                  اعتبار تا: {formatDate(request.expiredAt)}
                </Text>
              </div>

              {/* Messages Preview */}
              {getMessageCount() > 0 && (
                <div className="flex items-center gap-2 mt-2 text-blue-600">
                  <AiOutlineMessage size={screens.xs ? 12 : 14} />
                  <Text className="text-xs">
                    {getMessageCount()} پیام ارسال شده
                  </Text>
                </div>
              )}
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
            {/* Color Display Card */}
            {colorInfo && (
              <div className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                  <div
                    className="p-2 rounded-lg border-2 border-white shadow-sm flex-shrink-0"
                    style={{ backgroundColor: colorInfo.hex }}
                  >
                    <MdColorLens
                      size={18}
                      className="sm:w-5 sm:h-5"
                      style={{ color: colorInfo.textColor }}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-gray-700 font-medium text-sm sm:text-base truncate">
                      رنگ محصول
                    </div>
                    <div
                      className="font-bold text-xs sm:text-sm truncate px-2 py-1 rounded-full w-fit"
                      style={{
                        backgroundColor: colorInfo.hex,
                        color: colorInfo.textColor,
                      }}
                    >
                      {colorInfo.label}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Description */}
            {cleanDescription && (
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
                  {cleanDescription}
                </Paragraph>
              </div>
            )}

            {/* Stats */}
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Tag color="blue" className="m-0">
                  {request.responseCount || 0} پاسخ
                </Tag>
                <Text type="secondary">تعداد پاسخ‌ها</Text>
              </div>
              {request.lowestPrice > 0 && (
                <div className="flex items-center gap-2">
                  <Tag color="green" className="m-0">
                    {request.lowestPrice.toLocaleString()} ریال
                  </Tag>
                  <Text type="secondary">کمترین قیمت</Text>
                </div>
              )}
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
                onClick={() => setIsPriceModalOpen(true)}
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
                count={getMessageCount()}
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
                  onClick={() => setIsChatModalOpen(true)}
                  type={getMessageCount() > 0 ? "default" : "dashed"}
                  className={`rounded-lg font-medium ${
                    screens.xs ? "w-full h-10" : "px-6 h-11"
                  } ${
                    getMessageCount() > 0
                      ? "border-blue-300 text-blue-600 hover:border-blue-400 hover:text-blue-700"
                      : "text-gray-400"
                  }`}
                  size="large"
                >
                  {screens.xs ? "پیام‌ها" : "مشاهده پیام‌ها"}
                </Button>
              </Badge>
            </Space>
          </div>
        </div>
      </Card>

      {/* Price Inquiry Modal */}
      <Modal
        open={isPriceModalOpen}
        onCancel={() => setIsPriceModalOpen(false)}
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

      {/* Chat Modal */}
      <ChatModal
        request={request}
        refetch={refetch}
        isOpen={isChatModalOpen}
        onClose={() => setIsChatModalOpen(false)}
      />
    </>
  );
}
