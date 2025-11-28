import {
  Modal,
  Rate,
  Divider,
  Tag,
  Avatar,
  Spin,
  message,
  Card,
  Row,
  Col,
  Button,
} from "antd";
import { useState, useEffect } from "react";
import {
  LeftOutlined,
  RightOutlined,
  ShopOutlined,
  UserOutlined,
  PercentageOutlined,
  TagOutlined,
  PhoneOutlined,
  EyeOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { getSaleById } from "../services/sales.service";
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
  saleType: "market" | "product";
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
  salePercentFrom?: number;
  salePercentTo?: number;
  marketSaleDescription?: string;
  notes?: string;
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
  const navigate = useNavigate();

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
        message.error("خطا در دریافت اطلاعات");
      }
    } catch (error) {
      console.error("Error fetching sale:", error);
      message.error("خطا در دریافت اطلاعات");
    } finally {
      setLoading(false);
    }
  };

  // Calculate discount percentage for products
  const calculateDiscountPercent = () => {
    if (!product?.primaryPrice || !product?.salePrice) return 0;
    return Math.round(
      ((product.primaryPrice - product.salePrice) / product.primaryPrice) * 100
    );
  };

  // Calculate average rating from comments
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

  const getFallbackImages = () => ["/logo.png"];

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

  // Navigate to seller page
  const handleSellerClick = () => {
    if (product?.seller?.id) {
      navigate(`/seller/${product.seller.id}`);
      handleClose();
    }
  };

  // Render market sale content
  const renderMarketSaleContent = () => (
    <div className="space-y-6">
      {/* Market Header */}
      <div className="text-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
        <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-2xl shadow-sm flex items-center justify-center">
          <ShopOutlined className="text-3xl text-blue-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {product?.marketSaleDescription || "حراج ویژه فروشگاه"}
        </h1>
        <div className="flex items-center justify-center gap-4">
          <Tag color="blue" className="text-lg px-4 py-1">
            <PercentageOutlined /> حراج فروشگاه
          </Tag>
          <div className="text-lg font-bold text-red-600">
            {formatPersianNumber(product?.salePercentFrom || 0)}% -{" "}
            {formatPersianNumber(product?.salePercentTo || 0)}%
          </div>
        </div>
      </div>

      {/* Sale Range Info */}
      <Card title="محدوده تخفیف‌ها" className="text-right">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="text-2xl font-bold text-green-600">
                {formatPersianNumber(product?.salePercentFrom || 0)}%
              </div>
              <div className="text-gray-600">حداقل تخفیف</div>
            </div>
          </Col>
          <Col xs={24} sm={12}>
            <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="text-2xl font-bold text-red-600">
                {formatPersianNumber(product?.salePercentTo || 0)}%
              </div>
              <div className="text-gray-600">حداکثر تخفیف</div>
            </div>
          </Col>
        </Row>
      </Card>

      {/* Notes */}
      {product?.notes && (
        <Card title="توضیحات حراج" className="text-right">
          <p className="text-gray-700 leading-relaxed">{product.notes}</p>
        </Card>
      )}
    </div>
  );

  // Render product sale content
  const renderProductSaleContent = () => {
    const discountPercent = calculateDiscountPercent();
    const averageRating = calculateAverageRating();
    const images = getProductImages();
    const discountedPrice = product?.salePrice || 0;
    const originalPrice = product?.primaryPrice || 0;

    return (
      <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
        {/* Image Slider */}
        <div className="relative bg-gray-50 rounded-2xl overflow-hidden">
          {images.length > 0 && images[current] ? (
            <img
              src={images[current]}
              alt={product?.title}
              className="object-cover w-full h-[350px]"
            />
          ) : (
            <div className="w-full h-[350px] flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
              <div className="text-center">
                <TagOutlined className="text-4xl text-gray-400 mb-2" />
                <p className="text-gray-500">بدون تصویر</p>
              </div>
            </div>
          )}

          {images.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 rounded-full p-2 shadow-lg transition-all"
              >
                <LeftOutlined />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 rounded-full p-2 shadow-lg transition-all"
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
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  idx === current ? "bg-green-600 scale-125" : "bg-gray-300"
                }`}
              />
            ))}
          </div>

          {/* Discount Badge */}
          {discountPercent > 0 && (
            <div className="absolute top-3 left-3">
              <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold px-3 py-2 rounded-full shadow-lg">
                {formatPersianNumber(discountPercent)}% تخفیف
              </div>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold mb-3 text-gray-900 text-right">
              {product?.title || "بدون عنوان"}
            </h1>

            {/* Category */}
            {product?.category && (
              <div className="flex justify-end mb-3">
                <Tag color="blue" icon={<TagOutlined />}>
                  {product?.category.title}
                </Tag>
              </div>
            )}

            {/* Rating and Stats */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4 text-gray-500">
                <div className="flex items-center gap-1">
                  <EyeOutlined />
                  <span>{formatPersianNumber(product?.viewCount)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <HeartOutlined />
                  <span>{formatPersianNumber(0)}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Rate disabled value={averageRating} />
                <span className="text-gray-500 text-sm">
                  ({product?.comments?.length || 0})
                </span>
              </div>
            </div>

            <Divider />

            {/* Prices */}
            <div className="text-right space-y-2">
              {originalPrice > 0 && (
                <p className="text-gray-500 line-through text-lg">
                  {formatPersianNumber(originalPrice)} تومان
                </p>
              )}
              <div className="flex justify-end items-center gap-3">
                <p className="text-2xl font-bold text-green-600">
                  {formatPersianNumber(discountedPrice)} تومان
                </p>
                {discountPercent > 0 && (
                  <div className="text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
                    {formatPersianNumber(originalPrice - discountedPrice)} تومان
                    صرفه‌جویی
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            {product?.description && (
              <>
                <Divider />
                <div className="text-right">
                  <h3 className="font-semibold mb-2 text-gray-800">
                    توضیحات محصول
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {product?.description}
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Comments */}
          {product?.comments && product.comments.length > 0 && (
            <>
              <Divider />
              <div className="text-right">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">
                  نظرات کاربران ({product?.comments.length})
                </h3>
                <div className="space-y-3 max-h-[150px] overflow-y-auto pr-2">
                  {product?.comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="bg-gray-50 rounded-lg p-3 border border-gray-100"
                    >
                      <div className="flex items-center justify-between mb-2">
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
                      <Rate disabled value={comment.rating} />
                      <p className="text-sm text-gray-700 mt-2">
                        {comment.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  if (!open) return null;

  if (loading) {
    return (
      <Modal
        open={open}
        onCancel={handleClose}
        footer={null}
        centered
        width={800}
      >
        <div className="flex justify-center items-center h-40">
          <Spin size="large" />
        </div>
      </Modal>
    );
  }

  if (!product) {
    return (
      <Modal
        open={open}
        onCancel={handleClose}
        footer={null}
        centered
        width={800}
      >
        <div className="text-center py-8">
          <p>موردی یافت نشد</p>
        </div>
      </Modal>
    );
  }

  const isMarketSale = product.saleType === "market";

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      footer={null}
      centered
      width={isMarketSale ? 700 : 1000}
      bodyStyle={{ padding: "24px" }}
      className="sale-modal"
    >
      <div className="space-y-6">
        {/* Seller Info - Common for both types */}
        {product.seller && (
          <Card className="text-right">
            <div className="flex items-center justify-between">
              <Button
                type="primary"
                onClick={handleSellerClick}
                icon={<ShopOutlined />}
              >
                مشاهده فروشگاه
              </Button>
              <div className="flex items-center gap-3">
                <div className="text-left">
                  <div className="font-semibold text-gray-900">
                    {product.seller.first_name} {product.seller.last_name}
                  </div>
                  {product.seller.phone_number && (
                    <div className="text-sm text-gray-600 flex items-center gap-1">
                      <PhoneOutlined />
                      {product.seller.phone_number}
                    </div>
                  )}
                </div>
                <Avatar
                  size={50}
                  icon={<UserOutlined />}
                  className="bg-gradient-to-r from-blue-500 to-purple-600"
                />
              </div>
            </div>
          </Card>
        )}

        {/* Main Content */}
        {isMarketSale ? renderMarketSaleContent() : renderProductSaleContent()}

        {/* Actions */}
        <Divider />
        <div className="flex justify-between">
          <Button onClick={handleClose} size="large">
            بستن
          </Button>
          <Button
            type="primary"
            size="large"
            className="bg-green-600 hover:bg-green-700"
          >
            {isMarketSale ? "مشاهده محصولات فروشگاه" : "افزودن به سبد خرید"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
