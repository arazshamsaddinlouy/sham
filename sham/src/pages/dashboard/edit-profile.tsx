import { Button, ConfigProvider, Form, Input, Select } from "antd";
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

let cityList: any[] = [];
export default function EditProfile() {
  const navigate = useNavigate();
  const [cityName, setCityName] = useState<string>("");
  const [cityMatche, setCityMatched] = useState<boolean>(true);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const render = (status: Status) => <h1>{status}</h1>;
  const value: any = useContext(ShamContext);
  const [cities, setCities] = useState<any[]>([]);
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
      ).name;
      if (cityName && city) {
        if (cityName !== city) {
          setCityMatched(false);
          setSubmittable(false);
          value.setNotif({
            type: "error",
            description: "شهر انتخابی با لوکیشن انتخابی یکی نمیباشد",
          });
        }
      } else {
        setCityMatched(true);
      }
    } catch (e) {}
  };
  const handleEdit = () => {
    const payload = form.getFieldsValue();
    payload.lat = latLng.lat;
    payload.lng = latLng.lng;
    editUserInfo(payload).then((data) => {
      if (data.status === 200) {
        value.setNotif({
          type: "success",
          description: "کاربر ویرایش شد",
        });
        navigate("/dashboard");
      } else {
        value.setNotif({
          type: "error",
          description: "خطا در ویرایش کاربر",
        });
      }
    });
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
  useEffect(() => {
    getAllProvinces().then((data) => {
      setProvinces(data.data);
    });
    getEditUserInfo().then((data) => {
      const userInfo = data.data;
      form.setFieldsValue({ ...userInfo });
      form.setFieldValue("telephone", userInfo.phone_number);
      form.setFieldValue("province", userInfo.provinceId);
      fetchCities(userInfo.provinceId);
      form.setFieldValue("city", userInfo.cityId);
      setLatLng({ lat: userInfo.lat, lng: userInfo.lng });
      form.validateFields({ recursive: true });
    });
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
  return (
    <>
      <div className="text-[26px] pb-[15px] mb-[30px] border-b-[1px] border-b-[#ccc]">
        ویرایش پروفایل
      </div>
      <Form
        form={form}
        layout={"vertical"}
        className="w-full mx-auto p-[0px_5px]"
      >
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
                name="telephone"
                type="text"
                placeholder="مثال: 021221122"
                className="h-[40px]"
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
                  const selected = cities.find((el) => el.id == c);
                  setLatLng({ lat: selected.lat, lng: selected.lng });
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
              onClick={handleEdit}
              htmlType="submit"
              className="w-full h-[40px]"
              type="primary"
              disabled={!submittable || !cityMatche}
            >
              ویرایش اطلاعات
            </Button>
          </ConfigProvider>
        </Form.Item>
      </Form>
    </>
  );
}
