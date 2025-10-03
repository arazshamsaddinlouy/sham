import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShamContext } from "../../App";
import { loginService } from "../../services/auth.service";
import { InputOTP } from "antd-input-otp";
import { Button, ConfigProvider, Form } from "antd";

let timeout: any = null;

export default function LoginOtp() {
  const [autoSubmitted, setAutoSubmitted] = useState(false);

  const [form] = Form.useForm();
  const [otp, setOtp] = useState<string[]>(Array(5).fill("")); // initialize with 5 empty slots
  const [timer, setTimer] = useState(120);
  const value: any = useContext(ShamContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Redirect if mobile is missing
  useEffect(() => {
    if (!location?.state?.mobile) navigate("/login");
  }, [location.state]);

  // Timer countdown
  useEffect(() => {
    if (timer >= 0) {
      timeout = setTimeout(() => setTimer(timer - 1), 1000);
    } else {
      navigate("/login");
    }
    return () => clearTimeout(timeout);
  }, [timer]);

  // Convert Persian digits to English
  const persianToEnglishDigits = (arr: string[]) => {
    const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
    const englishDigits = "0123456789";
    return arr.map((ch) =>
      ch.replace(/[۰-۹]/g, (d) => englishDigits[persianDigits.indexOf(d)])
    );
  };

  // Handle OTP change
  const handleOtpChange = (val: string[]) => {
    setOtp(persianToEnglishDigits(val));
  };
  // Auto-submit once OTP is fully entered
  useEffect(() => {
    if (!autoSubmitted && otp.every((digit) => digit !== "")) {
      setAutoSubmitted(true);
      handleSubmit();
    }
  }, [otp, autoSubmitted]);
  // Submit OTP
  const handleSubmit = () => {
    setIsLoading(true);
    loginService(location.state.mobile, otp.join(""))
      .then((res) => {
        setIsLoading(false);
        if (res.status === 200) {
          localStorage.setItem("accessToken", res.data.accessToken);
          localStorage.setItem("refreshToken", res.data.refreshToken);
          value.setNotif({ type: "success", description: "ورود با موفقیت" });
          navigate("/dashboard");
        } else {
          value.setNotif({
            type: "error",
            description: "کد وارد شده اشتباه است",
          });
        }
      })
      .catch(() => {
        setIsLoading(false);
        value.setNotif({ type: "error", description: "خطا در ارسال اطلاعات" });
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen relative bg-gray-50 px-4">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-20">
        <img
          src="/images/middle-wallpaper.jpg"
          className="w-full h-full object-cover"
        />
      </div>

      {/* OTP Container */}
      <div className="relative z-20 flex flex-col md:flex-row bg-white rounded-[5px] shadow-lg overflow-hidden max-w-3xl w-full">
        {/* Left Sidebar Image */}
        <div
          className="hidden md:block md:w-1/3 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/login-wallpaper.jpg')",
          }}
        />

        {/* Right Form Section */}
        <div className="w-full md:w-2/3 p-8 md:p-10 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">
            وارد کردن کد پیامکی
          </h2>

          <Form form={form} layout="vertical" className="w-full">
            <Form.Item
              label={`کد پیامک شده به ${location?.state?.mobile} را وارد نمایید`}
            >
              <InputOTP
                length={5}
                value={otp}
                onChange={handleOtpChange}
                inputType="numeric" // numeric keyboard
                autoFocus={true}
              />
            </Form.Item>

            <Form.Item>
              <ConfigProvider theme={{ token: { colorPrimary: "#4caf50" } }}>
                <Button
                  loading={isLoading}
                  onClick={handleSubmit}
                  className="w-full h-12 rounded-lg text-white font-medium"
                  type="primary"
                  disabled={otp.filter((d) => d !== "").length < 5}
                >
                  ورود به سامانه
                </Button>
              </ConfigProvider>
            </Form.Item>
          </Form>

          <div className="flex justify-between mt-4 text-sm">
            <Link className="text-blue-500" to="/login">
              اصلاح شماره موبایل
            </Link>
            <span>
              زمان باقیمانده:{" "}
              {`0${Math.floor(timer / 60)}:${
                Math.floor(timer % 60) < 10
                  ? "0" + Math.floor(timer % 60)
                  : Math.floor(timer % 60)
              }`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
