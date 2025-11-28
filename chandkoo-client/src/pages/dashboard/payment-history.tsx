import { useState, useEffect } from "react";
import {
  Card,
  Table,
  Tag,
  Button,
  Space,
  Typography,
  Input,
  DatePicker,
  Select,
  Statistic,
  Row,
  Col,
  Badge,
  Tooltip,
  Modal,
  Descriptions,
} from "antd";
import {
  DownloadOutlined,
  FilterOutlined,
  SearchOutlined,
  EyeOutlined,
  ReloadOutlined,
  WalletOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";
import type { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import formatPersianNumber from "../../utils/numberPriceFormat";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Search } = Input;
const { Option } = Select;

interface PaymentTransaction {
  id: string;
  amount: number;
  type: "charge" | "withdrawal" | "bid" | "refund";
  status: "completed" | "pending" | "failed" | "cancelled";
  description: string;
  date: string;
  transactionId: string;
  balanceAfter: number;
  reference?: string;
}

export default function PaymentHistory() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState<PaymentTransaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<
    PaymentTransaction[]
  >([]);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [dateRange, setDateRange] = useState<[string, string] | null>(null);
  const [selectedTransaction, setSelectedTransaction] =
    useState<PaymentTransaction | null>(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);

  // Mock data - in real app, this would come from API
  const mockTransactions: PaymentTransaction[] = [
    {
      id: "1",
      amount: 500000,
      type: "charge",
      status: "completed",
      description: "شارژ کیف پول از درگاه بانک ملت",
      date: "2024-01-15T10:30:00",
      transactionId: "TX_789456123",
      balanceAfter: 1500000,
      reference: "شارژ آنلاین",
    },
    {
      id: "2",
      amount: -200000,
      type: "bid",
      status: "completed",
      description: "شرکت در مزایده محصول آیفون 15",
      date: "2024-01-14T15:45:00",
      transactionId: "BID_456789",
      balanceAfter: 1300000,
      reference: "مزایده #2456",
    },
    {
      id: "3",
      amount: 1000000,
      type: "charge",
      status: "completed",
      description: "شارژ کیف پول از درگاه بانک سامان",
      date: "2024-01-12T09:15:00",
      transactionId: "TX_123456789",
      balanceAfter: 1000000,
      reference: "شارژ آنلاین",
    },
    {
      id: "4",
      amount: -50000,
      type: "bid",
      status: "completed",
      description: "شرکت در مزایده محصول لپ تاپ دل",
      date: "2024-01-10T14:20:00",
      transactionId: "BID_123456",
      balanceAfter: 950000,
      reference: "مزایده #2341",
    },
    {
      id: "5",
      amount: 300000,
      type: "charge",
      status: "pending",
      description: "شارژ کیف پول از درگاه بانک پارسیان",
      date: "2024-01-08T11:00:00",
      transactionId: "TX_987654321",
      balanceAfter: 1250000,
      reference: "شارژ آنلاین",
    },
    {
      id: "6",
      amount: 150000,
      type: "refund",
      status: "completed",
      description: "عودت وجه مزایده لغو شده",
      date: "2024-01-05T16:30:00",
      transactionId: "REF_456123",
      balanceAfter: 1400000,
      reference: "عودت #123",
    },
    {
      id: "7",
      amount: -100000,
      type: "withdrawal",
      status: "failed",
      description: "درخواست برداشت وجه به حساب بانکی",
      date: "2024-01-03T13:15:00",
      transactionId: "WITH_789123",
      balanceAfter: 1400000,
      reference: "برداشت به حساب",
    },
    {
      id: "8",
      amount: -75000,
      type: "bid",
      status: "cancelled",
      description: "شرکت در مزایده محصول ساعت هوشمند",
      date: "2024-01-01T18:45:00",
      transactionId: "BID_789456",
      balanceAfter: 1325000,
      reference: "مزایده #2678",
    },
  ];

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    filterTransactions();
  }, [transactions, searchText, statusFilter, typeFilter, dateRange]);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setTransactions(mockTransactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterTransactions = () => {
    let filtered = transactions;

    // Search filter
    if (searchText) {
      filtered = filtered.filter(
        (transaction) =>
          transaction.description
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          transaction.transactionId
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          transaction.reference
            ?.toLowerCase()
            .includes(searchText.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (transaction) => transaction.status === statusFilter
      );
    }

    // Type filter
    if (typeFilter !== "all") {
      filtered = filtered.filter(
        (transaction) => transaction.type === typeFilter
      );
    }

    // Date range filter
    if (dateRange) {
      const [start, end] = dateRange;
      filtered = filtered.filter((transaction) => {
        const transactionDate = new Date(transaction.date);
        const startDate = new Date(start);
        const endDate = new Date(end);

        // Set end date to end of day for inclusive range
        endDate.setHours(23, 59, 59, 999);

        return transactionDate >= startDate && transactionDate <= endDate;
      });
    }

    setFilteredTransactions(filtered);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "success";
      case "pending":
        return "processing";
      case "failed":
        return "error";
      case "cancelled":
        return "default";
      default:
        return "default";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircleOutlined />;
      case "pending":
        return <ClockCircleOutlined />;
      case "failed":
        return <CloseCircleOutlined />;
      case "cancelled":
        return <CloseCircleOutlined />;
      default:
        return null;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "charge":
        return "green";
      case "withdrawal":
        return "volcano";
      case "bid":
        return "blue";
      case "refund":
        return "orange";
      default:
        return "default";
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case "charge":
        return "شارژ";
      case "withdrawal":
        return "برداشت";
      case "bid":
        return "مزایده";
      case "refund":
        return "عودت";
      default:
        return type;
    }
  };

  const formatNumber = (value: number) => {
    return formatPersianNumber(
      Math.abs(value)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const columns: ColumnsType<PaymentTransaction> = [
    {
      title: "شناسه تراکنش",
      dataIndex: "transactionId",
      key: "transactionId",
      render: (id: string) => (
        <Text code className="text-xs">
          {id}
        </Text>
      ),
    },
    {
      title: "شرح تراکنش",
      dataIndex: "description",
      key: "description",
      render: (description: string, record) => (
        <Space direction="vertical" size={0}>
          <Text className="font-medium">{description}</Text>
          {record.reference && (
            <Text type="secondary" className="text-xs">
              {record.reference}
            </Text>
          )}
        </Space>
      ),
    },
    {
      title: "نوع تراکنش",
      dataIndex: "type",
      key: "type",
      render: (type: string) => (
        <Tag color={getTypeColor(type)} className="font-medium">
          {getTypeText(type)}
        </Tag>
      ),
    },
    {
      title: "مبلغ (تومان)",
      dataIndex: "amount",
      key: "amount",
      render: (amount: number) => (
        <div
          className={`flex items-center gap-1 ${
            amount >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {amount >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
          <Text
            strong
            className={amount >= 0 ? "text-green-600" : "text-red-600"}
          >
            {formatNumber(amount)} تومان
          </Text>
        </div>
      ),
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: "موجودی پس از تراکنش",
      dataIndex: "balanceAfter",
      key: "balanceAfter",
      render: (balance: number) => (
        <Text strong className="text-blue-600">
          {formatNumber(balance)} تومان
        </Text>
      ),
    },
    {
      title: "تاریخ و زمان",
      dataIndex: "date",
      key: "date",
      render: (date: string) => formatDate(date),
      sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    },
    {
      title: "وضعیت",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Badge
          status={getStatusColor(status) as any}
          text={
            <Tag
              color={getStatusColor(status)}
              icon={getStatusIcon(status)}
              className="font-medium"
            >
              {status === "completed"
                ? "تکمیل شده"
                : status === "pending"
                ? "در انتظار"
                : status === "failed"
                ? "ناموفق"
                : "لغو شده"}
            </Tag>
          }
        />
      ),
    },
    {
      title: "عملیات",
      key: "actions",
      render: (_, record) => (
        <Tooltip title="مشاهده جزئیات">
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => showTransactionDetails(record)}
            className="text-blue-600 hover:text-blue-800"
          />
        </Tooltip>
      ),
    },
  ];

  const showTransactionDetails = (transaction: PaymentTransaction) => {
    setSelectedTransaction(transaction);
    setDetailModalVisible(true);
  };

  const handleExport = () => {
    // In real app, this would generate and download CSV/Excel file
    Modal.info({
      title: "دریافت گزارش",
      content: "گزارش تراکنش‌ها با موفقیت تولید شد و به ایمیل شما ارسال گردید.",
    });
  };

  const handleChargeWallet = () => {
    navigate("/charge");
  };

  const getStats = () => {
    const totalCharged = transactions
      .filter((t) => t.type === "charge" && t.status === "completed")
      .reduce((sum, t) => sum + t.amount, 0);

    const totalSpent = transactions
      .filter(
        (t) =>
          (t.type === "bid" || t.type === "withdrawal") &&
          t.status === "completed"
      )
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    const pendingTransactions = transactions.filter(
      (t) => t.status === "pending"
    ).length;

    return { totalCharged, totalSpent, pendingTransactions };
  };

  const stats = getStats();

  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    // Disable dates after today
    return current && current > dayjs().endOf("day");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <Title level={2} className="!mb-2">
              تاریخچه تراکنش‌ها
            </Title>
            <Text type="secondary">
              مشاهده تمامی تراکنش‌های مالی و شارژ کیف پول
            </Text>
          </div>

          <Space>
            <Button
              icon={<DownloadOutlined />}
              onClick={handleExport}
              size="large"
            >
              دریافت گزارش
            </Button>
            <Button
              type="primary"
              icon={<WalletOutlined />}
              onClick={handleChargeWallet}
              size="large"
            >
              شارژ کیف پول
            </Button>
          </Space>
        </div>

        {/* Statistics */}
        <Row gutter={16} className="mb-6">
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="مجموع شارژ شده"
                value={stats.totalCharged}
                formatter={(value) => (
                  <Text className="text-green-600 text-2xl font-bold">
                    {formatNumber(Number(value))} تومان
                  </Text>
                )}
                prefix={<ArrowUpOutlined className="text-green-500" />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="مجموع هزینه شده"
                value={stats.totalSpent}
                formatter={(value) => (
                  <Text className="text-red-600 text-2xl font-bold">
                    {formatNumber(Number(value))} تومان
                  </Text>
                )}
                prefix={<ArrowDownOutlined className="text-red-500" />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="تراکنش‌های در انتظار"
                value={stats.pendingTransactions}
                valueStyle={{ color: "#1890ff" }}
                prefix={<ClockCircleOutlined />}
                suffix="تراکنش"
              />
            </Card>
          </Col>
        </Row>
      </div>

      {/* Filters */}
      <Card className="mb-6 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-end">
          <div className="flex-1 w-full">
            <Text strong className="block mb-2">
              جستجو
            </Text>
            <Search
              placeholder="جستجو در شرح تراکنش، شناسه یا شماره پیگیری..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              enterButton={<SearchOutlined />}
              size="large"
            />
          </div>

          <div>
            <Text strong className="block mb-2">
              وضعیت
            </Text>
            <Select
              value={statusFilter}
              onChange={setStatusFilter}
              size="large"
              style={{ width: 150 }}
            >
              <Option value="all">همه وضعیت‌ها</Option>
              <Option value="completed">تکمیل شده</Option>
              <Option value="pending">در انتظار</Option>
              <Option value="failed">ناموفق</Option>
              <Option value="cancelled">لغو شده</Option>
            </Select>
          </div>

          <div>
            <Text strong className="block mb-2">
              نوع تراکنش
            </Text>
            <Select
              value={typeFilter}
              onChange={setTypeFilter}
              size="large"
              style={{ width: 150 }}
            >
              <Option value="all">همه انواع</Option>
              <Option value="charge">شارژ</Option>
              <Option value="withdrawal">برداشت</Option>
              <Option value="bid">مزایده</Option>
              <Option value="refund">عودت</Option>
            </Select>
          </div>

          <div>
            <Text strong className="block mb-2">
              بازه زمانی
            </Text>
            <RangePicker
              onChange={(dates) => {
                if (dates && dates[0] && dates[1]) {
                  setDateRange([
                    dates[0].format("YYYY-MM-DD"),
                    dates[1].format("YYYY-MM-DD"),
                  ]);
                } else {
                  setDateRange(null);
                }
              }}
              disabledDate={disabledDate}
              size="large"
              format="YYYY/MM/DD"
            />
          </div>

          <Button
            icon={<ReloadOutlined />}
            onClick={fetchTransactions}
            loading={loading}
            size="large"
          >
            بروزرسانی
          </Button>
        </div>
      </Card>

      {/* Transactions Table */}
      <Card
        title={
          <Space>
            <FilterOutlined />
            <span>لیست تراکنش‌ها</span>
            <Tag color="blue">{filteredTransactions.length} تراکنش</Tag>
          </Space>
        }
        className="shadow-sm"
        extra={
          <Text type="secondary">
            آخرین بروزرسانی: {new Date().toLocaleTimeString("fa-IR")}
          </Text>
        }
      >
        <Table
          columns={columns}
          dataSource={filteredTransactions}
          loading={loading}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} از ${total} تراکنش`,
          }}
          scroll={{ x: 1000 }}
          locale={{
            emptyText: "تراکنشی یافت نشد",
          }}
        />
      </Card>

      {/* Transaction Detail Modal */}
      <Modal
        title="جزئیات تراکنش"
        open={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setDetailModalVisible(false)}>
            بستن
          </Button>,
        ]}
        width={700}
        centered
      >
        {selectedTransaction && (
          <Descriptions bordered column={1} className="mt-4">
            <Descriptions.Item label="شناسه تراکنش">
              <Text code>{selectedTransaction.transactionId}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="شرح تراکنش">
              {selectedTransaction.description}
            </Descriptions.Item>
            <Descriptions.Item label="نوع تراکنش">
              <Tag color={getTypeColor(selectedTransaction.type)}>
                {getTypeText(selectedTransaction.type)}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="مبلغ">
              <Text
                strong
                className={
                  selectedTransaction.amount >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {formatNumber(selectedTransaction.amount)} تومان
              </Text>
            </Descriptions.Item>
            <Descriptions.Item label="موجودی پس از تراکنش">
              <Text strong className="text-blue-600">
                {formatNumber(selectedTransaction.balanceAfter)} تومان
              </Text>
            </Descriptions.Item>
            <Descriptions.Item label="تاریخ و زمان">
              {formatDate(selectedTransaction.date)}
            </Descriptions.Item>
            <Descriptions.Item label="وضعیت">
              <Tag
                color={getStatusColor(selectedTransaction.status)}
                icon={getStatusIcon(selectedTransaction.status)}
              >
                {selectedTransaction.status === "completed"
                  ? "تکمیل شده"
                  : selectedTransaction.status === "pending"
                  ? "در انتظار"
                  : selectedTransaction.status === "failed"
                  ? "ناموفق"
                  : "لغو شده"}
              </Tag>
            </Descriptions.Item>
            {selectedTransaction.reference && (
              <Descriptions.Item label="شماره پیگیری">
                {selectedTransaction.reference}
              </Descriptions.Item>
            )}
          </Descriptions>
        )}
      </Modal>
    </div>
  );
}
