import {
  Button,
  ConfigProvider,
  Form,
  Input,
  Switch,
  TreeSelect,
  InputNumber,
  Space,
  Modal,
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
import { Moment } from "moment";

export default function RequestPrice() {
  const [categories, setCategories] = useState<any[]>([]);
  const [latLng, setLatLng] = useState<{
    lng: number | null;
    lat: number | null;
  }>({ lat: null, lng: null });
  const [provinces, setProvinces] = useState<any[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<string[]>([]);
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
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  const [form] = Form.useForm();
  const values = Form.useWatch([], form);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const value: any = useContext(ShamContext);

  const render = (status: Status) => <h1>{status}</h1>;

  const isMobile = () => window.innerWidth < 768;

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
    if (dateString) formData.append("expiredAt", dateString);

    addPriceInquiry(formData).then((data) => {
      if (data.status === 200) {
        getActiveRequests().then((res) => {
          if (res.status === 200) {
            value.setNotif({
              type: "success",
              description: "درخواست استعلام ارسال شد",
            });
            dispatch(setActiveRequest(res.data.length));
            navigate("/dashboard");
          }
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
          if (isMobile()) setIsMapModalOpen(false);
        }}
      />
    </Wrapper>
  );

  return (
    <>
      <div className="text-[26px] pb-[15px] mb-[30px] border-b-[1px] border-b-[#ccc]">
        درخواست استعلام قیمت
      </div>
      <Form
        form={form}
        layout="vertical"
        className="w-full mx-auto p-[0px_5px]"
      >
        <Form.Item
          name="title"
          label="عنوان محصول"
          className="rtl"
          rules={[{ required: true, message: "عنوان اجباری است" }]}
        >
          <Input showCount maxLength={80} />
        </Form.Item>
        <Form.Item
          name="categoryId"
          label="دسته بندی"
          className="rtl"
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
          />
        </Form.Item>
        <Form.Item
          name="inquiryLocation"
          label="استان و شهر"
          className="rtl"
          rules={[{ required: true, message: "انتخاب استان و شهر اجباری است" }]}
        >
          <TreeSelect
            showSearch
            value={selectedProvince}
            dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
            placeholder=""
            allowClear
            treeCheckable
            onChange={onProvinceChange}
            treeData={provinces}
          />
        </Form.Item>
        <Form.Item
          name="productCount"
          label="تعداد محصول"
          className="rtl"
          initialValue={1}
          rules={[{ required: true, message: "تعداد محصول اجباری است" }]}
        >
          <InputNumber min={1} onChange={(val) => setProductCount(val || 1)} />
        </Form.Item>
        <Form.Item name="color" label="رنگ محصول (اختیاری)" className="rtl">
          <InputNumber
            min={0}
            max={255}
            onChange={(val) => setColor(val || undefined)}
          />
        </Form.Item>
        <Form.Item
          label="توضیحات"
          className="rtl"
          rules={[{ required: true, message: "توضیحات اجباری است" }]}
        >
          <TextArea rows={4} onChange={(e) => setDescription(e.target.value)} />
        </Form.Item>
        <Form.Item label="بارگذاری تصویر (اختیاری)" className="rtl">
          <ImageUploader handleFile={(file) => setImage(file)} />
        </Form.Item>
        <Form.Item label="بارگذاری صوت (اختیاری)" className="rtl">
          <FileUploader handleFile={(file) => setFile(file)} />
        </Form.Item>
        <Form.Item label="تاریخ انقضا" className="rtl">
          <ConfigProvider locale={fa_IR}>
            <JalaliLocaleListener />
            <DatePickerJalali
              onChange={(val: Moment | null) =>
                setDateString(val ? val.format("YYYY-MM-DD") : "")
              }
            />
          </ConfigProvider>
        </Form.Item>
        <Space direction="vertical" className="rtl mb-4">
          <Switch
            checked={hasGuaranteeChecked}
            onChange={(checked) => setIsGuaranteeChecked(checked)}
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
          />{" "}
          گارانتی داشته باشد
          <Switch
            checked={deliceryChecked}
            onChange={(checked) => setDeliveryChecked(checked)}
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
          />{" "}
          شامل حمل و نقل باشد
          <Switch
            checked={isMessageEnabled}
            onChange={(checked) => setIsMessageEnabled(checked)}
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
          />{" "}
          امکان ارسال پیامک به فروشنده
        </Space>
        <div className="text-[14px] mb-[5px] mt-[0px]">
          مکان خود روی نقشه را مشخص نمایید:
        </div>
        {isMobile() ? (
          <>
            <Button onClick={() => setIsMapModalOpen(true)}>
              باز کردن نقشه
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
          <div style={{ height: 450, overflow: "hidden" }}>{mapComponent}</div>
        )}
        <Form.Item>
          <ConfigProvider theme={{ token: { colorPrimary: "#4caf50" } }}>
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
      </Form>
    </>
  );
}
