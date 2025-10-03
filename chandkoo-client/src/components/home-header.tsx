import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function HomeHeader() {
  const navigate = useNavigate();

  return (
    <div className="w-full relative mt-[145px]">
      <div className="relative h-[400px] md:h-[500px] lg:h-[550px] overflow-hidden rounded-[20px] shadow-lg mx-auto max-w-[1500px] !max-[768px]:px-[15px]">
        {/* Background image */}
        <img
          src="/images/wallpaper.jpg"
          className="absolute inset-0 w-full h-full object-cover brightness-75"
          alt="Header background"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-800/70 via-purple-600/40 to-blue-500/50"></div>

        {/* Content */}
        <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-6 md:px-12">
          <h1 className="text-white text-[42px] md:text-[52px] lg:text-[60px] font-extrabold mb-4 drop-shadow-lg">
            سامانه خرید و فروش آنلاین
          </h1>
          <p className="text-white text-[16px] md:text-[18px] lg:text-[20px] mb-8 max-w-[800px] leading-relaxed drop-shadow-sm">
            شما از طریق این سامانه میتوانید محصولات خود را خرید و فروش نمایید.
            <br />
            همچنین روی نقشه میتوانید نزدیک ترین فروشندگان را یافته و بهترین قیمت
            را پیدا کنید.
          </p>

          {/* Button */}
          <button
            onClick={() => navigate("/dashboard/request-price")}
            className="flex items-center gap-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-blue-500 text-white font-semibold text-lg md:text-xl lg:text-2xl px-6 md:px-10 py-4 md:py-5 rounded-full shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <IoSearchOutline size={24} />
            <span>استعلام قیمت</span>
          </button>
        </div>
      </div>
    </div>
  );
}
