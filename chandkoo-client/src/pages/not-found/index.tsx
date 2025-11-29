import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  ArrowLeftOutlined,
  RocketOutlined,
} from "@ant-design/icons";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Animated 404 Text */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-800 mb-4 relative">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              404
            </span>
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-pulse"></div>
          </h1>
        </div>

        {/* Main Content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            صفحه مورد نظر یافت نشد!
          </h2>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد یا منتقل شده است.
            <br />
            می‌توانید به صفحه اصلی بازگردید یا از جستجو استفاده کنید.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              type="primary"
              size="large"
              icon={<HomeOutlined />}
              onClick={() => navigate("/")}
              className="h-12 px-8 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 border-0 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              بازگشت به صفحه اصلی
            </Button>
            <Button
              size="large"
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate(-1)}
              className="h-12 px-8 rounded-xl border-2 border-gray-300 hover:border-blue-500 hover:text-blue-600 transition-all duration-300"
            >
              بازگشت به صفحه قبل
            </Button>
          </div>

          {/* Additional Help */}
          <div className="mt-8 p-4 bg-blue-50 rounded-2xl border border-blue-200">
            <div className="flex items-center justify-center gap-2 text-blue-700 mb-2">
              <RocketOutlined />
              <span className="font-semibold">راهنمایی</span>
            </div>
            <p className="text-blue-600 text-sm">
              اگر فکر می‌کنید این یک خطاست، لطفاً با پشتیبانی تماس بگیرید.
            </p>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-10 w-6 h-6 bg-purple-400 rounded-full opacity-70 animate-bounce"></div>
        <div className="absolute bottom-1/4 right-20 w-4 h-4 bg-blue-400 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-8 h-8 bg-yellow-300 rounded-full opacity-50 animate-ping"></div>
      </div>
    </div>
  );
}
