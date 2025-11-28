import { useEffect, useState, useCallback, useContext } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Upload,
  Select,
  Switch,
  Divider,
  Avatar,
  TreeSelect,
  Rate,
  type UploadFile,
  Spin,
  Tabs,
} from "antd";
import type { RcFile } from "antd/es/upload/interface";
import { UserOutlined } from "@ant-design/icons";
import { PiPlusThin, PiUpload, PiInfo, PiChat } from "react-icons/pi";
import { SaleItem } from "../../components/home-sales";
import { getAllCategories } from "../../services/categories.service";
import {
  createSale,
  getUserSales,
  getAllPublishedSales,
  deleteSale,
  toggleSaleStatus,
  type Sale,
} from "../../services/sales.service";
import {
  getSaleComments,
  createComment,
  type SaleComment,
} from "../../services/sales-comments.service";
import { ShamContext } from "../../App";
import { useSelector } from "react-redux";

const { TextArea } = Input;
const { Option } = Select;
const { SHOW_PARENT } = TreeSelect;

/* -------------------------------------------------------------------------- */
/* ------------------------------- Utilities -------------------------------- */
/* -------------------------------------------------------------------------- */
const formatDate = (dateString?: string) => {
  if (!dateString) return "";
  try {
    return new Date(dateString).toLocaleDateString("fa-IR");
  } catch (e) {
    return dateString;
  }
};

/* -------------------------------------------------------------------------- */
/* ------------------------------ Subcomponents ----------------------------- */
/* -------------------------------------------------------------------------- */

type SaleCardProps = {
  sale: Sale;
  onShowComments: (sale: Sale) => void;
  onAddComment: (sale: Sale) => void;
  onToggleStatus: (id: string, current: boolean) => void;
  onDelete: (id: string) => void;
  currentUserId?: string;
};

function SaleCard({
  sale,
  onShowComments,
  onAddComment,
  onToggleStatus,
  onDelete,
  currentUserId,
}: SaleCardProps) {
  const isOwner = currentUserId && sale.sellerId === currentUserId;

  return (
    <div className="w-full flex flex-col md:flex-row md:items-start md:justify-between gap-4 p-4 border rounded-lg bg-white">
      <div className="flex-1 w-full">
        <SaleItem sale={sale} />
      </div>

      <div className="flex flex-wrap gap-2 w-full md:w-auto items-center md:items-start">
        {/* Comments button - always visible */}
        <Button
          icon={<PiChat />}
          type="text"
          onClick={() => onShowComments(sale)}
          className="w-full md:w-auto"
        >
          نظرات
        </Button>

        {/* Add comment button - always visible */}
        <Button
          type="primary"
          onClick={() => onAddComment(sale)}
          className="w-full md:w-auto"
        >
          افزودن نظر
        </Button>

        {/* Management actions - only for owner */}
        {isOwner && (
          <>
            <Button
              type="dashed"
              onClick={() => onToggleStatus(sale.id!, sale.isActive)}
              className="w-full md:w-auto"
            >
              {sale.isActive ? "غیرفعال" : "فعال"}
            </Button>

            <Button
              danger
              onClick={() => onDelete(sale.id!)}
              className="w-full md:w-auto"
            >
              حذف
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* ------------------------------ Sale Modal -------------------------------- */
/* -------------------------------------------------------------------------- */

type SaleModalProps = {
  visible: boolean;
  onCancel: () => void;
  onCreated: () => void;
};

function SaleModal({ visible, onCancel, onCreated }: SaleModalProps) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [saleType, setSaleType] = useState<"market" | "product">("product");
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [fileList, setFileList] = useState<UploadFile<any>[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const value: any = useContext(ShamContext);

  useEffect(() => {
    getAllCategories().then((res) => {
      if (res?.status === 200) setCategories(res.data || []);
    });
  }, []);

  const resetState = () => {
    form.resetFields();
    setSaleType("product");
    setUploadedImages([]);
    setFileList([]);
  };

  const handleCancel = () => {
    resetState();
    onCancel();
  };

  const handleUpload = (file: RcFile) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      value.setNotif({
        type: "error",
        description: "فقط می‌توانید فایل تصویر آپلود کنید!",
      });
      return false;
    }

    const fileObj = new File([file], file.name, { type: file.type });
    setUploadedImages((prev) => [...prev, fileObj]);

    const newFile: UploadFile<any> = {
      uid: file.uid,
      name: file.name,
      status: "done",
      url: URL.createObjectURL(file),
      originFileObj: file,
    };
    setFileList((prev) => [...prev, newFile]);

    return false; // prevent automatic upload
  };

  const handleRemove = (file: UploadFile<any>) => {
    setUploadedImages((prev) => prev.filter((f) => f.name !== file.name));
    setFileList((prev) => prev.filter((item) => item.uid !== file.uid));
  };

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        if (
          key !== "images" &&
          values[key] !== undefined &&
          values[key] !== null
        ) {
          formData.append(key, values[key]);
        }
      });
      uploadedImages.forEach((img) => formData.append("images", img));

      const response = await createSale(formData);
      if (response?.data?.success) {
        value.setNotif({
          type: "success",
          description: "حراج با موفقیت ایجاد شد",
        });
        resetState();
        onCreated();
      } else {
        value.setNotif({
          type: "success",
          description: "خطا در ایجاد حراج",
        });
      }
    } catch (e) {
      value.setNotif({
        type: "success",
        description: "خطا در ایجاد حراج",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={
        <div className="text-right text-[20px] font-bold">ایجاد حراج جدید</div>
      }
      open={visible}
      onCancel={handleCancel}
      footer={null}
      width={700}
      centered
      className="rtl-modal"
      wrapClassName="max-w-[95%]"
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="mt-6"
        dir="rtl"
        initialValues={{ saleType: "product", isActive: true }}
      >
        <Form.Item
          name="saleType"
          label="نوع حراج"
          rules={[{ required: true, message: "لطفاً نوع حراج را انتخاب کنید" }]}
        >
          <Select
            size="large"
            onChange={(v) => setSaleType(v)}
            placeholder="نوع حراج را انتخاب کنید"
          >
            <Option value="product">حراج روی محصول خاص</Option>
            <Option value="market">حراج سراسری بازار</Option>
          </Select>
        </Form.Item>

        <Divider />

        {saleType === "market" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item
                name="salePercentFrom"
                label="درصد تخفیف از"
                rules={[
                  { required: true, message: "لطفاً درصد شروع را وارد کنید" },
                ]}
              >
                <InputNumber
                  className="w-full"
                  size="large"
                  min={1}
                  max={100}
                  addonAfter="%"
                />
              </Form.Item>

              <Form.Item
                name="salePercentTo"
                label="درصد تخفیف تا"
                rules={[
                  { required: true, message: "لطفاً درصد پایان را وارد کنید" },
                ]}
              >
                <InputNumber
                  className="w-full"
                  size="large"
                  min={1}
                  max={100}
                  addonAfter="%"
                />
              </Form.Item>
            </div>

            <Form.Item
              name="marketSaleDescription"
              label="توضیحات حراج سراسری"
              rules={[
                { required: true, message: "لطفاً توضیحات حراج را وارد کنید" },
              ]}
            >
              <TextArea rows={3} />
            </Form.Item>
          </div>
        )}

        {saleType === "product" && (
          <div className="space-y-4">
            <Form.Item
              name="title"
              label="عنوان محصول"
              rules={[
                { required: true, message: "لطفاً عنوان محصول را وارد کنید" },
                { min: 3 },
              ]}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item
              name="description"
              label="توضیحات محصول"
              rules={[{ required: true }]}
            >
              <TextArea rows={3} />
            </Form.Item>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item
                name="primaryPrice"
                label="قیمت اصلی (تومان)"
                rules={[{ required: true, type: "number", min: 1000 }]}
              >
                <InputNumber
                  className="w-full"
                  size="large"
                  formatter={(v: any) =>
                    `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(v: any) => v?.replace(/\$\s?|(,*)/g, "") as any}
                />
              </Form.Item>

              <Form.Item
                name="salePrice"
                label="قیمت حراج (تومان)"
                rules={[{ required: true, type: "number", min: 1 }]}
              >
                <InputNumber
                  className="w-full"
                  size="large"
                  formatter={(v: any) =>
                    `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(v: any) => v?.replace(/\$\s?|(,*)/g, "") as any}
                />
              </Form.Item>
            </div>

            <Form.Item
              shouldUpdate={(p, c) =>
                p.primaryPrice !== c.primaryPrice || p.salePrice !== c.salePrice
              }
            >
              {() => {
                const primaryPrice = form.getFieldValue("primaryPrice");
                const salePrice = form.getFieldValue("salePrice");
                if (primaryPrice && salePrice && salePrice >= primaryPrice) {
                  return (
                    <div className="text-red-500 text-sm mb-4 flex items-center gap-2">
                      <PiInfo /> قیمت حراج باید کمتر از قیمت اصلی باشد
                    </div>
                  );
                }
                if (primaryPrice && salePrice && salePrice < primaryPrice) {
                  const discount = Math.round(
                    ((primaryPrice - salePrice) / primaryPrice) * 100
                  );
                  return (
                    <div className="text-green-500 text-sm mb-4">
                      تخفیف: {discount}% (
                      {(primaryPrice - salePrice).toLocaleString()} تومان)
                    </div>
                  );
                }
                return null;
              }}
            </Form.Item>

            <Form.Item
              name="categoryId"
              label="دسته‌بندی"
              rules={[{ required: true }]}
            >
              <TreeSelect
                treeData={categories}
                size="large"
                placeholder="دسته‌بندی را انتخاب کنید"
                className="w-full"
                treeDefaultExpandAll
                showCheckedStrategy={SHOW_PARENT}
                fieldNames={{
                  label: "title",
                  value: "id",
                  children: "children",
                }}
              />
            </Form.Item>

            <div className="mb-4">
              <div className="ant-form-item-label">
                <label>تصاویر محصول (اختیاری)</label>
              </div>
              <Upload.Dragger
                beforeUpload={handleUpload}
                onRemove={handleRemove}
                multiple
                accept="image/*"
                listType="picture"
                maxCount={5}
                fileList={fileList}
                className="rounded-[8px] border-dashed"
              >
                <div className="py-8 text-center">
                  <PiUpload className="text-[32px] mb-2 mx-auto" />
                  <p>تصاویر محصول را اینجا رها کنید یا برای آپلود کلیک کنید</p>
                  <p className="text-[12px] mt-1">
                    فقط فایل‌های تصویری (حداکثر ۵ فایل)
                  </p>
                </div>
              </Upload.Dragger>
            </div>
          </div>
        )}

        <Form.Item name="isActive" label="فعال" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Form.Item name="notes" label="یادداشت‌ها (اختیاری)">
          <TextArea rows={2} />
        </Form.Item>

        <div className="flex gap-3 justify-start mt-8">
          <Button size="large" onClick={handleCancel} className="min-w-[120px]">
            انصراف
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={loading}
            className="min-w-[120px]"
          >
            ایجاد حراج
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

/* -------------------------------------------------------------------------- */
/* --------------------------- Comments modals -------------------------------- */
/* -------------------------------------------------------------------------- */

type CommentsModalProps = {
  visible: boolean;
  sale?: Sale | null;
  comments: SaleComment[];
  onClose: () => void;
};

function CommentsModal({
  visible,
  sale,
  comments,
  onClose,
}: CommentsModalProps) {
  return (
    <Modal
      title={
        <div className="text-right text-[20px] font-bold">
          نظرات حراج: {sale?.title}
        </div>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      width={600}
      centered
      className="rtl-modal"
      wrapClassName="max-w-[95%]"
    >
      <Divider />
      <div className="text-right">
        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-gray-50 rounded-lg p-3 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <Avatar size="small" icon={<UserOutlined />} />
                  <span className="text-sm font-medium text-gray-800">
                    {comment.userName}
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  {formatDate(comment.createdAt)}
                </span>
              </div>

              <Rate disabled value={comment.rating} className="text-xs" />
              <p className="text-sm text-gray-700 mt-1">{comment.text}</p>
            </div>
          ))}

          {comments.length === 0 && (
            <div className="text-center text-gray-500 py-4">
              هنوز نظری برای این حراج ثبت نشده است.
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}

/* -------------------------------------------------------------------------- */
/* ---------------------------- Add Comment Modal ---------------------------- */
/* -------------------------------------------------------------------------- */

type AddCommentModalProps = {
  visible: boolean;
  sale?: Sale | null;
  onClose: () => void;
  onSubmitted: () => void;
};

function AddCommentModal({
  visible,
  sale,
  onClose,
  onSubmitted,
}: AddCommentModalProps) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const value: any = useContext(ShamContext);
  const onFinish = async (values: any) => {
    if (!sale) return;
    setLoading(true);
    try {
      const response = await createComment({
        saleId: sale.id!,
        rating: values.rating,
        text: values.text,
      });
      if (response?.data?.success) {
        value.setNotif({
          type: "success",
          description: "نظر شما با موفقیت ثبت شد",
        });
        form.resetFields();
        onSubmitted();
      } else {
        value.setNotif({
          type: "success",
          description: "خطا در ثبت نظر",
        });
      }
    } catch {
      value.setNotif({
        type: "success",
        description: "خطا در ثبت نظر",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={
        <div className="text-right text-[20px] font-bold">
          افزودن نظر برای: {sale?.title}
        </div>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      width={500}
      centered
      className="rtl-modal"
      wrapClassName="max-w-[95%]"
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="mt-6"
        dir="rtl"
      >
        <Form.Item
          name="rating"
          label="امتیاز"
          rules={[{ required: true, message: "لطفاً امتیاز دهید" }]}
        >
          <Rate />
        </Form.Item>

        <Form.Item
          name="text"
          label="نظر شما"
          rules={[
            { required: true, message: "لطفاً نظر خود را وارد کنید" },
            { min: 10, message: "نظر باید حداقل ۱۰ کاراکتر باشد" },
          ]}
        >
          <TextArea rows={4} />
        </Form.Item>

        <div className="flex gap-3 justify-start mt-8">
          <Button size="large" onClick={onClose} className="min-w-[120px]">
            انصراف
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={loading}
            className="min-w-[120px]"
          >
            ثبت نظر
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

/* -------------------------------------------------------------------------- */
/* ------------------------------ Main Component ---------------------------- */
/* -------------------------------------------------------------------------- */

export default function DashboardSalesRefactor() {
  const value: any = useContext(ShamContext);
  const [userSales, setUserSales] = useState<Sale[]>([]);
  const [allSales, setAllSales] = useState<Sale[]>([]);
  const [activeTab, setActiveTab] = useState<string>("userSales");
  const [loading, setLoading] = useState<boolean>(true);
  const [isSaleModalOpen, setIsSaleModalOpen] = useState(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [isAddCommentOpen, setIsAddCommentOpen] = useState(false);
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);
  const [comments, setComments] = useState<SaleComment[]>([]);
  const { user } = useSelector((state: any) => state.user);

  const currentUserId = user?.id;

  const loadSales = useCallback(async () => {
    setLoading(true);
    try {
      // Load user sales
      const userSalesResponse = await getUserSales();
      if (userSalesResponse?.data?.success) {
        const userData = userSalesResponse.data.data as Sale[];
        const parsedUserSales = userData.map((s) => ({
          ...s,
          images:
            typeof s.images === "string" ? JSON.parse(s.images) : s.images,
        }));
        setUserSales(parsedUserSales);
      }

      // Load all sales
      const allSalesResponse = await getAllPublishedSales();
      if (allSalesResponse?.data?.success) {
        const allData = allSalesResponse.data.data.sales as Sale[];
        const parsedAllSales = allData.map((s) => ({
          ...s,
          images:
            typeof s.images === "string" ? JSON.parse(s.images) : s.images,
        }));
        setAllSales(parsedAllSales);
      }
    } catch (error) {
      value.setNotif({
        type: "error",
        description: "خطا در بارگذاری حراج‌ها",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSales();
  }, [loadSales]);

  const loadSaleComments = async (saleId: string) => {
    try {
      const res = await getSaleComments(saleId);
      if (res?.data?.success)
        setComments(res.data.data.comments || res.data.data || []);
    } catch {
      value.setNotif({
        type: "error",
        description: "خطا در بارگذاری نظرات",
      });
    }
  };

  const openComments = (sale: Sale) => {
    setSelectedSale(sale);
    loadSaleComments(sale.id!);
    setIsCommentsOpen(true);
  };

  const openAddComment = (sale: Sale) => {
    setSelectedSale(sale);
    setIsAddCommentOpen(true);
  };

  const handleDeleteSale = (saleId: string) => {
    Modal.confirm({
      title: "حذف حراج",
      content: "آیا از حذف این حراج اطمینان دارید؟",
      okText: "بله",
      cancelText: "خیر",
      onOk: async () => {
        try {
          const res = await deleteSale(saleId);
          if (res?.data?.success) {
            value.setNotif({
              type: "success",
              description: "حراج با موفقیت حذف شد",
            });
            loadSales();
          }
        } catch {
          value.setNotif({
            type: "error",
            description: "خطا در حذف حراج",
          });
        }
      },
    });
  };

  const handleToggleSaleStatus = async (
    saleId: string,
    currentStatus: boolean
  ) => {
    try {
      const res = await toggleSaleStatus(saleId);
      if (res?.data?.success) {
        value.setNotif({
          type: "success",
          description: `حراج ${!currentStatus ? "فعال" : "غیرفعال"} شد`,
        });
        loadSales();
      }
    } catch {
      value.setNotif({
        type: "error",
        description: "خطا در تغییر وضعیت حراج",
      });
    }
  };

  const tabItems = [
    {
      key: "userSales",
      label: `حراج های من (${userSales.length})`,
      children: (
        <div className="flex flex-col gap-4">
          {userSales.length === 0 && !loading && (
            <div className="text-center text-gray-500 py-8">
              هیچ حراجی ایجاد نکرده‌اید.
            </div>
          )}
          {userSales.map((sale) => (
            <SaleCard
              key={`user-sale-${sale.id}`}
              sale={sale}
              onShowComments={openComments}
              onAddComment={openAddComment}
              onToggleStatus={handleToggleSaleStatus}
              onDelete={handleDeleteSale}
              currentUserId={currentUserId}
            />
          ))}
        </div>
      ),
    },
    {
      key: "allSales",
      label: `همه حراج ها (${allSales.length})`,
      children: (
        <div className="flex flex-col gap-4">
          {allSales.length === 0 && !loading && (
            <div className="text-center text-gray-500 py-8">
              هیچ حراجی وجود ندارد.
            </div>
          )}
          {allSales.map((sale) => (
            <SaleCard
              key={`all-sale-${sale.id}`}
              sale={sale}
              onShowComments={openComments}
              onAddComment={openAddComment}
              onToggleStatus={handleToggleSaleStatus}
              onDelete={handleDeleteSale}
              currentUserId={currentUserId}
            />
          ))}
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="text-[26px] flex items-center justify-between pb-[15px] mb-[30px] border-b-[1px] border-b-[#ccc]">
        <div>حراج ها</div>
        <div>
          <Button
            icon={<PiPlusThin />}
            onClick={() => setIsSaleModalOpen(true)}
          >
            افزودن حراج
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Spin size="large" />
        </div>
      ) : (
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={tabItems}
          className="sales-tabs"
        />
      )}

      <SaleModal
        visible={isSaleModalOpen}
        onCancel={() => setIsSaleModalOpen(false)}
        onCreated={() => {
          setIsSaleModalOpen(false);
          loadSales();
        }}
      />

      <CommentsModal
        visible={isCommentsOpen}
        sale={selectedSale}
        comments={comments}
        onClose={() => {
          setIsCommentsOpen(false);
          setSelectedSale(null);
          setComments([]);
        }}
      />

      <AddCommentModal
        visible={isAddCommentOpen}
        sale={selectedSale}
        onClose={() => {
          setIsAddCommentOpen(false);
          setSelectedSale(null);
        }}
        onSubmitted={() => {
          setIsAddCommentOpen(false);
          if (selectedSale) loadSaleComments(selectedSale.id!);
        }}
      />
    </div>
  );
}
