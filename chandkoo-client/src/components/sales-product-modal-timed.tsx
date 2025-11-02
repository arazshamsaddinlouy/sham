import {
  Modal,
  Rate,
  Divider,
  Tag,
  Avatar,
  Input,
  Button,
  message,
} from "antd";
import { useEffect, useState } from "react";
import {
  LeftOutlined,
  RightOutlined,
  ClockCircleOutlined,
  ShopOutlined,
  UserOutlined,
  CrownOutlined,
} from "@ant-design/icons";

interface Comment {
  id: number;
  name: string;
  rating: number;
  text: string;
  date: string;
}

interface Seller {
  name: string;
  avatar: string;
  link?: string;
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
  product?: {
    name: string;
    description: string;
    startingPrice: number;
    currentHighestBid?: number;
    images: string[];
    rating: number;
    reviewsCount: number;
    deadline: string; // ISO date string for bid expiration
    seller?: Seller;
    comments?: Comment[];
    bids?: Bid[];
  };
}

export default function BiddingProductModal({
  open,
  onClose,
  product,
}: BiddingProductModalProps) {
  if (!product) return null;

  const [current, setCurrent] = useState(0);
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [bidAmount, setBidAmount] = useState<number>(0);
  const [isBiddingEnded, setIsBiddingEnded] = useState<boolean>(false);

  const highestBid = product.currentHighestBid || product.startingPrice;
  const minimumBid = highestBid + highestBid * 0.05; // 5% higher than current highest bid

  // 🕒 Countdown effect for bid expiration
  useEffect(() => {
    if (!product.deadline) return;

    const updateCountdown = () => {
      const now = new Date().getTime();
      const end = new Date(product.deadline!).getTime();
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
  }, [product.deadline]);

  // Initialize bid amount when product changes
  useEffect(() => {
    setBidAmount(minimumBid);
  }, [product, minimumBid]);

  const nextSlide = () =>
    setCurrent((prev) => (prev + 1) % product.images.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));

  const handleBidSubmit = () => {
    if (bidAmount < minimumBid) {
      message.error(
        `مبلغ پیشنهادی باید حداقل ${minimumBid.toLocaleString(
          "fa-IR"
        )} تومان باشد`
      );
      return;
    }

    if (isBiddingEnded) {
      message.error("مزایده به پایان رسیده است");
      return;
    }

    // Here you would typically send the bid to your backend
    message.success(
      `پیشنهاد ${bidAmount.toLocaleString("fa-IR")} تومانی شما ثبت شد`
    );
    console.log("Bid submitted:", bidAmount);

    // Reset bid amount to new minimum
    setBidAmount(minimumBid + minimumBid * 0.05);
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("fa-IR") + " تومان";
  };

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
          <img
            src={product.images[current]}
            alt={product.name}
            className="object-cover w-full h-[350px]"
          />

          {product.images.length > 1 && (
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
            {product.images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`w-2.5 h-2.5 rounded-full ${
                  idx === current ? "bg-green-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2 text-gray-800 text-right">
              {product.name}
            </h2>

            {/* Seller Info */}
            {product.seller && (
              <div className="flex justify-end items-center gap-2 mb-3">
                <Avatar src={product.seller.avatar} icon={<ShopOutlined />} />
                <a
                  href={product.seller.link || "#"}
                  className="text-green-600 hover:underline text-sm"
                >
                  {product.seller.name}
                </a>
              </div>
            )}

            {/* Rating & Reviews */}
            <div className="flex items-center justify-end gap-2 mb-3">
              <Rate disabled defaultValue={product.rating} />
              <span className="text-gray-500 text-sm">
                ({product.reviewsCount.toLocaleString("fa-IR")} نظر)
              </span>
            </div>

            <Divider className="my-3" />

            {/* Bidding Information */}
            <div className="text-right mb-4">
              <div className="space-y-3">
                {/* Starting Price */}
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">قیمت شروع:</span>
                  <span className="text-gray-700 font-medium">
                    {formatCurrency(product.startingPrice)}
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
            <p className="text-gray-700 leading-relaxed text-right">
              {product.description}
            </p>
          </div>

          <Divider />

          {/* Bids History */}
          {product.bids && product.bids.length > 0 && (
            <div className="text-right mb-4">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                تاریخچه پیشنهادها
              </h3>
              <div className="space-y-2 max-h-[120px] overflow-y-auto pr-2">
                {product.bids.map((bid) => (
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
          {product.comments && product.comments.length > 0 && (
            <div className="text-right mb-4">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                نظرات کاربران
              </h3>
              <div className="space-y-3 max-h-[150px] overflow-y-auto pr-2">
                {product.comments.map((c) => (
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
