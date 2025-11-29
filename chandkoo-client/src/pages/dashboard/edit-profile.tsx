import {
  Button,
  ConfigProvider,
  Form,
  Input,
  Select,
  Card,
  Steps,
  Spin,
  Alert,
} from "antd";
import { useCallback, useContext, useEffect, useState } from "react";
import { getAllCity } from "../../services/city.service";
import { getAllProvinces } from "../../services/province.service";
import { ShamContext } from "../../App";
import TextArea from "antd/es/input/TextArea";
import { Status, Wrapper } from "@googlemaps/react-wrapper";
import MapComponent from "../../components/google-map";
import { convertLocationToAddress } from "../../services/map.service";
import { editUserInfo, getEditUserInfo } from "../../services/user.service";
import { useNavigate } from "react-router-dom";
import {
  UserOutlined,
  EnvironmentOutlined,
  HomeOutlined,
  PhoneOutlined,
  EditOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

let cityList: any[] = [];

export default function EditProfile() {
  const navigate = useNavigate();
  const [cityName, setCityName] = useState<string>("");
  const [cityMatche, setCityMatched] = useState<boolean>(true);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const render = (status: Status) => <h1>{status}</h1>;
  const value: any = useContext(ShamContext);
  const [cities, setCities] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({}); // Store all form data

  const fetchCities = useCallback((province_id: string) => {
    getAllCity(province_id).then((data) => {
      setCities(data.data.cities);
      cityList = data.data.cities;
      const cityId = form.getFieldValue("city");
      if (cityId) {
        const selectedCity = cityList.find((el) => el.id === cityId);
        if (selectedCity) {
          setCityName(selectedCity.name);
        }
      }
    });
  }, []);

  const handleCityCheck = () => {
    try {
      const city = cityList.find(
        (el) => el.id == form.getFieldValue("city")
      )?.name;
      if (cityName && city) {
        if (cityName !== city) {
          setCityMatched(false);
          setSubmittable(false);
          value.setNotif({
            type: "error",
            description: "شهر انتخابی با لوکیشن انتخابی یکی نمیباشد",
          });
        } else {
          setCityMatched(true);
        }
      } else {
        setCityMatched(true);
      }
    } catch (e) {
      setCityMatched(true);
    }
  };

  // Update form data whenever form values change
  const handleFormChange = useCallback(
    (_changedValues: any, allValues: any) => {
      setFormData((prev) => ({ ...prev, ...allValues }));
    },
    []
  );

  const handleEdit = async () => {
    setIsSubmitting(true);
    try {
      // Get all current form values
      const currentFormValues = form.getFieldsValue();
      const allData = { ...formData, ...currentFormValues };

      const payload = {
        ...allData,
        lat: latLng.lat,
        lng: latLng.lng,
      };

      const data = await editUserInfo(payload);
      if (data.status === 200) {
        value.setNotif({
          type: "success",
          description: "اطلاعات پروفایل با موفقیت ویرایش شد",
        });
        navigate("/dashboard");
      } else {
        value.setNotif({
          type: "error",
          description: "خطا در ویرایش اطلاعات",
        });
      }
    } catch (error) {
      value.setNotif({
        type: "error",
        description: "خطا در ویرایش اطلاعات",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const [isMapTouched, setIsMapTouched] = useState<boolean>(false);
  const [provinces, setProvinces] = useState<any[]>([]);
  const [submittable, setSubmittable] = useState<boolean>(false);
  const [form] = Form.useForm();
  const values = Form.useWatch([], form);
  const [latLng, setLatLng] = useState<{
    lat: number | null;
    lng: number | null;
  }>({ lat: 35.6892, lng: 51.389 });

  // Handle step navigation
  const handleNextStep = async () => {
    try {
      // Validate current step fields
      const fieldsToValidate =
        currentStep === 0
          ? ["first_name", "last_name"]
          : ["province", "city", "address"];

      await form.validateFields(fieldsToValidate);

      // Update form data before moving to next step
      const currentValues = form.getFieldsValue();
      setFormData((prev) => ({ ...prev, ...currentValues }));

      setCurrentStep(currentStep + 1);
    } catch (error) {
      value.setNotif({
        type: "error",
        description: "لطفا تمام فیلدهای ضروری را پر کنید",
      });
    }
  };

  const handlePrevStep = () => {
    // Update form data before moving to previous step
    const currentValues = form.getFieldsValue();
    setFormData((prev) => ({ ...prev, ...currentValues }));
    setCurrentStep(currentStep - 1);
  };

  useEffect(() => {
    const loadUserData = async () => {
      setIsLoading(true);
      try {
        const [provincesData, userInfo] = await Promise.all([
          getAllProvinces(),
          getEditUserInfo(),
        ]);

        setProvinces(provincesData.data);
        const userData = userInfo.data;

        const initialFormData = {
          ...userData,
          telephone: userData.phone_number,
          province: userData.provinceId,
          city: userData.cityId,
        };

        form.setFieldsValue(initialFormData);
        setFormData(initialFormData);

        setLatLng({ lat: userData.lat, lng: userData.lng });

        if (userData.provinceId) {
          fetchCities(userData.provinceId);
        }

        await form.validateFields({ recursive: true });
      } catch (error) {
        value.setNotif({
          type: "error",
          description: "خطا در بارگذاری اطلاعات کاربر",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, []);

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
      .catch(() => setSubmittable(false));
  }, [form, values]);

  useEffect(() => {
    handleCityCheck();
  }, [isMapTouched, latLng, selectedCity, cityName]);

  const steps = [
    {
      title: "اطلاعات شخصی",
      icon: <UserOutlined />,
    },
    {
      title: "آدرس و موقعیت",
      icon: <EnvironmentOutlined />,
    },
  ];

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      value.setNotif({
        type: "error",
        description: "مرورگر شما از سرویس موقعیت‌یابی پشتیبانی نمی‌کند",
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        const { latitude, longitude } = position.coords;
        setLatLng({ lat: latitude, lng: longitude });
        convertLocationToAddress(latitude, longitude).then(function (data) {
          setCityName(data.data.city);
          setIsMapTouched(true);
        });
      },
      (_: GeolocationPositionError) => {
        value.setNotif({
          type: "error",
          description: "خطا در دریافت موقعیت فعلی",
        });
      }
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spin size="large" tip="در حال بارگذاری اطلاعات..." />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          <EditOutlined className="ml-2 text-blue-500" />
          ویرایش پروفایل
        </h1>
        <p className="text-gray-600">
          اطلاعات شخصی و آدرس خود را به روز رسانی کنید
        </p>
      </div>

      {/* Progress Steps */}
      <Steps
        current={currentStep}
        items={steps}
        className="mb-8"
        responsive={false}
      />

      <Card
        className="shadow-lg border-0 rounded-xl"
        bodyStyle={{ padding: "32px" }}
      >
        <Form
          form={form}
          layout="vertical"
          className="w-full"
          size="large"
          onValuesChange={handleFormChange}
        >
          {currentStep === 0 && (
            <div className="space-y-6">
              {/* Personal Information Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Form.Item
                  name="first_name"
                  label={
                    <span className="font-semibold text-gray-700">
                      <UserOutlined className="ml-1" />
                      نام
                    </span>
                  }
                  rules={[
                    { required: true, message: "لطفا نام خود را وارد کنید" },
                    {
                      pattern: /^[\u0600-\u06FF\s]+$/,
                      message: "نام باید به فارسی وارد شود",
                    },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined className="text-gray-400" />}
                    placeholder="مثال: محمد"
                    className="rounded-lg h-12"
                  />
                </Form.Item>

                <Form.Item
                  name="last_name"
                  label={
                    <span className="font-semibold text-gray-700">
                      نام خانوادگی
                    </span>
                  }
                  rules={[
                    {
                      required: true,
                      message: "لطفا نام خانوادگی خود را وارد کنید",
                    },
                    {
                      pattern: /^[\u0600-\u06FF\s]+$/,
                      message: "نام خانوادگی باید به فارسی وارد شود",
                    },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined className="text-gray-400" />}
                    placeholder="مثال: محمدی"
                    className="rounded-lg h-12"
                  />
                </Form.Item>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Form.Item
                  name="telephone"
                  label={
                    <span className="font-semibold text-gray-700">
                      <PhoneOutlined className="ml-1" />
                      شماره تلفن ثابت
                    </span>
                  }
                  rules={[
                    {
                      pattern: /^\d{0,}$/,
                      message: "شماره تلفن باید فقط شامل اعداد باشد",
                    },
                  ]}
                >
                  <Input
                    prefix={<PhoneOutlined className="text-gray-400" />}
                    placeholder="مثال: 021221122"
                    className="rounded-lg h-12"
                  />
                </Form.Item>

                <Form.Item
                  name="postalCode"
                  label={
                    <span className="font-semibold text-gray-700">کد پستی</span>
                  }
                  rules={[
                    {
                      pattern: /^\d{5,}$/,
                      message: "کد پستی باید حداقل ۵ رقم باشد",
                    },
                  ]}
                >
                  <Input
                    placeholder="مثال: 1111111111"
                    className="rounded-lg h-12"
                  />
                </Form.Item>
              </div>

              {/* Navigation Buttons for Step 1 */}
              <div className="flex justify-end pt-4">
                <Button
                  type="primary"
                  size="large"
                  className="rounded-lg px-8 h-12"
                  onClick={handleNextStep}
                >
                  مرحله بعد
                  <EnvironmentOutlined className="mr-2" />
                </Button>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-6">
              {/* Location Information Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Form.Item
                  name="province"
                  label={
                    <span className="font-semibold text-gray-700">استان</span>
                  }
                  rules={[
                    {
                      required: true,
                      message: "لطفا استان خود را انتخاب کنید",
                    },
                  ]}
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
                    className="rounded-lg h-12"
                    suffixIcon={<EnvironmentOutlined />}
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
                  label={
                    <span className="font-semibold text-gray-700">شهر</span>
                  }
                  rules={[
                    { required: true, message: "لطفا شهر خود را انتخاب کنید" },
                  ]}
                >
                  <Select
                    disabled={cities.length === 0}
                    placeholder={
                      cities.length === 0
                        ? "ابتدا استان انتخاب کنید"
                        : "انتخاب شهر"
                    }
                    className="rounded-lg h-12"
                    suffixIcon={<HomeOutlined />}
                    onChange={(c: string) => {
                      const selected = cities.find((el) => el.id == c);
                      if (selected) {
                        setLatLng({ lat: selected.lat, lng: selected.lng });
                        setSelectedCity(c);
                      }
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
                label={
                  <span className="font-semibold text-gray-700">
                    <HomeOutlined className="ml-1" />
                    آدرس دقیق
                  </span>
                }
                rules={[
                  {
                    required: true,
                    message: "لطفا آدرس دقیق خود را وارد کنید",
                  },
                ]}
              >
                <TextArea
                  placeholder="مثال: تهران - پاسداران - خیابان نگار - پلاک ۱۲"
                  rows={4}
                  style={{ resize: "none" }}
                  className="rounded-lg"
                />
              </Form.Item>

              {/* Map Section */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="font-semibold text-gray-700">
                    <EnvironmentOutlined className="ml-1" />
                    موقعیت روی نقشه
                  </label>
                  <Button
                    type="link"
                    size="small"
                    onClick={getCurrentLocation}
                    icon={<EnvironmentOutlined />}
                    className="text-blue-500"
                  >
                    موقعیت فعلی من
                  </Button>
                </div>

                {!cityMatche && (
                  <Alert
                    message="تطابق نداشتن موقعیت"
                    description="شهر انتخابی با موقعیت روی نقشه مطابقت ندارد"
                    type="warning"
                    showIcon
                    className="rounded-lg"
                  />
                )}

                <div className="h-[400px] rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                  <Wrapper
                    apiKey={"AIzaSyAtOnE4vyEvfJxG268WbsUlK9EphptwyWo"}
                    render={render}
                  >
                    <MapComponent
                      initialLatLng={latLng}
                      handleLatLngChange={(lat: number, lng: number) => {
                        convertLocationToAddress(lat, lng).then(function (
                          data
                        ) {
                          setCityName(data.data.city);
                          setLatLng({ lat: lat, lng: lng });
                          setIsMapTouched(true);
                        });
                      }}
                    />
                  </Wrapper>
                </div>
                <p className="text-xs text-gray-500 text-center">
                  موقعیت دقیق خود را روی نقشه مشخص کنید
                </p>
              </div>

              {/* Navigation Buttons for Step 2 */}
              <div className="flex justify-between pt-6">
                <Button
                  size="large"
                  className="rounded-lg px-8 h-12"
                  onClick={handlePrevStep}
                >
                  مرحله قبل
                </Button>

                <ConfigProvider
                  theme={{
                    token: {
                      colorPrimary: "#4caf50",
                    },
                  }}
                >
                  <Button
                    onClick={handleEdit}
                    htmlType="button"
                    className="rounded-lg px-8 h-12 min-w-[140px]"
                    type="primary"
                    disabled={!submittable || !cityMatche}
                    loading={isSubmitting}
                    icon={<CheckCircleOutlined />}
                  >
                    {isSubmitting ? "در حال ویرایش..." : "ذخیره تغییرات"}
                  </Button>
                </ConfigProvider>
              </div>
            </div>
          )}
        </Form>
      </Card>
    </div>
  );
}
