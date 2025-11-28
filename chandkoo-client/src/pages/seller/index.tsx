import { Card, Divider, Avatar, Spin, Carousel, Tag } from "antd";
import {
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  YoutubeOutlined,
  WhatsAppOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  UserOutlined,
  ShoppingOutlined,
  FireOutlined,
} from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MapComponent from "../../components/google-map";
import {
  getSellerDetails,
  type SellerData,
} from "../../services/seller.service";

// Generate avatar based on name
const generateAvatar = (firstName: string, lastName: string) => {
  const colors = [
    "#f44336",
    "#e91e63",
    "#9c27b0",
    "#673ab7",
    "#3f51b5",
    "#2196f3",
    "#03a9f4",
    "#00bcd4",
    "#009688",
    "#4caf50",
    "#8bc34a",
    "#cddc39",
    "#ffeb3b",
    "#ffc107",
    "#ff9800",
  ];
  const color = colors[(firstName.length + lastName.length) % colors.length];
  return `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=${color.slice(
    1
  )}&color=fff&size=256&bold=true`;
};

// Format price with Persian numbers
const formatPersianNumber = (number: number | string) => {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return number
    .toString()
    .replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
};

// Format price with commas
const formatPrice = (price: number | string) => {
  const num = typeof price === "string" ? parseFloat(price) : price;
  return formatPersianNumber(num.toLocaleString("fa-IR"));
};

export default function SellerPage() {
  const { id } = useParams();
  const [seller, setSeller] = useState<SellerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSellerData = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const response: any = await getSellerDetails(id);
        if (response.status === 200 && response.data.success) {
          setSeller(response.data.data);
          setTimeout(() => {
            window.scrollTo(0, 0);
          }, 100);
        } else {
          setError("فروشنده یافت نشد");
        }
      } catch (err) {
        console.error("Error fetching seller data:", err);
        setError("خطا در دریافت اطلاعات فروشنده");
      } finally {
        setLoading(false);
      }
    };

    fetchSellerData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (error || !seller) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <UserOutlined className="text-4xl text-gray-400 mb-4" />
          <p className="text-gray-600">{error || "فروشنده یافت نشد"}</p>
        </div>
      </div>
    );
  }

  const fullName = `${seller.first_name} ${seller.last_name}`;
  const avatarUrl = generateAvatar(seller.first_name, seller.last_name);
  const hasLocation = seller.lat && seller.lng;
  const hasSocialMedia =
    seller.linkedin ||
    seller.twitter ||
    seller.instagram ||
    seller.whatsapp ||
    seller.youtube ||
    seller.facebook;

  return (
    <div className="relative mt-[100px] pb-[100px] min-h-[calc(100vh-50px)] bg-gray-50 flex justify-center items-start px-4 py-8 overflow-hidden">
      {/* Background with wallpaper */}
      <div className="absolute w-[100vw] left-0 top-0 h-[100%] opacity-20">
        <img
          src="/images/middle-wallpaper.jpg"
          className="w-full h-full object-cover min-h-[100%]"
          alt="background"
        />
      </div>

      <div className="relative z-[10] bg-white rounded-lg shadow-lg max-w-5xl w-full overflow-hidden">
        {/* Header Section with banner */}
        <div
          className="relative w-full h-52 bg-cover bg-center"
          style={{
            backgroundImage: `url('/images/middle-wallpaper.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/80 to-blue-600/80"></div>

          {/* Avatar and name overlay */}
          <div className="absolute -bottom-[70px] left-1/2 transform -translate-x-1/2 text-center">
            <Avatar
              size={100}
              src={avatarUrl}
              className="border-4 border-white shadow-lg"
            />
            <h1 className="text-xl font-bold mt-3 text-gray-800">{fullName}</h1>
          </div>
        </div>

        <div className="p-6 md:p-10 mt-12">
          {/* Contact Info */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="text-center md:text-right">
              {(seller.phone_number || seller.mobile) && (
                <div className="space-y-3">
                  {/* Phone Numbers Label */}
                  <div className="flex items-center justify-center md:justify-start gap-2 text-gray-600 mb-2">
                    <PhoneOutlined className="text-green-600" />
                    <span className="font-semibold text-sm">
                      شماره‌های تماس
                    </span>
                  </div>

                  {/* Phone Numbers */}
                  <div className="space-y-2">
                    {seller.phone_number && (
                      <p className="flex items-center justify-center md:justify-start gap-2 text-gray-700">
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
                          تلفن ثابت
                        </span>
                        <span className="font-medium">
                          {seller.phone_number}
                        </span>
                      </p>
                    )}
                    {seller.mobile && (
                      <p className="flex items-center justify-center md:justify-start gap-2 text-gray-700">
                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                          موبایل
                        </span>
                        <span className="font-medium">{seller.mobile}</span>
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {seller.address && (
              <div className="text-center md:text-right">
                <div className="space-y-3">
                  {/* Address Label */}
                  <div className="flex items-center justify-center md:justify-start gap-2 text-gray-600 mb-2">
                    <EnvironmentOutlined className="text-blue-600" />
                    <span className="font-semibold text-sm">آدرس</span>
                  </div>

                  {/* Address */}
                  <p className="flex items-center justify-center md:justify-start gap-2 text-gray-700 bg-gray-50 p-3 rounded-lg">
                    <span className="font-medium text-right leading-relaxed">
                      {seller.address}
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Social Media */}
          {hasSocialMedia && (
            <>
              <Divider>شبکه‌های اجتماعی</Divider>
              <div className="flex justify-center items-center gap-4 text-xl text-gray-500 mb-6">
                {seller.facebook && (
                  <a
                    href={seller.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600 transition-colors"
                  >
                    <FacebookOutlined />
                  </a>
                )}
                {seller.instagram && (
                  <a
                    href={seller.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-pink-600 transition-colors"
                  >
                    <InstagramOutlined />
                  </a>
                )}
                {seller.twitter && (
                  <a
                    href={seller.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-sky-500 transition-colors"
                  >
                    <TwitterOutlined />
                  </a>
                )}
                {seller.linkedin && (
                  <a
                    href={seller.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-700 transition-colors"
                  >
                    <LinkedinOutlined />
                  </a>
                )}
                {seller.youtube && (
                  <a
                    href={seller.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-red-600 transition-colors"
                  >
                    <YoutubeOutlined />
                  </a>
                )}
                {seller.whatsapp && (
                  <a
                    href={`https://wa.me/${seller.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-green-600 transition-colors"
                  >
                    <WhatsAppOutlined />
                  </a>
                )}
              </div>
            </>
          )}

          {/* Active Bids Section */}
          {seller.bids && seller.bids.length > 0 && (
            <>
              <Divider>
                <div className="flex items-center gap-2">
                  <FireOutlined className="text-orange-500" />
                  <span>مزایده‌های فعال</span>
                </div>
              </Divider>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {seller.bids.map((bid) => (
                  <Card
                    key={bid.id}
                    hoverable
                    cover={
                      bid.images && bid.images.length > 0 ? (
                        <Carousel dotPosition="top" autoplay>
                          {bid.images.map((image, index) => (
                            <div key={index}>
                              <img
                                alt={bid.title}
                                src={`https://chandkoo.ir/api/${image}`}
                                className="w-full h-48 object-cover"
                              />
                            </div>
                          ))}
                        </Carousel>
                      ) : (
                        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-500">بدون تصویر</span>
                        </div>
                      )
                    }
                    className="rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all"
                  >
                    <Card.Meta
                      title={bid.title}
                      description={
                        <div className="space-y-2">
                          <p className="text-gray-600 text-sm line-clamp-2">
                            {bid.description}
                          </p>
                          <div className="flex justify-between items-center">
                            <span className="text-green-600 font-bold text-lg">
                              {formatPrice(bid.currentPrice)} تومان
                            </span>
                            <Tag color="blue">مزایده فعال</Tag>
                          </div>
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>{bid.bidCount || 0} پیشنهاد</span>
                            <span>{bid.viewCount || 0} بازدید</span>
                          </div>
                        </div>
                      }
                    />
                  </Card>
                ))}
              </div>
            </>
          )}

          {/* Active Sales Section */}
          {seller.sales && seller.sales.length > 0 && (
            <>
              <Divider>
                <div className="flex items-center gap-2">
                  <ShoppingOutlined className="text-green-500" />
                  <span>فروش‌های ویژه</span>
                </div>
              </Divider>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {seller.sales.map((sale) => (
                  <Card
                    key={sale.id}
                    hoverable
                    cover={
                      sale.images && sale.images.length > 0 ? (
                        <Carousel dotPosition="top" autoplay>
                          {sale.images.map((image, index) => (
                            <div key={index}>
                              <img
                                alt={sale.title || "فروش ویژه"}
                                src={`https://chandkoo.ir/api/${image}`}
                                className="w-full h-48 object-cover"
                              />
                            </div>
                          ))}
                        </Carousel>
                      ) : (
                        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-500">بدون تصویر</span>
                        </div>
                      )
                    }
                    className="rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all"
                  >
                    <Card.Meta
                      title={sale.title || "فروش ویژه"}
                      description={
                        <div className="space-y-2">
                          <p className="text-gray-600 text-sm line-clamp-2">
                            {sale.description}
                          </p>
                          <div className="flex justify-between items-center">
                            {sale.primaryPrice && sale.salePrice ? (
                              <div className="flex flex-col items-start">
                                <span className="text-red-500 line-through text-xs">
                                  {formatPrice(sale.primaryPrice)} تومان
                                </span>
                                <span className="text-green-600 font-bold text-lg">
                                  {formatPrice(sale.salePrice)} تومان
                                </span>
                              </div>
                            ) : sale.salePercentFrom && sale.salePercentTo ? (
                              <span className="text-green-600 font-bold text-lg">
                                تخفیف {sale.salePercentFrom}% تا{" "}
                                {sale.salePercentTo}%
                              </span>
                            ) : (
                              <span className="text-green-600 font-bold">
                                فروش ویژه
                              </span>
                            )}
                            <Tag color="green">
                              {sale.saleType === "market"
                                ? "فروش بازار"
                                : "فروش محصول"}
                            </Tag>
                          </div>
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>{sale.viewCount || 0} بازدید</span>
                            <span>{sale.likeCount || 0} پسند</span>
                          </div>
                        </div>
                      }
                    />
                  </Card>
                ))}
              </div>
            </>
          )}

          {/* Branches */}
          {seller.branches && seller.branches.length > 0 && (
            <>
              <Divider>شعب فروشگاه</Divider>
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {seller.branches.map((branch) => (
                  <Card
                    key={branch.id}
                    title={
                      <div className="flex items-center gap-2">
                        <EnvironmentOutlined className="text-blue-500" />
                        <span>{branch.name}</span>
                      </div>
                    }
                    bordered={false}
                    className="rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <p className="flex items-center gap-2 text-gray-700 mb-2">
                      <UserOutlined className="text-gray-400" />
                      <span>
                        {branch.first_name} {branch.last_name}
                      </span>
                    </p>
                    <p className="flex items-center gap-2 text-gray-700 mb-2">
                      <EnvironmentOutlined className="text-gray-400" />
                      <span>{branch.address}</span>
                    </p>
                    <p className="flex items-center gap-2 text-gray-700 mb-3">
                      <PhoneOutlined className="text-gray-400" />
                      <span>{branch.phone_number}</span>
                    </p>

                    {/* Branch Social Media */}
                    {(branch.linkedin ||
                      branch.twitter ||
                      branch.instagram ||
                      branch.whatsapp ||
                      branch.youtube ||
                      branch.facebook) && (
                      <div className="flex gap-3 mt-3 pt-3 border-t border-gray-100">
                        {branch.facebook && (
                          <a
                            href={branch.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <FacebookOutlined />
                          </a>
                        )}
                        {branch.instagram && (
                          <a
                            href={branch.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-pink-600 hover:text-pink-800"
                          >
                            <InstagramOutlined />
                          </a>
                        )}
                        {branch.twitter && (
                          <a
                            href={branch.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sky-500 hover:text-sky-700"
                          >
                            <TwitterOutlined />
                          </a>
                        )}
                        {branch.linkedin && (
                          <a
                            href={branch.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-700 hover:text-blue-900"
                          >
                            <LinkedinOutlined />
                          </a>
                        )}
                        {branch.youtube && (
                          <a
                            href={branch.youtube}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-red-600 hover:text-red-800"
                          >
                            <YoutubeOutlined />
                          </a>
                        )}
                        {branch.whatsapp && (
                          <a
                            href={`https://wa.me/${branch.whatsapp}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-600 hover:text-green-800"
                          >
                            <WhatsAppOutlined />
                          </a>
                        )}
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </>
          )}

          {/* Map */}
          {hasLocation && (
            <div className="rounded-lg overflow-hidden shadow-md mb-10 border border-gray-200">
              <div className="p-4 bg-gray-50 border-b">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <EnvironmentOutlined className="text-blue-600" />
                  موقعیت روی نقشه
                </h3>
              </div>
              <MapComponent
                initialLatLng={{ lat: seller.lat, lng: seller.lng }}
                isDraggable={false}
                handleLatLngChange={() => {}}
              />
            </div>
          )}

          {/* Statistics Section */}
          {seller.statistics && (
            <>
              <Divider>آمار فروشنده</Divider>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {seller.statistics.total_branches || 0}
                  </div>
                  <div className="text-sm text-gray-600">شعبه فعال</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {seller?.statistics.active_bids || 0}
                  </div>
                  <div className="text-sm text-gray-600">مزایده فعال</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {seller.statistics.active_sales || 0}
                  </div>
                  <div className="text-sm text-gray-600">فروش ویژه</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {(seller.statistics.total_bids || 0) +
                      (seller.statistics.total_sales || 0)}
                  </div>
                  <div className="text-sm text-gray-600">کل آگهی‌ها</div>
                </div>
              </div>
            </>
          )}

          {/* About Section */}
          <Divider>درباره فروشنده</Divider>
          <div className="text-center text-gray-600 bg-gray-50 rounded-lg p-6">
            <p className="text-lg mb-3">
              فروشنده با سابقه درخشان در زمینه فروش محصولات با کیفیت
            </p>
            <p className="mb-2">
              📞 برای استعلام قیمت و اطلاعات بیشتر با شماره‌های فوق تماس بگیرید
            </p>
            <p className="text-sm text-gray-500">
              این فروشنده دارای {seller.statistics?.total_branches || 0} شعبه
              فعال، {seller.statistics?.active_bids || 0} مزایده فعال و{" "}
              {seller.statistics?.active_sales || 0} فروش ویژه می‌باشد
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
