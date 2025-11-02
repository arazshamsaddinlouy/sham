import { Button, ConfigProvider, Form, Input } from "antd";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isUserRegistered } from "../../services/user.service";
import { ShamContext } from "../../App";
import { sendOtp } from "../../services/auth.service";
import wallpaper from "./login-wallpaper.jpg";
const persianToEnglishDigits = (str: string) => {
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  const englishDigits = "0123456789";
  return str.replace(/[۰-۹]/g, (d) => englishDigits[persianDigits.indexOf(d)]);
};

export default function Login() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [isSubmittable, setIsSubmittable] = useState<boolean>(false);
  const values = Form.useWatch([], form);
  const value: any = useContext(ShamContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const converted = persianToEnglishDigits(e.target.value);
    form.setFieldsValue({ mobile: converted });
  };

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setIsSubmittable(true))
      .catch(() => setIsSubmittable(false));
  }, [form, values]);

  const onFinish = () => {
    const mobileNum = form.getFieldValue("mobile");
    setIsLoading(true);
    isUserRegistered(mobileNum)
      .then((data) => {
        setIsLoading(false);
        if (data.status === 200) {
          sendOtp(mobileNum)
            .then((res) => {
              if (res.status === 200) {
                navigate("/login/otp", { state: { mobile: mobileNum } });
              } else {
                value.setNotif({
                  type: "error",
                  description: "خطا در ارسال پیامک",
                });
              }
            })
            .catch(() => {
              setIsLoading(false);
              value.setNotif({
                type: "error",
                description: "خطا در ارسال پیامک",
              });
            });
        } else {
          setIsLoading(false);
          value.setNotif({
            type: "error",
            description: "کاربری با این مشخصات ثبت نام نکرده است",
          });
        }
      })
      .catch(() => {
        setIsLoading(false);
        value.setNotif({
          type: "error",
          description: "کاربری با این مشخصات ثبت نام نکرده است",
        });
      });
  };

  return (
    <div className="flex items-center relative overflow-hidden justify-center min-h-[calc(100vh-50px)] bg-gray-50 px-4">
      <div className="absolute w-[100vw] left-[0px] top-[0px] h-[100vh] opacity-20">
        <img
          src={"/images/middle-wallpaper.jpg"}
          className="w-full h-full object-cover min-h-[100%]"
        />
      </div>
      <div className="flex bg-[#fff] relative z-[20] flex-col md:flex-row bg-white rounded-[5px] shadow-lg overflow-hidden max-w-4xl w-full">
        {/* Left Image Section */}
        <div
          className="hidden md:block md:w-1/3 bg-cover bg-center"
          style={{ backgroundImage: `url('${wallpaper}')` }}
        />

        {/* Right Form Section */}
        <div className="w-full md:w-2/3 p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">
            ورود به چندکو
          </h2>

          <Form
            form={form}
            onFinish={onFinish}
            layout="vertical"
            autoComplete="off"
            className="w-full"
          >
            <Form.Item
              name="mobile"
              label="شماره موبایل"
              rules={[
                { required: true, message: "شماره موبایل اجباری است" },
                {
                  pattern: /^09\d{9}$/,
                  message: "شماره موبایل صحیح نمیباشد",
                },
              ]}
            >
              <Input
                placeholder="09123456789"
                className="h-12 rounded-lg border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                onChange={handleChange}
                type="number"
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
                  loading={isLoading}
                  htmlType="submit"
                  className="w-full h-12 rounded-lg text-white font-medium"
                  type="primary"
                  disabled={!isSubmittable}
                >
                  ارسال پیامک
                </Button>
              </ConfigProvider>
            </Form.Item>
          </Form>

          <p className="text-center text-sm mt-4 text-gray-500">
            ثبت نام نکرده اید؟{" "}
            <Link className="text-blue-500 font-medium" to="/register">
              ثبت نام کنید
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
