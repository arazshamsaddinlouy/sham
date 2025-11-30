import {
  Avatar,
  Button,
  ConfigProvider,
  Input,
  Modal,
  Table,
  TableColumnsType,
  Tag,
  Grid,
  Card,
  Space,
  Form,
  message as antMessage,
  Tooltip,
  Tabs,
  Typography,
  List,
  Drawer,
} from "antd";
import {
  BsShop,
  BsTelephone,
  BsPhone,
  BsInfoCircle,
  BsGeoAlt,
  BsPinMap,
  BsPersonCheck,
  BsBuilding,
  BsStar,
  BsXCircle,
  BsClock,
} from "react-icons/bs";
import { distance } from "@turf/turf";
import { useCallback, useContext, useEffect, useState } from "react";
import { Status, Wrapper } from "@googlemaps/react-wrapper";
import MapComponent from "../../components/google-map";
import { BiLocationPlus, BiSend, BiUserCheck } from "react-icons/bi";
import { MdMessage } from "react-icons/md";
import {
  addPriceMessageResponse,
  getAllInquiryResponses,
} from "../../services/inquiry-response.service";
import { useParams } from "react-router-dom";
import formatPersianNumber from "../../utils/numberPriceFormat";
import { config } from "../../services/config.service";
import { IoDownload } from "react-icons/io5";
import { ShamContext } from "../../App";
import ImageUploader from "../../components/image-uploader";
import FileUploader from "../../components/file-uploader";
import { DescriptionsProps } from "antd/lib";
import {
  getInquiryByKey,
  markInquiryAsRead,
} from "../../services/price-inquiry.service";

import { getUserCoords } from "../../services/user.service";

const { useBreakpoint } = Grid;
const { Text, Title } = Typography;

interface DataType {
  key: React.Key;
  category: string;
  phone: string;
  address: string;
}

export default function Responses() {
  const screens = useBreakpoint();
  const [form] = Form.useForm();
  const [userLatLng, setUserLatLng] = useState<any>({
    lat: 35.6892,
    lng: 51.389,
  });
  const [locationLatLng, setLocationLatLng] = useState<any>({
    lat: 35.6892,
    lng: 51.389,
  });
  const [message, setMessage] = useState<string>("");
  const value: any = useContext(ShamContext);
  const { id } = useParams();
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [inquiry, setInquiry] = useState<any>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sellerInfo, setSellerInfo] = useState<any>([]);
  const [file, setFile] = useState<File | null>();
  const [image, setImage] = useState<File | null>();
  const [isSellerModalOpen, setIsSellerModalOpen] = useState<boolean>(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [messageRecord, setMessageRecord] = useState<any>();
  const [_items, setItems] = useState<DescriptionsProps["items"]>([]);
  const [loading, setLoading] = useState(false);
  const [sbmitLoading, setSmibLoading] = useState<boolean>(false);
  const [isSellerDrawerOpen, setIsSellerDrawerOpen] = useState(false);

  const isMobile = !screens.md;
  const isTablet = screens.md && !screens.lg;

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleSellerOpen = (request: any) => {
    setSellerInfo(request.seller);
    if (isMobile) {
      setIsSellerDrawerOpen(true);
    } else {
      setIsSellerModalOpen(true);
    }
  };

  useEffect(() => {
    getUserCoords().then((data) => {
      if (data.status === 200) {
        setUserLatLng({ lat: data.data.lat, lng: data.data.lng });
      }
    });
  }, []);

  const branchColumns: TableColumnsType<DataType> = [
    {
      title: "نام غرفه",
      dataIndex: "name",
      render: (name: string) => (
        <Text strong className="text-sm sm:text-base">
          {name}
        </Text>
      ),
    },
    {
      title: "دسته بندی",
      dataIndex: "category",
      render: (_, record: any) => (
        <div className="flex flex-wrap gap-1">
          {(record.categories || [])
            .slice(0, isMobile ? 1 : 3)
            .map((cat: any, index: number) => (
              <Tag
                key={index}
                color="blue"
                className="text-xs px-2 py-1 rounded-full border-0"
              >
                {cat.title}
              </Tag>
            ))}
          {(record.categories || []).length > (isMobile ? 1 : 3) && (
            <Tooltip
              title={
                <div>
                  {(record.categories || [])
                    .slice(isMobile ? 1 : 3)
                    .map((cat: any, idx: number) => (
                      <div key={idx}>{cat.title}</div>
                    ))}
                </div>
              }
            >
              <Tag color="default" className="text-xs">
                +{(record.categories || []).length - (isMobile ? 1 : 3)}
              </Tag>
            </Tooltip>
          )}
        </div>
      ),
    },
    {
      title: "تلفن",
      dataIndex: "phone_number",
      render: (phone: string) => (
        <a
          href={`tel:${phone}`}
          className="text-blue-600 hover:text-blue-800 text-sm sm:text-base"
        >
          {phone}
        </a>
      ),
    },
    {
      title: "آدرس",
      dataIndex: "address",
      render: (address: string) => (
        <Tooltip title={address}>
          <Text
            ellipsis
            className="max-w-[120px] sm:max-w-[200px] text-xs sm:text-sm"
          >
            {address}
          </Text>
        </Tooltip>
      ),
    },
  ];

  const getResponsiveColumns = () => {
    const baseColumns: TableColumnsType<any> = [
      {
        title: "قیمت پیشنهادی",
        dataIndex: "suggestedPrice",
        sorter: (a: any, b: any) => a.price - b.price,
        render: (_, record: any) => (
          <Tag
            color="green"
            className="text-sm sm:text-base font-semibold px-3 sm:px-4 py-1 rounded-full"
          >
            {formatPersianNumber(record.price)} ریال
          </Tag>
        ),
      },
      {
        title: "فاصله از شما",
        dataIndex: "distanceFromYou",
        sorter: (a: any, b: any) => a.distanceFromYou - b.distanceFromYou,
        render: (_: string, record: any) => (
          <div className="flex items-center gap-1 sm:gap-2 text-gray-600">
            <span className="text-xs sm:text-sm">
              {new Intl.NumberFormat("fa-IR").format(
                Math.round(record.distanceFromYou)
              )}{" "}
              متر
            </span>
          </div>
        ),
      },
    ];

    if (!isMobile) {
      baseColumns.push({
        title: "زمان اعتبار",
        dataIndex: "validTime",
        render: (_: string, record: any) => (
          <div className="text-xs sm:text-sm text-gray-600">
            {record.expiredAt
              ? new Date(record.expiredAt).toLocaleDateString("fa-IR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "امروز"}
          </div>
        ),
      });
    }

    baseColumns.push({
      title: "عملیات",
      dataIndex: "actions",
      width: isMobile ? 120 : isTablet ? 200 : 300,
      render: (_value: string, record: any) => (
        <Space
          direction={isMobile ? "vertical" : "horizontal"}
          size="small"
          wrap
        >
          <ConfigProvider theme={{ token: { colorPrimary: "#00b96b" } }}>
            <Button
              type="primary"
              size={isMobile ? "small" : "middle"}
              icon={<BiUserCheck />}
              onClick={() => handleSellerOpen(record)}
              className="flex items-center gap-1 w-full sm:w-auto"
            >
              {!isMobile && "فروشنده"}
            </Button>
          </ConfigProvider>

          <Button
            type={record.messages.length > 0 ? "default" : "dashed"}
            size={isMobile ? "small" : "middle"}
            icon={<MdMessage />}
            onClick={() => {
              setMessageRecord(record);
              showMessageModal();
            }}
            disabled={record.messages.length === 0}
            className="flex items-center gap-1 w-full sm:w-auto"
          >
            {!isMobile && `${formatPersianNumber(record.messages.length)} پیام`}
          </Button>
        </Space>
      ),
    });

    return baseColumns;
  };

  const fetchInquiryResponses = useCallback(async () => {
    setLoading(true);
    try {
      const [inquiryData, responsesData] = await Promise.all([
        getInquiryByKey(`${id}`),
        getAllInquiryResponses(`${id}`),
      ]);

      if (Array.isArray(inquiryData.data) && inquiryData.data.length > 0) {
        setInquiry(inquiryData.data[0]);
      }

      if (responsesData.status === 200) {
        const records = responsesData.data.map((r: any) => {
          const point1 = [userLatLng.lng, userLatLng.lat];
          const point2 = [r.seller.lng, r.seller.lat];
          const dist = distance(point1, point2, { units: "meters" });
          return { ...r, distanceFromYou: dist };
        });
        setDataSource(records);
      } else {
        setDataSource([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      antMessage.error("خطا در دریافت اطلاعات");
    } finally {
      setLoading(false);
    }
  }, [id, userLatLng]);

  useEffect(() => {
    fetchInquiryResponses();
    if (id) {
      markInquiryAsRead(id).catch(console.error);
    }
  }, [id]);

  useEffect(() => {
    if (sellerInfo) {
      setItems([
        {
          key: 1,
          label: "نام",
          children: (
            <Text className="font-medium">{sellerInfo?.first_name}</Text>
          ),
          span: isMobile ? 2 : 1,
        },
        {
          key: 2,
          label: "نام خانوادگی",
          children: (
            <Text className="font-medium">{sellerInfo?.last_name}</Text>
          ),
          span: isMobile ? 2 : 1,
        },
        {
          key: 3,
          label: "کد پستی",
          children: <Text>{sellerInfo?.postalCode || "---"}</Text>,
          span: isMobile ? 2 : 1,
        },
        {
          key: 4,
          label: "موبایل",
          children: (
            <a href={`tel:${sellerInfo?.mobile}`} className="text-blue-600">
              {sellerInfo?.mobile}
            </a>
          ),
          span: isMobile ? 2 : 1,
        },
        {
          key: 5,
          label: "شهر",
          children: <Text>{sellerInfo?.city?.name || "---"}</Text>,
          span: isMobile ? 2 : 1,
        },
        {
          key: 6,
          label: "استان",
          children: <Text>{sellerInfo?.province?.name || "---"}</Text>,
          span: isMobile ? 2 : 1,
        },
        {
          key: 7,
          label: "تلفن",
          children: (
            <a
              href={`tel:${sellerInfo?.phone_number}`}
              className="text-blue-600"
            >
              {sellerInfo?.phone_number}
            </a>
          ),
          span: 2,
        },
        {
          key: 8,
          label: "آدرس",
          children: (
            <Text className="leading-relaxed">
              {sellerInfo?.address || "---"}
            </Text>
          ),
          span: 2,
        },
      ]);
    }
  }, [sellerInfo, isMobile]);

  const handleAllPoints = () => {
    const points = dataSource.map((s) => ({
      lat: s.seller.lat,
      lng: s.seller.lng,
      price: s.price,
    }));
    setLocationLatLng(points);
    showModal();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleMessageCancel = () => {
    setIsMessageModalOpen(false);
    setMessage("");
    setFile(null);
    setImage(null);
    form.resetFields();
  };

  const handleSellerInfoCancel = () => {
    setIsSellerModalOpen(false);
    setIsSellerDrawerOpen(false);
  };

  const showMessageModal = () => {
    setIsMessageModalOpen(true);
  };

  const handleSubmit = async () => {
    if (!message.trim() && !file && !image) {
      antMessage.warning("لطفا پیام یا فایل پیوستی وارد کنید");
      return;
    }
    setSmibLoading(true);
    const formData = new FormData();
    if (message.trim()) formData.append("message", message.trim());
    formData.append("isMine", "true");
    formData.append("sellerId", `${messageRecord?.sellerId}`);
    formData.append("requestId", messageRecord.inquiry.id);
    if (file) formData.append("audio", file);
    if (image) formData.append("image", image);

    try {
      const data = await addPriceMessageResponse(formData);
      if (data.status === 200) {
        value.setNotif({ type: "success", description: "پیام ارسال شد" });
        fetchInquiryResponses();
        setIsMessageModalOpen(false);
        setMessage("");
        setFile(null);
        setImage(null);
        form.resetFields();
        setSmibLoading(false);
      } else {
        setSmibLoading(false);
        throw new Error("خطا در ثبت پیام");
      }
    } catch (error) {
      value.setNotif({ type: "error", description: "خطا در ثبت پیام" });
      setSmibLoading(false);
    }
  };

  const handleAudio = (audio: File | null) => {
    setFile(audio);
  };

  const handleImage = (img: File | null) => {
    setImage(img);
  };

  const render = (status: Status) => <h1>{status}</h1>;

  const renderSellerInfo = () => (
    <div className={isMobile ? "p-4" : "flex flex-col h-full"}>
      {/* Header with Gradient Background */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <Avatar
              size={isMobile ? 48 : 64}
              className="bg-white text-blue-600 text-lg sm:text-xl font-bold border-4 border-white shadow-lg"
            >
              {sellerInfo?.first_name?.[0]}
              {sellerInfo?.last_name?.[0]}
            </Avatar>
            <div>
              <Title level={isMobile ? 4 : 2} className="!mb-1 !text-white">
                {sellerInfo?.first_name} {sellerInfo?.last_name}
              </Title>
              <Text className="text-blue-100 opacity-90 flex items-center gap-2 text-sm sm:text-base">
                <BsShop className="text-sm sm:text-lg" />
                فروشنده تایید شده
              </Text>
            </div>
          </div>

          <div className="flex-1" />

          {/* Contact Actions */}
          <div className="flex flex-wrap gap-2 w-full sm:w-auto mt-3 sm:mt-0">
            {sellerInfo?.phone_number && (
              <a
                href={`tel:${sellerInfo.phone_number}`}
                className="bg-white text-blue-600 hover:bg-blue-50 px-3 sm:px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors text-sm sm:text-base flex-1 sm:flex-none text-center justify-center"
              >
                <BsTelephone />
                تماس
              </a>
            )}
            {sellerInfo?.mobile && (
              <a
                href={`tel:${sellerInfo.mobile}`}
                className="bg-green-500 text-white hover:bg-green-600 px-3 sm:px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors text-sm sm:text-base flex-1 sm:flex-none text-center justify-center"
              >
                <BsPhone />
                موبایل
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Content Area with Tabs */}
      <div className="flex-1 overflow-hidden">
        <Tabs
          defaultActiveKey="info"
          className="h-full"
          size={isMobile ? "small" : "middle"}
          items={[
            {
              key: "info",
              label: (
                <span className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                  <BsInfoCircle />
                  اطلاعات
                </span>
              ),
              children: (
                <div
                  className="p-3 sm:p-6 overflow-y-auto"
                  style={{
                    maxHeight: isMobile ? "50vh" : "calc(80vh - 200px)",
                  }}
                >
                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-4 sm:mb-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg sm:rounded-xl p-2 sm:p-4 text-center">
                      <div className="text-lg sm:text-2xl font-bold text-blue-600 mb-1">
                        {formatPersianNumber(sellerInfo?.branches?.length || 0)}
                      </div>
                      <div className="text-xs sm:text-sm text-blue-700">
                        شعبه فعال
                      </div>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg sm:rounded-xl p-2 sm:p-4 text-center">
                      <div className="text-lg sm:text-2xl font-bold text-green-600 mb-1">
                        {formatPersianNumber(
                          dataSource.filter(
                            (d) => d.sellerId === sellerInfo?.id
                          ).length
                        )}
                      </div>
                      <div className="text-xs sm:text-sm text-green-700">
                        پیشنهاد ارسال شده
                      </div>
                    </div>
                    <div className="bg-purple-50 border border-purple-200 rounded-lg sm:rounded-xl p-2 sm:p-4 text-center">
                      <div className="text-lg sm:text-2xl font-bold text-purple-600 mb-1">
                        {formatPersianNumber(sellerInfo?.responseCount || 0)}
                      </div>
                      <div className="text-xs sm:text-sm text-purple-700">
                        پاسخ‌های ثبت شده
                      </div>
                    </div>
                    <div className="bg-orange-50 border border-orange-200 rounded-lg sm:rounded-xl p-2 sm:p-4 text-center">
                      <div className="text-lg sm:text-2xl font-bold text-orange-600 mb-1">
                        {sellerInfo?.rating || "---"}
                      </div>
                      <div className="text-xs sm:text-sm text-orange-700">
                        امتیاز فروشنده
                      </div>
                    </div>
                  </div>

                  {/* Seller Details */}
                  <Card
                    title="مشخصات فروشنده"
                    className="mb-4 sm:mb-6 shadow-sm"
                    size="small"
                    extra={
                      <Tag
                        color="blue"
                        icon={<BsPersonCheck />}
                        className="text-xs"
                      >
                        فروشنده معتبر
                      </Tag>
                    }
                  >
                    <div className="space-y-4">
                      {/* Contact Information */}
                      <div className="space-y-3">
                        <Title
                          level={5}
                          className="!mb-3 flex items-center gap-2"
                        >
                          <BsTelephone />
                          اطلاعات تماس
                        </Title>
                        {sellerInfo?.phone_number && (
                          <div className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg">
                            <Text className="text-gray-600 text-sm">
                              تلفن ثابت:
                            </Text>
                            <a
                              href={`tel:${sellerInfo.phone_number}`}
                              className="text-blue-600 font-semibold text-sm"
                            >
                              {sellerInfo.phone_number}
                            </a>
                          </div>
                        )}
                        {sellerInfo?.mobile && (
                          <div className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg">
                            <Text className="text-gray-600 text-sm">
                              موبایل:
                            </Text>
                            <a
                              href={`tel:${sellerInfo.mobile}`}
                              className="text-green-600 font-semibold text-sm"
                            >
                              {sellerInfo.mobile}
                            </a>
                          </div>
                        )}
                      </div>

                      {/* Location Information */}
                      <div className="space-y-3">
                        <Title
                          level={5}
                          className="!mb-3 flex items-center gap-2"
                        >
                          <BsGeoAlt />
                          اطلاعات مکانی
                        </Title>
                        {sellerInfo?.province?.name && (
                          <div className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg">
                            <Text className="text-gray-600 text-sm">
                              استان:
                            </Text>
                            <Text className="font-semibold text-sm">
                              {sellerInfo.province.name}
                            </Text>
                          </div>
                        )}
                        {sellerInfo?.city?.name && (
                          <div className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg">
                            <Text className="text-gray-600 text-sm">شهر:</Text>
                            <Text className="font-semibold text-sm">
                              {sellerInfo.city.name}
                            </Text>
                          </div>
                        )}
                        {sellerInfo?.postalCode && (
                          <div className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg">
                            <Text className="text-gray-600 text-sm">
                              کد پستی:
                            </Text>
                            <Text className="font-semibold text-sm">
                              {sellerInfo.postalCode}
                            </Text>
                          </div>
                        )}
                      </div>

                      {/* Address */}
                      {sellerInfo?.address && (
                        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <Title
                            level={5}
                            className="!mb-2 flex items-center gap-2 text-blue-700"
                          >
                            <BsPinMap />
                            آدرس کامل
                          </Title>
                          <Text className="text-blue-800 leading-relaxed text-sm">
                            {sellerInfo.address}
                          </Text>
                        </div>
                      )}
                    </div>
                  </Card>
                </div>
              ),
            },
            {
              key: "branches",
              label: (
                <span className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                  <BsShop />
                  شعب ({formatPersianNumber(sellerInfo?.branches?.length || 0)})
                </span>
              ),
              children: (
                <div
                  className="p-3 sm:p-6 overflow-y-auto"
                  style={{
                    maxHeight: isMobile ? "50vh" : "calc(80vh - 200px)",
                  }}
                >
                  <Card
                    title="شعب و نمایندگی‌ها"
                    className="shadow-sm"
                    size="small"
                    extra={
                      <Tag
                        color="green"
                        icon={<BsBuilding />}
                        className="text-xs"
                      >
                        {formatPersianNumber(sellerInfo?.branches?.length || 0)}{" "}
                        شعبه
                      </Tag>
                    }
                  >
                    {isMobile ? (
                      <List
                        dataSource={sellerInfo?.branches || []}
                        renderItem={(branch: any) => (
                          <List.Item className="border-b border-gray-200 py-3">
                            <div className="w-full">
                              <Text strong className="block mb-2">
                                {branch.name}
                              </Text>
                              <div className="flex flex-wrap gap-1 mb-2">
                                {(branch.categories || [])
                                  .slice(0, 2)
                                  .map((cat: any, index: number) => (
                                    <Tag
                                      key={index}
                                      color="blue"
                                      className="text-xs"
                                    >
                                      {cat.title}
                                    </Tag>
                                  ))}
                              </div>
                              <div className="flex justify-between items-center text-xs text-gray-600">
                                <a
                                  href={`tel:${branch.phone_number}`}
                                  className="text-blue-600"
                                >
                                  {branch.phone_number}
                                </a>
                                <Tooltip title={branch.address}>
                                  <Text ellipsis className="max-w-[100px]">
                                    {branch.address}
                                  </Text>
                                </Tooltip>
                              </div>
                            </div>
                          </List.Item>
                        )}
                      />
                    ) : (
                      <Table<DataType>
                        columns={branchColumns}
                        dataSource={sellerInfo?.branches || []}
                        scroll={{ x: 600 }}
                        pagination={false}
                        size="small"
                        className="branches-table"
                      />
                    )}
                  </Card>
                </div>
              ),
            },
          ]}
        />
      </div>

      {/* Footer Actions */}
      {!isMobile && (
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <div className="flex flex-wrap gap-3 justify-between items-center">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <BsClock />
              عضو شده از{" "}
              {sellerInfo?.createdAt
                ? new Date(sellerInfo.createdAt).toLocaleDateString("fa-IR")
                : "---"}
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleSellerInfoCancel}
                className="flex items-center gap-2"
              >
                <BsXCircle />
                بستن
              </Button>
              <Button
                type="primary"
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
              >
                <BsStar />
                افزودن به علاقه‌مندی‌ها
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 lg:p-6">
      {/* Header Section */}
      <Card className="mb-4 sm:mb-6 shadow-sm border-0">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3 sm:gap-4">
          <div className="flex-1">
            <Title level={isMobile ? 4 : 1} className="!mb-2">
              پاسخ استعلام‌ها به{" "}
              <span className="text-blue-600">{inquiry?.title}</span>
            </Title>
            <div className="flex items-center gap-2 flex-wrap">
              <Tag color="blue" className="text-xs sm:text-sm">
                گروه کالا:
              </Tag>
              <Text className="font-medium text-sm sm:text-base">
                {inquiry?.category?.title}
              </Text>
            </div>
          </div>

          {dataSource.length > 0 && (
            <Button
              type="primary"
              size={isMobile ? "middle" : "large"}
              icon={<BiLocationPlus />}
              onClick={handleAllPoints}
              className="bg-blue-600 hover:bg-blue-700 border-0 shadow-md w-full lg:w-auto mt-2 lg:mt-0"
            >
              مشاهده روی نقشه
            </Button>
          )}
        </div>
      </Card>

      {/* Table Section */}
      <Card className="shadow-sm border-0">
        <Table<any>
          columns={getResponsiveColumns()}
          dataSource={dataSource}
          loading={loading}
          scroll={{ x: isMobile ? 600 : 800 }}
          pagination={{
            pageSize: isMobile ? 5 : 10,
            showSizeChanger: !isMobile,
            showQuickJumper: !isMobile,
            responsive: true,
            size: isMobile ? "small" : "default",
          }}
          size={isMobile ? "small" : "middle"}
          className="responsive-table"
        />
      </Card>

      {/* Seller Info Modal for Desktop/Tablet */}
      <Modal
        open={isSellerModalOpen}
        width={isTablet ? 900 : 1100}
        onCancel={handleSellerInfoCancel}
        footer={null}
        centered
        className="seller-info-modal"
        styles={{
          body: { padding: "0" },
        }}
      >
        {renderSellerInfo()}
      </Modal>

      {/* Seller Info Drawer for Mobile */}
      <Drawer
        open={isSellerDrawerOpen}
        onClose={handleSellerInfoCancel}
        width="100%"
        height="90%"
        placement="bottom"
        className="seller-info-drawer"
        styles={{
          body: { padding: "0" },
        }}
      >
        {renderSellerInfo()}
      </Drawer>

      {/* Message Modal */}
      <Modal
        open={isMessageModalOpen}
        width={isMobile ? "95%" : isTablet ? 800 : 1000}
        onCancel={handleMessageCancel}
        footer={null}
        centered
        styles={{
          body: { padding: isMobile ? "16px" : "24px" },
        }}
      >
        <Form form={form} layout="vertical">
          <div
            className="flex flex-col"
            style={{ height: isMobile ? "70vh" : "60vh" }}
          >
            <Title level={4} className="!mb-4">
              مکاتبات
            </Title>

            <div className="flex-1 overflow-hidden mb-4">
              <div className="h-full overflow-y-auto pr-2 space-y-3">
                {(messageRecord?.messages || []).map(
                  (message: any, index: number) => (
                    <div key={index} className="flex flex-col gap-2">
                      <div
                        className={`flex ${
                          message.isMine ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`flex gap-2 sm:gap-3 max-w-[90%] sm:max-w-[80%] ${
                            message.isMine ? "flex-row-reverse" : ""
                          }`}
                        >
                          <Avatar
                            size={isMobile ? "small" : "large"}
                            className="flex-shrink-0"
                          >
                            {message.user?.first_name?.charAt(0) || "ف"}
                          </Avatar>
                          <div
                            className={`flex flex-col ${
                              message.isMine ? "items-end" : "items-start"
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <Text strong className="text-xs sm:text-sm">
                                {message.isMine ? "شما" : "فروشنده"}
                              </Text>
                              <Text className="text-xs text-gray-500">
                                {new Date(message.createdAt).toLocaleTimeString(
                                  "fa-IR"
                                )}
                              </Text>
                            </div>
                            <div
                              className={`rounded-2xl px-3 py-2 sm:px-4 sm:py-2 ${
                                message.isMine
                                  ? "bg-blue-500 !text-white rounded-tr-none"
                                  : "bg-gray-100 text-gray-800 rounded-tl-none"
                              }`}
                            >
                              <Text
                                className={`text-sm ${
                                  message.isMine ? "text-white" : ""
                                }`}
                              >
                                {message.message}
                              </Text>
                            </div>

                            {(message.attachedAudio ||
                              message.attachedImage) && (
                              <Space size="small" className="mt-2">
                                {message.attachedImage && (
                                  <a
                                    download
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={`${config.BACKEND_IMAGE_URL}/api/${message.attachedImage}`}
                                    className="flex items-center gap-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded transition-colors"
                                  >
                                    <IoDownload />
                                    تصویر
                                  </a>
                                )}
                                {message.attachedAudio && (
                                  <a
                                    download
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={`${config.BACKEND_IMAGE_URL}/${message.attachedAudio}`}
                                    className="flex items-center gap-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded transition-colors"
                                  >
                                    <IoDownload />
                                    فایل صوتی
                                  </a>
                                )}
                              </Space>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            <Form.Item className="mb-0">
              <div className="flex gap-2 flex-col sm:flex-row">
                <div className="flex gap-2 flex-shrink-0 order-2 sm:order-1">
                  <ImageUploader handleFile={handleImage} />
                  <FileUploader handleFile={handleAudio} />
                </div>
                <Input.TextArea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="پیام خود را وارد کنید..."
                  rows={isMobile ? 2 : 3}
                  className="flex-1 resize-none order-1 sm:order-2"
                  size={isMobile ? "small" : "middle"}
                />
                <Button
                  type="primary"
                  icon={<BiSend className="rotate-180" />}
                  onClick={handleSubmit}
                  loading={sbmitLoading}
                  disabled={!message.trim() && !file && !image}
                  className="flex-shrink-0 h-auto px-3 sm:px-4 order-3"
                  size={isMobile ? "small" : "middle"}
                >
                  {isMobile ? "" : "ارسال"}
                </Button>
              </div>
            </Form.Item>
          </div>
        </Form>
      </Modal>

      {/* Map Modal */}
      <Modal
        open={isModalOpen}
        width={isMobile ? "95%" : isTablet ? 800 : 1000}
        onCancel={handleCancel}
        onOk={handleOk}
        centered
        styles={{
          body: { padding: isMobile ? "16px" : "24px" },
        }}
      >
        <div className="h-64 sm:h-96 rounded-lg overflow-hidden">
          <Wrapper
            apiKey={"AIzaSyAtOnE4vyEvfJxG268WbsUlK9EphptwyWo"}
            render={render}
          >
            <MapComponent
              isDraggable={false}
              initialLatLng={locationLatLng}
              handleLatLngChange={(_lat: number, _lng: number) => {}}
            />
          </Wrapper>
        </div>
      </Modal>
    </div>
  );
}
