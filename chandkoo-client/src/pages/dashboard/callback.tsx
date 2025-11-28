import { useEffect, useState } from "react";
import {
  Card,
  Result,
  Button,
  Typography,
  Space,
  Tag,
  Divider,
  Alert,
  Statistic,
} from "antd";
import {
  CheckCircleOutlined,
  WalletOutlined,
  ArrowUpOutlined,
  ReloadOutlined,
  HomeOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import formatPersianNumber from "../../utils/numberPriceFormat";

const { Title, Text } = Typography;

interface ChargeResult {
  success: boolean;
  amount: number;
  previousBalance: number;
  newBalance: number;
  transactionId: string;
  date: string;
}

export default function Callback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [chargeResult, setChargeResult] = useState<ChargeResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Format number with comma separators
  const formatNumber = (value: number) => {
    return formatPersianNumber(
      value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    );
  };

  useEffect(() => {
    // Simulate processing callback from payment gateway
    const processCallback = async () => {
      try {
        setLoading(true);

        // Get parameters from URL (in real scenario, these would come from payment gateway)
        const status = searchParams.get("status") || "success";
        const amount = searchParams.get("amount") || "100000";
        const transactionId =
          searchParams.get("transactionId") || `TX_${Date.now()}`;

        // Simulate API call to verify payment
        await new Promise((resolve) => setTimeout(resolve, 2000));

        if (status === "success") {
          // In real app, you would get this data from your backend
          const currentBalance = 500000; // This would come from user context/API
          const chargeAmount = parseInt(amount);

          const result: ChargeResult = {
            success: true,
            amount: chargeAmount,
            previousBalance: currentBalance,
            newBalance: currentBalance + chargeAmount,
            transactionId: transactionId,
            date: new Date().toLocaleDateString("fa-IR"),
          };

          setChargeResult(result);

          // Here you would typically:
          // 1. Update user balance in context/state
          // 2. Send to analytics
          // 3. Show notification
          console.log("Charge completed successfully:", result);
        } else {
          setError("پرداخت با خطا مواجه شد. لطفا مجددا تلاش کنید.");
        }
      } catch (err) {
        console.error("Callback processing error:", err);
        setError("خطا در پردازش نتیجه پرداخت. لطفا با پشتیبانی تماس بگیرید.");
      } finally {
        setLoading(false);
      }
    };

    processCallback();
  }, [searchParams]);

  const handleNewCharge = () => {
    navigate("/dashboard/charge"); // Navigate back to charge page
  };

  const handleGoHome = () => {
    navigate("/"); // Navigate to home page
  };

  const handleViewTransactions = () => {
    navigate("/dashboard/transactions"); // Navigate to transactions history
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="text-center shadow-2xl border-0 rounded-2xl max-w-md w-full">
          <div className="py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
            <Title level={4} className="!text-gray-700">
              در حال تأیید پرداخت...
            </Title>
            <Text type="secondary">لطفا چند لحظه صبر کنید</Text>
          </div>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
        <Card className="text-center shadow-2xl border-0 rounded-2xl max-w-md w-full">
          <Result
            status="error"
            title="پرداخت ناموفق"
            subTitle={error}
            extra={[
              <Button
                type="primary"
                key="retry"
                onClick={handleNewCharge}
                icon={<ReloadOutlined />}
                size="large"
              >
                تلاش مجدد
              </Button>,
              <Button key="home" onClick={handleGoHome} size="large">
                بازگشت به خانه
              </Button>,
            ]}
          />
        </Card>
      </div>
    );
  }

  if (!chargeResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="text-center shadow-2xl border-0 rounded-2xl max-w-md w-full">
          <Result
            status="warning"
            title="اطلاعات پرداخت یافت نشد"
            subTitle="لطفا از طریق صفحه شارژ کیف پول اقدام کنید"
            extra={
              <Button type="primary" onClick={handleNewCharge} size="large">
                رفتن به صفحه شارژ
              </Button>
            }
          />
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <Card
        className="shadow-2xl border-0 rounded-2xl max-w-2xl w-full overflow-hidden"
        bodyStyle={{ padding: 0 }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-8 text-center">
          <CheckCircleOutlined className="text-5xl mb-4 text-white" />
          <Title level={2} className="!text-white !mb-2">
            پرداخت با موفقیت انجام شد
          </Title>
          <Text className="text-green-100 text-lg">
            کیف پول شما با موفقیت شارژ شد
          </Text>
        </div>

        {/* Content */}
        <div className="p-8">
          <Space direction="vertical" size="large" className="w-full">
            {/* Amount Added */}
            <div className="text-center bg-green-50 rounded-2xl p-6 border border-green-200">
              <Text className="text-gray-600 block mb-3 text-lg">
                مبلغ اضافه شده به کیف پول:
              </Text>
              <div className="flex items-center justify-center gap-3">
                <ArrowUpOutlined className="text-green-500 text-2xl" />
                <Title level={1} className="!text-green-600 !mb-0">
                  {formatNumber(chargeResult.amount)} تومان
                </Title>
              </div>
            </div>

            {/* Balance Summary */}
            <Card
              className="border-0 shadow-sm bg-white"
              bodyStyle={{ padding: "24px" }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <Statistic
                    title="موجودی قبلی"
                    value={chargeResult.previousBalance}
                    formatter={(value) => (
                      <Text className="text-gray-600 text-xl">
                        {formatNumber(Number(value))}
                      </Text>
                    )}
                    prefix={<WalletOutlined className="text-gray-400" />}
                  />
                </div>

                <div className="flex items-center justify-center">
                  <ArrowUpOutlined className="text-green-500 text-3xl" />
                </div>

                <div>
                  <Statistic
                    title="موجودی جدید"
                    value={chargeResult.newBalance}
                    valueStyle={{ color: "#16a34a" }}
                    formatter={(value) => (
                      <Text className="text-green-600 text-2xl font-bold">
                        {formatNumber(Number(value))}
                      </Text>
                    )}
                    prefix={<WalletOutlined className="text-green-500" />}
                  />
                </div>
              </div>
            </Card>

            {/* Transaction Details */}
            <Card
              title="جزئیات تراکنش"
              className="border-0 bg-gray-50"
              extra={<Tag color="green">موفق</Tag>}
            >
              <Space direction="vertical" size="middle" className="w-full">
                <div className="flex justify-between items-center">
                  <Text strong>شماره تراکنش:</Text>
                  <Text code className="font-mono">
                    {chargeResult.transactionId}
                  </Text>
                </div>

                <div className="flex justify-between items-center">
                  <Text strong>تاریخ:</Text>
                  <Text>{chargeResult.date}</Text>
                </div>

                <div className="flex justify-between items-center">
                  <Text strong>زمان:</Text>
                  <Text>{new Date().toLocaleTimeString("fa-IR")}</Text>
                </div>

                <div className="flex justify-between items-center">
                  <Text strong>وضعیت:</Text>
                  <Tag color="green" icon={<CheckCircleOutlined />}>
                    تکمیل شده
                  </Tag>
                </div>
              </Space>
            </Card>

            {/* Next Steps Alert */}
            <Alert
              message="اقدامات بعدی"
              description={
                <Space
                  direction="vertical"
                  size="small"
                  className="w-full text-right"
                >
                  <Text>• اکنون می‌توانید در مزایده‌ها شرکت کنید</Text>
                  <Text>• موجودی کافی برای پیشنهاد دادن دارید</Text>
                  <Text>• تاریخچه تراکنش‌ها در پنل کاربری قابل مشاهده است</Text>
                </Space>
              }
              type="info"
              showIcon
              className="rounded-lg"
            />

            <Divider />

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                type="primary"
                size="large"
                icon={<ReloadOutlined />}
                onClick={handleNewCharge}
                className="h-12 px-8"
              >
                شارژ مجدد
              </Button>

              <Button
                size="large"
                icon={<HistoryOutlined />}
                onClick={handleViewTransactions}
                className="h-12 px-8"
              >
                مشاهده تاریخچه
              </Button>

              <Button
                size="large"
                icon={<HomeOutlined />}
                onClick={handleGoHome}
                className="h-12 px-8"
              >
                بازگشت به خانه
              </Button>
            </div>
          </Space>
        </div>
      </Card>
    </div>
  );
}
