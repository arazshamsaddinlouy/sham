import { Button, ConfigProvider, Form, Input } from "antd";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isUserRegistered } from "../../services/user.service";
import { ShamContext } from "../../App";
import useIsMobile from "../../hooks/useIsMobile";
import { sendOtp } from "../../services/auth.service";

const persianToEnglishDigits = (str: string) => {
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  const englishDigits = "0123456789";
  return str.replace(/[۰-۹]/g, (d) => englishDigits[persianDigits.indexOf(d)]);
};
export default function Login() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [isSubmittable, setIsSubmittable] = useState<boolean>(false);
  // Watch all values
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
    isUserRegistered(mobileNum)
      .then((data) => {
        if (data.status === 200) {
          sendOtp(mobileNum)
            .then((res) => {
              if (res.status === 200) {
                navigate("/login/otp", {
                  state: { mobile: form.getFieldValue("mobile") },
                });
              } else {
                value.setNotif({
                  type: "error",
                  description: "خطا در ارسال پیامک",
                });
              }
            })
            .catch(() => {
              value.setNotif({
                type: "error",
                description: "خطا در ارسال پیامک",
              });
            });
        } else {
          value.setNotif({
            type: "error",
            description: "کاربری با این مشخصات ثبت نام نکرده است",
          });
        }
      })
      .catch(() => {
        value.setNotif({
          type: "error",
          description: "کاربری با این مشخصات ثبت نام نکرده است",
        });
      });
  };
  const isMobile = useIsMobile();
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-350px)]">
      <div
        className={`${
          !isMobile ? "w-[1000px] h-[500px]" : "w-[calc(100vw-20px)] flex-col"
        } flex rounded-[32px] bg-[#f9f9f9] overflow-hidden`}
      >
        <div className={`w-[400px] ${isMobile ? "h-[100px]" : ""} relative`}>
          <div className="h-[100%] w-[100%] bg-[url('/images/login-wallpaper.jpg')] bg-cover bg-center absolute left-[0px] top-[0px]" />
        </div>
        <div
          className={`${isMobile ? "w-[calc(100vw-30px)]" : "w-[600px]"} ${
            isMobile ? "p-[15px]" : "p-[60px]}"
          } h-[400px] flex flex-col justify-center items-center rounded-[16px] p-[10px]`}
        >
          <div className="text-[22px] text-center mt-[20px] mb-[30px]">
            ورود به پنل مدیریت
          </div>
          <Form
            form={form}
            onFinish={onFinish}
            layout="vertical"
            autoComplete="off"
            className="w-full"
          >
            <Form.Item
              name="mobile"
              label="لطفا شماره موبایل را وارد نمایید"
              className="rtl"
              rules={[
                { required: true, message: "شماره موبایل اجباری است" },
                {
                  pattern: /^09\d{9}$/,
                  message: "شماره موبایل صحیح نمیباشد",
                },
              ]}
            >
              <Input
                type="text"
                placeholder="09123456789"
                className="h-[50px]"
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item>
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: "4caf50",
                  },
                }}
              >
                <Button
                  htmlType="submit"
                  className="w-full h-[40px]"
                  type="primary"
                  disabled={!isSubmittable} // Disabled based on form validity
                >
                  ارسال پیامک
                </Button>
              </ConfigProvider>
            </Form.Item>
            <label>
              ثبت نام نکرده اید؟{" "}
              <Link className="text-[#2196f3]" to="/register">
                ثبت نام کنید
              </Link>
            </label>
          </Form>
        </div>
      </div>
    </div>
  );
}
