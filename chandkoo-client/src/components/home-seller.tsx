import { useEffect, useState } from "react";
import { Tag, Avatar } from "antd";
import { MdStore, MdPhone, MdLocationOn } from "react-icons/md";
import { FaShoppingCart, FaStar, FaRegStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getHomeSellers } from "../services/user.service";
import formatPersianNumber from "../utils/numberPriceFormat";

// Generate sample avatar based on name
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
  )}&color=fff&size=128&bold=true&font-size=0.5`;
};

// Generate random rating between 3.5 and 5
const generateRating = () => {
  return (Math.random() * 1.5 + 3.5).toFixed(1);
};

function HomeSellerItem({ seller }: { seller: any }): JSX.Element {
  const navigate = useNavigate();

  const avatarUrl = generateAvatar(seller.first_name, seller.last_name);
  const rating = generateRating();
  const fullName = `${seller.first_name} ${seller.last_name}`;

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400 text-sm" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<FaStar key={i} className="text-yellow-400 text-sm" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-gray-300 text-sm" />);
      }
    }
    return stars;
  };

  return (
    <div
      onClick={() => navigate(`/seller/${seller.id}`)}
      className="flex flex-col items-center text-center p-6 border border-gray-200 rounded-2xl bg-white hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group"
    >
      {/* Avatar with Badge */}
      <div className="relative mb-4">
        <Avatar
          size={80}
          src={avatarUrl}
          alt={fullName}
          className="border-4 border-green-100 group-hover:border-green-200 transition-colors"
        />
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
          <Tag
            color="#10b981"
            className="flex items-center gap-1 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg"
          >
            <MdStore className="text-xs" />
            <span>فروشنده</span>
          </Tag>
        </div>
      </div>

      {/* Seller Info */}
      <div className="text-center w-full">
        <h3 className="text-green-700 font-bold text-lg mb-2 group-hover:text-green-800 transition-colors">
          {fullName}
        </h3>

        {/* Rating */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            {renderStars(parseFloat(rating))}
          </div>
          <span className="text-sm text-gray-600 font-medium">{rating}</span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-green-50 rounded-lg p-2">
            <div className="flex items-center justify-center gap-1 text-green-700">
              <FaShoppingCart className="text-sm" />
              <span className="font-bold text-sm">
                {formatPersianNumber(seller.response_count.toLocaleString())}
              </span>
            </div>
            <div className="text-xs text-gray-600 mt-1">پاسخ استعلام</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-2">
            <div className="flex items-center justify-center gap-1 text-blue-700">
              <MdStore className="text-sm" />
              <span className="font-bold text-sm">
                {formatPersianNumber(`${seller.branch_count}`)}
              </span>
            </div>
            <div className="text-xs text-gray-600 mt-1">شعبه فعال</div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-2 text-xs text-gray-600">
          {seller.phone_number && (
            <div className="flex items-center justify-center gap-1 bg-gray-50 rounded-lg p-2">
              <MdPhone className="text-gray-400" />
              <span className="font-medium">{seller.phone_number}</span>
            </div>
          )}
          {seller.mobile && (
            <div className="flex items-center justify-center gap-1 bg-gray-50 rounded-lg p-2">
              <MdPhone className="text-gray-400" />
              <span className="font-medium">{seller.mobile}</span>
            </div>
          )}
          {seller.address && (
            <div className="flex items-start justify-center gap-1 bg-gray-50 rounded-lg p-2">
              <MdLocationOn className="text-gray-400 mt-0.5 flex-shrink-0" />
              <span className="font-medium text-right leading-tight">
                {seller.address.length > 30
                  ? `${seller.address.slice(0, 30)}...`
                  : seller.address}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function HomeSeller() {
  const [sellers, setSellers] = useState<any[]>([]);

  useEffect(() => {
    getHomeSellers().then((res) => {
      if (res.status === 200 && res.data.success) {
        setSellers(res.data.data);
      }
    });
  }, []);

  return (
    <div className="w-full">
      {/* Header with background */}
      <div className="relative w-full flex flex-col justify-center items-center overflow-hidden mb-8">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, #34D399 0%, #059669 100%), url('https://www.transparenttextures.com/patterns/green-fibers.png') repeat`,
          }}
        ></div>
        <div className="absolute inset-0 opacity-20">
          <img
            src="/images/middle-wallpaper.jpg"
            className="w-full h-full object-cover min-h-[100%]"
            alt="background"
          />
        </div>

        <div className="relative z-10 pt-12 pb-8 flex flex-col items-center text-center">
          <h2 className="text-white text-3xl sm:text-4xl font-extrabold mb-4 drop-shadow-lg">
            بهترین فروشندگان
          </h2>
          <p className="text-green-100 text-lg max-w-2xl px-4 drop-shadow">
            با اعتماد به فروشندگان برتر ما، تجربه‌ای مطمئن و با کیفیت از خرید
            داشته باشید
          </p>
        </div>

        {/* Seller cards */}
        <div className="relative z-10 container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 pb-12">
            {sellers.map((seller) => (
              <HomeSellerItem seller={seller} key={`seller-${seller.id}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
