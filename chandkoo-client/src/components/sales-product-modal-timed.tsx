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
import { getBidById, getBidOffers } from "../services/bids.service";
import formatPersianNumber from "../utils/numberPriceFormat";

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
  id?: string;
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

export default function BiddingProductModal({
  open,
  onClose,
  id,
}: BiddingProductModalProps) {
  const [current, setCurrent] = useState(0);
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [bidAmount, setBidAmount] = useState<number>(0);
  const [isBiddingEnded, setIsBiddingEnded] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [bidData, setBidData] = useState<BidData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [bidOffers, setBidOffers] = useState<Bid[]>([]);
  const [offersLoading, setOffersLoading] = useState<boolean>(false);

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
      setBidOffers([]);
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
        // Fetch offers after bid data is loaded
        await fetchBidOffers(bid.id);
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

  // Fetch bid offers
  const fetchBidOffers = async (bidId: string) => {
    setOffersLoading(true);
    try {
      const offersResponse = await getBidOffers(bidId);
      if (offersResponse.data.success) {
        setBidOffers(offersResponse.data.data.offers || []);
      } else {
        setBidOffers([]);
        console.warn("Failed to fetch bid offers:", offersResponse.data);
      }
    } catch (err) {
      console.error("Error fetching bid offers:", err);
      setBidOffers([]);
    } finally {
      setOffersLoading(false);
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

    updateCountdown();
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

  const handleBidSubmit = () => {
    if (!bidData) return;

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

    // Here you would typically send the bid to your backend
    message.success(
      `پیشنهاد ${formatPersianNumber(bidAmount)} تومانی شما ثبت شد`
    );
    console.log("Bid submitted:", bidAmount);

    // Reset bid amount to new minimum
    setBidAmount(minimumBid + minimumBid * 0.05);
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
      rating: 5,
      text: comment.text,
      date: formatDate(comment.createdAt),
    }));
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
                    step={10000}
                    className="text-left"
                    disabled={isBiddingEnded}
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
                  disabled={isBiddingEnded}
                  className="bg-green-600 hover:bg-green-700 border-green-600"
                >
                  {isBiddingEnded ? "مزایده پایان یافته" : "ثبت پیشنهاد"}
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
          <div className="text-right mb-4">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">
              تاریخچه پیشنهادها
              {offersLoading && <Spin size="small" className="mr-2" />}
            </h3>
            {bidOffers.length > 0 ? (
              <div className="space-y-2 max-h-[120px] overflow-y-auto pr-2">
                {bidOffers.map((bid) => (
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
            ) : (
              <div className="text-center py-4 text-gray-500">
                {offersLoading
                  ? "در حال بارگذاری..."
                  : "هنوز پیشنهادی ثبت نشده است"}
              </div>
            )}
          </div>

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
            >
              بستن
            </button>
            {!isBiddingEnded && (
              <button
                onClick={handleBidSubmit}
                className="px-6 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition"
              >
                ثبت پیشنهاد
              </button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
