import {
  Modal,
  Rate,
  Tag,
  Avatar,
  Button,
  Alert,
  Spin,
  Grid,
  Card,
  Badge,
  Statistic,
  Timeline,
} from "antd";
import { useContext, useEffect, useState } from "react";
import {
  LeftOutlined,
  RightOutlined,
  ClockCircleOutlined,
  ShopOutlined,
  UserOutlined,
  CrownOutlined,
  ExclamationCircleOutlined,
  WarningOutlined,
  EyeOutlined,
  MessageOutlined,
  GifOutlined,
  FireOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { getAllBids, getBidById, getBidOffers } from "../services/bids.service";
import formatPersianNumber from "../utils/numberPriceFormat";
import SectionHeadings from "./section-headings";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ShamContext } from "../App";

const { useBreakpoint } = Grid;

interface Comment {
  id: number;
  name: string;
  rating: number;
  text: string;
  date: string;
}

interface BiddingProductModalProps {
  open: boolean;
  onClose: () => void;
  id?: string;
  onBidPlaced?: () => void;
}

interface BidData {
  id: string;
  title: string;
  description: string;
  userId: string;
  startingPrice: number;
  currentPrice: number;
  images: string[];
  startDate: string;
  endDate: string;
  status: string;
  viewCount: number;
  bidCount: number;
  user?: {
    first_name: string;
    last_name: string;
  };
  category?: {
    title: string;
  };
  highestBidder?: {
    first_name: string;
    last_name: string;
  };
  comments?: Array<{
    id: string;
    text: string;
    createdAt: string;
    user?: {
      first_name: string;
      last_name: string;
    };
  }>;
}

// Enhanced Countdown Timer Component
const CountdownTimer = ({
  endDate,
  compact = false,
}: {
  endDate: string;
  compact?: boolean;
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const end = new Date(endDate).getTime();
      const now = new Date().getTime();
      const difference = end - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  const toPersianDigits = (num: number) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return num.toString().replace(/\d/g, (x) => persianDigits[parseInt(x)]);
  };

  if (compact) {
    return (
      <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold rounded-full px-3 py-1 shadow-lg">
        ⏳ {toPersianDigits(timeLeft.hours)}:{toPersianDigits(timeLeft.minutes)}
        :{toPersianDigits(timeLeft.seconds)}
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm font-bold rounded-xl px-4 py-2 shadow-lg">
      {timeLeft.days > 0 && `${toPersianDigits(timeLeft.days)} روز و `}
      {toPersianDigits(timeLeft.hours)}:{toPersianDigits(timeLeft.minutes)}:
      {toPersianDigits(timeLeft.seconds)}
    </div>
  );
};

// Status Badge Component
const StatusBadge = ({ status }: { status: string }) => {
  const statusConfig = {
    completed: { label: "اتمام یافته", color: "red", icon: <TrophyOutlined /> },
    cancelled: {
      label: "لغو شده",
      color: "orange",
      icon: <ExclamationCircleOutlined />,
    },
    expired: {
      label: "منقضی شده",
      color: "gray",
      icon: <ClockCircleOutlined />,
    },
    active: { label: "فعال", color: "green", icon: <FireOutlined /> },
  };

  const config =
    statusConfig[status as keyof typeof statusConfig] || statusConfig.active;

  return (
    <Badge.Ribbon
      text={config.label}
      color={config.color}
      placement="start"
      className="text-xs"
    >
      <div className="w-4 h-4" /> {/* Empty space for ribbon */}
    </Badge.Ribbon>
  );
};

// Main HomeTimeSales Component
export default function HomeTimeSales() {
  const [trades, setTrades] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const screens = useBreakpoint();

  useEffect(() => {
    getAllBids().then((res) => {
      if (res.status === 200) {
        const bids = res.data.data.bids;
        for (let el of bids) {
          el.images = JSON.parse(el.images);
        }
        setTrades(bids);
      }
      setLoading(false);
    });
  }, []);

  const getGridCols = () => {
    if (screens.xxl) return "lg:grid-cols-5 xl:grid-cols-6";
    if (screens.xl) return "lg:grid-cols-4 xl:grid-cols-5";
    if (screens.lg) return "md:grid-cols-3 lg:grid-cols-4";
    if (screens.md) return "grid-cols-1 md:grid-cols-3";
    return "grid-cols-1";
  };

  if (loading) {
    return (
      <div className="container mx-auto mb-8">
        <SectionHeadings title="جدیدترین مزایده ها" />
        <div className="flex justify-center items-center h-40">
          <Spin size="large" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="container mx-auto px-4">
        <SectionHeadings title="جدیدترین مزایده ها" />
        <div className={`grid grid-cols-1 ${getGridCols()} gap-4 md:gap-6`}>
          {trades.map((el) => (
            <SaleTradeItem key={`trade-${el.id}`} trade={el} />
          ))}
        </div>

        {trades.length === 0 && (
          <div className="text-center py-12">
            <GifOutlined className="text-6xl text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">
              در حال حاضر مزایده‌ای موجود نیست
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export const SaleTradeItem = ({ trade }: { trade: any }) => {
  const [open, setOpen] = useState<boolean>(false);
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const isActive = trade.status === "active";

  return (
    <>
      <BiddingProductModal
        open={open}
        onClose={() => setOpen(false)}
        id={trade.id}
        onBidPlaced={() => setOpen(false)}
      />

      <Card
        className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-0 shadow-md rounded-2xl overflow-hidden"
        onClick={() => setOpen(true)}
        bodyStyle={{ padding: 0 }}
      >
        {/* Image Container */}
        <div className="relative overflow-hidden">
          {Array.isArray(trade.images) && trade.images.length > 0 ? (
            <img
              src={`https://chandkoo.ir/api/${trade.images[0]}`}
              className="w-full h-48 md:h-56 object-cover transition-transform duration-500 group-hover:scale-110"
              alt={trade.title}
            />
          ) : (
            <div className="w-full h-48 md:h-56 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
              <ShopOutlined className="text-4xl text-gray-400" />
            </div>
          )}

          {/* Status Overlay */}
          <div className="absolute top-3 left-[25px]">
            <StatusBadge status={trade.status} />
          </div>

          {/* Countdown Timer for Active Bids */}
          {isActive && trade.endDate && (
            <div className="absolute top-3 right-3">
              <CountdownTimer endDate={trade.endDate} compact={isMobile} />
            </div>
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-bold text-gray-800 text-sm md:text-base mb-2 line-clamp-2 leading-tight">
            {trade.title}
          </h3>

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Avatar
                size="small"
                icon={<UserOutlined />}
                className="bg-blue-100 text-blue-600"
              />
              <span className="text-xs text-gray-600">
                {trade?.user?.first_name} {trade?.user?.last_name}
              </span>
            </div>

            <div className="flex items-center gap-1 text-xs text-gray-500">
              <EyeOutlined />
              <span>{formatPersianNumber(trade.viewCount || 0)}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-left">
              <div className="text-xs text-gray-500 mb-1">قیمت شروع</div>
              <div className="text-sm md:text-base font-bold text-green-600">
                {formatPersianNumber(trade.startingPrice)} تومان
              </div>
            </div>

            <div className="text-right">
              <div className="text-xs text-gray-500 mb-1">پیشنهادها</div>
              <div className="text-sm font-semibold text-orange-600">
                {formatPersianNumber(trade.bidCount || 0)}
              </div>
            </div>
          </div>

          {/* Quick Action Button */}
          <Button
            type="primary"
            size="small"
            className="w-full mt-3 bg-gradient-to-r from-blue-500 to-purple-600 border-0 shadow-md"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(true);
            }}
          >
            مشاهده جزئیات
          </Button>
        </div>
      </Card>
    </>
  );
};

export function BiddingProductModal({
  open,
  onClose,
  id,
}: BiddingProductModalProps) {
  const [current, setCurrent] = useState(0);
  const [timeLeft, setTimeLeft] = useState<string>("");
  const value: any = useContext(ShamContext);
  const navigate = useNavigate();
  const { user } = useSelector((state: any) => state.user);
  const [isBiddingEnded, setIsBiddingEnded] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [bidData, setBidData] = useState<BidData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [bidHistory, setBidHistory] = useState<any[]>([]);
  const screens = useBreakpoint();

  const isMobile = !screens.md;
  const isTablet = screens.md && !screens.lg;

  const isCompleted = bidData?.status === "completed";
  const isCancelled = bidData?.status === "cancelled";
  const isExpired = bidData?.status === "expired";
  const isActive = bidData?.status === "active";
  const isBiddingDisabled = isCompleted || isCancelled || isExpired;

  useEffect(() => {
    if (open && id) {
      fetchBidData();
    }
  }, [open, id]);

  useEffect(() => {
    if (!open) {
      setBidData(null);
      setError(null);
      setCurrent(0);
      setSubmitting(false);
    }
  }, [open]);

  const fetchBidData = async () => {
    if (!id) return;

    setLoading(true);
    setError(null);
    try {
      const response = await getBidById(id);
      if (response.data.success) {
        const bid = response.data.data;
        bid.images = JSON.parse(bid.images);
        setBidData(bid);

        if (bid.status !== "active") {
          setIsBiddingEnded(true);
          if (bid.status === "completed") {
            setTimeLeft("مزایده به اتمام رسیده است");
          } else if (bid.status === "cancelled") {
            setTimeLeft("مزایده لغو شده است");
          } else if (bid.status === "expired") {
            setTimeLeft("مزایده منقضی شده است");
          }
        }
      } else {
        setError("Failed to fetch bid data");
      }
    } catch (err) {
      console.error("Error fetching bid data:", err);
      setError("Error loading bid information");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!bidData?.endDate || !isActive) return;

    const updateCountdown = () => {
      const now = new Date().getTime();
      const end = new Date(bidData.endDate).getTime();
      const distance = end - now;

      if (distance <= 0) {
        setTimeLeft("مزایده به پایان رسید");
        setIsBiddingEnded(true);
      } else {
        const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((distance / (1000 * 60)) % 60);
        const seconds = Math.floor((distance / 1000) % 60);
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));

        const faNum = (num: number) => num.toLocaleString("fa-IR");
        const timeString =
          (days > 0 ? `${faNum(days)} روز و ` : "") +
          `${faNum(hours)}:${faNum(minutes)}:${faNum(seconds)}`;

        setTimeLeft(`زمان باقی‌مانده: ${timeString}`);
        setIsBiddingEnded(false);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [bidData?.endDate, isActive]);

  const nextSlide = () => {
    if (bidData?.images && !isBiddingDisabled) {
      setCurrent((prev) => (prev + 1) % bidData.images.length);
    }
  };

  const prevSlide = () => {
    if (bidData?.images && !isBiddingDisabled) {
      setCurrent((prev) => (prev === 0 ? bidData.images.length - 1 : prev - 1));
    }
  };

  const handleBidSubmit = async () => {
    if (isBiddingDisabled) {
      const message = isCompleted
        ? "این مزایده به اتمام رسیده و امکان ثبت پیشنهاد وجود ندارد"
        : isCancelled
        ? "این مزایده لغو شده و امکان ثبت پیشنهاد وجود ندارد"
        : "این مزایده منقضی شده و امکان ثبت پیشنهاد وجود ندارد";

      value.setNotif({
        type: "error",
        description: message,
      });
      return;
    }

    if (user) {
      navigate("/dashboard/trades");
    } else {
      value.setNotif({
        type: "error",
        description: "جهت قرار دادن قیمت مزایده وارد سیستم شوید",
      });
      navigate("/login");
    }
  };

  const formatCurrency = (amount: number) => {
    return formatPersianNumber(amount) + " تومان";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fa-IR");
  };

  const getSellerName = () => {
    if (!bidData?.user) return "فروشگاه چندکو";
    return `${bidData.user.first_name} ${bidData.user.last_name}`;
  };

  const getComments = (): Comment[] => {
    if (!bidData?.comments) return [];

    return bidData.comments.map((comment) => ({
      id: parseInt(comment.id),
      name: comment.user
        ? `${comment.user.first_name} ${comment.user.last_name}`
        : "کاربر ناشناس",
      rating: 5,
      text: comment.text,
      date: formatDate(comment.createdAt),
    }));
  };

  const getBidsHistory = async () => {
    if (bidData?.id) {
      try {
        const offersResponse = await getBidOffers(bidData.id);
        if (offersResponse.data.success) {
          const transformedOffers = offersResponse.data.data.offers.map(
            (offer: any) => ({
              id: offer.id,
              bidder:
                `${offer.user?.first_name} ${offer.user?.last_name}` ||
                "کاربر ناشناس",
              amount: offer.amount,
              time: new Date(offer.createdAt).toLocaleDateString("fa-IR"),
            })
          );
          setBidHistory(transformedOffers);
        }
      } catch (error) {
        console.error("Error fetching bid offers:", error);
        setBidHistory([]);
      }
    } else {
      setBidHistory([]);
    }
  };

  useEffect(() => {
    if (bidData?.id) {
      getBidsHistory();
    }
  }, [bidData?.id]);

  const getModalWidth = () => {
    if (isMobile) return "95vw";
    if (isTablet) return "90vw";
    return 1100;
  };

  if (loading) {
    return (
      <Modal
        open={open}
        onCancel={onClose}
        footer={null}
        centered
        width={getModalWidth()}
      >
        <div className="flex justify-center items-center h-60">
          <Spin size="large" />
        </div>
      </Modal>
    );
  }

  if (error) {
    return (
      <Modal
        open={open}
        onCancel={onClose}
        footer={null}
        centered
        width={getModalWidth()}
      >
        <div className="flex flex-col items-center justify-center h-60 gap-4 p-6">
          <ExclamationCircleOutlined className="text-red-500 text-4xl" />
          <p className="text-red-500 text-lg text-center">{error}</p>
          <Button type="primary" onClick={fetchBidData} size="large">
            تلاش مجدد
          </Button>
        </div>
      </Modal>
    );
  }

  if (!bidData) {
    return null;
  }

  const highestBid = bidData.currentPrice || bidData.startingPrice;
  const minimumBid = highestBid + highestBid * 0.05;
  const comments = getComments();

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={getModalWidth()}
      bodyStyle={{ padding: 0, overflow: "hidden" }}
      className="bidding-modal"
    >
      <div className="flex flex-col lg:flex-row max-h-[90vh] overflow-hidden">
        {/* Product Image Section */}
        <div className="lg:w-1/2 relative bg-gradient-to-br from-gray-50 to-blue-50">
          <StatusBadge status={bidData.status} />

          {isBiddingDisabled && (
            <div className="absolute inset-0 bg-black/50 z-10 flex items-center justify-center">
              <div
                className={`px-6 py-3 rounded-2xl font-bold text-xl text-white ${
                  isCompleted
                    ? "bg-red-600"
                    : isCancelled
                    ? "bg-orange-600"
                    : "bg-gray-600"
                }`}
              >
                {isCompleted
                  ? "به اتمام رسیده"
                  : isCancelled
                  ? "لغو شده"
                  : "منقضی شده"}
              </div>
            </div>
          )}

          {bidData.images && bidData.images.length > 0 ? (
            <div className="relative h-80 lg:h-full">
              <img
                src={`https://chandkoo.ir/api/${bidData.images[current]}`}
                alt={bidData.title}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  isBiddingDisabled ? "filter grayscale" : ""
                }`}
              />

              {bidData.images.length > 1 && !isBiddingDisabled && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-700 rounded-full p-3 shadow-2xl z-20 transition-all duration-200 hover:scale-110"
                  >
                    <LeftOutlined />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-700 rounded-full p-3 shadow-2xl z-20 transition-all duration-200 hover:scale-110"
                  >
                    <RightOutlined />
                  </button>
                </>
              )}

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {bidData.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrent(idx)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      idx === current
                        ? "bg-green-500 scale-125"
                        : "bg-white/80 hover:bg-white"
                    } ${
                      isBiddingDisabled ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={isBiddingDisabled}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div
              className={`w-full h-80 lg:h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 ${
                isBiddingDisabled ? "filter grayscale" : ""
              }`}
            >
              <div className="text-center">
                <ShopOutlined className="text-6xl text-gray-400 mb-4" />
                <p className="text-gray-500">تصویری موجود نیست</p>
              </div>
            </div>
          )}
        </div>

        {/* Product Info Section */}
        <div className="lg:w-1/2 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-800 mb-2 text-right">
                  {bidData.title}
                </h1>
                <div className="flex items-center gap-2 justify-end">
                  <Avatar
                    icon={<ShopOutlined />}
                    className="bg-blue-100 text-blue-600"
                  />
                  <span
                    onClick={() => navigate(`/seller/${bidData.userId}`)}
                    className="text-green-600 hover:text-green-700 cursor-pointer font-medium"
                  >
                    {getSellerName()}
                  </span>
                </div>
              </div>

              {bidData.category && (
                <Tag color="blue" className="text-sm px-3 py-1 rounded-full">
                  {bidData.category.title}
                </Tag>
              )}
            </div>

            {/* Status Alerts */}
            {isBiddingDisabled && (
              <Alert
                className="mb-6"
                type="error"
                showIcon
                icon={<WarningOutlined />}
                message={
                  isCompleted
                    ? "مزایده تمام شده است"
                    : isCancelled
                    ? "این مزایده لغو شده است"
                    : "این مزایده منقضی شده است"
                }
                description={
                  isCompleted
                    ? "این مزایده به اتمام رسیده و امکان ثبت پیشنهاد جدید وجود ندارد."
                    : isCancelled
                    ? "این مزایده لغو شده و امکان ثبت پیشنهاد جدید وجود ندارد."
                    : "این مزایده منقضی شده و امکان ثبت پیشنهاد جدید وجود ندارد."
                }
              />
            )}

            {!isBiddingDisabled && (
              <Alert
                className="mb-6"
                type="warning"
                showIcon
                message="حداقل ۲۰ درصد قیمت مزایده باید در کیف پول شما باشد و بلوکه شود"
              />
            )}

            {/* Statistics Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Statistic
                title="قیمت شروع"
                value={formatCurrency(bidData.startingPrice)}
                valueStyle={{
                  color: "#3f8600",
                  fontSize: isMobile ? "14px" : "16px",
                }}
                prefix={<ShopOutlined />}
              />
              <Statistic
                title="بالاترین پیشنهاد"
                value={formatCurrency(highestBid)}
                valueStyle={{
                  color: "#cf1322",
                  fontSize: isMobile ? "14px" : "16px",
                }}
                prefix={<CrownOutlined className="text-yellow-500" />}
              />
              <Statistic
                title="تعداد پیشنهادها"
                value={bidData.bidCount || 0}
                valueStyle={{
                  color: "#1890ff",
                  fontSize: isMobile ? "14px" : "16px",
                }}
              />
              <Statistic
                title="بازدیدها"
                value={bidData.viewCount || 0}
                valueStyle={{
                  color: "#722ed1",
                  fontSize: isMobile ? "14px" : "16px",
                }}
                prefix={<EyeOutlined />}
              />
            </div>

            {/* Time Information */}
            <Card
              size="small"
              className="mb-6 bg-gradient-to-r from-orange-50 to-red-50 border-orange-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-orange-700">
                  <ClockCircleOutlined />
                  <span className="font-medium">{timeLeft}</span>
                </div>
                {!isBiddingDisabled && isActive && bidData.endDate && (
                  <CountdownTimer
                    endDate={bidData.endDate}
                    compact={isMobile}
                  />
                )}
              </div>
            </Card>

            {/* Minimum Bid for Active Bids */}
            {!isBiddingDisabled && (
              <Card
                size="small"
                className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200"
              >
                <div className="flex items-center justify-between">
                  <span className="text-green-700 font-medium">
                    حداقل پیشنهاد بعدی:
                  </span>
                  <span className="text-green-600 font-bold text-lg">
                    {formatCurrency(minimumBid)}
                  </span>
                </div>
              </Card>
            )}

            {/* Bids History */}
            {bidHistory.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4 text-right flex items-center gap-2">
                  <TrophyOutlined className="text-yellow-500" />
                  تاریخچه پیشنهادها
                </h3>
                <Timeline className="max-h-40 overflow-y-auto">
                  {bidHistory.slice(0, 5).map((bid) => (
                    <Timeline.Item
                      key={bid.id}
                      dot={<CrownOutlined className="text-yellow-500" />}
                      color="green"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Avatar size="small" icon={<UserOutlined />} />
                          <span className="text-sm font-medium">
                            {bid.bidder}
                          </span>
                        </div>
                        <div className="text-left">
                          <span className="text-sm font-bold text-green-600 block">
                            {formatCurrency(bid.amount)}
                          </span>
                          <span className="text-xs text-gray-500">
                            {bid.time}
                          </span>
                        </div>
                      </div>
                    </Timeline.Item>
                  ))}
                </Timeline>
              </div>
            )}

            {/* Comments Section */}
            {comments.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4 text-right flex items-center gap-2">
                  <MessageOutlined className="text-blue-500" />
                  نظرات کاربران
                </h3>
                <div className="space-y-3 max-h-40 overflow-y-auto">
                  {comments.slice(0, 3).map((comment) => (
                    <Card key={comment.id} size="small" className="bg-gray-50">
                      <div className="flex items-start gap-3">
                        <Avatar icon={<UserOutlined />} />
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <span className="font-medium text-sm">
                              {comment.name}
                            </span>
                            <span className="text-xs text-gray-500">
                              {comment.date}
                            </span>
                          </div>
                          <Rate
                            disabled
                            defaultValue={comment.rating}
                            className="text-xs mb-2"
                          />
                          <p className="text-sm text-gray-700 leading-relaxed">
                            {comment.text}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Actions Footer */}
          <div className="border-t border-gray-200 bg-gray-50 p-6">
            <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
              <Button
                onClick={onClose}
                size="large"
                className="flex-1 sm:flex-none px-8 border-gray-300 text-gray-600 hover:bg-gray-100"
              >
                بستن
              </Button>

              {!isBiddingDisabled && !isBiddingEnded && (
                <Button
                  onClick={handleBidSubmit}
                  disabled={submitting}
                  size="large"
                  type="primary"
                  className="flex-1 sm:flex-none px-8 bg-gradient-to-r from-green-500 to-emerald-600 border-0 shadow-lg hover:shadow-xl transition-all duration-200"
                  icon={<TrophyOutlined />}
                >
                  {submitting ? "در حال ثبت..." : "ثبت پیشنهاد"}
                </Button>
              )}

              {isBiddingDisabled && (
                <Button
                  disabled
                  size="large"
                  className="flex-1 sm:flex-none px-8 bg-gray-400 border-0 text-white"
                >
                  {isCompleted
                    ? "مزایده پایان یافته"
                    : isCancelled
                    ? "مزایده لغو شده"
                    : "مزایده منقضی شده"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
