import {
  Modal,
  Form,
  Select,
  ConfigProvider,
  Button,
  Alert,
  Steps,
  Card,
  message,
} from "antd";
import { Status, Wrapper } from "@googlemaps/react-wrapper";
import MapComponent from "../../components/google-map";
import { useCallback, useContext, useEffect, useState } from "react";
import { Flex, Input } from "antd";
import { getAllProvinces } from "../../services/province.service";
import { getAllCity } from "../../services/city.service";
import { addUser } from "../../services/user.service";
import { ShamContext } from "../../App";
import { useNavigate } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import { convertLocationToAddress } from "../../services/map.service";
import { InputOTP } from "antd-input-otp";
import { sendOtp } from "../../services/auth.service";
import {
  UserOutlined,
  SafetyCertificateOutlined,
  ShopOutlined,
  CustomerServiceOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";

let cityList: any[] = [];

export default function Register() {
  const value: any = useContext(ShamContext);
  const [cityName, setCityName] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const render = (status: Status) => <h1>{status}</h1>;
  const [isMapTouched, setIsMapTouched] = useState<boolean>(false);
  const [provinces, setProvinces] = useState<any[]>([]);
  const [registerType, setRegisterType] = useState<0 | 1>(0);
  const [latLng, setLatLng] = useState<{
    lng: number | null;
    lat: number | null;
  }>({ lat: 35.6892, lng: 51.389 });
  const [otp, setOtp] = useState<string[]>([]);
  const [isSubmittable, setSubmittable] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [otpCountdown, setOtpCountdown] = useState(0);

  const [form] = Form.useForm();
  const values = Form.useWatch([], form);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => {
        if (latLng.lat && latLng.lng) {
          setSubmittable(true);
        } else {
          setSubmittable(false);
        }
      })
      .catch((errors) => {
        console.log(errors);
        setSubmittable(false);
      });
  }, [form, values]);

  const [cities, setCities] = useState<any[]>([]);
  const navigate = useNavigate();
  const [_error, setError] = useState<string | null>(null);

  // OTP Countdown timer
  useEffect(() => {
    if (otpCountdown > 0) {
      const timer = setTimeout(() => setOtpCountdown(otpCountdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [otpCountdown]);

  const handleCityCheck = () => {
    const city = cityList.find(
      (el) => el.id == form.getFieldValue("city")
    )?.name;
    if (cityName !== city) {
      setSubmittable(false);
      value.setNotif({
        type: "error",
        description: "شهر انتخابی با لوکیشن انتخابی یکی نمیباشد",
      });
    }
  };

  const getLocation = () => {
    if (!navigator.geolocation) {
      value.setNotif({
        type: "error",
        description: "Geolocation is not supported by your browser",
      });
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        const { latitude, longitude } = position.coords;
        setLatLng({ lat: latitude, lng: longitude });
        setError(null);
      },
      (error: GeolocationPositionError) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            break;
          case error.POSITION_UNAVAILABLE:
            break;
          case error.TIMEOUT:
            break;
          default:
            break;
        }
      }
    );
  };

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const fetchCities = useCallback((province_id: string) => {
    getAllCity(province_id).then((data) => {
      setCities(data.data.cities);
      cityList = data.data.cities;
    });
  }, []);

  const handleCancel = () => {
    setIsModalOpen(false);
    setCurrentStep(0);
  };

  useEffect(() => {
    if (isMapTouched) {
      handleCityCheck();
    }
  }, [isMapTouched, latLng, selectedCity, cityName]);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const payload = form.getFieldsValue();
    addUser({
      ...payload,
      lat: latLng.lat,
      lng: latLng.lng,
      otp: otp.join(""),
      customer_type: registerType,
    })
      .then((data) => {
        if (data.status == 200) {
          localStorage.setItem("accessToken", data.data.accessToken);
          localStorage.setItem("refreshToken", data.data.refreshToken);
          value.setNotif({ type: "success", description: "ورود با موفقیت" });
          navigate("/dashboard");
        } else {
          value.setNotif({
            type: "error",
            description: data?.data?.message,
          });
        }
      })
      .catch((e) => {
        value.setNotif({
          type: "error",
          description: e?.response?.data?.message,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSendOtp = () => {
    const mobile = form.getFieldValue("mobile");
    if (!mobile || !/^09\d{9}$/.test(mobile)) {
      message.error("لطفا شماره موبایل معتبر وارد کنید");
      return;
    }

    setIsLoading(true);
    sendOtp(mobile)
      .then((res) => {
        if (res.status === 200) {
          message.success("کد تأیید پیامک شد");
          setIsModalOpen(true);
          setOtpCountdown(120); // 2 minutes countdown
          setCurrentStep(1);
        } else {
          message.error("خطا در ارسال کد");
        }
      })
      .catch(() => {
        message.error("خطا در ارسال کد");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getAllProvinces().then((data) => {
      setProvinces(data.data);
    });
    getLocation();
  }, []);

  const steps = [
    {
      title: "اطلاعات شخصی",
      icon: <UserOutlined />,
    },
    {
      title: "تأیید شماره",
      icon: <SafetyCertificateOutlined />,
    },
  ];

  const UserTypeCard = ({
    title,
    description,
    icon,
    isSelected,
    onClick,
  }: any) => (
    <Card
      className={`cursor-pointer transition-all duration-300 border-2 ${
        isSelected
          ? "border-blue-500 bg-blue-50 shadow-lg"
          : "border-gray-200 hover:border-gray-300 hover:shadow-md"
      }`}
      onClick={onClick}
    >
      <div className="text-center">
        <div className="text-2xl mb-3 text-blue-500">{icon}</div>
        <h3 className="font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
      </div>
    </Card>
  );

  return (
    <div className="flex items-center relative overflow-hidden pt-[90px] min-h-[calc(100vh-90px)] justify-center bg-gray-50 px-4 py-8">
      <div className="absolute w-[100vw] left-[0px] top-[0px] h-[100vh] opacity-20">
        <img
          src={"/images/middle-wallpaper.jpg"}
          className="w-full h-full object-cover min-h-[100%]"
        />
      </div>

      <div className="flex bg-[#fff] relative z-[20] flex-col md:flex-row bg-white rounded-[12px] shadow-xl overflow-hidden max-w-[1000px] w-full">
        {/* Left Image Section - Kept same as original */}
        <div
          className="hidden md:block md:w-2/5 bg-cover bg-center"
          style={{ backgroundImage: "url(/images/middle-wallpaper.jpg)" }}
        ></div>

        {/* Right Form Section */}
        <div className="w-full md:w-3/5 p-6 md:p-8 flex flex-col justify-center">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              ثبت نام در سامانه
            </h2>
            <p className="text-gray-600">لطفا اطلاعات خود را وارد کنید</p>
          </div>

          <Steps
            current={currentStep}
            items={steps}
            className="mb-8"
            responsive={false}
          />

          <Form
            form={form}
            layout={"vertical"}
            className="w-full mx-auto"
            size="large"
          >
            {/* User Type Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                نوع حساب
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <UserTypeCard
                  type={0}
                  title="فروشنده"
                  description="برای ثبت محصولات و ایجاد غرفه فروش"
                  icon={<ShopOutlined />}
                  isSelected={registerType === 0}
                  onClick={() => setRegisterType(0)}
                />
                <UserTypeCard
                  type={1}
                  title="خریدار"
                  description="برای جستجو و خرید محصولات"
                  icon={<CustomerServiceOutlined />}
                  isSelected={registerType === 1}
                  onClick={() => setRegisterType(1)}
                />
              </div>
            </div>

            {registerType === 0 && (
              <div className="mb-6">
                <Alert
                  message="بعد از ثبت نام میتوانید تنظیمات مربوط به غرفه را در پروفایل خود انجام دهید"
                  type="info"
                  showIcon
                  className="rounded-lg"
                />
              </div>
            )}

            {/* Personal Information */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Item
                  name="first_name"
                  label="نام"
                  rules={[
                    { required: true, message: "نام اجباری است" },
                    {
                      pattern: /^[\u0600-\u06FF\s]+$/,
                      message: "نام صحیح نیست",
                    },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined className="text-gray-400" />}
                    placeholder="مثال: محمد"
                    className="rounded-lg"
                  />
                </Form.Item>

                <Form.Item
                  name="last_name"
                  label="نام خانوادگی"
                  rules={[
                    { required: true, message: "نام خانوادگی اجباری است" },
                    {
                      pattern: /^[\u0600-\u06FF\s]+$/,
                      message: "نام خانوادگی صحیح نیست",
                    },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined className="text-gray-400" />}
                    placeholder="مثال: محمدی"
                    className="rounded-lg"
                  />
                </Form.Item>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Item
                  name="telephone"
                  label="شماره تلفن ثابت"
                  rules={[
                    {
                      pattern: /^\d{0,}$/,
                      message: "شماره تلفن ثابت فقط شامل رقم باید باشد",
                    },
                  ]}
                >
                  <Input
                    placeholder="مثال: 021221122"
                    className="rounded-lg"
                    onChange={(e) => {
                      const persianToEnglish = (str: string) =>
                        str.replace(/[\u06F0-\u06F9]/g, (d) =>
                          String.fromCharCode(d.charCodeAt(0) - 1728)
                        );
                      const converted = persianToEnglish(e.target.value);
                      form.setFieldsValue({ telephone: converted });
                    }}
                  />
                </Form.Item>

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
                    className="rounded-lg"
                    onChange={(e) => {
                      const persianToEnglish = (str: string) =>
                        str.replace(/[\u06F0-\u06F9]/g, (d) =>
                          String.fromCharCode(d.charCodeAt(0) - 1728)
                        );
                      const converted = persianToEnglish(e.target.value);
                      form.setFieldValue("mobile", converted);
                    }}
                  />
                </Form.Item>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Item
                  name="province"
                  label="استان"
                  rules={[{ required: true, message: "استان اجباری است" }]}
                >
                  <Select
                    placeholder="انتخاب استان"
                    onChange={(provinceId: string) => {
                      form.setFieldValue("city", "");
                      if (provinceId) {
                        fetchCities(provinceId);
                      } else {
                        setCities([]);
                      }
                    }}
                    className="rounded-lg"
                  >
                    {provinces.map((province) => (
                      <Select.Option key={province.id} value={province.id}>
                        {province.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="city"
                  label="شهر"
                  rules={[{ required: true, message: "شهر اجباری است" }]}
                >
                  <Select
                    disabled={cities.length === 0}
                    placeholder={
                      cities.length === 0
                        ? "ابتدا استان انتخاب کنید"
                        : "انتخاب شهر"
                    }
                    className="rounded-lg"
                    onChange={(c: string) => {
                      const cit = cities.find((el) => el.id == c);
                      setLatLng({ lat: cit.lat, lng: cit.lng });
                      setSelectedCity(c);
                    }}
                  >
                    {cities.map((city) => (
                      <Select.Option key={city.id} value={city.id}>
                        {city.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>

              <Form.Item
                name="address"
                label="آدرس"
                rules={[{ required: true, message: "آدرس اجباری است" }]}
              >
                <TextArea
                  placeholder="مثال: تهران - پاسداران ..."
                  rows={3}
                  style={{ resize: "none" }}
                  className="rounded-lg"
                />
              </Form.Item>

              <Form.Item
                name="postalCode"
                label="کد پستی"
                rules={[
                  {
                    pattern: /^\d{5,}$/,
                    message: "کد پستی صحیح نمیباشد",
                  },
                ]}
              >
                <Input placeholder="مثال: 1111111111" className="rounded-lg" />
              </Form.Item>
            </div>

            {/* Map Section */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                <EnvironmentOutlined className="ml-1" />
                موقعیت روی نقشه
              </label>
              <div className="h-[300px] rounded-lg overflow-hidden border border-gray-200">
                <Wrapper
                  apiKey={"AIzaSyAtOnE4vyEvfJxG268WbsUlK9EphptwyWo"}
                  render={render}
                >
                  <MapComponent
                    initialLatLng={latLng}
                    handleLatLngChange={(lat: number, lng: number) => {
                      convertLocationToAddress(lat, lng).then(function (data) {
                        setCityName(data.data.city);
                        setLatLng({ lat: lat, lng: lng });
                        setIsMapTouched(true);
                      });
                    }}
                  />
                </Wrapper>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-500">
                  موقعیت خود را روی نقشه مشخص کنید
                </span>
                <Button
                  type="link"
                  size="small"
                  onClick={getLocation}
                  icon={<EnvironmentOutlined />}
                >
                  موقعیت فعلی
                </Button>
              </div>
            </div>

            <Form.Item>
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: "#4caf50",
                  },
                }}
              >
                <Button
                  onClick={handleSendOtp}
                  htmlType="button"
                  className="w-full h-[45px] rounded-lg font-semibold"
                  type="primary"
                  disabled={!isSubmittable || !isMapTouched || isLoading}
                  loading={isLoading}
                  size="large"
                >
                  {isLoading ? "در حال ارسال کد..." : "ارسال کد تأیید"}
                </Button>
              </ConfigProvider>
            </Form.Item>
          </Form>
        </div>
      </div>

      {/* OTP Modal */}
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        centered
        title={
          <div className="text-center">
            <SafetyCertificateOutlined className="text-blue-500 text-xl mr-2" />
            تأیید شماره موبایل
          </div>
        }
        className="rounded-lg"
      >
        <div className="text-center mb-6">
          <p className="text-gray-600 mb-4">
            کد تأیید به شماره <strong>{form.getFieldValue("mobile")}</strong>{" "}
            ارسال شد
          </p>

          <Flex justify="center" className="mb-4">
            <InputOTP
              length={5}
              value={otp}
              onChange={setOtp}
              inputType="numeric"
              autoFocus
              size="large"
              inputClassName="!w-12 !h-12 text-lg font-semibold"
            />
          </Flex>

          {otpCountdown > 0 ? (
            <p className="text-orange-500 text-sm">
              {Math.floor(otpCountdown / 60)}:
              {String(otpCountdown % 60).padStart(2, "0")}
              زمان باقیمانده
            </p>
          ) : (
            <Button type="link" onClick={handleSendOtp} className="p-0">
              ارسال مجدد کد
            </Button>
          )}
        </div>

        <div className="flex gap-3">
          <Button onClick={handleCancel} className="flex-1" size="large">
            بازگشت
          </Button>
          <Button
            onClick={handleSubmit}
            type="primary"
            className="flex-1"
            size="large"
            loading={isLoading}
            disabled={otp.join("").length !== 5}
          >
            تأیید و ثبت نام
          </Button>
        </div>
      </Modal>
    </div>
  );
}
