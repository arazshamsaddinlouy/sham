import { useState } from "react";
import {
  Card,
  Form,
  Input,
  Button,
  Alert,
  Typography,
  Divider,
  Tag,
  Space,
} from "antd";
import {
  WalletOutlined,
  SafetyCertificateOutlined,
  ThunderboltOutlined,
  InfoCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import formatPersianNumber from "../../utils/numberPriceFormat";

const { Title, Text } = Typography;

export default function MoneyBagCharge() {
  const [form] = Form.useForm();
  const [amount, setAmount] = useState<string>("");
  const [isSubmittable, setIsSubmittable] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // Format number with comma separators
  const formatNumber = (value: string) => {
    // Remove all non-digit characters
    const numericValue = value.replace(/\D/g, "");

    if (!numericValue) return "";

    // Format with comma separators
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Parse formatted number back to numeric value
  const parseNumber = (formattedValue: string): number => {
    return parseInt(formattedValue.replace(/,/g, "")) || 0;
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatNumber(e.target.value);
    setAmount(formattedValue);

    // Validate if amount meets minimum requirement
    const numericValue = parseNumber(formattedValue);
    setIsSubmittable(numericValue >= 100000);
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const numericAmount = parseNumber(amount);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Charging wallet with amount:", numericAmount);

      // Here you would typically call your payment API
      // await chargeWallet(numericAmount);

      // Reset form on success
      form.resetFields();
      setAmount("");
      setIsSubmittable(false);

      // Show success message (you can replace this with your notification system)
      alert(`کیف پول شما با موفقیت به مبلغ ${amount} تومان شارژ شد`);
    } catch (error) {
      console.error("Charge failed:", error);
      alert("خطا در انجام عملیات شارژ. لطفا مجددا تلاش کنید.");
    } finally {
      setLoading(false);
    }
  };

  const quickAmounts = [
    { label: "۱۰۰,۰۰۰ تومان", value: "100000" },
    { label: "۵۰۰,۰۰۰ تومان", value: "500000" },
    { label: "۱,۰۰۰,۰۰۰ تومان", value: "1000000" },
    { label: "۲,۰۰۰,۰۰۰ تومان", value: "2000000" },
  ];

  const handleQuickAmountClick = (value: string) => {
    const formattedValue = formatNumber(value);
    setAmount(formattedValue);
    form.setFieldValue("amount", formattedValue);
    setIsSubmittable(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-md mx-auto">
        <Card
          className="shadow-2xl border-0 rounded-2xl overflow-hidden"
          bodyStyle={{ padding: 0 }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-white/20 p-4 rounded-full">
                <WalletOutlined className="text-3xl" />
              </div>
            </div>
            <Title level={3} className="!text-white !mb-2">
              شارژ کیف پول
            </Title>
            <Text className="text-blue-100">
              افزایش موجودی برای شرکت در مزایده‌ها
            </Text>
          </div>

          {/* Content */}
          <div className="p-6">
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              className="space-y-6"
            >
              {/* Amount Input */}
              <Form.Item
                label={
                  <Space direction="vertical" size="small" className="w-full">
                    <Text strong className="text-lg">
                      مبلغ شارژ (تومان)
                    </Text>
                    <Text type="secondary" className="text-sm">
                      حداقل مبلغ شارژ: ۱۰۰,۰۰۰ تومان
                    </Text>
                  </Space>
                }
                name="amount"
                rules={[
                  { required: true, message: "لطفا مبلغ شارژ را وارد کنید" },
                  {
                    validator: (_, value) => {
                      const numericValue = parseNumber(value || "");
                      if (numericValue < 100000) {
                        return Promise.reject(
                          new Error("حداقل مبلغ شارژ ۱۰۰,۰۰۰ تومان می‌باشد")
                        );
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder="مثال: ۵۰۰,۰۰۰"
                  value={amount}
                  onChange={handleAmountChange}
                  className="text-left font-mono text-lg h-12 rounded-lg"
                  addonAfter={
                    <Text type="secondary" className="text-sm">
                      تومان
                    </Text>
                  }
                />
              </Form.Item>

              {/* Quick Amount Buttons */}
              <div className="space-y-3">
                <Text className="text-gray-600 text-sm">مبالغ پرکاربرد:</Text>
                <div className="grid grid-cols-2 gap-3">
                  {quickAmounts.map((item) => (
                    <Button
                      key={item.value}
                      type={
                        amount === formatNumber(item.value)
                          ? "primary"
                          : "default"
                      }
                      size="middle"
                      className="h-12 rounded-lg font-medium"
                      onClick={() => handleQuickAmountClick(item.value)}
                    >
                      {item.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Information Alert */}
              <Alert
                message="اطلاعات مهم"
                description={
                  <Space direction="vertical" size="small" className="w-full">
                    <div className="flex items-center gap-2">
                      <CheckCircleOutlined className="text-green-500" />
                      <Text>شارژ کیف پول برای شرکت در مزایده‌ها ضروری است</Text>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircleOutlined className="text-green-500" />
                      <Text>
                        حداقل ۲۰٪ قیمت پایه باید در کیف پول موجود باشد
                      </Text>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircleOutlined className="text-green-500" />
                      <Text>موجودی کیف پول در هر زمان قابل برداشت است</Text>
                    </div>
                  </Space>
                }
                type="info"
                showIcon
                icon={<InfoCircleOutlined />}
                className="rounded-lg"
              />

              {/* Current Amount Display */}
              {amount && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4 text-center">
                  <Text className="text-gray-600 block mb-2">
                    مبلغ انتخابی:
                  </Text>
                  <Title level={2} className="!text-green-600 !mb-0">
                    {formatPersianNumber(amount)} تومان
                  </Title>
                </div>
              )}

              <Divider />

              {/* Security Notice */}
              <div className="text-center space-y-3">
                <div className="flex justify-center items-center gap-2 text-green-600">
                  <SafetyCertificateOutlined />
                  <Text strong>تراکنش امن و رمزگذاری شده</Text>
                </div>
                <Text type="secondary" className="text-xs block">
                  کلیه تراکنش‌ها تحت نظارت بانک مرکزی و با پروتکل‌های امنیتی
                  پیشرفته انجام می‌شود
                </Text>
              </div>

              {/* Submit Button */}
              <Form.Item className="mb-0">
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  loading={loading}
                  disabled={!isSubmittable}
                  className="w-full h-14 rounded-xl shadow-lg"
                  icon={!loading && <ThunderboltOutlined />}
                >
                  {loading
                    ? "در حال انتقال به درگاه پرداخت..."
                    : "پرداخت و شارژ کیف پول"}
                </Button>
              </Form.Item>
            </Form>

            {/* Additional Information */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <Space direction="vertical" size="small" className="w-full">
                <div className="flex justify-between items-center">
                  <Text type="secondary">کارمزد تراکنش:</Text>
                  <Tag color="green" className="font-medium">
                    رایگان
                  </Tag>
                </div>
                <div className="flex justify-between items-center">
                  <Text type="secondary">زمان واریز:</Text>
                  <Tag color="blue" className="font-medium">
                    آنی
                  </Tag>
                </div>
              </Space>
            </div>
          </div>
        </Card>

        {/* Support Info */}
        <div className="text-center mt-6">
          <Text type="secondary" className="text-sm">
            در صورت بروز مشکل با پشتیبانی تماس بگیرید:
            <a href="tel:02112345678" className="text-blue-600 mr-1">
              {" "}
              ۰۲۱-۱۲۳۴۵۶۷۸
            </a>
          </Text>
        </div>
      </div>
    </div>
  );
}
