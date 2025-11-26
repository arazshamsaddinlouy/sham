import {
  Button,
  TreeSelect,
  Modal,
  Input,
  Upload,
  Form,
  InputNumber,
  Tag,
  List,
  Avatar,
  Rate,
  Divider,
  message,
  Spin,
  DatePicker,
} from "antd";
import { useEffect, useState } from "react";
import { SaleTradeItem } from "../../components/home-time-sale";
import {
  PiCalendar,
  PiCurrencyDollar,
  PiPlusThin,
  PiUpload,
  PiUser,
} from "react-icons/pi";
import { getAllCategories } from "../../services/categories.service";
import {
  createBid,
  getUserBids,
  updateBidStatus,
  getBidById,
  placeBidOffer,
  getBidOffers,
  type Bid,
  type BidOffer,
  getAllBids,
} from "../../services/bids.service";
import {
  createBidComment,
  getBidComments,
  type BidComment,
} from "../../services/bidscomment.service";
import dayjs from "dayjs";

const { SHOW_PARENT } = TreeSelect;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

export default function DashboardTrades() {
  const [userBids, setUserBids] = useState<Bid[]>([]);
  const [allBids, setAllBids] = useState<Bid[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [selectedBid, setSelectedBid] = useState<Bid | null>(null);
  const [bidOffers, setBidOffers] = useState<BidOffer[]>([]);
  const [bidComments, setBidComments] = useState<BidComment[]>([]);
  const [detailLoading, setDetailLoading] = useState(false);
  const [placingBid, setPlacingBid] = useState(false);
  const [newBidAmount, setNewBidAmount] = useState<number>(0);
  const [commentForm] = Form.useForm();
  const [activeTab, setActiveTab] = useState<"userBids" | "allBids">(
    "userBids"
  );
  useEffect(() => {
    loadUserBids();
    loadCategories();
  }, []);
  const loadUserBids = () => {
    setLoading(true);
    getUserBids()
      .then((res) => {
        if (res.data.success) {
          const els = res.data.data;
          for (let el of els) {
            el.images = JSON.parse(el.images);
          }
          setUserBids(els);
        }
      })
      .catch((error) => {
        console.error("Error loading bids:", error);
        message.error("خطا در بارگذاری مزایده‌ها");
      })
      .finally(() => {
        getAllBids()
          .then((res) => {
            if (res.status === 200) {
              const bids = res.data.data.bids;
              for (let el of bids) {
                el.images = JSON.parse(el.images);
              }
              setAllBids(bids);
            }
          })
          .catch((error) => {
            console.error("Error loading bids:", error);
            message.error("خطا در بارگذاری مزایده‌ها");
          })
          .finally(() => {
            setLoading(false);
          });
      });
  };

  const loadCategories = () => {
    getAllCategories().then((res) => {
      if (res.status === 200) {
        setCategories(res.data);
      }
    });
  };

  const loadBidDetails = async (bidId: string) => {
    setDetailLoading(true);
    try {
      // Load bid details
      const bidResponse = await getBidById(bidId);
      if (bidResponse.data.success) {
        let bid = bidResponse.data.data;
        bid.images = JSON.parse(bid.images);
        setSelectedBid(bid);
      }

      // Load bid offers
      const offersResponse = await getBidOffers(bidId);
      if (offersResponse.data.success) {
        setBidOffers(offersResponse.data.data);
      }

      // Load bid comments
      const commentsResponse = await getBidComments(bidId, {
        includeReplies: true,
      });
      if (commentsResponse.data.success) {
        setBidComments(commentsResponse.data.data);
      }
    } catch (error) {
      console.error("Error loading bid details:", error);
      message.error("خطا در بارگذاری جزئیات مزایده");
    } finally {
      setDetailLoading(false);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const formData = new FormData();

      // Append form data
      Object.keys(values).forEach((key) => {
        if (key === "images" && values.images) {
          // Handle multiple image files
          values.images.fileList.forEach((file: any) => {
            formData.append("images", file.originFileObj);
          });
        } else if (key === "dateRange" && values.dateRange) {
          // Handle date range
          const [startDate, endDate] = values.dateRange;
          formData.append("startDate", startDate.toISOString());
          if (endDate) {
            formData.append("endDate", endDate.toISOString());
          }
        } else if (
          key !== "images" &&
          key !== "dateRange" &&
          values[key] !== undefined &&
          values[key] !== null
        ) {
          formData.append(key, values[key]);
        }
      });

      console.log("Submitting bid with form data:");
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const response = await createBid(formData);
      if (response.data.success) {
        message.success("مزایده با موفقیت ایجاد شد");
        setIsModalVisible(false);
        form.resetFields();
        loadUserBids(); // Refresh the list
      } else {
        message.error("خطا در ایجاد مزایده");
      }
    } catch (error: any) {
      console.error("Error submitting bid:", error);
      if (error.response?.data?.message) {
        message.error(error.response.data.message);
      } else {
        message.error("خطا در ایجاد مزایده");
      }
    } finally {
      setLoading(false);
    }
  };

  const uploadProps = {
    beforeUpload: (file: File) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        Modal.error({
          title: "خطا",
          content: "فقط می‌توانید فایل تصویر آپلود کنید!",
        });
      }
      return isImage || Upload.LIST_IGNORE;
    },
    multiple: true,
    accept: "image/*",
    listType: "picture" as const,
    maxCount: 10,
  };

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleDetailCancel = () => {
    setIsDetailModalVisible(false);
    setSelectedBid(null);
    setBidOffers([]);
    setBidComments([]);
  };

  const handlePlaceBid = async () => {
    if (!selectedBid || !newBidAmount) return;

    if (newBidAmount <= selectedBid.currentPrice) {
      message.error("مبلغ پیشنهادی باید بیشتر از قیمت فعلی باشد");
      return;
    }

    setPlacingBid(true);
    try {
      const response = await placeBidOffer(selectedBid.id!, newBidAmount);
      if (response.data.success) {
        message.success("پیشنهاد شما با موفقیت ثبت شد");
        setNewBidAmount(0);
        loadBidDetails(selectedBid.id!); // Refresh details
      } else {
        message.error("خطا در ثبت پیشنهاد");
      }
    } catch (error) {
      console.error("Error placing bid:", error);
      message.error("خطا در ثبت پیشنهاد");
    } finally {
      setPlacingBid(false);
    }
  };

  const handleAddComment = async (values: any) => {
    if (!selectedBid) return;

    try {
      const response = await createBidComment({
        bidId: selectedBid.id!,
        rating: values.rating,
        comment: values.comment,
      });

      if (response.data.success) {
        message.success("نظر شما با موفقیت ثبت شد");
        commentForm.resetFields();
        loadBidDetails(selectedBid.id!); // Refresh comments
      } else {
        message.error("خطا در ثبت نظر");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      message.error("خطا در ثبت نظر");
    }
  };

  const handleEndBid = async () => {
    if (!selectedBid) return;

    try {
      const response = await updateBidStatus(selectedBid.id!, "completed");
      if (response.data.success) {
        message.success("مزایده با موفقیت به اتمام رسید");
        handleDetailCancel();
        loadUserBids(); // Refresh the list
      } else {
        message.error("خطا در اتمام مزایده");
      }
    } catch (error) {
      console.error("Error ending bid:", error);
      message.error("خطا در اتمام مزایده");
    }
  };

  const calculateAverageRating = (): number => {
    if (!bidComments.length) return 0;
    const sum = bidComments.reduce(
      (total, comment) => total + comment.rating,
      0
    );
    return sum / bidComments.length;
  };

  const getFormattedAverageRating = (): string => {
    return calculateAverageRating().toFixed(1);
  };

  // Date range validation
  const disabledDate = (current: dayjs.Dayjs) => {
    // Can not select days before today
    return current && current < dayjs().startOf("day");
  };

  return (
    <>
      <div className="text-[26px] pb-[15px] flex justify-between items-center mb-[30px] border-b-[1px] border-b-[#ccc]">
        <div>مزایده ها</div>
        <div>
          <Button icon={<PiPlusThin />} onClick={showModal}>
            افزودن مزایده
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Spin size="large" />
        </div>
      ) : (
        <div>
          <div className="border-b mb-4">
            <div className="flex space-x-4 space-x-reverse">
              <button
                className={`py-2 px-4 font-medium ${
                  activeTab === "userBids"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("userBids")}
              >
                مزایده های من ({userBids.length})
              </button>
              <button
                className={`py-2 px-4 font-medium ${
                  activeTab === "allBids"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("allBids")}
              >
                تمام مزایده ها ({allBids.length})
              </button>
            </div>
          </div>

          <div className="flex flex-wrap">
            {activeTab === "userBids" && (
              <>
                {userBids.map((bid) => (
                  <SaleTradeItem trade={bid} key={`user-bid-${bid.id}`} />
                ))}
                {userBids.length === 0 && (
                  <div className="text-center w-full py-8 text-gray-500">
                    هیچ مزایده‌ای ثبت نکرده‌اید
                  </div>
                )}
              </>
            )}

            {activeTab === "allBids" && (
              <>
                {allBids.map((bid) => (
                  <SaleTradeItem trade={bid} key={`all-bid-${bid.id}`} />
                ))}
                {allBids.length === 0 && (
                  <div className="text-center w-full py-8 text-gray-500">
                    هیچ مزایده‌ای یافت نشد
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Create Bid Modal */}
      <Modal
        title={
          <div className="text-right text-[20px] font-bold">
            ایجاد مزایده جدید
          </div>
        }
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={600}
        centered
        className="rtl-modal"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="mt-6"
          dir="rtl"
        >
          <Form.Item
            name="title"
            label="عنوان محصول"
            rules={[
              { required: true, message: "لطفاً عنوان محصول را وارد کنید" },
              { min: 3, message: "عنوان محصول باید حداقل ۳ کاراکتر باشد" },
            ]}
          >
            <Input
              placeholder="عنوان محصول را وارد کنید..."
              size="large"
              className="rounded-[8px]"
            />
          </Form.Item>

          <Form.Item name="description" label="توضیحات محصول (اختیاری)">
            <TextArea
              placeholder="توضیحات محصول را وارد کنید..."
              rows={4}
              className="rounded-[8px]"
            />
          </Form.Item>

          <Form.Item
            name="startingPrice"
            label="قیمت شروع (تومان)"
            rules={[
              { required: true, message: "لطفاً قیمت شروع را وارد کنید" },
              {
                type: "number",
                min: 1000,
                message: "قیمت شروع باید حداقل ۱,۰۰۰ تومان باشد",
              },
            ]}
          >
            <InputNumber
              placeholder="قیمت شروع را وارد کنید"
              size="large"
              className="w-full rounded-[8px]"
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value?.replace(/\$\s?|(,*)/g, "") as any}
            />
          </Form.Item>

          <Form.Item
            name="dateRange"
            label="بازه زمانی مزایده"
            rules={[
              {
                required: true,
                message: "لطفاً بازه زمانی مزایده را انتخاب کنید",
              },
            ]}
          >
            <RangePicker
              size="large"
              className="w-full rounded-[8px]"
              placeholder={["تاریخ شروع", "تاریخ پایان (اختیاری)"]}
              disabledDate={disabledDate}
              showTime={{
                format: "HH:mm",
              }}
              format="YYYY-MM-DD HH:mm"
            />
          </Form.Item>

          <Form.Item
            name="categoryId"
            label="دسته‌بندی"
            rules={[
              { required: true, message: "لطفاً دسته‌بندی را انتخاب کنید" },
            ]}
          >
            <TreeSelect
              treeData={categories}
              size="large"
              placeholder="دسته‌بندی را انتخاب کنید"
              className="w-full rounded-[8px]"
              treeDefaultExpandAll
              showCheckedStrategy={SHOW_PARENT}
              fieldNames={{
                label: "title",
                value: "id",
                children: "children",
              }}
            />
          </Form.Item>

          <Form.Item
            name="images"
            label="تصاویر محصول"
            rules={[
              { required: true, message: "لطفاً حداقل یک تصویر آپلود کنید" },
            ]}
          >
            <Upload.Dragger
              {...uploadProps}
              className="rounded-[8px] border-dashed"
            >
              <div className="py-8">
                <PiUpload className="text-[32px] text-[#1890ff] mb-2 mx-auto" />
                <p className="text-[14px] text-gray-600">
                  تصاویر محصول را اینجا رها کنید یا برای آپلود کلیک کنید
                </p>
                <p className="text-[12px] text-gray-400 mt-1">
                  فقط فایل‌های تصویری (حداکثر ۱۰ فایل)
                </p>
              </div>
            </Upload.Dragger>
          </Form.Item>

          <div className="flex gap-3 justify-start mt-8">
            <Button
              size="large"
              onClick={handleCancel}
              className="min-w-[120px] rounded-[8px]"
            >
              انصراف
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
              className="min-w-[120px] rounded-[8px] bg-blue-600 hover:bg-blue-700"
            >
              ایجاد مزایده
            </Button>
          </div>
        </Form>
      </Modal>

      {/* Bid Details Modal */}
      <Modal
        title={
          <div className="text-right text-[20px] font-bold">جزئیات مزایده</div>
        }
        open={isDetailModalVisible}
        onCancel={handleDetailCancel}
        footer={null}
        width={800}
        centered
        className="rtl-modal"
      >
        {detailLoading ? (
          <div className="flex justify-center items-center h-40">
            <Spin size="large" />
          </div>
        ) : (
          selectedBid && (
            <div className="mt-6" dir="rtl">
              {/* Product Header */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-[18px] font-bold mb-2">
                      {selectedBid.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <PiCalendar />
                        <span>
                          تاریخ شروع: {formatDate(selectedBid.startDate)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <PiCurrencyDollar />
                        <span>
                          قیمت شروع: {formatPrice(selectedBid.startingPrice)}{" "}
                          تومان
                        </span>
                      </div>
                      {selectedBid.endDate && (
                        <div className="flex items-center gap-1">
                          <PiCalendar />
                          <span>
                            تاریخ پایان: {formatDate(selectedBid.endDate)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <Tag
                    color={
                      selectedBid.status === "active"
                        ? "blue"
                        : selectedBid.status === "completed"
                        ? "green"
                        : selectedBid.status === "cancelled"
                        ? "red"
                        : "orange"
                    }
                    className="text-[14px] px-3 py-1"
                  >
                    {selectedBid.status === "active"
                      ? "فعال"
                      : selectedBid.status === "completed"
                      ? "تمام شده"
                      : selectedBid.status === "cancelled"
                      ? "لغو شده"
                      : "منقضی شده"}
                  </Tag>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Latest Bids Section */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-[16px] font-bold">آخرین پیشنهادها</h4>
                    <span className="text-sm text-gray-500">
                      تعداد: {bidOffers.length}
                    </span>
                  </div>

                  <div className="border rounded-lg max-h-[400px] overflow-y-auto">
                    {bidOffers.length > 0 ? (
                      <List
                        dataSource={bidOffers}
                        renderItem={(offer, index) => (
                          <List.Item className="!px-4 !py-3 border-b last:border-b-0">
                            <div className="flex justify-between items-center w-full">
                              <div className="flex items-center gap-3">
                                <Avatar
                                  icon={<PiUser />}
                                  size="small"
                                  className="bg-blue-100 text-blue-600"
                                />
                                <div>
                                  <div className="font-medium">
                                    {offer.user?.first_name}{" "}
                                    {offer.user?.last_name}
                                  </div>
                                  <div className="text-xs text-gray-500 flex items-center gap-1">
                                    <PiCalendar />
                                    {formatDate(offer.createdAt!)}
                                  </div>
                                </div>
                              </div>
                              <div className="text-left">
                                <div
                                  className={`font-bold text-[16px] ${
                                    index === 0
                                      ? "text-green-600"
                                      : "text-gray-700"
                                  }`}
                                >
                                  {formatPrice(offer.amount)} تومان
                                </div>
                                {index === 0 && (
                                  <Tag color="green" className="text-xs mt-1">
                                    پیشنهاد برتر
                                  </Tag>
                                )}
                              </div>
                            </div>
                          </List.Item>
                        )}
                      />
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        هنوز پیشنهادی ثبت نشده است
                      </div>
                    )}
                  </div>

                  {/* Place Bid Section */}
                  {selectedBid.status === "active" && (
                    <div className="mt-4 p-4 border rounded-lg bg-green-50">
                      <div className="flex gap-2 items-end">
                        <div className="flex-1">
                          <label className="block text-sm font-medium mb-2">
                            مبلغ پیشنهادی شما (تومان)
                          </label>
                          <InputNumber
                            value={newBidAmount}
                            onChange={(value) => setNewBidAmount(value || 0)}
                            formatter={(value) =>
                              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            }
                            parser={(value) =>
                              value?.replace(/\$\s?|(,*)/g, "") as any
                            }
                            placeholder="مبلغ پیشنهادی را وارد کنید"
                            className="w-full"
                            min={selectedBid.currentPrice + 1000}
                          />
                          <div className="text-xs text-gray-500 mt-1">
                            حداقل مبلغ:{" "}
                            {formatPrice(selectedBid.currentPrice + 1000)} تومان
                          </div>
                        </div>
                        <Button
                          type="primary"
                          loading={placingBid}
                          onClick={handlePlaceBid}
                          disabled={
                            !newBidAmount ||
                            newBidAmount <= selectedBid.currentPrice
                          }
                          className="bg-green-600 hover:bg-green-700"
                        >
                          ثبت پیشنهاد
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Comments & Ratings Section */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-[16px] font-bold">نظرات و امتیازات</h4>
                    <div className="flex items-center gap-2">
                      <Rate
                        disabled
                        value={calculateAverageRating()}
                        className="text-sm"
                      />
                      <span className="text-sm text-gray-500">
                        ({getFormattedAverageRating()} از ۵)
                      </span>
                    </div>
                  </div>

                  <div className="border rounded-lg max-h-[400px] overflow-y-auto">
                    {bidComments.length > 0 ? (
                      <List
                        dataSource={bidComments}
                        renderItem={(comment) => (
                          <List.Item className="!px-4 !py-3 border-b last:border-b-0">
                            <div className="w-full">
                              <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-3">
                                  <Avatar
                                    icon={<PiUser />}
                                    size="small"
                                    className="bg-orange-100 text-orange-600"
                                  />
                                  <div>
                                    <div className="font-medium">
                                      {comment.user?.first_name}{" "}
                                      {comment.user?.last_name}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      {formatDate(comment.createdAt!)}
                                    </div>
                                  </div>
                                </div>
                                <Rate
                                  disabled
                                  value={comment.rating}
                                  className="text-sm"
                                />
                              </div>
                              <div className="text-gray-700 text-sm pr-12">
                                {comment.comment}
                              </div>
                            </div>
                          </List.Item>
                        )}
                      />
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        هنوز نظری ثبت نشده است
                      </div>
                    )}
                  </div>

                  {/* Add Comment Section */}
                  <div className="mt-4 p-4 border rounded-lg bg-blue-50">
                    <Form
                      form={commentForm}
                      layout="vertical"
                      onFinish={handleAddComment}
                    >
                      <Form.Item
                        name="rating"
                        label="امتیاز دهید"
                        rules={[
                          { required: true, message: "لطفاً امتیاز دهید" },
                        ]}
                      >
                        <Rate />
                      </Form.Item>
                      <Form.Item
                        name="comment"
                        label="نظر شما"
                        rules={[
                          {
                            required: true,
                            message: "لطفاً نظر خود را وارد کنید",
                          },
                          {
                            min: 10,
                            message: "نظر باید حداقل ۱۰ کاراکتر باشد",
                          },
                        ]}
                      >
                        <TextArea
                          rows={3}
                          placeholder="نظر خود را درباره این مزایده بنویسید..."
                        />
                      </Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        ثبت نظر
                      </Button>
                    </Form>
                  </div>
                </div>
              </div>

              {/* Statistics Section */}
              <Divider />
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="text-[12px] text-gray-600 mb-1">
                    تعداد پیشنهادها
                  </div>
                  <div className="text-[18px] font-bold text-blue-600">
                    {bidOffers.length}
                  </div>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="text-[12px] text-gray-600 mb-1">
                    بالاترین پیشنهاد
                  </div>
                  <div className="text-[18px] font-bold text-green-600">
                    {bidOffers.length > 0
                      ? formatPrice(bidOffers[0]?.amount)
                      : 0}{" "}
                    تومان
                  </div>
                </div>
                <div className="bg-orange-50 p-3 rounded-lg">
                  <div className="text-[12px] text-gray-600 mb-1">
                    میانگین امتیاز
                  </div>
                  <div className="text-[18px] font-bold text-orange-600">
                    {getFormattedAverageRating()} از ۵
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 justify-start mt-6 pt-4 border-t">
                <Button
                  size="large"
                  onClick={handleDetailCancel}
                  className="min-w-[120px] rounded-[8px]"
                >
                  بستن
                </Button>
                {selectedBid.status === "active" && (
                  <Button
                    type="primary"
                    size="large"
                    onClick={handleEndBid}
                    className="min-w-[120px] rounded-[8px] bg-red-600 hover:!bg-red-700"
                  >
                    اتمام مزایده
                  </Button>
                )}
              </div>
            </div>
          )
        )}
      </Modal>
    </>
  );
}
