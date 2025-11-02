import { useEffect, useState } from "react";
import { getAllSellers } from "../services/content.service";
import { Tag } from "antd";
import { MdCategory } from "react-icons/md";
import { FaBuilding, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function HomerSellerItem({ seller }: { seller: any }): JSX.Element {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/seller")}
      className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 border border-gray-200 rounded-xl bg-white hover:shadow-lg transition-shadow"
    >
      {/* Avatar */}
      <div className="w-20 h-20 flex-shrink-0 relative">
        <img
          src={seller.avatar}
          alt={seller.name}
          className="w-full h-full rounded-full object-cover"
        />
        <div className="absolute top-0 left-0">
          <Tag
            color="#52c41a"
            className="flex items-center gap-1 text-white text-xs"
          >
            <MdCategory />
            <span>{seller.category}</span>
          </Tag>
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 text-right rtl mt-2 sm:mt-0">
        <h3 className="text-green-600 font-bold text-lg">{seller.name}</h3>
        <div className="flex flex-col sm:flex-row sm:gap-6 mt-2 text-gray-700">
          <div className="flex items-center gap-1">
            <FaShoppingCart />
            <span className="font-semibold">{seller.sell_number}</span>
            <span>فروش موفق</span>
          </div>
          <div className="flex items-center gap-1">
            <FaBuilding />
            <span className="font-semibold">{seller.branch_number}</span>
            <span>شعبه</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomeSeller() {
  const [sellers, setSellers] = useState<any[]>([]);

  useEffect(() => {
    getAllSellers().then((res) => {
      if (res.status === 200) {
        setSellers(res.data.sellers);
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
          />
        </div>
        <div className="relative z-10 pt-[20px] flex flex-col items-center text-center">
          <h2 className="text-white text-2xl sm:text-3xl font-extrabold">
            بهترین فروشندگان
          </h2>
        </div>
        {/* Seller cards */}
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 relative pt-[30px] pb-[30px] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {sellers.map((el) => (
              <HomerSellerItem seller={el} key={`seller-${el.id}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
