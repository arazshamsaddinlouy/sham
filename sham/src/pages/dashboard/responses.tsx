import {
  Avatar,
  Button,
  ConfigProvider,
  Descriptions,
  Input,
  Modal,
  Table,
  TableColumnsType,
  TableProps,
  Tag,
} from "antd";
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
import {
  BsFacebook,
  BsInstagram,
  BsLinkedin,
  BsTwitterX,
  BsWhatsapp,
  BsYoutube,
} from "react-icons/bs";
import { getUserCoords } from "../../services/user.service";
interface DataType {
  key: React.Key;
  category: string;
  phone: string;
  address: string;
}
const onChange: TableProps<any>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra
) => {
  console.log("params", pagination, filters, sorter, extra);
};
export default function Responses() {
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
  const [items, setItems] = useState<DescriptionsProps["items"]>([]);
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleMessageOk = () => {
    setIsMessageModalOpen(false);
  };
  const handleSellerModalOk = () => {
    setIsSellerModalOpen(false);
  };
  const handleSellerOpen = (request: any) => {
    setSellerInfo(request.seller);
    setIsSellerModalOpen(true);
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
    },
    {
      title: "دسته بندی",
      dataIndex: "category",
      width: "250px",
      render: (_, record: any) => (
        <div className="flex gap-[10px]">
          {(record.categories || []).map((cat: any) => (
            <Tag
              color="#f0f0f0"
              className="text-[15px] font-yekan p-[5px_15px] rounded-[30px]"
            >
              <div className="text-[#666] text-[12px]">{cat.title}</div>
            </Tag>
          ))}
        </div>
      ),
    },
    {
      title: "تلفن",
      dataIndex: "phone_number",
      sorter: (a: any, b: any) => a.suggestedPrice - b.suggestedPrice,
    },
    {
      title: "آدرس",
      dataIndex: "address",
    },
    {
      title: "شبکه های اجتماعی",
      dataIndex: "social",
      render: (_: string, record: any) => (
        <div className="flex gap-[10px]">
          {record.whatsapp && record.whatsapp.length > 0 && (
            <div>
              <a href={`https://wa.me/${record.whatsapp}`} target="_blank">
                <BsWhatsapp />
              </a>
            </div>
          )}
          {record.instagram && record.instagram.length > 0 && (
            <div>
              <a href={record.instagram} target="_blank">
                <BsInstagram />
              </a>
            </div>
          )}
          {record.linkedin && record.linkedin.length > 0 && (
            <div>
              <a href={record.linkedin} target="_blank">
                <BsLinkedin />
              </a>
            </div>
          )}
          {record.twitter && record.twitter.length > 0 && (
            <div>
              <a href={record.twitter} target="_blank">
                <BsTwitterX />
              </a>
            </div>
          )}
          {record.facebook && record.facebook.length > 0 && (
            <div>
              <a href={record.facebook} target="_blank">
                <BsFacebook />
              </a>
            </div>
          )}
          {record.youtube && record.youtube.length > 0 && (
            <div>
              <a href={record.youtube} target="_blank">
                <BsYoutube />
              </a>
            </div>
          )}
        </div>
      ),
    },
  ];
  const columns: TableColumnsType<any> = [
    {
      title: "قیمت پیشنهادی",
      dataIndex: "suggestedPrice",
      sorter: (a: any, b: any) => a.price - b.price,
      render: (_, record: any) => (
        <Tag color="blue" className="text-[15px] font-yekan p-[5px_15px]">
          {formatPersianNumber(record.price)} ریال
        </Tag>
      ),
    },
    {
      title: "فاصله از شما",
      dataIndex: "distanceFromYou",
      sorter: (a: any, b: any) => a.distanceFromYou - b.distanceFromYou,
      render: (_: string, record: any) => {
        return (
          <>
            {new Intl.NumberFormat("fa-IR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(record.distanceFromYou)}{" "}
            متر
          </>
        );
      },
    },
    {
      title: "زمان اعتبار",
      dataIndex: "validTime",
      render: (_: string, record: any) => (
        <>
          {record.expiredAt
            ? new Date(record.expiredAt).toLocaleDateString("fa-IR", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false, // 24-hour format
              })
            : "امروز"}
        </>
      ),
    },
    {
      title: "",
      dataIndex: "acions",
      width: 100,
      render: (_value: string, record: any) => (
        <div className="flex gap-[10px]">
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#00b96b",
              },
            }}
          >
            <Button
              type="primary"
              onClick={() => {
                setLocationLatLng({
                  lat: record?.seller?.lat,
                  lng: record?.seller?.lng,
                });
                handleSellerOpen(record);
              }}
            >
              <BiUserCheck size={19} /> اطلاعات فروشنده
            </Button>
          </ConfigProvider>
          {record.messages.length > 0 ? (
            <Button
              type="primary"
              onClick={() => {
                setMessageRecord(record);
                showMessageModal();
              }}
            >
              <MdMessage /> {formatPersianNumber(record.messages.length)} پیام
            </Button>
          ) : (
            <Button type="primary" disabled>
              <MdMessage /> ۰ پیام
            </Button>
          )}
        </div>
      ),
    },
  ];
  const fetchInquiryResponses = useCallback(() => {
    getInquiryByKey(`${id}`).then((data) => {
      if (Array.isArray(data.data) && data.data.length > 0) {
        setInquiry(data.data[0]);
      }
    });
    getAllInquiryResponses(`${id}`).then((data) => {
      if (data.status === 200) {
        const record = [...data.data];

        for (let r of record) {
          const point1 = [userLatLng.lng, userLatLng.lat];
          const point2 = [r.seller.lng, r.seller.lat];
          const dist = distance(point1, point2, { units: "meters" });
          r.distanceFromYou = dist;
        }
        setDataSource([...record]);
      } else {
        setDataSource([]);
      }
    });
  }, [id]);
  useEffect(() => {
    fetchInquiryResponses();
    if (id) {
      markInquiryAsRead(id).then((_data: any) => {});
    }
  }, [id]);
  useEffect(() => {
    if (sellerInfo) {
      setItems([
        {
          key: 1,
          label: "نام",
          children: <p>{sellerInfo?.first_name}</p>,
        },
        {
          key: 2,
          label: "نام خانوادگی",
          children: <p>{sellerInfo?.last_name}</p>,
        },
        {
          key: 3,
          label: "کد پستی",
          children: <p>{sellerInfo?.postalCode}</p>,
        },
        {
          key: 4,
          label: "موبایل",
          children: <p>{sellerInfo?.mobile}</p>,
        },
        {
          key: 5,
          label: "شهر",
          children: <p>{sellerInfo?.city?.name}</p>,
        },
        {
          key: 6,
          label: "استان",
          children: <p>{sellerInfo?.province?.name}</p>,
        },
        {
          key: 7,
          label: "تلفن",
          children: <p>{sellerInfo?.phone_number}</p>,
          span: 1,
        },

        {
          key: 8,
          label: "آدرس",
          children: <p>{sellerInfo?.address}</p>,
          span: 2,
        },
      ]);
    }
  }, [sellerInfo]);
  const handleAllPoints = () => {
    const points = [];
    for (let s of dataSource) {
      points.push({ lat: s.seller.lat, lng: s.seller.lng, price: s.price });
    }
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
  };
  const handleSellerInfoCancel = () => {
    setIsSellerModalOpen(false);
  };
  const showMessageModal = () => {
    setIsMessageModalOpen(true);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("message", message);
    formData.append("isMine", "true");
    formData.append("sellerId", `${messageRecord?.sellerId}`);
    formData.append("requestId", messageRecord.inquiry.id);
    if (file) {
      formData.append("audio", file);
    }
    if (image) {
      formData.append("image", image);
    }
    addPriceMessageResponse(formData).then((data) => {
      if (data.status === 200) {
        value.setNotif({ type: "success", description: "پیام ارسال شد" });
        fetchInquiryResponses();
        setIsMessageModalOpen(false);
      } else {
        value.setNotif({ type: "error", description: "خطا در ثبت پیام" });
      }
    });
  };
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
  const render = (status: Status) => <h1>{status}</h1>;
  return (
    <div>
      <div className="text-[26px] pb-[15px] flex justify-between items-center mb-[30px] border-b-[1px] border-b-[#ccc]">
        <div>
          <p>
            <span className="text-[18px] text-[#444]"> پاسخ استعلامها به </span>
            <b>{inquiry?.title}</b>
          </p>
          <p className="text-[15px] text-[#666] mt-[10px]">
            گروه کالا :{inquiry?.category?.title}
          </p>
        </div>
        <div className="flex justify-end">
          <Button
            color="cyan"
            variant="solid"
            icon={<BiLocationPlus />}
            onClick={() => handleAllPoints()}
            className="h-[40px] text-[18px] mt-[10px] mb-[30px]"
          >
            مشاهده استعلام ها بر روی نقشه
          </Button>
        </div>
      </div>

      <Table<any>
        columns={columns}
        dataSource={dataSource}
        onChange={onChange}
      />

      {/* modal for seller info */}
      <Modal
        open={isSellerModalOpen}
        width={1000}
        onOk={handleSellerModalOk}
        onCancel={handleSellerInfoCancel}
        footer={null}
      >
        <div className="h-[450px] gap-[15px] mb-[15px] h-[480px] overflow-hidden">
          <Descriptions
            title={
              `اطلاعات فروشنده ${sellerInfo?.first_name}` +
              " " +
              `${sellerInfo?.last_name}`
            }
            bordered={true}
            items={items}
          />
          <div className="mb-[15px] mt-[15px] text-[16px]">
            اطلاعات شعب مختلف فروشنده
          </div>
          <Table<DataType>
            columns={branchColumns}
            dataSource={sellerInfo?.branches || []}
          />
        </div>
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
      </Modal>
      {/* end seeller info */}
      <Modal
        open={isMessageModalOpen}
        width={1000}
        onOk={handleMessageOk}
        onCancel={handleMessageCancel}
        footer={null}
      >
        <div className="flex h-[450px] gap-[15px] mb-[15px] h-[480px] overflow-hidden">
          <div className="flex-1">
            <label className="text-[13px] text-[#444] block mb-[10px]">
              پیام ها
            </label>
            <ul className="list-type-none h-[395px] shadow-none border-none overflow-auto">
              {(messageRecord?.messages || []).map((message: any) => (
                <li className="mb-[30px]">
                  <div
                    className={
                      message.isMine
                        ? "flex flex-row-reverse items-start gap-2.5"
                        : "flex items-start gap-2.5"
                    }
                  >
                    <Avatar>{message.user.first_name.split("")[0]}</Avatar>
                    <div
                      className={`flex flex-col w-full max-w-[320px] leading-1.5 p-4 ${
                        message.isMine
                          ? "border-gray-400 bg-gray-200"
                          : "border-gray-200 bg-gray-100"
                      } rounded-xl`}
                    >
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <span className="text-sm font-semibold text-gray-900">
                          {message.user.first_name} {message.user.last_name}
                        </span>
                        <span className="text-sm font-normal text-gray-500">
                          {new Date(message.createdAt).toLocaleTimeString(
                            "fa-IR",
                            { hour: "2-digit", minute: "2-digit" }
                          )}
                        </span>
                      </div>
                      <p className="text-sm font-normal py-2.5 text-gray-900">
                        {message.message}
                      </p>
                    </div>
                  </div>
                  {(message.attachedAudio || message.attachedImage) && (
                    <div
                      className={`flex justify-between max-w-[320px] mt-[5px] ${
                        message.isMine
                          ? "flex-row-reverse float-left pl-[40px]"
                          : "pr-[40px]"
                      }`}
                    >
                      <div className="flex-1">
                        {message.attachedImage && (
                          <a
                            className={`flex items-center gap-[10px] text-[11px] bg-gray-100 text-[#333] p-[5px_10px] mt-[5px] rounded-[10px] ${
                              message.isMine && "w-[160px]"
                            }`}
                            download={"download"}
                            target="_blank"
                            href={`${config.BACKEND_IMAGE_URL}/${message.attachedImage}`}
                          >
                            <IoDownload />
                            دریافت تصویر پیوستی
                          </a>
                        )}
                      </div>
                      <div className="flex-1">
                        {message.attachedAudio && (
                          <a
                            className={`flex items-center gap-[10px] text-[11px] bg-gray-100 text-[#333] p-[5px_10px] mt-[5px] rounded-[10px] ${
                              message.isMine && "w-[160px]"
                            }`}
                            download={"download"}
                            target="_blank"
                            href={`${config.BACKEND_IMAGE_URL}/${message.attachedAudio}`}
                          >
                            <IoDownload />
                            دریافت فایل پیوستی
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
            <div className="flex border-t-[1px] border-t-[#eee] rounded-[0px]">
              <div className="relative flex items-center h-[50px] w-full">
                <Input
                  value={message}
                  onChange={(e: any) => setMessage(e.target.value)}
                  placeholder="پیام خود را ارسال نمایید"
                  className="border-none flex-1 w-full h-[50px] rounded-[0px] pl-[100px]"
                />
                <div className="flex items-center h-[50px] text-[#666] gap-[15px] absolute left-[0px] top-[0px]">
                  <div>
                    <ImageUploader handleFile={handleImage} />
                  </div>
                  <div>
                    <FileUploader handleFile={handleAudio} />
                  </div>
                  <div
                    className="rotate-180 cursor-pointer"
                    onClick={() =>
                      message.length > 0 ? handleSubmit() : false
                    }
                  >
                    <BiSend size={22} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        open={isModalOpen}
        width={1000}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="flex h-[400px] gap-[15px] mb-[15px] h-[480px] overflow-hidden">
          <div className="flex-1">
            <label className="text-[13px] text-[#444] block mb-[10px]">
              آدرس روی نقشه
            </label>
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
        </div>
      </Modal>
    </div>
  );
}
