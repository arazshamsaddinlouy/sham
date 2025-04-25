import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginService } from "../../services/auth.service";
import { useContext, useEffect, useState } from "react";
import { ShamContext } from "../../App";
import { InputOTP } from "antd-input-otp";
import { Button, ConfigProvider, Form } from "antd";

export default function LoginOtp() {
  const [form] = Form.useForm();
  const [otp, setOtp] = useState<string[]>([]); // Since the value will be array of string, the default value of state is empty array.
  const value: any = useContext(ShamContext);
  const navigate = useNavigate();
  const location = useLocation();
  const onFinish = () => {
    loginService(location.state.mobile, otp.join(""))
      .then((data) => {
        if (data.status == 200) {
          window.localStorage.setItem("accessToken", data.data.accessToken);
          window.localStorage.setItem("refreshToken", data.data.refreshToken);
          value.setNotif({ type: "success", description: "ورود با موفقیت" });
          navigate("/dashboard");
        } else if (data.status === 401) {
          value.setNotif({ type: "error", description: "نام کاربری اشتباه" });
        } else {
          value.setNotif({
            type: "error",
            description: "خطا در ارسال اطلاعات",
          });
        }
      })
      .catch((e) => {
        if (e.status === 401) {
          value.setNotif({
            type: "error",
            description: e.response.data.message,
          });
        }
      });
  };
  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onFinish();
  };
  useEffect(() => {
    if (!location?.state?.mobile) {
      navigate("/login");
    }
  }, [location.state]);
  return (
    <div className="container mx-auto flex justify-center items-center min-h-[calc(100vh-350px)]">
      <div className="w-[1000px] h-[400px] flex rounded-[32px] bg-[#f9f9f9] overflow-hidden">
        <div className="w-[400px] relative">
          <div className="h-[100%] w-[100%] bg-[url('/images/login-wallpaper.jpg')] bg-cover bg-center absolute left-[0px] top-[0px]" />
        </div>
        <div className="w-[600px] p-[60px] h-[400px] flex flex-col justify-center items-center rounded-[16px] p-[10px]">
          <div className="text-[22px] text-center mt-[20px] mb-[30px]">
            ورود به پنل مدیریت
          </div>
          <form className="w-full mx-auto p-[0px_60px]">
            <Form onFinish={onFinish} form={form} layout="vertical">
              <Form.Item
                name="otp"
                label={`کد پیامک شده به ${location?.state?.mobile} را وارد نمایید`}
                className="rtl"
              >
                <InputOTP
                  length={5}
                  autoSubmit={form}
                  value={otp}
                  onChange={setOtp}
                  inputType="numeric"
                />
              </Form.Item>

              <Form.Item>
                <ConfigProvider
                  theme={{
                    token: {
                      colorPrimary: "#4caf50",
                    },
                  }}
                >
                  <Button
                    onClick={handleSubmit}
                    htmlType="submit"
                    className="w-full h-[40px]"
                    type="primary"
                    disabled={otp.length < 5}
                  >
                    ورود به سامانه
                  </Button>
                </ConfigProvider>
              </Form.Item>
            </Form>
            <div className="flex justify-between">
              <div className="text-left text-[#2196f3] text-[11px] mt-[20px]">
                <Link to={"/login"}>اصلاح شماره موبایل</Link>
              </div>
              <div className="text-left text-[#222] text-[11px] mt-[20px]">
                زمان باقیمانده : ۲:۰۰
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
