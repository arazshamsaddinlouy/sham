import {
  Button,
  ConfigProvider,
  Form,
  Input,
  Modal,
  Table,
  TableColumnsType,
  Tag,
  TreeSelect,
  Popconfirm,
  Card,
  Space,
  Alert,
  Typography,
} from "antd";
import { useContext, useEffect, useState } from "react";
import { Status, Wrapper } from "@googlemaps/react-wrapper";
import MapComponent from "../../components/google-map";
import {
  BiPencil,
  BiPlus,
  BiStore,
  BiMap,
  BiPhone,
  BiUser,
} from "react-icons/bi";
import {
  RxInstagramLogo,
  RxTwitterLogo,
  RxLinkedinLogo,
  RxCross2,
} from "react-icons/rx";
import { FaWhatsapp, FaFacebook, FaYoutube } from "react-icons/fa";
import TextArea from "antd/es/input/TextArea";
import { getAllCategories } from "../../services/categories.service";
import { ShamContext } from "../../App";
import {
  addBranch,
  deleteBranch,
  editBranch,
  getAllBranches,
  getBranchLocation,
} from "../../services/branch.service";

const { Title, Text } = Typography;

interface Branch {
  id: string;
  key: string;
  name: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  address: string;
  categories: Array<{ id: string; title: string }>;
  categoryId: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  whatsapp?: string;
  linkedin?: string;
  lat?: number;
  lng?: number;
}

interface Category {
  id: string;
  key: string;
  value: string;
  title: string;
  children?: Category[];
}

export default function Branches() {
  const [submittable, setIsSubmittable] = useState<boolean>(false);
  const [latLng, setLatLng] = useState<{ lat: number; lng: number }>({
    lat: 35.6892,
    lng: 51.389,
  });
  const [locationModal, setLocationModal] = useState<boolean>(false);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [locationLatLng, setLocationLatLng] = useState<{
    lat: number;
    lng: number;
  }>({
    lat: 35.6892,
    lng: 51.389,
  });
  const [isMapTouched, setIsMapTouched] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<string>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();
  const values = Form.useWatch([], form);
  const value: any = useContext(ShamContext);

  // Handle branch location view
  const handleBranchLocation = (id: string) => {
    setLoading(true);
    getBranchLocation(id)
      .then((data) => {
        if (data.status === 200) {
          setLocationLatLng({ lat: data.data.lat, lng: data.data.lng });
          setLocationModal(true);
        }
      })
      .finally(() => setLoading(false));
  };

  // Table columns
  const columns: TableColumnsType<Branch> = [
    {
      title: "نام غرفه",
      dataIndex: "name",
      render: (name: string) => (
        <div className="flex items-center gap-2">
          <BiStore className="text-blue-500" />
          <Text strong>{name}</Text>
        </div>
      ),
    },
    {
      title: "مسئول",
      dataIndex: "first_name",
      render: (_: any, record: Branch) => (
        <div className="flex items-center gap-1 text-gray-600">
          <BiUser className="text-sm" />
          <span>
            {record.first_name} {record.last_name}
          </span>
        </div>
      ),
    },
    {
      title: "دسته‌بندی",
      dataIndex: "categories",
      render: (categories: Array<{ id: string; title: string }>) => (
        <div className="flex flex-wrap gap-1">
          {(categories || []).map((cat) => (
            <Tag
              key={cat.id}
              color="blue"
              className="text-xs rounded-full px-2 py-1"
            >
              {cat.title}
            </Tag>
          ))}
        </div>
      ),
    },
    {
      title: "تماس",
      dataIndex: "phone_number",
      render: (phone: string) => (
        <div className="flex items-center gap-1 text-gray-600">
          <BiPhone className="text-sm" />
          <span>{phone}</span>
        </div>
      ),
    },
    {
      title: "آدرس",
      dataIndex: "address",
      render: (address: string) => (
        <Text className="text-xs" ellipsis={{ tooltip: address }}>
          {address}
        </Text>
      ),
    },
    {
      title: "عملیات",
      dataIndex: "actions",
      width: 300,
      render: (_: any, record: Branch) => (
        <Space direction="horizontal" size="small">
          <ConfigProvider theme={{ token: { colorPrimary: "#1890ff" } }}>
            <Button
              type="primary"
              size="small"
              icon={<BiPencil />}
              onClick={() => handleEdit(record)}
            >
              ویرایش
            </Button>
          </ConfigProvider>

          <ConfigProvider theme={{ token: { colorPrimary: "#52c41a" } }}>
            <Button
              type="primary"
              size="small"
              icon={<BiMap />}
              onClick={() => handleBranchLocation(record.id)}
              loading={loading}
            >
              مکان
            </Button>
          </ConfigProvider>

          <ConfigProvider theme={{ token: { colorPrimary: "#ff4d4f" } }}>
            <Popconfirm
              title="حذف غرفه"
              description="آیا از حذف این غرفه اطمینان دارید؟"
              okText="بله"
              cancelText="خیر"
              onConfirm={() => handleDelete(record.id)}
            >
              <Button type="primary" size="small" icon={<RxCross2 />}>
                حذف
              </Button>
            </Popconfirm>
          </ConfigProvider>
        </Space>
      ),
    },
  ];

  // Handle category selection
  const handleCategoryChange = (newValue: string[]) => {
    setSelectedCategories(newValue);
  };

  // Fetch branches
  const fetchBranches = () => {
    setLoading(true);
    getAllBranches()
      .then((data) => {
        if (data.status === 200) {
          setBranches(
            data.data.map((branch: any) => ({
              ...branch,
              key: branch.id,
            }))
          );
        }
      })
      .finally(() => setLoading(false));
  };

  // Fetch categories
  const fetchCategories = () => {
    getAllCategories().then((data) => {
      const processCategories = (cats: any[]): Category[] => {
        return cats.map((cat) => ({
          ...cat,
          key: cat.id,
          value: cat.id,
          children: cat.children ? processCategories(cat.children) : undefined,
        }));
      };
      setCategories(processCategories(data.data));
    });
  };

  useEffect(() => {
    fetchCategories();
    fetchBranches();
  }, []);

  // Form validation
  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setIsSubmittable(true))
      .catch(() => setIsSubmittable(false));
  }, [form, values]);

  // Handle edit
  const handleEdit = (record: Branch) => {
    setIsMapTouched(true);
    setIsEdit(record.id);
    setSelectedCategories(
      record.categoryId ? record.categoryId.split(",") : []
    );

    getBranchLocation(record.id).then((data) => {
      if (data.status === 200) {
        setLatLng({ lat: data.data.lat, lng: data.data.lng });

        // Set form values with correct field names
        form.setFieldsValue({
          first_name: record.first_name,
          last_name: record.last_name,
          name: record.name,
          telephone: record.phone_number,
          address: record.address,
          instagram: record.instagram,
          whatsapp: record.whatsapp,
          linkedin: record.linkedin,
          youtube: record.youtube,
          facebook: record.facebook,
          twitter: record.twitter,
        });
        setIsModalOpen(true);
      }
    });
  };

  // Handle delete
  const handleDelete = (id: string) => {
    deleteBranch(id).then((data) => {
      if (data.status === 200) {
        value.setNotif({
          type: "success",
          description: "غرفه با موفقیت حذف شد",
        });
        fetchBranches();
      }
    });
  };

  // Handle form submit
  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const payload = {
        ...values,
        lat: latLng.lat,
        lng: latLng.lng,
        categoryId: selectedCategories.join(","),
      };

      const request = isEdit
        ? editBranch({ ...payload, id: isEdit })
        : addBranch(payload);

      request.then((data) => {
        if (data.status === 200) {
          setIsModalOpen(false);
          fetchBranches();
          value.setNotif({
            type: "success",
            description: `غرفه ${isEdit ? "ویرایش" : "افزوده"} شد`,
          });
        }
      });
    });
  };

  // Show modal for new branch
  const showModal = () => {
    form.resetFields();
    setLatLng({ lat: 35.6892, lng: 51.389 });
    setIsMapTouched(false);
    setSelectedCategories([]);
    setIsEdit(undefined);
    setIsModalOpen(true);
  };

  const renderMap = (status: Status) => (
    <div className="flex justify-center items-center h-64 bg-gray-100 rounded-lg">
      <Text type="secondary">{status}</Text>
    </div>
  );

  return (
    <div className="p-6">
      {/* Header */}
      <Card className="mb-6 shadow-sm">
        <div className="flex justify-between items-center">
          <div>
            <Title level={2} className="!mb-2">
              <BiStore className="inline mr-2" />
              مدیریت غرفه‌ها
            </Title>
            <Text type="secondary">مدیریت و تنظیمات غرفه‌های فروشگاهی</Text>
          </div>
          <ConfigProvider theme={{ token: { colorPrimary: "#10b981" } }}>
            <Button
              type="primary"
              size="large"
              icon={<BiPlus />}
              onClick={showModal}
              className="h-12 px-6"
            >
              افزودن غرفه جدید
            </Button>
          </ConfigProvider>
        </div>
      </Card>

      {/* Branches Table */}
      <Card
        title={
          <div className="flex items-center gap-2">
            <BiStore />
            <span>لیست غرفه‌ها</span>
            <Tag color="blue">{branches.length} غرفه</Tag>
          </div>
        }
        className="shadow-sm"
      >
        <Table<Branch>
          columns={columns}
          dataSource={branches}
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
          }}
          scroll={{ x: 1000 }}
        />
      </Card>

      {/* Location Modal */}
      <Modal
        open={locationModal}
        width={800}
        onCancel={() => setLocationModal(false)}
        footer={null}
        title={
          <div className="flex items-center gap-2">
            <BiMap className="text-blue-500" />
            <span>موقعیت غرفه روی نقشه</span>
          </div>
        }
      >
        <Wrapper
          apiKey={"AIzaSyAtOnE4vyEvfJxG268WbsUlK9EphptwyWo"}
          render={renderMap}
        >
          <MapComponent
            isDraggable={false}
            initialLatLng={locationLatLng}
            handleLatLngChange={() => {}}
          />
        </Wrapper>
      </Modal>

      {/* Add/Edit Branch Modal */}
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        width={1000}
        footer={null}
        title={
          <div className="flex items-center gap-2">
            <BiStore className="text-green-500" />
            <span>{isEdit ? "ویرایش غرفه" : "افزودن غرفه جدید"}</span>
          </div>
        }
      >
        <div className="max-h-[70vh] overflow-y-auto pr-2">
          <Form
            form={form}
            layout="vertical"
            className="space-y-4"
            onFinish={handleSubmit}
          >
            {/* Basic Information */}
            <Card title="اطلاعات اصلی" size="small">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Item
                  name="first_name"
                  label="نام مسئول"
                  rules={[
                    { required: true, message: "نام مسئول اجباری است" },
                    {
                      pattern: /^[\u0600-\u06FF\s]+$/,
                      message: "نام مسئول صحیح نیست",
                    },
                  ]}
                >
                  <Input placeholder="مثال: محمد" size="large" />
                </Form.Item>

                <Form.Item
                  name="last_name"
                  label="نام خانوادگی مسئول"
                  rules={[
                    {
                      required: true,
                      message: "نام خانوادگی مسئول اجباری است",
                    },
                    {
                      pattern: /^[\u0600-\u06FF\s]+$/,
                      message: "نام خانوادگی مسئول صحیح نیست",
                    },
                  ]}
                >
                  <Input placeholder="مثال: محمدی" size="large" />
                </Form.Item>

                <Form.Item
                  name="name"
                  label="نام غرفه"
                  rules={[{ required: true, message: "نام غرفه اجباری است" }]}
                >
                  <Input placeholder="مثال: غرفه میرداماد" size="large" />
                </Form.Item>

                <Form.Item
                  name="telephone"
                  label="شماره تلفن ثابت"
                  rules={[
                    {
                      pattern: /^\d+$/,
                      message: "شماره تلفن ثابت فقط شامل رقم باید باشد",
                    },
                  ]}
                >
                  <Input placeholder="مثال: 021221122" size="large" />
                </Form.Item>
              </div>

              <Form.Item
                name="address"
                label="آدرس"
                rules={[{ required: true, message: "آدرس اجباری است" }]}
              >
                <TextArea
                  rows={3}
                  placeholder="آدرس کامل غرفه را وارد کنید..."
                  className="resize-none"
                />
              </Form.Item>

              <Form.Item
                name="categoryId"
                label="دسته‌بندی"
                rules={[{ required: true, message: "دسته‌بندی اجباری است" }]}
              >
                <TreeSelect
                  multiple
                  showSearch
                  treeCheckable
                  value={selectedCategories}
                  dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                  placeholder="دسته‌بندی‌ها را انتخاب کنید"
                  allowClear
                  onChange={handleCategoryChange}
                  treeData={categories}
                  treeNodeFilterProp="title"
                  size="large"
                />
              </Form.Item>
            </Card>

            {/* Social Media */}
            <Card title="شبکه‌های اجتماعی" size="small">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Item name="instagram" label="اینستاگرام">
                  <Input
                    prefix={<RxInstagramLogo className="text-pink-500" />}
                    placeholder="https://instagram.com/..."
                    size="large"
                  />
                </Form.Item>

                <Form.Item name="whatsapp" label="واتس‌آپ">
                  <Input
                    prefix={<FaWhatsapp className="text-green-500" />}
                    placeholder="09123456789"
                    size="large"
                  />
                </Form.Item>

                <Form.Item name="linkedin" label="لینکداین">
                  <Input
                    prefix={<RxLinkedinLogo className="text-blue-600" />}
                    placeholder="https://linkedin.com/..."
                    size="large"
                  />
                </Form.Item>

                <Form.Item name="youtube" label="یوتیوب">
                  <Input
                    prefix={<FaYoutube className="text-red-500" />}
                    placeholder="https://youtube.com/..."
                    size="large"
                  />
                </Form.Item>

                <Form.Item name="facebook" label="فیس‌بوک">
                  <Input
                    prefix={<FaFacebook className="text-blue-500" />}
                    placeholder="https://facebook.com/..."
                    size="large"
                  />
                </Form.Item>

                <Form.Item name="twitter" label="توییتر (X)">
                  <Input
                    prefix={<RxTwitterLogo className="text-gray-700" />}
                    placeholder="https://twitter.com/..."
                    size="large"
                  />
                </Form.Item>
              </div>
            </Card>

            {/* Location */}
            <Card title="موقعیت روی نقشه" size="small">
              <Alert
                message="مکان غرفه را روی نقشه مشخص کنید"
                description="برای انتخاب موقعیت، روی نقشه کلیک کنید"
                type="info"
                showIcon
                className="mb-4"
              />
              <Wrapper
                apiKey={"AIzaSyAtOnE4vyEvfJxG268WbsUlK9EphptwyWo"}
                render={renderMap}
              >
                <MapComponent
                  initialLatLng={latLng}
                  handleLatLngChange={(lat: number, lng: number) => {
                    setLatLng({ lat, lng });
                    setIsMapTouched(true);
                  }}
                />
              </Wrapper>
            </Card>

            {/* Submit Button */}
            <Form.Item className="mb-0">
              <ConfigProvider theme={{ token: { colorPrimary: "#10b981" } }}>
                <Button
                  htmlType="submit"
                  type="primary"
                  size="large"
                  disabled={!submittable || !isMapTouched}
                  block
                  className="h-12 text-lg"
                >
                  {isEdit ? "ویرایش غرفه" : "افزودن غرفه"}
                </Button>
              </ConfigProvider>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
}
