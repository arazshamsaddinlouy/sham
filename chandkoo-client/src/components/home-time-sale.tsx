import {
  Modal,
  Rate,
  Divider,
  Tag,
  Avatar,
  Input,
  Button,
  message,
  Alert,
  Spin,
} from "antd";
import { useEffect, useState } from "react";
import {
  LeftOutlined,
  RightOutlined,
  ClockCircleOutlined,
  ShopOutlined,
  UserOutlined,
  CrownOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import {
  getAllBids,
  getBidById,
  placeBidOffer,
} from "../services/bids.service"; // Adjust import path as needed
import formatPersianNumber from "../utils/numberPriceFormat";
import SectionHeadings from "./section-headings";
interface Comment {
  id: number;
  name: string;
  rating: number;
  text: string;
  date: string;
}

interface Bid {
  id: number;
  bidder: string;
  amount: number;
  time: string;
}

interface BiddingProductModalProps {
  open: boolean;
  onClose: () => void;
  id?: string; // Bid ID to fetch data
  onBidPlaced?: () => void; // Callback when bid is successfully placed
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

    // Calculate immediately
    calculateTimeLeft();

    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  // Convert numbers to Persian digits
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
            <SaleTradeItem key={`trade-${el.id}`} trade={el} />
          ))}
        </div>
      </div>
    </div>
  );
}
// SaleTradeItem Component - This is what you're importing
export const SaleTradeItem = ({ trade }: { trade: any }) => {
  const [open, setOpen] = useState<boolean>(false);
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
      <div
        className="w-1/2 sm:w-1/2 lg:w-1/6 p-2"
        onClick={() => setOpen(true)}
      >
        <div className="relative rounded-[16px] overflow-hidden shadow-md group">
          {/* Full Image */}
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

          {/* Countdown Timer */}
          {trade.endDate && <CountdownTimer endDate={trade.endDate} />}

          {/* Gradient Overlay */}
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
  onBidPlaced,
}: BiddingProductModalProps) {
  const [current, setCurrent] = useState(0);
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [bidAmount, setBidAmount] = useState<number>(0);
  const [isBiddingEnded, setIsBiddingEnded] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [bidData, setBidData] = useState<BidData | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  // 🕒 Countdown effect for bid expiration
  useEffect(() => {
    if (!bidData?.endDate) return;

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

    updateCountdown(); // Initial call
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [bidData?.endDate]);

  // Initialize bid amount when bid data changes
  useEffect(() => {
    if (bidData) {
      const highestBid = bidData.currentPrice || bidData.startingPrice;
      const minimumBid = highestBid + highestBid * 0.05;
      setBidAmount(minimumBid);
    }
  }, [bidData]);

  const nextSlide = () => {
    if (bidData?.images) {
      setCurrent((prev) => (prev + 1) % bidData.images.length);
    }
  };

  const prevSlide = () => {
    if (bidData?.images) {
      setCurrent((prev) => (prev === 0 ? bidData.images.length - 1 : prev - 1));
    }
  };

  const handleBidSubmit = async () => {
    if (!bidData || !id) return;

    const highestBid = bidData.currentPrice || bidData.startingPrice;
    const minimumBid = highestBid + highestBid * 0.05;

    if (bidAmount < minimumBid) {
      message.error(
        `مبلغ پیشنهادی باید حداقل ${formatPersianNumber(minimumBid)} تومان باشد`
      );
      return;
    }

    if (isBiddingEnded) {
      message.error("مزایده به پایان رسیده است");
      return;
    }

    setSubmitting(true);
    try {
      // Call the actual bid placement service
      const response = await placeBidOffer(id, bidAmount);

      if (response.data.success) {
        message.success(
          `پیشنهاد ${formatPersianNumber(
            bidAmount
          )} تومانی شما با موفقیت ثبت شد`
        );

        // Refresh bid data to get updated prices and bid count
        await fetchBidData();

        // Call the callback if provided
        if (onBidPlaced) {
          onBidPlaced();
        }

        // Update bid amount to new minimum based on the updated data
        const newHighestBid = response.data.data?.currentPrice || bidAmount;
        const newMinimumBid = newHighestBid + newHighestBid * 0.05;
        setBidAmount(newMinimumBid);
      } else {
        message.error(response.data.message || "خطا در ثبت پیشنهاد");
      }
    } catch (error: any) {
      console.error("Error placing bid:", error);

      // Handle different error types
      if (error.response?.data?.message) {
        message.error(error.response.data.message);
      } else if (error.response?.status === 400) {
        message.error("مبلغ پیشنهادی باید بیشتر از قیمت فعلی باشد");
      } else if (error.response?.status === 401) {
        message.error("لطفاً ابتدا وارد حساب کاربری خود شوید");
      } else if (error.response?.status === 403) {
        message.error("شما مجاز به ثبت پیشنهاد در این مزایده نیستید");
      } else if (error.response?.status === 404) {
        message.error("مزایده مورد نظر یافت نشد");
      } else {
        message.error("خطا در ارتباط با سرور");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return formatPersianNumber(amount) + " تومان";
  };

  // Format date to Persian
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fa-IR");
  };

  // Get seller name
  const getSellerName = () => {
    if (!bidData?.user) return "فروشگاه چندکو";
    return `${bidData.user.first_name} ${bidData.user.last_name}`;
  };

  // Transform comments to the expected format
  const getComments = (): Comment[] => {
    if (!bidData?.comments) return [];

    return bidData.comments.map((comment) => ({
      id: parseInt(comment.id),
      name: comment.user
        ? `${comment.user.first_name} ${comment.user.last_name}`
        : "کاربر ناشناس",
      rating: 5, // Default rating since your API doesn't have ratings
      text: comment.text,
      date: formatDate(comment.createdAt),
    }));
  };

  // Transform bids history (you'll need to implement getBidOffers service)
  const getBidsHistory = (): Bid[] => {
    // This would come from your getBidOffers service
    // For now, returning empty array - implement this when you have the service
    return [];
  };

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
  const bidsHistory = getBidsHistory();

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={900}
      bodyStyle={{ padding: 0, overflow: "hidden" }}
    >
      <div className="grid md:grid-cols-2 grid-cols-1">
        {/* Product Image Slider */}
        <div className="relative bg-gray-50 flex items-center justify-center">
          {bidData.images && bidData.images.length > 0 ? (
            <>
              <img
                src={`https://chandkoo.ir/api/${bidData.images[current]}`}
                alt={bidData.title}
                className="object-cover w-full h-[350px]"
              />

              {bidData.images.length > 1 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-700 rounded-full p-2 shadow"
                  >
                    <LeftOutlined />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-700 rounded-full p-2 shadow"
                  >
                    <RightOutlined />
                  </button>
                </>
              )}

              <div className="absolute bottom-3 w-full flex justify-center gap-2">
                {bidData.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrent(idx)}
                    className={`w-2.5 h-2.5 rounded-full ${
                      idx === current ? "bg-green-600" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="w-full h-[350px] flex items-center justify-center bg-gray-200">
              <span className="text-gray-500">تصویری موجود نیست</span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-6 flex flex-col justify-between">
          <div>
            <Alert
              className="mb-[20px]"
              type="warning"
              showIcon
              message="حداقل ۲۰ درصد قیمت مزایده باید در کیف پول شما باشد و بلوکه شود"
            />
            <h2 className="text-2xl font-bold mb-2 text-gray-800 text-right">
              {bidData.title}
            </h2>

            {/* Seller Info */}
            <div className="flex justify-end items-center gap-2 mb-3">
              <Avatar icon={<ShopOutlined />} />
              <span className="text-green-600 text-sm">{getSellerName()}</span>
            </div>

            {/* Category */}
            {bidData.category && (
              <div className="flex justify-end mb-3">
                <Tag color="blue">{bidData.category.title}</Tag>
              </div>
            )}

            <Divider className="my-3" />

            {/* Bidding Information */}
            <div className="text-right mb-4">
              <div className="space-y-3">
                {/* Starting Price */}
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">قیمت شروع:</span>
                  <span className="text-gray-700 font-medium">
                    {formatCurrency(bidData.startingPrice)}
                  </span>
                </div>

                {/* Current Highest Bid */}
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">
                    بالاترین پیشنهاد:
                  </span>
                  <div className="flex items-center gap-2">
                    <CrownOutlined className="text-yellow-500" />
                    <span className="text-lg font-bold text-green-600">
                      {formatCurrency(highestBid)}
                    </span>
                  </div>
                </div>

                {/* Bid Count */}
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">
                    تعداد پیشنهادها:
                  </span>
                  <span className="text-gray-700 font-medium">
                    {formatPersianNumber(bidData.bidCount || 0)}
                  </span>
                </div>

                {/* Minimum Next Bid */}
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">
                    حداقل پیشنهاد بعدی:
                  </span>
                  <span className="text-orange-600 font-semibold">
                    {formatCurrency(minimumBid)}
                  </span>
                </div>
              </div>

              {/* Bid Deadline */}
              <div
                className={`flex justify-end items-center text-sm mt-3 gap-1 ${
                  isBiddingEnded ? "text-red-600" : "text-orange-600"
                }`}
              >
                <ClockCircleOutlined />
                <span>{timeLeft}</span>
                {isBiddingEnded && (
                  <Tag color="red" className="mr-2">
                    پایان یافته
                  </Tag>
                )}
              </div>
            </div>

            {/* Bid Input Section */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="space-y-3">
                <div className="text-right">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    مبلغ پیشنهادی شما
                  </label>
                  <Input
                    type="number"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(Number(e.target.value))}
                    onBlur={() => {
                      if (bidAmount < minimumBid) {
                        setBidAmount(minimumBid);
                      }
                    }}
                    min={minimumBid}
                    step={10000} // 10,000 Tomans step
                    className="text-left"
                    disabled={isBiddingEnded || submitting}
                    addonAfter="تومان"
                  />
                  <div className="text-xs text-gray-500 mt-1 text-right">
                    حداقل مبلغ: {formatCurrency(minimumBid)}
                  </div>
                </div>

                <Button
                  type="primary"
                  size="large"
                  block
                  onClick={handleBidSubmit}
                  disabled={isBiddingEnded || submitting}
                  loading={submitting}
                  className="bg-green-600 hover:bg-green-700 border-green-600"
                >
                  {submitting
                    ? "در حال ثبت..."
                    : isBiddingEnded
                    ? "مزایده پایان یافته"
                    : "ثبت پیشنهاد"}
                </Button>
              </div>
            </div>

            {/* Description */}
            {bidData.description && (
              <p className="text-gray-700 leading-relaxed text-right">
                {bidData.description}
              </p>
            )}
          </div>

          <Divider />

          {/* Bids History */}
          {bidsHistory.length > 0 && (
            <div className="text-right mb-4">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                تاریخچه پیشنهادها
              </h3>
              <div className="space-y-2 max-h-[120px] overflow-y-auto pr-2">
                {bidsHistory.map((bid) => (
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
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                نظرات کاربران
              </h3>
              <div className="space-y-3 max-h-[150px] overflow-y-auto pr-2">
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
              disabled={submitting}
            >
              بستن
            </button>
            {!isBiddingEnded && (
              <button
                onClick={handleBidSubmit}
                disabled={submitting}
                className="px-6 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {submitting ? "در حال ثبت..." : "ثبت پیشنهاد"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
