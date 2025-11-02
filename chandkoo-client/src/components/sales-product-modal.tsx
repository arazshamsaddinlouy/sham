import { Modal, Rate, Divider, Tag, Avatar } from "antd";
import { useState } from "react";
import {
  LeftOutlined,
  RightOutlined,
  ShopOutlined,
  UserOutlined,
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

interface SalesProductModalProps {
  open: boolean;
  onClose: () => void;
  product?: {
    name: string;
    description: string;
    price: number;
    discountPercent: number;
    images: string[];
    rating: number;
    reviewsCount: number;
    seller?: Seller;
    comments?: Comment[];
  };
}

export default function SalesProductModal({
  open,
  onClose,
  product,
}: SalesProductModalProps) {
  if (!product) return null;

  const discountedPrice = Math.round(
    product.price * (1 - product.discountPercent / 100)
  );

  const [current, setCurrent] = useState(0);

  const nextSlide = () =>
    setCurrent((prev) => (prev + 1) % product.images.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));

  // 💬 Sample fallback comments
  const comments =
    product.comments && product.comments.length > 0
      ? product.comments
      : [
          {
            id: 1,
            name: "مریم احمدی",
            rating: 5,
            text: "محصول عالی و بسته‌بندی خیلی تمیز بود.",
            date: "۱۴۰۴/۰۴/۰۵",
          },
          {
            id: 2,
            name: "حسین رضایی",
            rating: 4,
            text: "کیفیت خوب بود ولی قیمتش می‌تونست کمتر باشه.",
            date: "۱۴۰۴/۰۴/۰۶",
          },
          {
            id: 3,
            name: "نازنین کرمی",
            rating: 5,
            text: "از خرید این محصول خیلی راضی‌ام، پیشنهاد می‌کنم.",
            date: "۱۴۰۴/۰۴/۰۸",
          },
        ];

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
        {/* 🖼️ Image Slider */}
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

        {/* 🧾 Product Info */}
        <div className="p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2 text-gray-800 text-right">
              {product.name}
            </h2>

            {/* 🛍️ Seller Info */}
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

            {/* ⭐ Rating */}
            <div className="flex items-center justify-end gap-2 mb-3">
              <Rate disabled defaultValue={product.rating} />
              <span className="text-gray-500 text-sm">
                ({product.reviewsCount.toLocaleString("fa-IR")} نظر)
              </span>
            </div>

            <Divider className="my-3" />

            {/* 💰 Prices */}
            <div className="text-right mb-3">
              <p className="text-gray-500 line-through text-sm">
                {product.price.toLocaleString("fa-IR")} تومان
              </p>
              <div className="flex justify-end items-center gap-2">
                <p className="text-xl font-bold text-green-600">
                  {discountedPrice.toLocaleString("fa-IR")} تومان
                </p>
                <Tag color="red" className="text-base">
                  %{product.discountPercent.toLocaleString("fa-IR")} تخفیف
                </Tag>
              </div>
            </div>

            {/* 📝 Description */}
            <p className="text-gray-700 leading-relaxed text-right">
              {product.description}
            </p>
          </div>

          <Divider />

          {/* 💬 Comments */}
          <div className="text-right">
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
                  <Rate disabled defaultValue={c.rating} className="text-xs" />
                  <p className="text-sm text-gray-700 mt-1">{c.text}</p>
                </div>
              ))}
            </div>
          </div>

          <Divider />

          {/* ⚙️ Actions */}
          <div className="flex justify-between">
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-md border text-gray-600 hover:bg-gray-100 transition"
            >
              بستن
            </button>
            <button className="px-6 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition">
              افزودن به سبد خرید
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
