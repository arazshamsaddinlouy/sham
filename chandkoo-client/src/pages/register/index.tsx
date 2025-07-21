import { Modal, Form, Select, ConfigProvider, Button, Alert } from "antd";
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
import useIsMobile from "../../hooks/useIsMobile";
import { sendOtp } from "../../services/auth.service";
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
  const handleCityCheck = () => {
    const city = cityList.find(
      (el) => el.id == form.getFieldValue("city")
    ).name;
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
  };
  useEffect(() => {
    if (isMapTouched) {
      handleCityCheck();
    }
  }, [isMapTouched, latLng, selectedCity, cityName]);
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
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
      });
  };
  useEffect(() => {
    getAllProvinces().then((data) => {
      setProvinces(data.data);
    });
    getLocation();
  }, []);
  const isMobile = useIsMobile();
  return (
    <div
      className={`container mx-auto flex ${
        isMobile ? "flex-col" : ""
      } justify-center items-center min-h-[calc(100vh-350px)]`}
    >
      <div
        className={`flex ${
          !isMobile ? "w-[1000px]" : "w-[calc(100vw-30px)] flex-col"
        } h-[700px] rounded-[32px] bg-[#f9f9f9] overflow-hidden mb-[40px]`}
      >
        <div
          className={`${
            isMobile ? "w-[calc(100vw-30px)] h-[100px]" : "w-[400px]"
          } relative`}
        >
          <div className="h-[100%] w-[100%] bg-[url('/images/login-wallpaper.jpg')] bg-cover bg-center absolute left-[0px] top-[0px]" />
        </div>
        <div
          className={`${
            isMobile ? "w-[calc(100vw-30px)]" : "w-[600px]"
          } overflow-auto p-[15px_15px] h-[700px] flex flex-col items-center rounded-[16px] p-[10px]`}
        >
          <div className="text-[22px] text-center mt-[0px] mb-[30px]">
            ثبت نام
          </div>
          <Form
            form={form}
            layout={"vertical"}
            className="w-full mx-auto p-[0px_5px]"
          >
            <div className="flex gap-[15px]">
              <div className="flex-1">
                <div className="flex w-full mb-[20px] bg-[#fff] p-[10px] rounded-[8px] border-[1px] border-[#f0f0f0] relative overflow-hidden">
                  <div
                    className={`bg-[rgb(37,99,235)] transition-all w-[50%] h-[42px] rounded-[8px] absolute top-[0px] ${
                      registerType === 0 ? "right-[0px]" : "right-[50%]"
                    }`}
                  />
                  <div
                    onClick={() => setRegisterType(0)}
                    className={`flex-1 relative z-[2] cursor-pointer text-center ${
                      registerType === 0 ? "text-[#fff]" : "text-[#000]"
                    }`}
                  >
                    فروشنده هستم
                  </div>
                  <div
                    onClick={() => setRegisterType(1)}
                    className={`flex-1 relative z-[2] cursor-pointer text-center ${
                      registerType === 1 ? "text-[#fff]" : "text-[#000]"
                    }`}
                  >
                    خریدار هستم
                  </div>
                </div>
              </div>
            </div>
            {form.getFieldValue("customer_type") == "0" && (
              <div className="mt-[0px] mb-[20px]">
                <Alert
                  message="بعد از ثبت نام میتوانید تنظیمات مربوط به غرفه را در پروفایل خود انجام دهید"
                  type="info"
                  showIcon
                />
              </div>
            )}
            <div className="flex gap-[15px]">
              <div className="flex-1">
                <Form.Item
                  name="first_name"
                  label="نام"
                  className="rtl"
                  rules={[
                    { required: true, message: "نام اجباری است" },
                    {
                      pattern: /^[\u0600-\u06FF\s]+$/,
                      message: "نام صحیح نیست",
                    },
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="مثال: محمد"
                    className="h-[40px]"
                  />
                </Form.Item>
              </div>
              <div className="flex-1">
                <Form.Item
                  name="last_name"
                  label="نام خانوادگی"
                  className="rtl"
                  rules={[
                    { required: true, message: "نام خانوادگی اجباری است" },
                    {
                      pattern: /^[\u0600-\u06FF\s]+$/,
                      message: "نام خانوادگی صحیح نیست",
                    },
                  ]}
                >
                  <Input
                    name="last_name"
                    type="text"
                    placeholder="مثال: محمدی"
                    className="h-[40px]"
                  />
                </Form.Item>
              </div>
            </div>
            <div className="flex  gap-[15px]">
              <div className="flex-1">
                <Form.Item
                  name="telephone"
                  label="شماره تلفن ثابت"
                  className="rtl"
                  rules={[
                    {
                      pattern: /^\d{0,}$/,
                      message: "شماره تلفن ثابت فقط شامل رقم باید باشد",
                    },
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="مثال: 021221122"
                    className="h-[40px]"
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
              </div>
              <div className="flex-1">
                <Form.Item
                  name="mobile"
                  label="شماره موبایل"
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
                    className="h-[40px]"
                    onChange={(e) => {
                      const persianToEnglish = (str: string) =>
                        str.replace(/[\u06F0-\u06F9]/g, (d) =>
                          String.fromCharCode(d.charCodeAt(0) - 1728)
                        );
                      const converted = persianToEnglish(e.target.value);
                      // set the converted value back into the form
                      form.setFieldValue("mobile", converted);
                    }}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="flex  gap-[15px]">
              <div className="flex-1">
                <Form.Item
                  name="province"
                  label="استان"
                  className="rtl"
                  rules={[{ required: true, message: "استان اجباری است" }]}
                >
                  <Select
                    onChange={(provinceId: string) => {
                      form.setFieldValue("city", "");
                      if (provinceId) {
                        fetchCities(provinceId);
                      } else {
                        setCities([]);
                      }
                    }}
                    className="h-[40px]"
                  >
                    <option value={""}> </option>
                    {provinces.map((province) => (
                      <Select.Option value={province.id}>
                        {province.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              <div className="flex-1">
                <Form.Item
                  name="city"
                  label="شهر"
                  className="rtl"
                  rules={[{ required: true, message: "شهر اجباری است" }]}
                >
                  <Select
                    disabled={cities.length === 0}
                    className="h-[40px]"
                    onChange={(c: string) => {
                      const cit = cities.find((el) => el.id == c);
                      setLatLng({ lat: cit.lat, lng: cit.lng });
                      setSelectedCity(c);
                    }}
                  >
                    <Select.Option value={""}> </Select.Option>
                    {cities.map((city) => (
                      <Select.Option value={city.id}>{city.name}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            </div>
            <div className="flex  gap-[15px]">
              <div className="flex-1">
                <Form.Item
                  name="address"
                  label="آدرس "
                  className="rtl"
                  rules={[{ required: true, message: "آدرس اجباری است" }]}
                >
                  <TextArea
                    name="address"
                    placeholder="مثال : تهران - پاسداران ..."
                    rows={5}
                    style={{ resize: "none" }}
                  ></TextArea>
                </Form.Item>
              </div>
            </div>
            <div className="flex  gap-[15px]">
              <div className="flex-1">
                <Form.Item
                  name="postalCode"
                  label="کد پستی"
                  className="rtl"
                  rules={[
                    {
                      pattern: /^\d{5,}$/,
                      message: "کد پستی صحیح نمیباشد",
                    },
                  ]}
                >
                  <Input
                    name="postalCode"
                    placeholder="مثال: 1111111111"
                    className="h-[40px]"
                  />
                </Form.Item>
              </div>
            </div>
            <div className="flex gap-[15px] h-[450px] overflow-hidden mb-[30px]">
              <div className="flex-1">
                <label className="text-[13px] text-[#444] block">
                  آدرس روی نقشه
                </label>
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
                  onClick={() => {
                    const mobile = form.getFieldValue("mobile");
                    sendOtp(mobile)
                      .then((res) => {
                        if (res.status === 200) {
                          value.setNotif({
                            type: "success",
                            description: "کد پیامک شد",
                          });
                          setIsModalOpen(true);
                        } else {
                          value.setNotif({
                            type: "error",
                            description: "خطا در ارسال کد",
                          });
                        }
                      })
                      .catch(() => {
                        value.setNotif({
                          type: "error",
                          description: "خطا در ارسال کد",
                        });
                      });
                  }}
                  htmlType="submit"
                  className="w-full h-[40px]"
                  type="primary"
                  disabled={!isSubmittable || !isMapTouched}
                >
                  ثبت نام
                </Button>
              </ConfigProvider>
            </Form.Item>
          </Form>
        </div>
      </div>
      <Modal open={isModalOpen} onOk={handleSubmit} onCancel={handleCancel}>
        <div className="flex  gap-[15px] overflow-hidden">
          <div className="flex-1">
            <label className="text-[13px] text-[#444] block mb-[10px]">
              پیامک وارد شده را وارد نمایید
            </label>
            <div>
              <Flex
                gap="middle"
                className="w-full ltr"
                align="flex-start"
                vertical
              >
                <InputOTP
                  length={5}
                  autoSubmit={form}
                  value={otp}
                  onChange={setOtp}
                  inputType="numeric"
                />
              </Flex>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
