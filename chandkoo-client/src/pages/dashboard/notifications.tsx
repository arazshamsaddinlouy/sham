import React, { useState } from "react";
import {
  Button,
  Badge,
  Tabs,
  Empty,
  Spin,
  Dropdown,
  Menu,
  Checkbox,
  Space,
} from "antd";
import {
  DeleteOutlined,
  CheckCircleOutlined,
  FilterOutlined,
  MoreOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";

// Type definitions
type NotificationType = "success" | "info" | "warning" | "error";

interface Notification {
  id: number;
  type: NotificationType;
  message: string;
  description: string;
  time: string;
  read: boolean;
  category: string;
}

interface NotificationsData {
  all: Notification[];
  unread: Notification[];
}

type TabKey = keyof NotificationsData;

const AllNotificationsPage: React.FC = () => {
  const [selectedNotifications, setSelectedNotifications] = useState<number[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>("all");

  // Sample notifications data with proper typing
  const notificationsData: NotificationsData = {
    all: [
      {
        id: 1,
        type: "success",
        message: "فلانی تخمین قیمت ارسال کرد",
        description:
          "تخمین قیمت برای درخواست #1234 با مبلغ ۲۵۰,۰۰۰ تومان ارسال شد",
        time: "۲ دقیقه پیش",
        read: false,
        category: "price_estimate",
      },
      {
        id: 2,
        type: "info",
        message: "قلانی پیامی برای شما ارسال کرد",
        description: "پیام جدید در مورد درخواست #1235 دریافت شد",
        time: "۱ ساعت پیش",
        read: false,
        category: "message",
      },
      {
        id: 3,
        type: "warning",
        message: "تخمین قیمت فلانی به پایان رسید",
        description: "مهلت ارسال پیشنهاد برای درخواست #1236 به پایان رسید",
        time: "۲ ساعت پیش",
        read: true,
        category: "deadline",
      },
      {
        id: 4,
        type: "error",
        message: "فعالیت شما در این کارتابل کم بود",
        description: "تعداد پیشنهادات شما در هفته گذشته کاهش یافته است",
        time: "۱ روز پیش",
        read: true,
        category: "system",
      },
      {
        id: 5,
        type: "success",
        message: "پیشنهاد شما پذیرفته شد",
        description: "پیشنهاد شما برای درخواست #1237 با موفقیت پذیرفته شد",
        time: "۲ روز پیش",
        read: true,
        category: "acceptance",
      },
      {
        id: 6,
        type: "info",
        message: "درخواست جدید در کارتابل شما",
        description: "درخواست قیمت جدید در دسته بندی شما ایجاد شد",
        time: "۳ روز پیش",
        read: true,
        category: "new_request",
      },
    ],
    unread: [
      {
        id: 1,
        type: "success",
        message: "فلانی تخمین قیمت ارسال کرد",
        description:
          "تخمین قیمت برای درخواست #1234 با مبلغ ۲۵۰,۰۰۰ تومان ارسال شد",
        time: "۲ دقیقه پیش",
        read: false,
        category: "price_estimate",
      },
      {
        id: 2,
        type: "info",
        message: "قلانی پیامی برای شما ارسال کرد",
        description: "پیام جدید در مورد درخواست #1235 دریافت شد",
        time: "۱ ساعت پیش",
        read: false,
        category: "message",
      },
    ],
  };

  const getTypeIcon = (type: NotificationType) => {
    const icons = {
      success: <CheckCircleFilled className="text-green-500" />,
      info: <InfoCircleOutlined className="text-blue-500" />,
      warning: <ExclamationCircleOutlined className="text-amber-500" />,
      error: <ExclamationCircleOutlined className="text-red-500" />,
    };
    return icons[type];
  };

  const getTypeColor = (type: NotificationType): string => {
    const colors = {
      success: "green",
      info: "blue",
      warning: "amber",
      error: "red",
    };
    return colors[type];
  };

  const getBorderColorClass = (
    type: NotificationType,
    read: boolean
  ): string => {
    if (read) return "border-gray-200";

    const colors = {
      success: "border-r-green-500",
      info: "border-r-blue-500",
      warning: "border-r-amber-500",
      error: "border-r-red-500",
    };
    return colors[type];
  };

  const handleSelectAll = (checked: boolean) => {
    const currentNotifications = notificationsData[activeTab];
    if (checked) {
      setSelectedNotifications(currentNotifications.map((notif) => notif.id));
    } else {
      setSelectedNotifications([]);
    }
  };

  const handleSelectNotification = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedNotifications((prev) => [...prev, id]);
    } else {
      setSelectedNotifications((prev) =>
        prev.filter((notifId) => notifId !== id)
      );
    }
  };

  const handleMarkAsRead = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSelectedNotifications([]);
    }, 1000);
  };

  const handleDelete = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSelectedNotifications([]);
    }, 1000);
  };

  const handleClearAll = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const notificationActions = (
    <Menu>
      <Menu.Item
        key="mark-read"
        icon={<CheckCircleOutlined />}
        onClick={handleMarkAsRead}
      >
        علامت گذاری به عنوان خوانده شده
      </Menu.Item>
      <Menu.Item
        key="delete"
        icon={<DeleteOutlined />}
        onClick={handleDelete}
        danger
      >
        حذف اعلان‌ها
      </Menu.Item>
    </Menu>
  );

  const filterMenu = (
    <Menu>
      <Menu.Item key="today">امروز</Menu.Item>
      <Menu.Item key="week">هفته گذشته</Menu.Item>
      <Menu.Item key="month">ماه گذشته</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="all">همه زمان‌ها</Menu.Item>
    </Menu>
  );

  const tabItems = [
    {
      key: "all",
      label: (
        <span className="flex items-center gap-2">
          همه اعلان‌ها
          <Badge count={notificationsData.all.length} size="small" />
        </span>
      ),
    },
    {
      key: "unread",
      label: (
        <span className="flex items-center gap-2">
          خوانده نشده
          <Badge count={notificationsData.unread.length} size="small" />
        </span>
      ),
    },
  ];

  const currentNotifications = notificationsData[activeTab];

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">اعلان‌ها</h1>
              <p className="text-gray-600 mt-2">
                مدیریت و مشاهده تمام اعلان‌های سیستم
              </p>
            </div>

            <Space
              direction="vertical"
              size="middle"
              className="w-full sm:w-auto"
            >
              <div className="flex flex-wrap gap-2">
                <Dropdown overlay={filterMenu} placement="bottomLeft">
                  <Button
                    icon={<FilterOutlined />}
                    className="flex-1 sm:flex-none"
                  >
                    فیلتر بر اساس تاریخ
                  </Button>
                </Dropdown>

                {selectedNotifications.length > 0 && (
                  <Dropdown
                    overlay={notificationActions}
                    placement="bottomLeft"
                  >
                    <Button type="primary" className="flex-1 sm:flex-none">
                      اقدامات ({selectedNotifications.length})
                    </Button>
                  </Dropdown>
                )}

                <Button
                  icon={<DeleteOutlined />}
                  danger
                  onClick={handleClearAll}
                  className="flex-1 sm:flex-none"
                >
                  پاک کردن همه
                </Button>
              </div>
            </Space>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Tabs */}
          <Tabs
            activeKey={activeTab}
            onChange={(key) => setActiveTab(key as TabKey)}
            items={tabItems}
            className="px-4 sm:px-6"
          />

          {/* Notifications List */}
          <div className="p-4 sm:p-6">
            {loading ? (
              <div className="flex justify-center py-12">
                <Spin size="large" />
              </div>
            ) : currentNotifications.length === 0 ? (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="هیچ اعلانی یافت نشد"
                className="py-12"
              />
            ) : (
              <div className="space-y-4">
                {/* Select All */}
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Checkbox
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    checked={
                      selectedNotifications.length ===
                      currentNotifications.length
                    }
                    indeterminate={
                      selectedNotifications.length > 0 &&
                      selectedNotifications.length < currentNotifications.length
                    }
                  >
                    انتخاب همه
                  </Checkbox>

                  {selectedNotifications.length > 0 && (
                    <span className="text-sm text-gray-600">
                      {selectedNotifications.length} اعلان انتخاب شده
                    </span>
                  )}
                </div>

                {/* Notifications */}
                {currentNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`
                      p-4 rounded-lg border transition-all duration-200 hover:shadow-md
                      ${
                        !notification.read
                          ? "border-r-4 bg-white"
                          : "bg-gray-50"
                      }
                      ${getBorderColorClass(
                        notification.type,
                        notification.read
                      )}
                    `}
                  >
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 pt-1">
                        <Checkbox
                          checked={selectedNotifications.includes(
                            notification.id
                          )}
                          onChange={(e) =>
                            handleSelectNotification(
                              notification.id,
                              e.target.checked
                            )
                          }
                        />
                      </div>

                      <div className="flex-shrink-0 pt-1">
                        {getTypeIcon(notification.type)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <h4
                              className={`text-base font-medium ${
                                !notification.read
                                  ? "text-gray-900"
                                  : "text-gray-700"
                              }`}
                            >
                              {notification.message}
                            </h4>
                            <p className="text-gray-600 text-sm mt-1 leading-5">
                              {notification.description}
                            </p>
                            <div className="flex items-center gap-4 mt-2">
                              <span className="text-xs text-gray-500">
                                {notification.time}
                              </span>
                              {!notification.read && (
                                <Badge
                                  color={getTypeColor(notification.type)}
                                  text="جدید"
                                  size="small"
                                />
                              )}
                            </div>
                          </div>

                          <Button
                            type="text"
                            size="small"
                            icon={<MoreOutlined />}
                            className="text-gray-400 hover:text-gray-600"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Load More */}
          {currentNotifications.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-200">
              <Button type="link" block className="text-blue-600">
                بارگذاری اعلان‌های بیشتر
              </Button>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-blue-600">
              {notificationsData.all.length}
            </div>
            <div className="text-gray-600 text-sm">کل اعلان‌ها</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-amber-600">
              {notificationsData.unread.length}
            </div>
            <div className="text-gray-600 text-sm">خوانده نشده</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-green-600">
              {notificationsData.all.length - notificationsData.unread.length}
            </div>
            <div className="text-gray-600 text-sm">خوانده شده</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllNotificationsPage;
