import { Modal, Rate, Divider, Tag, Avatar, Button, Alert, Spin } from "antd";
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
} from "@ant-design/icons";
import { getAllBids, getBidById, getBidOffers } from "../services/bids.service";
import formatPersianNumber from "../utils/numberPriceFormat";
import SectionHeadings from "./section-headings";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ShamContext } from "../App";

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

// Countdown timer component
const CountdownTimer = ({ endDate }: { endDate: string }) => {
  const [timeLeft, setTimeLeft] = useState({
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
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ hours, minutes, seconds });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
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

  return (
    <div className="text-[11px] absolute z-[2] left-[15px] top-[15px] bg-[#f44336] text-white font-bold rounded-[5px] inline-block px-2 py-1">
      زمان : {toPersianDigits(timeLeft.hours)} ساعت{" "}
      {toPersianDigits(timeLeft.minutes)} دقیقه و{" "}
      {toPersianDigits(timeLeft.seconds)} ثانیه
    </div>
  );
};

// Main HomeTimeSales Component
export default function HomeTimeSales() {
  const [trades, setTrades] = useState<any[]>([]);

  useEffect(() => {
    getAllBids().then((res) => {
      if (res.status === 200) {
        const bids = res.data.data.bids;
        for (let el of bids) {
          el.images = JSON.parse(el.images);
        }
        setTrades(bids);
      }
    });
  }, []);

  return (
    <div>
      <SectionHeadings title="جدیدترین مزایده ها" />
      <div className="container mx-auto mb-[20px]">
        <div className="flex flex-wrap -mx-2">
          {trades.map((el) => (
            <div
              key={`all-bid-${el.id}`}
              className="w-1/2 sm:w-1/2 lg:w-1/6 p-2 mb-[50px]"
            >
              <SaleTradeItem key={`trade-${el.id}`} trade={el} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const SaleTradeItem = ({ trade }: { trade: any }) => {
  const [open, setOpen] = useState<boolean>(false);

  const getStatusBadge = () => {
    switch (trade.status) {
      case "completed":
        return {
          text: "به اتمام رسید",
          color: "bg-[#f44336]",
        };
      case "cancelled":
        return {
          text: "لغو شده",
          color: "bg-[#ff9800]",
        };
      case "expired":
        return {
          text: "منقضی شده",
          color: "bg-[#9e9e9e]",
        };
      case "active":
      default:
        return null;
    }
  };

  const statusBadge = getStatusBadge();

  return (
    <>
      <BiddingProductModal
        open={open}
        onClose={() => setOpen(false)}
        id={trade.id}
        onBidPlaced={() => {
          setOpen(false);
        }}
      />
      <div className="w-full" onClick={() => setOpen(true)}>
        <div className="relative rounded-[16px] overflow-hidden shadow-md group">
          {Array.isArray(trade.images) && trade.images.length > 0 ? (
            <img
              src={`https://chandkoo.ir/api/${trade.images[0]}`}
              className="w-full h-[220px] object-cover transition-transform duration-300 group-hover:scale-105"
              alt={trade.title}
            />
          ) : (
            <img
              src={"/logo"}
              className="w-full h-[220px] object-cover transition-transform duration-300 group-hover:scale-105"
              alt={trade.product_name}
            />
          )}

          {statusBadge ? (
            <div
              className={`text-[11px] absolute z-[2] left-[15px] top-[15px] ${statusBadge.color} text-white font-bold rounded-[5px] inline-block px-2 py-1`}
            >
              {statusBadge.text}
            </div>
          ) : trade.endDate ? (
            <CountdownTimer endDate={trade.endDate} />
          ) : null}

          <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-3 text-white transition-all duration-300 group-hover:from-black/90 group-hover:via-black/80 group-hover:to-black/80">
            <div className="transition-transform duration-300 transform translate-y-0 group-hover:translate-y-0">
              <div className="text-[20px] font-semibold mb-1">
                {trade.title}
              </div>
              <div className="text-[13px] text-[#ddd] mb-1">
                {trade?.user?.first_name} {trade?.user?.last_name}
              </div>
              <div className="text-[16px] font-medium mb-2">
                {formatPersianNumber(trade.startingPrice)} تومان
              </div>
            </div>
          </div>
        </div>
      </div>
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
  const [bidHisory, setBidsHistory] = useState<any[]>([]);
  // Check if bid is completed or cancelled
  const isCompleted = bidData?.status === "completed";
  const isCancelled = bidData?.status === "cancelled";
  const isExpired = bidData?.status === "expired";
  const isActive = bidData?.status === "active";

  // Check if bidding/commenting is disabled
  const isBiddingDisabled = isCompleted || isCancelled || isExpired;

  const getStatusMessage = () => {
    if (isCompleted) return "مزایده تمام شده است";
    if (isCancelled) return "این مزایده لغو شده است";
    if (isExpired) return "این مزایده منقضی شده است";
    return "";
  };

  const getStatusDescription = () => {
    if (isCompleted)
      return "این مزایده به اتمام رسیده و امکان ثبت پیشنهاد جدید وجود ندارد.";
    if (isCancelled)
      return "این مزایده لغو شده و امکان ثبت پیشنهاد جدید وجود ندارد.";
    if (isExpired)
      return "این مزایده منقضی شده و امکان ثبت پیشنهاد جدید وجود ندارد.";
    return "";
  };

  // Fetch bid data when modal opens or id changes
  useEffect(() => {
    if (open && id) {
      fetchBidData();
    }
  }, [open, id]);

  // Reset states when modal closes
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

  // Countdown effect for bid expiration - only for active bids
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
          setBidsHistory(transformedOffers);
        }
      } catch (error) {
        console.error("Error fetching bid offers:", error);
        setBidsHistory([]);
      }
    } else {
      setBidsHistory([]);
    }
  };

  // Call this function when bidData is available
  useEffect(() => {
    if (bidData?.id) {
      getBidsHistory();
    }
  }, [bidData?.id]);

  if (loading) {
    return (
      <Modal open={open} onCancel={onClose} footer={null} centered>
        <div className="flex justify-center items-center h-40">
          <Spin size="large" />
        </div>
      </Modal>
    );
  }

  if (error) {
    return (
      <Modal open={open} onCancel={onClose} footer={null} centered>
        <div className="flex flex-col items-center justify-center h-40 gap-4">
          <ExclamationCircleOutlined className="text-red-500 text-2xl" />
          <p className="text-red-500">{error}</p>
          <Button onClick={fetchBidData}>تلاش مجدد</Button>
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
      width={900}
      bodyStyle={{ padding: 0, overflow: "hidden" }}
      className={isBiddingDisabled ? "disabled-bid-modal" : ""}
    >
      <div className="grid md:grid-cols-2 grid-cols-1">
        {/* Product Image Slider */}
        <div className="relative bg-gray-50 flex items-center justify-center">
          {isBiddingDisabled && (
            <div className="absolute inset-0 bg-black/50 z-10 flex items-center justify-center">
              <div
                className={`px-4 py-2 rounded-lg font-bold text-lg text-white ${
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
            <>
              <img
                src={`https://chandkoo.ir/api/${bidData.images[current]}`}
                alt={bidData.title}
                className={`object-cover w-full h-[350px] ${
                  isBiddingDisabled ? "filter grayscale" : ""
                }`}
              />

              {bidData.images.length > 1 && !isBiddingDisabled && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-700 rounded-full p-2 shadow z-20"
                  >
                    <LeftOutlined />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-700 rounded-full p-2 shadow z-20"
                  >
                    <RightOutlined />
                  </button>
                </>
              )}

              <div className="absolute bottom-3 w-full flex justify-center gap-2 z-20">
                {bidData.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrent(idx)}
                    className={`w-2.5 h-2.5 rounded-full ${
                      idx === current ? "bg-green-600" : "bg-gray-300"
                    } ${
                      isBiddingDisabled ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={isBiddingDisabled}
                  />
                ))}
              </div>
            </>
          ) : (
            <div
              className={`w-full h-[350px] flex items-center justify-center bg-gray-200 ${
                isBiddingDisabled ? "filter grayscale" : ""
              }`}
            >
              <span className="text-gray-500">تصویری موجود نیست</span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-6 flex flex-col justify-between">
          <div>
            {/* Danger Alert for Completed/Cancelled/Expired Bids */}
            {isBiddingDisabled && (
              <Alert
                className="mb-[20px]"
                type="error"
                showIcon
                icon={<WarningOutlined />}
                message={getStatusMessage()}
                description={getStatusDescription()}
              />
            )}

            {/* Warning Alert for Active Bids */}
            {!isBiddingDisabled && (
              <Alert
                className="mb-[20px]"
                type="warning"
                showIcon
                message="حداقل ۲۰ درصد قیمت مزایده باید در کیف پول شما باشد و بلوکه شود"
              />
            )}

            <h2
              className={`text-2xl font-bold mb-2 text-right ${
                isBiddingDisabled ? "text-gray-500" : "text-gray-800"
              }`}
            >
              {bidData.title}
            </h2>

            {/* Seller Info */}
            <div className="flex justify-end items-center gap-2 mb-3">
              <Avatar
                icon={<ShopOutlined />}
                className={isBiddingDisabled ? "opacity-60" : ""}
              />
              <span
                className={`text-sm ${
                  isBiddingDisabled ? "text-gray-500" : "text-green-600"
                }`}
              >
                {getSellerName()}
              </span>
            </div>

            {/* Category */}
            {bidData.category && (
              <div className="flex justify-end mb-3">
                <Tag
                  color={isBiddingDisabled ? "default" : "blue"}
                  className={isBiddingDisabled ? "opacity-60" : ""}
                >
                  {bidData.category.title}
                </Tag>
              </div>
            )}

            <Divider className="my-3" />

            {/* Bidding Information */}
            <div className="text-right mb-4">
              <div className="space-y-3">
                {/* Starting Price */}
                <div className="flex justify-between items-center">
                  <span
                    className={`text-sm ${
                      isBiddingDisabled ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    قیمت شروع:
                  </span>
                  <span
                    className={`font-medium ${
                      isBiddingDisabled
                        ? "text-gray-500 line-through"
                        : "text-gray-700"
                    }`}
                  >
                    {formatPersianNumber(formatCurrency(bidData.startingPrice))}
                  </span>
                </div>

                {/* Current Highest Bid */}
                <div className="flex justify-between items-center">
                  <span
                    className={`text-sm ${
                      isBiddingDisabled ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    بالاترین پیشنهاد:
                  </span>
                  <div className="flex items-center gap-2">
                    <CrownOutlined
                      className={
                        isBiddingDisabled ? "text-gray-400" : "text-yellow-500"
                      }
                    />
                    <span
                      className={`text-lg font-bold ${
                        isBiddingDisabled ? "text-gray-600" : "text-green-600"
                      }`}
                    >
                      {formatPersianNumber(formatCurrency(highestBid))}
                    </span>
                  </div>
                </div>

                {/* Bid Count */}
                <div className="flex justify-between items-center">
                  <span
                    className={`text-sm ${
                      isBiddingDisabled ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    تعداد پیشنهادها:
                  </span>
                  <span
                    className={`font-medium ${
                      isBiddingDisabled ? "text-gray-500" : "text-gray-700"
                    }`}
                  >
                    {formatPersianNumber(bidData.bidCount || 0)}
                  </span>
                </div>

                {/* Minimum Next Bid - Only show for active bids */}
                {!isBiddingDisabled && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">
                      حداقل پیشنهاد بعدی:
                    </span>
                    <span className="text-orange-600 font-semibold">
                      {formatCurrency(minimumBid)}
                    </span>
                  </div>
                )}
              </div>

              {/* Bid Deadline */}
              <div
                className={`flex justify-end items-center text-sm mt-3 gap-1 ${
                  isBiddingDisabled
                    ? "text-gray-500"
                    : isBiddingEnded
                    ? "text-red-600"
                    : "text-orange-600"
                }`}
              >
                <ClockCircleOutlined />
                <span>{timeLeft}</span>
                {isBiddingDisabled && (
                  <Tag color="default" className="mr-2">
                    {isCompleted
                      ? "اتمام یافته"
                      : isCancelled
                      ? "لغو شده"
                      : "منقضی شده"}
                  </Tag>
                )}
                {!isBiddingDisabled && isBiddingEnded && (
                  <Tag color="red" className="mr-2">
                    پایان یافته
                  </Tag>
                )}
              </div>
            </div>
          </div>

          <Divider />

          {/* Bids History */}
          {bidHisory.length > 0 && (
            <div className="text-right mb-4">
              <h3
                className={`text-lg font-semibold mb-3 ${
                  isBiddingDisabled ? "text-gray-500" : "text-gray-800"
                }`}
              >
                تاریخچه پیشنهادها
              </h3>
              <div
                className={`space-y-2 max-h-[120px] overflow-y-auto pr-2 ${
                  isBiddingDisabled ? "opacity-60" : ""
                }`}
              >
                {bidHisory.map((bid) => (
                  <div
                    key={bid.id}
                    className="flex justify-between items-center bg-gray-50 rounded-lg p-2 border border-gray-100"
                  >
                    <div className="flex items-center gap-2">
                      <Avatar size="small" icon={<UserOutlined />} />
                      <span className="text-sm font-medium text-gray-800">
                        {bid.bidder}
                      </span>
                    </div>
                    <div className="text-left">
                      <span className="text-sm font-bold text-green-600">
                        {formatCurrency(bid.amount)}
                      </span>
                      <span className="text-xs text-gray-500 mr-2">
                        {bid.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Comments Section */}
          {comments.length > 0 && (
            <div className="text-right mb-4">
              <h3
                className={`text-lg font-semibold mb-3 ${
                  isBiddingDisabled ? "text-gray-500" : "text-gray-800"
                }`}
              >
                نظرات کاربران
              </h3>
              <div
                className={`space-y-3 max-h-[150px] overflow-y-auto pr-2 ${
                  isBiddingDisabled ? "opacity-60" : ""
                }`}
              >
                {comments.map((c) => (
                  <div
                    key={c.id}
                    className="bg-gray-50 rounded-lg p-3 border border-gray-100"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <Avatar size="small" icon={<UserOutlined />} />
                        <span className="text-sm font-medium text-gray-800">
                          {c.name}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">{c.date}</span>
                    </div>
                    <Rate
                      disabled
                      defaultValue={c.rating}
                      className="text-xs mb-1"
                    />
                    <p className="text-sm text-gray-700">{c.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Divider />

          {/* Actions */}
          <div className="flex justify-between">
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-md border text-gray-600 hover:bg-gray-100 transition"
            >
              بستن
            </button>

            {!isBiddingDisabled && !isBiddingEnded && (
              <button
                onClick={handleBidSubmit}
                disabled={submitting}
                className="px-6 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {submitting ? "در حال ثبت..." : "ثبت پیشنهاد"}
              </button>
            )}

            {isBiddingDisabled && (
              <div className="px-6 py-2 rounded-md bg-gray-400 text-white cursor-not-allowed">
                {isCompleted
                  ? "مزایده پایان یافته"
                  : isCancelled
                  ? "مزایده لغو شده"
                  : "مزایده منقضی شده"}
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
