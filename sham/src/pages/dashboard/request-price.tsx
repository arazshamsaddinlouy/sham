import {
  Button,
  ConfigProvider,
  Form,
  Input,
  Select,
  Switch,
  TreeSelect,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import MapComponent from "../../components/google-map";
import { Status, Wrapper } from "@googlemaps/react-wrapper";
import type { InputNumberProps } from "antd";
import { InputNumber, Space } from "antd";
import ImageUploader from "../../components/image-uploader";
import FileUploader from "../../components/file-uploader";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import {
  DatePicker as DatePickerJalali,
  JalaliLocaleListener,
} from "antd-jalali";
import { Moment } from "moment";
import fa_IR from "antd/lib/locale/fa_IR";
import { useContext, useEffect, useState } from "react";
import { getUserCoords } from "../../services/user.service";
import { getAllCategories } from "../../services/categories.service";
import {
  addPriceInquiry,
  getActiveRequests,
} from "../../services/price-inquiry.service";

import { setActiveRequest } from "../../store/slices/userSlice";
import { ShamContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllProvincesWithCities } from "../../services/province.service";
export default function RequestPrice() {
  const [categories, setCategories] = useState<any[]>([]);
  const [latLng, setLatLng] = useState<{
    lng: number | null;
    lat: number | null;
  }>({ lat: null, lng: null });
  const [provinces, setProvinces] = useState<any[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<string[]>([]);
  const value: any = useContext(ShamContext);
  const [productCount, setProductCount] = useState<number>(1);
  const [description, setDescription] = useState<string>();
  const [dateString, setDateString] = useState<string>("");
  const [isMapTouched, setIsMapTouched] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>();
  const [image, setImage] = useState<File | null>();
  const [submittable, setIsSubmittable] = useState<boolean>(false);
  const [hasGuaranteeChecked, setIsGuaranteeChecked] = useState<boolean>(true);
  const [isMessageEnabled, setIsMessageEnabled] = useState<boolean>(true);
  const [deliceryChecked, setDeliveryChecked] = useState<boolean>(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [color, setColor] = useState<number | undefined>();
  const [form] = Form.useForm();
  const values = Form.useWatch([], form);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const render = (status: Status) => <h1>{status}</h1>;
  const onChange: InputNumberProps["onChange"] = (value) => {
    setProductCount(Number(value));
  };
  const onProvinceChange = (newValue: string[]) => {
    setSelectedProvince(newValue);
  };
  const onCategoryChange = (newValue: string[]) => {
    setSelectedCategories(newValue);
  };
  useEffect(() => {
    form
      .validateFields({ recursive: true, validateOnly: true })
      .then(() => setIsSubmittable(true))
      .catch(() => {
        setIsSubmittable(false);
      });
  }, [form, values]);
  const handleSubmit = () => {
    const formData = new FormData();
    const values = form.getFieldsValue();
    for (let key in values) {
      if (key === "description") {
        formData.append("description", `${description}`);
      } else if (key === "productCount") {
        if (isNaN(productCount)) {
          formData.append("productCount", "1");
        } else {
          formData.append("productCount", `${productCount}`);
        }
      } else if (key !== "province") {
        formData.append(key, values[key]);
      }
    }
    if (file) {
      formData.append("audio", file);
    }
    if (image) {
      formData.append("image", image);
    }
    if (latLng.lat) {
      formData.append("lat", `${latLng.lat}`);
    }
    if (latLng.lng) {
      formData.append("lng", `${latLng.lng}`);
    }
    if (color) {
      formData.append("color", `${color}`);
    }
    formData.append("inquiryLocation", selectedProvince.join(","));
    formData.append("includeDelivery", deliceryChecked ? "true" : "false");
    formData.append("hasGuarantee", hasGuaranteeChecked ? "true" : "false");
    formData.append("hasMessage", isMessageEnabled ? "true" : "false");
    if (dateString) {
      formData.append("expiredAt", dateString);
    }
    addPriceInquiry(formData).then((data) => {
      if (data.status === 200) {
        getActiveRequests().then((data) => {
          if (data.status === 200) {
            values.setRequestCount(data.data.length);
            dispatch(setActiveRequest(data.data.length));
          }
        });
        value.setNotif({
          type: "success",
          description: "درخواست استعلام ارسال شد",
        });
        navigate("/dashboard");
      }
    });
  };
  useEffect(() => {
    getAllCategories().then((data) => {
      const recursiveChildrenHandles = (result: any) => {
        for (let cat of result) {
          cat.key = cat.id;
          cat.value = cat.id;
          if (Array.isArray(cat.children) && cat.children.length > 0) {
            recursiveChildrenHandles(cat.children);
          }
        }
        setCategories(result);
      };
      recursiveChildrenHandles([...data.data]);
      console.log(data.data);
      setCategories(data.data);
    });
    getUserCoords().then((data: any) => {
      if (data.status === 200) {
        setLatLng(data.data);
      }
    });
  }, []);
  const handleAudio = (audio: File | null) => {
    if (audio) {
      setFile(audio);
    }
  };
  const handleImage = (img: File | null) => {
    if (img) {
      setImage(img);
    }
  };
  const convertToTree = (locations: any[]): any[] => {
    // Separate provinces and cities
    const provinces = locations.filter((loc) => loc.tel_prefix !== undefined);
    const cities = locations.filter((loc) => loc.province_id !== undefined);

    const provinceNodes: any[] = provinces.map((province) => ({
      value: `province-${province.id}`,
      label: province.name,
      children: cities
        .filter((city) => city.province_id === province.id)
        .map((city) => ({
          value: `city-${city.id}`,
          label: city.name,
        })),
    }));

    return [
      {
        value: 0, // Root element
        label: "همه ایران",
        children: provinceNodes,
      },
    ];
  };
  useEffect(() => {
    getAllProvincesWithCities().then((data) => {
      const result = convertToTree([...data.data]);
      console.log(result);
      setProvinces(result);
    });
  }, []);
  return (
    <>
      <div className="text-[26px] pb-[15px] mb-[30px] border-b-[1px] border-b-[#ccc]">
        درخواست استعلام قیمت
      </div>
      <Form
        form={form}
        layout={"vertical"}
        className="w-full mx-auto p-[0px_5px]"
      >
        <div className="flex gap-[50px]">
          <div className="flex-1">
            <Form.Item
              name="title"
              label="عنوان محصول"
              className="rtl"
              rules={[{ required: true, message: "عنوان اجباری است" }]}
            >
              <Input className="flex-1" showCount maxLength={80}></Input>
            </Form.Item>
          </div>
        </div>
        <div className="flex mb-[20px]">
          <div className="flex-1">
            <Form.Item
              name="categoryId"
              label="دسته بندی"
              className="rtl"
              rules={[{ required: true, message: "دسته بندی اجباری است" }]}
            >
              <TreeSelect
                multiple
                showSearch
                style={{ width: "100%" }}
                value={selectedCategories}
                dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                placeholder=""
                allowClear
                treeCheckable={true}
                onChange={onCategoryChange}
                treeData={categories}
                treeNodeFilterProp="title"
              />
            </Form.Item>
          </div>
        </div>
        <div className="flex gap-[50px]">
          <div className="flex-1">
            <Form.Item name="description" label="توضیحات محصول" className="rtl">
              <TextArea
                className="flex-1"
                showCount
                maxLength={300}
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  form.setFieldValue("description", e.target.value); // Sync with form
                  form.validateFields();
                }}
                style={{ height: 180, resize: "none" }}
              />
              <div className="text-[12px] mt-[5px] mb-[5px] text-[#999]">
                مشخصات کالای خود از جمله رنگ مدل برند و شرکت تولید کننده را به
                صورت دقیق وارد نمایید.
              </div>
            </Form.Item>
          </div>
          <div className="w-[200px]">
            <div className="flex pt-[20px] flex-col">
              <div>
                <div className="text-[12px] mb-[10px]">
                  آیا محصول شامل گارانتی باشد؟
                </div>
                <div>
                  <Space wrap>
                    <Switch
                      onChange={(isChecked: boolean) =>
                        setDeliveryChecked(isChecked)
                      }
                      checked={deliceryChecked}
                      checkedChildren={<CheckOutlined />}
                      unCheckedChildren={<CloseOutlined />}
                      defaultChecked
                    />
                  </Space>
                </div>
              </div>
              <div>
                <div className="text-[12px] mt-[20px] mb-[10px]">
                  آیا ارسال رایگان باشد؟
                </div>
                <div>
                  <Space wrap>
                    <Switch
                      onChange={(isChecked: boolean) =>
                        setIsGuaranteeChecked(isChecked)
                      }
                      checked={hasGuaranteeChecked}
                      checkedChildren={<CheckOutlined />}
                      unCheckedChildren={<CloseOutlined />}
                      defaultChecked
                    />
                  </Space>
                </div>
              </div>
              <div>
                <div className="text-[12px] mt-[20px] mb-[10px]">
                  آیا ارسال پیام فعال باشد؟
                </div>
                <div>
                  <Space wrap>
                    <Switch
                      onChange={(isChecked: boolean) =>
                        setIsMessageEnabled(isChecked)
                      }
                      checked={isMessageEnabled}
                      checkedChildren={<CheckOutlined />}
                      unCheckedChildren={<CloseOutlined />}
                      defaultChecked
                    />
                  </Space>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-[16px] text-[#333]">
          شهر و استان های استعلام خود را انتخاب نمایید
        </div>
        <div className="flex items-center gap-[15px]">
          <div className="flex-1">
            <div className="flex mt-[10px] mb-[10px] gap-[15px]">
              <div className="flex-1">
                <Form.Item
                  name="province"
                  label="استان"
                  className="rtl"
                  rules={[{ required: true, message: "استان اجباری است" }]}
                >
                  <TreeSelect
                    multiple
                    showSearch
                    style={{ width: "100%" }}
                    value={selectedProvince}
                    dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                    placeholder=""
                    allowClear
                    treeCheckable={true}
                    onChange={onProvinceChange}
                    treeData={provinces}
                    treeNodeFilterProp="label"
                  />
                </Form.Item>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <Space wrap className="flex w-full">
              <Form.Item name="color" label="رنگ محصول" className="rtl">
                <Select
                  className="w-full flex-1"
                  value={productCount}
                  onChange={(value) => setColor(value)}
                >
                  <Select.Option value="1">سبز</Select.Option>
                  <Select.Option value="2">آبی</Select.Option>
                  <Select.Option value="3">سفید</Select.Option>
                  <Select.Option value="4">مشکی</Select.Option>
                  <Select.Option value="5">طلایی</Select.Option>
                  <Select.Option value="6">رزگلد</Select.Option>
                  <Select.Option value="7">صورتی</Select.Option>
                  <Select.Option value="8">بنفش</Select.Option>
                  <Select.Option value="9">قهوه ای</Select.Option>
                </Select>
              </Form.Item>
            </Space>
          </div>
        </div>
        <div className="flex gap-[15px] mb-[15px] overflow-hidden">
          <div className="flex-1">
            <Space wrap className="flex w-full">
              <Form.Item
                name="productCount"
                label="تعداد محصول"
                className="rtl"
              >
                <InputNumber
                  className="w-full flex-1"
                  size="large"
                  value={productCount}
                  min={1}
                  max={1000}
                  defaultValue={1}
                  onChange={onChange}
                />
              </Form.Item>
            </Space>
          </div>
          <div className="flex-1">
            <div className="flex flex-col">
              <div className="flex-1">
                <Form.Item
                  name="productCount"
                  label="پایان زمان استعلام"
                  className="rtl"
                >
                  <JalaliLocaleListener />
                  <ConfigProvider locale={fa_IR} direction="rtl">
                    <DatePickerJalali
                      showTime
                      className={"w-full h-[40px]"}
                      onChange={(d: Moment | null) => {
                        if (d) {
                          setDateString(d?.toISOString());
                        }
                      }}
                    />
                  </ConfigProvider>
                </Form.Item>
              </div>
              <div className="flex -mt-[15px] text-[12px] text-[#999]">
                <div>مدت ارسال قیمت توسط فروشندگان : ۱ ساعت و ۲۲ دقیقه</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-[15px] mb-[15px] h-[450px] overflow-hidden">
          <div className="flex-1">
            <div className="text-[14px] mb-[5px] mt-[0px]">
              مکان خود روی نقشه را مشخص نمایید:
            </div>
            {latLng && (
              <Wrapper
                apiKey={"AIzaSyAtOnE4vyEvfJxG268WbsUlK9EphptwyWo"}
                render={render}
              >
                <MapComponent
                  initialLatLng={latLng}
                  handleLatLngChange={(lat: number, lng: number) => {
                    setLatLng({ lat: lat, lng: lng });
                    setIsMapTouched(true);
                  }}
                />
              </Wrapper>
            )}
          </div>
        </div>
        <div className="flex">
          <div className="flex-1">
            <div className="text-[14px] mb-[10px] mt-[20px]">
              در صورت نیاز فایل پیوست نمایید
            </div>
            <FileUploader handleFile={handleAudio} />
          </div>
          <div className="flex-1">
            <div className="text-[14px] mb-[10px] mt-[20px]">
              تصویر محصول مورد نظر خود را پیوست کنید
            </div>
            <ImageUploader handleFile={handleImage} />
          </div>
        </div>
        <div className="pt-[20px] mt-[20px] border-t-[1px] border-t-[#ccc]">
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
                className="w-full mt-[40px] h-[40px]"
                type="primary"
                disabled={!submittable || !isMapTouched}
              >
                ارسال درخواست
              </Button>
            </ConfigProvider>
          </Form.Item>
        </div>
      </Form>
    </>
  );
}
