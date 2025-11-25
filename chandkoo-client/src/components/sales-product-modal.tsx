import { Modal, Rate, Divider, Tag, Avatar, Spin, message } from "antd";
import { useState, useEffect } from "react";
import {
  LeftOutlined,
  RightOutlined,
  ShopOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { getSaleById } from "../services/sales.service"; // Adjust import path
import formatPersianNumber from "../utils/numberPriceFormat";

interface Comment {
  id: number;
  userName: string;
  rating: number;
  text: string;
  createdAt: string;
  user?: {
    id: string;
    first_name: string;
    last_name: string;
  };
}

interface Seller {
  id: string;
  first_name: string;
  last_name: string;
  phone_number?: string;
  address?: string;
}

interface ProductData {
  id: string;
  title: string;
  description: string;
  primaryPrice: number;
  salePrice: number;
  images: string[];
  seller?: Seller;
  comments: Comment[];
  category?: {
    id: string;
    title: string;
  };
  viewCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface SalesProductModalProps {
  open: boolean;
  onClose: () => void;
  id: string;
}

export default function SalesProductModal({
  open,
  onClose,
  id,
}: SalesProductModalProps) {
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (open && id) {
      fetchSaleData();
    }
  }, [open, id]);

  const fetchSaleData = async () => {
    setLoading(true);
    try {
      const response = await getSaleById(id);
      if (response.data.success) {
        setProduct(response.data.data);
      } else {
        message.error("خطا در دریافت اطلاعات محصول");
      }
    } catch (error) {
      console.error("Error fetching sale:", error);
      message.error("خطا در دریافت اطلاعات محصول");
    } finally {
      setLoading(false);
    }
  };

  // Calculate discount percentage
  const calculateDiscountPercent = () => {
    if (!product?.primaryPrice || !product?.salePrice) return 0;
    return Math.round(
      ((product.primaryPrice - product.salePrice) / product.primaryPrice) * 100
    );
  };

  // Calculate average rating from actual comments
  const calculateAverageRating = () => {
    if (!product?.comments || product.comments.length === 0) return 0;
    const sum = product.comments.reduce(
      (total, comment) => total + (comment.rating || 0),
      0
    );
    return sum / product.comments.length;
  };

  // Format user name from comment
  const formatUserName = (comment: Comment) => {
    if (comment.user) {
      return `${comment.user.first_name} ${comment.user.last_name}`.trim();
    }
    return comment.userName || "کاربر";
  };

  // Parse images if they're stored as string
  const getProductImages = () => {
    if (!product?.images) return getFallbackImages();

    const images =
      typeof product.images === "string"
        ? JSON.parse(product.images)
        : product.images;

    // Add base URL to image paths if needed
    return images.map((img: string) =>
      img.startsWith("http") ? img : `https://chandkoo.ir/api/${img}`
    );
  };

  const getFallbackImages = () => ["/logo.png", "/logo.png"];

  const nextSlide = () => {
    const images = getProductImages();
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    const images = getProductImages();
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleClose = () => {
    setProduct(null);
    setCurrent(0);
    onClose();
  };

  if (!open) return null;

  if (loading) {
    return (
      <Modal open={open} onCancel={handleClose} footer={null} centered>
        <div className="flex justify-center items-center h-40">
          <Spin size="large" />
        </div>
      </Modal>
    );
  }

  if (!product) {
    return (
      <Modal open={open} onCancel={handleClose} footer={null} centered>
        <div className="text-center py-8">
          <p>محصول یافت نشد</p>
        </div>
      </Modal>
    );
  }

  const discountPercent = calculateDiscountPercent();
  const averageRating = calculateAverageRating();
  const images = getProductImages();
  const discountedPrice = product.salePrice || 0;
  const originalPrice = product.primaryPrice || 0;

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      footer={null}
      centered
      width={900}
      bodyStyle={{ padding: 0, overflow: "hidden" }}
    >
      <div className="grid md:grid-cols-2 grid-cols-1">
        {/* 🖼️ Image Slider */}
        <div className="relative bg-gray-50 flex items-center justify-center">
          {product.images.length > 0 && images[current] ? (
            <img
              src={images[current]}
              alt={product.title}
              className="object-cover w-full h-[350px]"
            />
          ) : (
            <img
              src={"/logo.png"}
              alt={product.title}
              className="object-cover w-full h-[350px]"
            />
          )}

          {images.length > 1 && (
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
            {images.map((_: any, idx: any) => (
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
              {product.title || "بدون عنوان"}
            </h2>

            {/* 🛍️ Seller Info */}
            {product.seller && (
              <div className="flex justify-end items-center gap-2 mb-3">
                <Avatar icon={<ShopOutlined />} />
                <span className="text-green-600 text-sm">
                  {`${product.seller.first_name} ${product.seller.last_name}`}
                </span>
              </div>
            )}

            {/* ⭐ Rating */}
            <div className="flex items-center justify-end gap-2 mb-3">
              <Rate disabled value={averageRating} />
              <span className="text-gray-500 text-sm">
                ({product.comments?.length || 0} نظر)
              </span>
            </div>

            <Divider className="my-3" />

            {/* 💰 Prices */}
            <div className="text-right mb-3">
              {originalPrice > 0 && (
                <p className="text-gray-500 line-through text-sm">
                  {formatPersianNumber(originalPrice.toLocaleString("fa-IR"))}{" "}
                  تومان
                </p>
              )}
              <div className="flex justify-end items-center gap-2">
                <p className="text-xl font-bold text-green-600">
                  {formatPersianNumber(discountedPrice.toLocaleString("fa-IR"))}{" "}
                  تومان
                </p>
                {discountPercent > 0 && (
                  <Tag color="red" className="text-base">
                    %
                    {formatPersianNumber(
                      discountPercent.toLocaleString("fa-IR")
                    )}{" "}
                    تخفیف
                  </Tag>
                )}
              </div>
            </div>

            {/* 📝 Description */}
            <p className="text-gray-700 leading-relaxed text-right">
              {product.description || "بدون توضیحات"}
            </p>
          </div>

          <Divider />

          {/* 💬 Comments */}
          <div className="text-right">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">
              نظرات کاربران ({product.comments?.length || 0})
            </h3>
            <div className="space-y-3 max-h-[150px] overflow-y-auto pr-2">
              {product.comments && product.comments.length > 0 ? (
                product.comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="bg-gray-50 rounded-lg p-3 border border-gray-100"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <Avatar size="small" icon={<UserOutlined />} />
                        <span className="text-sm font-medium text-gray-800">
                          {formatUserName(comment)}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {comment.createdAt
                          ? new Date(comment.createdAt).toLocaleDateString(
                              "fa-IR"
                            )
                          : "تاریخ نامشخص"}
                      </span>
                    </div>
                    <Rate disabled value={comment.rating} className="text-xs" />
                    <p className="text-sm text-gray-700 mt-1">{comment.text}</p>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 py-4">
                  هنوز نظری برای این محصول ثبت نشده است.
                </div>
              )}
            </div>
          </div>

          <Divider />

          {/* ⚙️ Actions */}
          <div className="flex justify-between">
            <button
              onClick={handleClose}
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
