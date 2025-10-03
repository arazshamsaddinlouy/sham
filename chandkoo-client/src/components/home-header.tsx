import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function HomeHeader() {
  const navigate = useNavigate();

  return (
    <div className="w-full relative mt-[145px]">
      <div className="relative h-[400px] md:h-[500px] lg:h-[550px] overflow-hidden rounded-[20px] shadow-lg mx-auto max-w-[1500px] !max-[768px]:px-[15px]">
        {/* Background image */}
        <img
          src="/images/header-wallpaper.jpg"
          className="absolute inset-0 w-full h-full object-cover brightness-75"
          alt="Header background"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-800/70 via-purple-600/40 to-blue-500/50"></div>

        {/* Content */}
        <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-6 md:px-12">
          <h1 className="text-white text-[28px] md:text-[52px] lg:text-[60px] font-extrabold mb-4 drop-shadow-lg">
            سامانه خرید و فروش آنلاین
          </h1>
          <p className="text-white text-[13px] md:text-[18px] lg:text-[20px] mb-8 max-w-[800px] leading-relaxed drop-shadow-sm">
            شما از طریق این سامانه میتوانید محصولات خود را خرید و فروش نمایید.
            <br />
            همچنین روی نقشه میتوانید نزدیک ترین فروشندگان را یافته و بهترین قیمت
            را پیدا کنید.
          </p>

          <button
            onClick={() => navigate("/dashboard/request-price")}
            className="
    relative flex items-center gap-3 px-8 md:px-12 py-4 md:py-5
    text-lg md:text-xl lg:text-2xl font-bold
    rounded-full border-2 border-blue-400
    bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600
    text-white shadow-[0_8px_30px_rgba(59,130,246,0.5)]
    transition-all duration-300 transform hover:scale-110 hover:shadow-[0_10px_40px_rgba(59,130,246,0.7)]
    overflow-hidden
  "
          >
            {/* Glow effect inside */}
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-30 blur-2xl animate-pulse"></span>

            <IoSearchOutline
              size={28}
              className="relative z-10 drop-shadow-[0_0_6px_rgba(255,255,255,0.7)]"
            />
            <span className="relative z-10">استعلام قیمت</span>
          </button>
        </div>
      </div>
    </div>
  );
}
