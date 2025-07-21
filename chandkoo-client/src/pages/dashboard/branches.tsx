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
} from "antd";
import { useContext, useEffect, useState } from "react";
import { Status, Wrapper } from "@googlemaps/react-wrapper";
import MapComponent from "../../components/google-map";
import { BiLocationPlus, BiPencil } from "react-icons/bi";
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
import { RxCross2 } from "react-icons/rx";
interface DataType {
  key: React.Key;
  category: string;
  phone: string;
  address: string;
  actions: any;
}

export default function Branches() {
  const [submittable, setIsSubmittable] = useState<boolean>(false);
  const [latLng, setLatLng] = useState<{
    lat: number | null;
    lng: number | null;
  }>({ lat: 35.6892, lng: 51.389 });
  const [locationModal, setLocationModal] = useState<boolean>(false);
  const [branches, setBranches] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [locationLatLng, setLocationLatLng] = useState<{
    lat: number | null;
    lng: number | null;
  }>({ lat: null, lng: null });
  const handleCancel = () => {
    setLocationModal(false);
  };
  const [isMapTouched, setIsMapTouched] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<string>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const handleBranchLocation = (id: string) => {
    getBranchLocation(id).then((data) => {
      if (data.status === 200) {
        setLocationModal(true);
        setLocationLatLng({ lat: data.data.lat, lng: data.data.lng });
      }
    });
  };
  const columns: TableColumnsType<DataType> = [
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
      title: "",
      dataIndex: "acions",
      render: (_: any, record: any) => (
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
                setIsMapTouched(true);
                setIsEdit(record.id);
                setSelectedCategories(record.categoryId.split(","));
                getBranchLocation(record.id).then((data) => {
                  if (data.status === 200) {
                    setLatLng({ lat: data.data.lat, lng: data.data.lng });
                    form.setFieldsValue({ ...record });
                    form.setFieldValue("telephone", record.phone_number);
                    form.setFieldValue("twitter", record.twitter);
                    form.setFieldValue("facebook", record.facebook);
                    form.setFieldValue("instagram", record.instagram);
                    form.setFieldValue("youtube", record.youtube);
                    form.setFieldValue("whatsapp", record.whatsapp);
                    form.setFieldValue("linkedin", record.linkedin);
                    form.validateFields();
                    setIsModalOpen(true);
                  }
                });
              }}
            >
              <BiPencil /> ویرایش
            </Button>
          </ConfigProvider>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#2979ff",
              },
            }}
          >
            <Button
              type="primary"
              onClick={() => handleBranchLocation(record.id)}
            >
              <BiLocationPlus /> مکان
            </Button>
          </ConfigProvider>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#f50057",
              },
            }}
          >
            <Popconfirm
              title={"حذف غرفه"}
              description={"آیا از حذف این غرفه اطمینان دارید؟"}
              okText="بله"
              cancelText="خیر"
              onConfirm={() =>
                deleteBranch(record.id).then((data) => {
                  if (data.status === 200) {
                    value.setNotif({
                      type: "success",
                      description: "غرفه حذف شد",
                    });
                    fetchBranches();
                  }
                })
              }
            >
              <Button type="primary">
                <RxCross2 /> حذف
              </Button>
            </Popconfirm>
          </ConfigProvider>
        </div>
      ),
    },
  ];
  const onChange = (newValue: string[]) => {
    setSelectedCategories(newValue);
  };
  const fetchBranches = () => {
    getAllBranches().then((data) => {
      if (data.status === 200) {
        setBranches(data.data);
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
      setCategories(data.data);
    });
    fetchBranches();
  }, []);
  const [form] = Form.useForm();
  const values = Form.useWatch([], form);
  const value: any = useContext(ShamContext);
  const handleSubmit = () => {
    const payload = form.getFieldsValue();
    if (!isEdit) {
      addBranch({ ...payload, lat: latLng.lat, lng: latLng.lng }).then(
        (data) => {
          if (data.status === 200) {
            setIsModalOpen(false);
            fetchBranches();
            value.setNotif({
              type: "success",
              description: "غرفه افزوده شد",
            });
          }
        }
      );
    } else {
      editBranch({
        ...payload,
        lat: latLng.lat,
        lng: latLng.lng,
        id: isEdit,
        categoryId: selectedCategories,
      }).then((data) => {
        if (data.status === 200) {
          setIsModalOpen(false);
          fetchBranches();
          value.setNotif({
            type: "success",
            description: "غرفه ویرایش شد",
          });
        }
      });
    }
  };
  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setIsSubmittable(true))
      .catch(() => setIsSubmittable(false));
  }, [form, values]);

  const showModal = () => {
    form.resetFields();
    setLocationLatLng({ lat: null, lng: null });
    setLatLng({ lat: 35.6892, lng: 51.389 });
    setIsMapTouched(false);
    setIsModalOpen(true);
  };
  const render = (status: Status) => <h1>{status}</h1>;
  return (
    <div>
      <div className="text-[26px] pb-[15px] mb-[30px] border-b-[1px] border-b-[#ccc]">
        تنظیمات غرفه
      </div>
      <div className="flex justify-end">
        <Button
          color="cyan"
          variant="solid"
          icon={<BiLocationPlus />}
          onClick={() => {
            setIsEdit(undefined);
            showModal();
          }}
          className="h-[40px] text-[18px] mt-[0px] mb-[30px]"
        >
          افزودن غرفه
        </Button>
      </div>
      <Table<DataType> columns={columns} dataSource={branches} />
      <Modal
        open={locationModal}
        width={1000}
        onCancel={handleCancel}
        footer={null}
      >
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
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        width={1000}
        footer={null}
      >
        <div className="flex gap-[15px] mb-[15px] overflow-auto">
          <div className="flex-1">
            <label className="text-[13px] text-[#444] block mb-[10px]">
              افزودن غرفه
            </label>
            <div>
              <Form
                form={form}
                layout={"vertical"}
                className="w-full mx-auto p-[0px_5px]"
              >
                <div className="flex gap-[15px]">
                  <div className="flex-1">
                    <Form.Item
                      name="first_name"
                      label="نام مسئول"
                      className="rtl"
                      rules={[
                        { required: true, message: "نام مسئول اجباری است" },
                        {
                          pattern: /^[\u0600-\u06FF\s]+$/,
                          message: "نام مسئول صحیح نیست",
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
                      label="نام خانوادگی مسئول"
                      className="rtl"
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
                        name="last_name"
                        type="text"
                        placeholder="مثال: محمدی"
                        className="h-[40px]"
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className="flex gap-[15px]">
                  <div className="flex-1">
                    <Form.Item
                      name="name"
                      label="نام غرفه"
                      className="rtl"
                      rules={[
                        {
                          required: true,
                          message: "نام غرفه اجباری است",
                        },
                      ]}
                    >
                      <Input
                        name="name"
                        type="text"
                        placeholder="مثال: غرفه میرداماد"
                        className="h-[40px]"
                      />
                    </Form.Item>
                  </div>
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
                <div className="flex">
                  <div className="flex-1">
                    <Form.Item
                      name="address"
                      label="آدرس"
                      className="rtl"
                      rules={[
                        { required: true, message: "دسته بندی اجباری است" },
                      ]}
                    >
                      <TextArea
                        className="resize-none h-[150px]"
                        style={{ resize: "none" }}
                        rows={3}
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className="flex gap-[15px]">
                  <div className="flex-1">
                    <Form.Item
                      name="instagram"
                      label="لینک اینستاگرام"
                      className="rtl"
                    >
                      <Input
                        name="instagram"
                        type="text"
                        placeholder="مثال: https://instagram.com/..."
                        className="h-[40px]"
                      />
                    </Form.Item>
                  </div>
                  <div className="flex-1">
                    <Form.Item
                      name="whatsapp"
                      label="لینک واتس آپ"
                      className="rtl"
                    >
                      <Input
                        name="whatsapp"
                        type="text"
                        placeholder="مثال: 09123456789"
                        className="h-[40px]"
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className="flex gap-[15px]">
                  <div className="flex-1">
                    <Form.Item
                      name="linkedin"
                      label="لینک لینکداین"
                      className="rtl"
                    >
                      <Input
                        name="linkedin"
                        type="text"
                        placeholder="مثال: https://linkedin.com/..."
                        className="h-[40px]"
                      />
                    </Form.Item>
                  </div>
                  <div className="flex-1">
                    <Form.Item
                      name="youtube"
                      label="لینک یوتیوب "
                      className="rtl"
                    >
                      <Input
                        name="youtube"
                        type="text"
                        placeholder="مثال: https://youtube.com/..."
                        className="h-[40px]"
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className="flex gap-[15px]">
                  <div className="flex-1">
                    <Form.Item
                      name="facebook"
                      label="لینک فیس بوک"
                      className="rtl"
                    >
                      <Input
                        name="facebook"
                        type="text"
                        placeholder="مثال: https://facebook.com/..."
                        className="h-[40px]"
                      />
                    </Form.Item>
                  </div>
                  <div className="flex-1">
                    <Form.Item
                      name="twitter"
                      label="لینک X(توییتر سابق)"
                      className="rtl"
                    >
                      <Input
                        name="twitter"
                        type="text"
                        placeholder="مثال: https://youtube.com/..."
                        className="h-[40px]"
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className="flex gap-[15px]">
                  <div className="flex-1">
                    <Form.Item
                      name="categoryId"
                      label="دسته بندی"
                      className="rtl"
                      rules={[
                        { required: true, message: "دسته بندی اجباری است" },
                      ]}
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
                        onChange={onChange}
                        treeData={categories}
                        treeNodeFilterProp="title"
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-1">
                    <div className="text-[12px] text-[#333] mb-[-10px] mt-[15px]">
                      مکان غرفه بر روی نقشه را انتخاب نمایید
                    </div>
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
                      onClick={handleSubmit}
                      htmlType="submit"
                      className="w-full mt-[40px] h-[40px]"
                      type="primary"
                      disabled={!submittable || !isMapTouched}
                    >
                      {isEdit ? "ویرایش غرفه" : "افزودن غرفه"}
                    </Button>
                  </ConfigProvider>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
