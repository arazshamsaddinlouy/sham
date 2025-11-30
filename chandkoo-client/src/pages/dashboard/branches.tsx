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
  Grid,
  Spin,
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
const { useBreakpoint } = Grid;

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
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [locationLoadingId, setLocationLoadingId] = useState<string | null>(
    null
  );

  const [form] = Form.useForm();
  const values = Form.useWatch([], form);
  const value: any = useContext(ShamContext);
  const screens = useBreakpoint();

  // Handle branch location view
  const handleBranchLocation = async (id: string) => {
    setLocationLoadingId(id);
    try {
      const data = await getBranchLocation(id);
      if (data.status === 200) {
        setLocationLatLng({ lat: data.data.lat, lng: data.data.lng });
        setLocationModal(true);
      }
    } finally {
      setLocationLoadingId(null);
    }
  };

  // Mobile-friendly table columns
  const columns: TableColumnsType<Branch> = [
    {
      title: "نام غرفه",
      dataIndex: "name",
      render: (name: string, record: Branch) => (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <BiStore className="text-blue-500 text-sm" />
            <Text strong className="text-xs sm:text-sm">
              {name}
            </Text>
          </div>
          {screens.xs && (
            <div className="flex flex-col gap-1 mt-1">
              <div className="flex items-center gap-1 text-gray-500 text-xs">
                <BiUser className="text-xs" />
                <span>
                  {record.first_name} {record.last_name}
                </span>
              </div>
              <div className="flex items-center gap-1 text-gray-500 text-xs">
                <BiPhone className="text-xs" />
                <span>{record.phone_number}</span>
              </div>
              <div className="flex flex-wrap gap-1 mt-1">
                {(record.categories || []).slice(0, 2).map((cat) => (
                  <Tag
                    key={cat.id}
                    color="blue"
                    className="text-xs rounded-full px-1 py-0"
                  >
                    {cat.title}
                  </Tag>
                ))}
                {(record.categories || []).length > 2 && (
                  <Tag className="text-xs rounded-full px-1 py-0">
                    +{(record.categories || []).length - 2}
                  </Tag>
                )}
              </div>
            </div>
          )}
        </div>
      ),
    },
    {
      title: "مسئول",
      dataIndex: "first_name",
      render: (_: any, record: Branch) => (
        <div className="flex items-center gap-1 text-gray-600">
          <BiUser className="text-sm" />
          <span className="text-xs sm:text-sm">
            {record.first_name} {record.last_name}
          </span>
        </div>
      ),
      responsive: ["sm"],
    },
    {
      title: "دسته‌بندی",
      dataIndex: "categories",
      render: (categories: Array<{ id: string; title: string }>) => (
        <div className="flex flex-wrap gap-1">
          {(categories || []).slice(0, 3).map((cat) => (
            <Tag
              key={cat.id}
              color="blue"
              className="text-xs rounded-full px-2 py-1"
            >
              {cat.title}
            </Tag>
          ))}
          {(categories || []).length > 3 && (
            <Tag className="text-xs rounded-full px-2 py-1">
              +{(categories || []).length - 3}
            </Tag>
          )}
        </div>
      ),
      responsive: ["md"],
    },
    {
      title: "تماس",
      dataIndex: "phone_number",
      render: (phone: string) => (
        <div className="flex items-center gap-1 text-gray-600">
          <BiPhone className="text-sm" />
          <span className="text-xs sm:text-sm">{phone}</span>
        </div>
      ),
      responsive: ["lg"],
    },
    {
      title: "آدرس",
      dataIndex: "address",
      render: (address: string) => (
        <Text className="text-xs sm:text-sm" ellipsis={{ tooltip: address }}>
          {address}
        </Text>
      ),
      responsive: ["lg"],
    },
    {
      title: "عملیات",
      dataIndex: "actions",
      width: screens.xs ? 120 : 300,
      render: (_: any, record: Branch) => (
        <Space direction="horizontal" size="small" wrap={screens.xs}>
          <ConfigProvider theme={{ token: { colorPrimary: "#1890ff" } }}>
            <Button
              type="primary"
              size="small"
              icon={<BiPencil />}
              onClick={() => handleEdit(record)}
              className={screens.xs ? "!text-xs !px-2" : ""}
            >
              {screens.xs ? "" : "ویرایش"}
            </Button>
          </ConfigProvider>

          <ConfigProvider theme={{ token: { colorPrimary: "#52c41a" } }}>
            <Button
              type="primary"
              size="small"
              icon={<BiMap />}
              onClick={() => handleBranchLocation(record.id)}
              loading={locationLoadingId === record.id}
              className={screens.xs ? "!text-xs !px-2" : ""}
            >
              {screens.xs ? "" : "مکان"}
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
              <Button
                type="primary"
                size="small"
                icon={<RxCross2 />}
                className={screens.xs ? "!text-xs !px-2" : ""}
              >
                {screens.xs ? "" : "حذف"}
              </Button>
            </Popconfirm>
          </ConfigProvider>
        </Space>
      ),
    },
  ];

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
  }, [form, values, selectedCategory]);

  // Handle edit
  const handleEdit = async (record: Branch) => {
    setModalLoading(true);
    setIsEdit(record.id);

    // Use the first category ID for single select
    const categoryId = record.categoryId ? record.categoryId.split(",")[0] : "";
    setSelectedCategory(categoryId);

    try {
      const data = await getBranchLocation(record.id);
      if (data.status === 200) {
        setLatLng({ lat: data.data.lat, lng: data.data.lng });
        setIsMapTouched(true);

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
          categoryId: categoryId, // Set as single value for TreeSelect
        });
        setIsModalOpen(true);
      }
    } finally {
      setModalLoading(false);
    }
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
  const handleSubmit = async () => {
    try {
      setSubmitLoading(true);
      const values = await form.validateFields();

      // Prepare payload - send categoryId as single value
      const payload = {
        ...values,
        lat: latLng.lat,
        lng: latLng.lng,
        categoryId: selectedCategory, // Send as single value
      };

      console.log("Submitting branch data:", payload);

      const request = isEdit
        ? editBranch({ ...payload, id: isEdit })
        : addBranch(payload);

      const data = await request;

      if (data.status === 200) {
        setIsModalOpen(false);

        // Force refresh the branches list with a small delay to ensure backend has updated
        setTimeout(() => {
          fetchBranches();
        }, 100);

        value.setNotif({
          type: "success",
          description: `غرفه ${isEdit ? "ویرایش" : "افزوده"} شد`,
        });

        // Reset form and states
        form.resetFields();
        setSelectedCategory("");
        setIsMapTouched(false);
        setIsEdit(undefined);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      value.setNotif({
        type: "error",
        description: "خطا در ذخیره‌سازی غرفه",
      });
    } finally {
      setSubmitLoading(false);
    }
  };

  // Show modal for new branch
  const showModal = () => {
    form.resetFields();
    setLatLng({ lat: 35.6892, lng: 51.389 });
    setIsMapTouched(false);
    setSelectedCategory("");
    setIsEdit(undefined);
    setIsModalOpen(true);
  };

  // Close modal and reset states
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSubmitLoading(false);
    setModalLoading(false);
    form.resetFields();
    setSelectedCategory("");
  };

  const renderMap = (status: Status) => (
    <div className="flex justify-center items-center h-64 bg-gray-100 rounded-lg">
      <Text type="secondary">{status}</Text>
    </div>
  );

  return (
    <div className="p-4 sm:p-6">
      {/* Header - Responsive */}
      <Card className="mb-4 sm:mb-6 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="text-center sm:text-right">
            <Title
              level={screens.xs ? 3 : 2}
              className="!mb-2 !text-lg sm:!text-2xl"
            >
              <BiStore className="inline mr-2" />
              مدیریت غرفه‌ها
            </Title>
            <Text type="secondary" className="text-xs sm:text-sm">
              مدیریت و تنظیمات غرفه‌های فروشگاهی
            </Text>
          </div>
          <ConfigProvider theme={{ token: { colorPrimary: "#10b981" } }}>
            <Button
              type="primary"
              size={screens.xs ? "middle" : "large"}
              icon={<BiPlus />}
              onClick={showModal}
              className="w-full sm:w-auto h-10 sm:h-12 px-4 sm:px-6 text-sm sm:text-base"
              block={screens.xs}
            >
              افزودن غرفه جدید
            </Button>
          </ConfigProvider>
        </div>
      </Card>

      {/* Branches Table */}
      <Card
        title={
          <div className="flex items-center gap-2 flex-wrap">
            <BiStore />
            <span className="text-sm sm:text-base">لیست غرفه‌ها</span>
            <Tag color="blue" className="text-xs">
              {branches.length} غرفه
            </Tag>
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
            showSizeChanger: screens.sm,
            showQuickJumper: screens.sm,
            simple: screens.xs,
            size: screens.xs ? "small" : "default",
          }}
          scroll={{ x: screens.xs ? 600 : 1000 }}
          size={screens.xs ? "small" : "middle"}
          className="responsive-table"
        />
      </Card>

      {/* Location Modal */}
      <Modal
        open={locationModal}
        width={screens.xs ? "95%" : 800}
        onCancel={() => setLocationModal(false)}
        footer={null}
        title={
          <div className="flex items-center gap-2">
            <BiMap className="text-blue-500" />
            <span className="text-sm sm:text-base">موقعیت غرفه روی نقشه</span>
          </div>
        }
        className="responsive-modal"
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
        onCancel={handleModalClose}
        width={screens.xs ? "95%" : screens.sm ? 800 : 1000}
        footer={null}
        title={
          <div className="flex items-center gap-2">
            <BiStore className="text-green-500" />
            <span className="text-sm sm:text-base">
              {isEdit ? "ویرایش غرفه" : "افزودن غرفه جدید"}
            </span>
          </div>
        }
        className="responsive-modal"
        style={{ top: screens.xs ? 16 : 20 }}
        confirmLoading={modalLoading}
      >
        <Spin spinning={modalLoading} tip="در حال بارگذاری...">
          <div className="max-h-[70vh] overflow-y-auto pr-2">
            <Form
              form={form}
              layout="vertical"
              className="space-y-4"
              onFinish={handleSubmit}
            >
              {/* Basic Information */}
              <Card title="اطلاعات اصلی" size="small">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
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
                    <Input
                      placeholder="مثال: محمد"
                      size={screens.xs ? "middle" : "large"}
                    />
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
                    <Input
                      placeholder="مثال: محمدی"
                      size={screens.xs ? "middle" : "large"}
                    />
                  </Form.Item>

                  <Form.Item
                    name="name"
                    label="نام غرفه"
                    rules={[{ required: true, message: "نام غرفه اجباری است" }]}
                  >
                    <Input
                      placeholder="مثال: غرفه میرداماد"
                      size={screens.xs ? "middle" : "large"}
                    />
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
                    <Input
                      placeholder="مثال: 021221122"
                      size={screens.xs ? "middle" : "large"}
                    />
                  </Form.Item>
                </div>

                <Form.Item
                  name="address"
                  label="آدرس"
                  rules={[{ required: true, message: "آدرس اجباری است" }]}
                >
                  <TextArea
                    rows={screens.xs ? 2 : 3}
                    placeholder="آدرس کامل غرفه را وارد کنید..."
                    className="resize-none"
                  />
                </Form.Item>

                <Form.Item
                  name="categoryId"
                  label="دسته‌بندی"
                  rules={[
                    {
                      required: true,
                      message: "دسته‌بندی اجباری است",
                    },
                  ]}
                >
                  <TreeSelect
                    showSearch
                    treeCheckable={false}
                    value={selectedCategory}
                    dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                    placeholder="یک دسته‌بندی انتخاب کنید"
                    allowClear
                    onChange={(value) => {
                      setSelectedCategory(value || "");
                    }}
                    treeData={categories}
                    treeNodeFilterProp="title"
                    size={screens.xs ? "middle" : "large"}
                    // Remove disabled property to allow selecting both root and child categories
                  />
                </Form.Item>
              </Card>

              {/* Social Media */}
              <Card title="شبکه‌های اجتماعی" size="small">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <Form.Item name="instagram" label="اینستاگرام">
                    <Input
                      prefix={<RxInstagramLogo className="text-pink-500" />}
                      placeholder="https://instagram.com/..."
                      size={screens.xs ? "middle" : "large"}
                    />
                  </Form.Item>

                  <Form.Item name="whatsapp" label="واتس‌آپ">
                    <Input
                      prefix={<FaWhatsapp className="text-green-500" />}
                      placeholder="09123456789"
                      size={screens.xs ? "middle" : "large"}
                    />
                  </Form.Item>

                  <Form.Item name="linkedin" label="لینکداین">
                    <Input
                      prefix={<RxLinkedinLogo className="text-blue-600" />}
                      placeholder="https://linkedin.com/..."
                      size={screens.xs ? "middle" : "large"}
                    />
                  </Form.Item>

                  <Form.Item name="youtube" label="یوتیوب">
                    <Input
                      prefix={<FaYoutube className="text-red-500" />}
                      placeholder="https://youtube.com/..."
                      size={screens.xs ? "middle" : "large"}
                    />
                  </Form.Item>

                  <Form.Item name="facebook" label="فیس‌بوک">
                    <Input
                      prefix={<FaFacebook className="text-blue-500" />}
                      placeholder="https://facebook.com/..."
                      size={screens.xs ? "middle" : "large"}
                    />
                  </Form.Item>

                  <Form.Item name="twitter" label="توییتر (X)">
                    <Input
                      prefix={<RxTwitterLogo className="text-gray-700" />}
                      placeholder="https://twitter.com/..."
                      size={screens.xs ? "middle" : "large"}
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
                  className="mb-4 text-xs sm:text-sm"
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
                    size={screens.xs ? "middle" : "large"}
                    disabled={!submittable || !isMapTouched}
                    loading={submitLoading}
                    block
                    className={`${
                      screens.xs ? "h-10 text-base" : "h-12 text-lg"
                    }`}
                  >
                    {isEdit ? "ویرایش غرفه" : "افزودن غرفه"}
                  </Button>
                </ConfigProvider>
              </Form.Item>
            </Form>
          </div>
        </Spin>
      </Modal>
    </div>
  );
}
