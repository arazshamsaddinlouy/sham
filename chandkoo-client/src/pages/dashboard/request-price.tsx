import {
  Button,
  ConfigProvider,
  Form,
  Input,
  Switch,
  TreeSelect,
  InputNumber,
  Modal,
  Select,
  Grid,
  Card,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import MapComponent from "../../components/google-map";
import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import {
  DatePicker as DatePickerJalali,
  JalaliLocaleListener,
} from "antd-jalali";
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
import ImageUploader from "../../components/image-uploader";
import FileUploader from "../../components/file-uploader";

const { useBreakpoint } = Grid;

const colors = [
  { label: "قرمز", value: "red", hex: "#FF0000" },
  { label: "آبی", value: "blue", hex: "#0000FF" },
  { label: "سبز", value: "green", hex: "#008000" },
  { label: "زرد", value: "yellow", hex: "#FFFF00" },
  { label: "نارنجی", value: "orange", hex: "#FFA500" },
  { label: "بنفش", value: "purple", hex: "#800080" },
  { label: "صورتی", value: "pink", hex: "#FFC0CB" },
  { label: "مشکی", value: "black", hex: "#000000" },
  { label: "سفید", value: "white", hex: "#FFFFFF" },
  { label: "خاکستری", value: "gray", hex: "#808080" },
  { label: "قهوه‌ای", value: "brown", hex: "#8B4513" },
  { label: "طلایی", value: "gold", hex: "#FFD700" },
  { label: "نقره‌ای", value: "silver", hex: "#C0C0C0" },
];

export default function RequestPrice() {
  const [categories, setCategories] = useState<any[]>([]);
  const [latLng, setLatLng] = useState<{
    lng: number | null;
    lat: number | null;
  }>({ lat: null, lng: null });
  const [loading, setLoading] = useState<boolean>(false);
  const [provinces, setProvinces] = useState<any[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<string[]>([]);
  const [productCount, setProductCount] = useState<number>(1);
  const [description, setDescription] = useState<string>();
  const [dateString, setDateString] = useState<any>("");
  const [isMapTouched, setIsMapTouched] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>();
  const [image, setImage] = useState<File | null>();
  const [submittable, setIsSubmittable] = useState<boolean>(false);
  const [hasGuaranteeChecked, setIsGuaranteeChecked] = useState<boolean>(true);
  const [isMessageEnabled, setIsMessageEnabled] = useState<boolean>(true);
  const [deliceryChecked, setDeliveryChecked] = useState<boolean>(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [color, setColor] = useState<number | undefined>();
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  const [form] = Form.useForm();
  const values = Form.useWatch([], form);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const value: any = useContext(ShamContext);
  const screens = useBreakpoint();

  const isMobile = !screens.md;
  const isTablet = !screens.lg;

  const render = (status: Status) => <h1>{status}</h1>;

  const onProvinceChange = (newValue: string[]) =>
    setSelectedProvince(newValue);
  const onCategoryChange = (newValue: string[]) =>
    setSelectedCategories(newValue);

  useEffect(() => {
    form
      .validateFields({ recursive: true, validateOnly: true })
      .then(() => setIsSubmittable(true))
      .catch(() => setIsSubmittable(false));
  }, [form, values]);

  const handleSubmit = () => {
    const formData = new FormData();
    const formValues = form.getFieldsValue();
    setLoading(true);

    for (let key in formValues) {
      if (key === "description") {
        formData.append("description", `${description}`);
      } else if (key === "productCount") {
        formData.append(
          "productCount",
          isNaN(productCount) ? "1" : `${productCount}`
        );
      } else if (key !== "province") {
        formData.append(key, formValues[key]);
      }
    }

    if (file) formData.append("audio", file);
    if (image) formData.append("image", image);
    if (latLng.lat) formData.append("lat", `${latLng.lat}`);
    if (latLng.lng) formData.append("lng", `${latLng.lng}`);
    if (color) formData.append("color", `${color}`);
    formData.append("inquiryLocation", selectedProvince.join(","));
    formData.append("includeDelivery", deliceryChecked ? "true" : "false");
    formData.append("hasGuarantee", hasGuaranteeChecked ? "true" : "false");
    formData.append("hasMessage", isMessageEnabled ? "true" : "false");
    if (dateString) formData.append("expiredAt", dateString.toISOString());

    addPriceInquiry(formData).then((data) => {
      if (data.status === 200) {
        getActiveRequests()
          .then((res) => {
            setLoading(false);
            if (res.status === 200) {
              value.setNotif({
                type: "success",
                description: "درخواست استعلام ارسال شد",
              });
              dispatch(setActiveRequest(res.data.length));
              navigate("/dashboard");
            }
          })
          .catch(() => {
            setLoading(false);
          });
      }
    });
  };

  useEffect(() => {
    getAllCategories().then((data) => {
      const recursiveHandle = (result: any[]) => {
        result.forEach((cat) => {
          cat.key = cat.id;
          cat.value = cat.id;
          if (Array.isArray(cat.children) && cat.children.length > 0)
            recursiveHandle(cat.children);
        });
      };
      recursiveHandle(data.data);
      setCategories(data.data);
    });

    getUserCoords().then((data: any) => {
      if (data.status === 200) setLatLng(data.data);
    });
  }, []);

  useEffect(() => {
    getAllProvincesWithCities().then((data) => {
      const convert = (locations: any[]) => {
        const provinces = locations.filter(
          (loc) => loc.tel_prefix !== undefined
        );
        const cities = locations.filter((loc) => loc.province_id !== undefined);
        return [
          {
            value: 0,
            label: "همه ایران",
            children: provinces.map((province) => ({
              value: `province-${province.id}`,
              label: province.name,
              children: cities
                .filter((c) => c.province_id === province.id)
                .map((c) => ({
                  value: `city-${c.id}`,
                  label: c.name,
                })),
            })),
          },
        ];
      };
      setProvinces(convert(data.data));
    });
  }, []);

  const mapComponent = (
    <Wrapper apiKey="AIzaSyAtOnE4vyEvfJxG268WbsUlK9EphptwyWo" render={render}>
      <MapComponent
        initialLatLng={latLng}
        handleLatLngChange={(lat: number, lng: number) => {
          setLatLng({ lat, lng });
          setIsMapTouched(true);
          if (isMobile) setIsMapModalOpen(false);
        }}
      />
    </Wrapper>
  );

  return (
    <div className="mx-auto p-4">
      <div className="text-2xl md:text-3xl font-bold text-right pb-4 mb-6 border-b border-gray-200">
        درخواست استعلام قیمت
      </div>

      <Card className="shadow-sm border-0">
        <Form
          form={form}
          layout="vertical"
          className="w-full"
          size={isMobile ? "small" : "middle"}
        >
          {/* Basic Information Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <Form.Item
                name="title"
                label="عنوان محصول"
                rules={[{ required: true, message: "عنوان اجباری است" }]}
              >
                <Input
                  showCount
                  maxLength={80}
                  size={isMobile ? "small" : "middle"}
                  placeholder="عنوان محصول را وارد کنید"
                />
              </Form.Item>

              <Form.Item
                name="categoryId"
                label="دسته بندی"
                rules={[{ required: true, message: "دسته بندی اجباری است" }]}
              >
                <TreeSelect
                  multiple
                  showSearch
                  value={selectedCategories}
                  dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                  allowClear
                  treeCheckable
                  onChange={onCategoryChange}
                  treeData={categories}
                  treeNodeFilterProp="title"
                  placeholder="دسته بندی را انتخاب کنید"
                  size={isMobile ? "small" : "middle"}
                />
              </Form.Item>

              <Form.Item
                name="inquiryLocation"
                label="استان و شهر"
                rules={[
                  { required: true, message: "انتخاب استان و شهر اجباری است" },
                ]}
              >
                <TreeSelect
                  showSearch
                  value={selectedProvince}
                  dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                  placeholder="استان و شهر را انتخاب کنید"
                  allowClear
                  treeCheckable
                  onChange={onProvinceChange}
                  treeData={provinces}
                  treeNodeFilterProp="label"
                  size={isMobile ? "small" : "middle"}
                />
              </Form.Item>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Item
                  name="productCount"
                  label="تعداد محصول"
                  initialValue={1}
                  rules={[
                    { required: true, message: "تعداد محصول اجباری است" },
                  ]}
                >
                  <InputNumber
                    min={1}
                    style={{ width: "100%" }}
                    onChange={(val) => setProductCount(val || 1)}
                    size={isMobile ? "small" : "middle"}
                    placeholder="تعداد"
                  />
                </Form.Item>

                <Form.Item name="color" label="رنگ محصول (اختیاری)">
                  <Select
                    style={{ width: "100%" }}
                    placeholder="انتخاب رنگ"
                    allowClear
                    onChange={(val) => setColor(val || undefined)}
                    size={isMobile ? "small" : "middle"}
                  >
                    {colors.map((color) => (
                      <Select.Option key={color.value} value={color.value}>
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                          }}
                        >
                          <span
                            style={{
                              backgroundColor: color.hex,
                              width: 16,
                              height: 16,
                              borderRadius: "50%",
                              border: "1px solid #ccc",
                            }}
                          />
                          {color.label}
                        </span>
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>

              <Form.Item label="تاریخ انقضا">
                <ConfigProvider locale={fa_IR}>
                  <JalaliLocaleListener />
                  <DatePickerJalali
                    style={{ width: "100%" }}
                    onChange={(val: any) => {
                      setDateString(val ? new Date(val.$d) : "");
                    }}
                    size={isMobile ? "small" : "middle"}
                  />
                </ConfigProvider>
              </Form.Item>

              {/* Upload Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Item label="بارگذاری تصویر (اختیاری)">
                  <div
                    className={
                      isMobile ? "uploader-mobile" : "uploader-desktop"
                    }
                  >
                    <ImageUploader handleFile={(file) => setImage(file)} />
                  </div>
                </Form.Item>
                <Form.Item label="بارگذاری صوت (اختیاری)">
                  <div
                    className={
                      isMobile ? "uploader-mobile" : "uploader-desktop"
                    }
                  >
                    <FileUploader handleFile={(file) => setFile(file)} />
                  </div>
                </Form.Item>
              </div>
            </div>
          </div>

          {/* Description and Settings Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <Form.Item
                label="توضیحات"
                name="description"
                rules={[{ required: true, message: "توضیحات اجباری است" }]}
              >
                <TextArea
                  rows={6}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="توضیحات کامل محصول را وارد کنید..."
                  size={isMobile ? "small" : "middle"}
                />
              </Form.Item>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">گارانتی داشته باشد</span>
                  <Switch
                    checked={hasGuaranteeChecked}
                    onChange={(checked) => setIsGuaranteeChecked(checked)}
                    checkedChildren={<CheckOutlined />}
                    unCheckedChildren={<CloseOutlined />}
                    size={isMobile ? "small" : "default"}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">شامل حمل و نقل باشد</span>
                  <Switch
                    checked={deliceryChecked}
                    onChange={(checked) => setDeliveryChecked(checked)}
                    checkedChildren={<CheckOutlined />}
                    unCheckedChildren={<CloseOutlined />}
                    size={isMobile ? "small" : "default"}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">امکان ارسال پیامک به فروشنده</span>
                  <Switch
                    checked={isMessageEnabled}
                    onChange={(checked) => setIsMessageEnabled(checked)}
                    checkedChildren={<CheckOutlined />}
                    unCheckedChildren={<CloseOutlined />}
                    size={isMobile ? "small" : "default"}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="mb-6">
            <div className="text-sm mb-3 font-medium">
              مکان خود روی نقشه را مشخص نمایید:
            </div>

            {isMobile ? (
              <>
                <Button
                  onClick={() => setIsMapModalOpen(true)}
                  block
                  size={isMobile ? "small" : "middle"}
                >
                  باز کردن نقشه برای انتخاب مکان
                </Button>
                <Modal
                  title="انتخاب مکان روی نقشه"
                  open={isMapModalOpen}
                  onCancel={() => setIsMapModalOpen(false)}
                  footer={null}
                  width="100%"
                  style={{ top: 0, padding: 0 }}
                  bodyStyle={{ padding: 0, height: "80vh" }}
                >
                  {mapComponent}
                </Modal>
              </>
            ) : (
              <div
                style={{ height: isTablet ? 300 : 400, overflow: "hidden" }}
                className="rounded-lg border"
              >
                {mapComponent}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <Form.Item>
            <ConfigProvider theme={{ token: { colorPrimary: "#4caf50" } }}>
              <Button
                onClick={handleSubmit}
                htmlType="submit"
                className="w-full"
                loading={loading}
                type="primary"
                disabled={!submittable || !isMapTouched}
                size={isMobile ? "large" : "large"}
                style={{ height: isMobile ? 45 : 50 }}
              >
                ارسال درخواست استعلام
              </Button>
            </ConfigProvider>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
