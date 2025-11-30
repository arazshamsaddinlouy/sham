import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Popover, Button, Badge, Avatar, Drawer, Divider } from "antd";
import {
  LogoutOutlined,
  UserOutlined,
  BellOutlined,
  UserAddOutlined,
  PlusOutlined,
  WalletOutlined,
  ProductOutlined,
  MenuOutlined,
  CloseOutlined,
  CustomerServiceOutlined,
  CrownOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { ShamContext } from "../App";
import { getUserInfo } from "../services/auth.service";
import { setUser } from "../store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { getAllMenus } from "../services/content.service";

export default function Header() {
  const [menus, setMenus] = useState<any[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [userMenuOpen, setUserMenuOpen] = useState<boolean>(false);
  const [notificationsOpen, setNotificationsOpen] = useState<boolean>(false);
  const { user } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const [token, setToken] = useState<string>();
  const value: any = useContext(ShamContext);
  const navigate = useNavigate();

  // Close all popovers on route change
  useEffect(() => {
    setUserMenuOpen(false);
    setNotificationsOpen(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleSignOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    value.setNotif({ type: "success", description: "خروج با موفقیت" });
    navigate("/");
    setUserMenuOpen(false);
  };

  useEffect(() => {
    getAllMenus().then((res) => {
      if (res.status === 200) setMenus(res.data.menus);
    });
  }, []);

  useEffect(() => {
    const storageToken = localStorage.getItem("accessToken");
    if (storageToken) {
      setToken(storageToken);
      getUserInfo()
        .then((data) => {
          if (data.status === 200) {
            dispatch(setUser(data.data.user));
          } else {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            navigate("/login");
          }
        })
        .catch(() => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          navigate("/login");
        });
    } else {
      setToken(undefined);
    }
  }, [location.pathname]);

  const UserMenuContent = () => (
    <div className="w-80">
      {/* User Header */}
      <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg mb-3">
        <div className="flex items-center gap-3">
          <Avatar
            size={48}
            icon={<UserOutlined />}
            className="bg-gradient-to-r from-blue-500 to-purple-600 shadow-md"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate">
              {user?.first_name} {user?.last_name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-1 bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs">
                <CrownOutlined />
                <span>کاربر طلایی</span>
              </div>
              <span className="text-xs text-gray-500">امتیاز: ۳۲۱</span>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="space-y-1">
        <div
          className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors"
          onClick={() => {
            navigate("/dashboard/profile/edit");
            setUserMenuOpen(false);
          }}
        >
          <UserAddOutlined className="text-blue-600 text-lg" />
          <div>
            <div className="font-medium text-gray-900">ویرایش پروفایل</div>
            <div className="text-xs text-gray-500">مدیریت اطلاعات شخصی</div>
          </div>
        </div>

        <div
          className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors"
          onClick={() => {
            navigate("/dashboard/packages");
            setUserMenuOpen(false);
          }}
        >
          <ProductOutlined className="text-green-600 text-lg" />
          <div className="font-medium text-gray-900">خرید اشتراک</div>
        </div>
        {user.customerType == "0" && (
          <div
            className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors"
            onClick={() => {
              navigate("/dashboard/branches");
              setUserMenuOpen(false);
            }}
          >
            <PlusOutlined className="text-purple-600 text-lg" />
            <div className="font-medium text-gray-900">افزودن غرفه</div>
          </div>
        )}

        <div
          className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors"
          onClick={() => {
            navigate("/dashboard/charge");
            setUserMenuOpen(false);
          }}
        >
          <WalletOutlined className="text-emerald-600 text-lg" />
          <div className="flex-1">
            <div className="font-medium text-gray-900">شارژ کیف پول</div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-gray-500">موجودی:</span>
              <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs font-medium">
                ۲۲,۳۰۰ تومان
              </span>
            </div>
          </div>
        </div>

        <Divider className="my-3" />

        <div
          className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors"
          onClick={() => {
            navigate("/dashboard/settings");
            setUserMenuOpen(false);
          }}
        >
          <SettingOutlined className="text-gray-600 text-lg" />
          <div className="font-medium text-gray-900">تنظیمات</div>
        </div>

        <div
          className="flex items-center gap-3 p-3 cursor-pointer hover:bg-red-50 rounded-lg transition-colors text-red-600"
          onClick={handleSignOut}
        >
          <LogoutOutlined className="text-red-600 text-lg" />
          <div className="font-medium">خروج از حساب</div>
        </div>
      </div>
    </div>
  );

  const NotificationContent = () => (
    <div className="w-full max-w-sm sm:max-w-md md:w-96 max-h-96 overflow-y-auto bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900 text-base sm:text-lg">
              اعلان‌ها
            </h3>
            <p className="text-gray-500 text-xs sm:text-sm mt-1">
              آخرین فعالیت‌های سیستم
            </p>
          </div>
          <Badge count={4} size="small" className="mr-2" />
        </div>
      </div>

      {/* Notifications List */}
      <div className="p-2 sm:p-3 space-y-2 max-h-64 overflow-y-auto">
        {[
          {
            type: "success",
            message: "فلانی تخمین قیمت ارسال کرد",
            time: "۲ دقیقه پیش",
            read: false,
          },
          {
            type: "info",
            message: "قلانی پیامی برای شما ارسال کرد",
            time: "۱ ساعت پیش",
            read: false,
          },
          {
            type: "warning",
            message: "تخمین قیمت فلانی به پایان رسید",
            time: "۲ ساعت پیش",
            read: true,
          },
          {
            type: "error",
            message: "فعالیت شما در این کارتابل کم بود",
            time: "۱ روز پیش",
            read: true,
          },
        ].map((notification, index) => (
          <div
            key={index}
            className={`
            p-3 rounded-lg border-l-4 transition-all duration-200 hover:shadow-md
            ${!notification.read ? "bg-white" : "bg-gray-50"}
            ${
              notification.type === "success"
                ? "border-l-green-500 hover:border-l-green-600"
                : notification.type === "info"
                ? "border-l-blue-500 hover:border-l-blue-600"
                : notification.type === "warning"
                ? "border-l-amber-500 hover:border-l-amber-600"
                : "border-l-red-500 hover:border-l-red-600"
            }
          `}
          >
            <div className="flex justify-between items-start gap-2">
              <div className="flex-1 min-w-0">
                <p
                  className={`
                text-gray-800 text-sm leading-5 break-words
                ${!notification.read ? "font-medium" : "font-normal"}
              `}
                >
                  {notification.message}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-gray-500 text-xs">{notification.time}</p>
                  {!notification.read && (
                    <span className="inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
                  )}
                </div>
              </div>
              <Button
                type="text"
                size="small"
                className="flex-shrink-0 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-1"
                icon={<CloseOutlined className="text-xs" />}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-gray-200 bg-gray-50 sticky bottom-0">
        <Button
          type="link"
          block
          className="text-blue-600 hover:text-blue-800 font-medium text-sm"
          size="large"
          onClick={() => navigate("/dashboard/notifications")}
        >
          مشاهده همه اعلان‌ها
        </Button>
      </div>
    </div>
  );
  return (
    <>
      <header className="bg-white/95 backdrop-blur-md border-b border-gray-200/60 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4">
          {/* Increased header height to 90px */}
          <div className="flex items-center justify-between h-[90px]">
            {/* Left Section - Logo & Mobile Menu */}
            <div className="flex items-center gap-4">
              {/* Mobile Menu Button */}
              <Button
                type="text"
                icon={<MenuOutlined />}
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden h-12 w-12 flex items-center justify-center"
              />

              {/* Logo */}
              <Link to="/" className="flex items-center gap-3 group">
                <div className="relative">
                  <img
                    src="/logo.png"
                    alt="چندکو"
                    className="h-12 w-auto transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="hidden sm:flex flex-col">
                  <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    چندکو
                  </div>
                  <div className="text-xs text-gray-500 font-medium">
                    سامانه خرید و فروش منطقه‌ای
                  </div>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {menus.map((el) => (
                <Link
                  key={el.id}
                  to={el.url}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group py-2"
                >
                  {el.title}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
                </Link>
              ))}
            </div>

            {/* Right Section - Actions */}
            <div className="flex items-center gap-3">
              {/* Support Button */}
              <Button
                type="text"
                icon={<CustomerServiceOutlined />}
                onClick={() => navigate("/support")}
                className="hidden sm:flex items-center gap-2 text-gray-600 hover:text-blue-600 h-12 px-4"
              >
                <span className="hidden md:inline">پشتیبانی</span>
              </Button>

              {token ? (
                <>
                  {/* Notifications */}
                  <Popover
                    content={<NotificationContent />}
                    trigger="click"
                    open={notificationsOpen}
                    onOpenChange={setNotificationsOpen}
                    placement="bottomRight"
                  >
                    <Badge count={3} size="small" offset={[-2, 2]}>
                      <Button
                        type="text"
                        icon={<BellOutlined />}
                        className="h-12 w-12 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                      />
                    </Badge>
                  </Popover>

                  {/* User Menu */}
                  <Popover
                    content={<UserMenuContent />}
                    trigger="click"
                    open={userMenuOpen}
                    onOpenChange={setUserMenuOpen}
                    placement="bottomRight"
                  >
                    <Button
                      type="text"
                      className="h-12 px-4 flex items-center gap-3 border border-gray-200 hover:border-blue-300 hover:bg-blue-50 rounded-lg transition-all duration-200"
                    >
                      <Avatar
                        size="default"
                        icon={<UserOutlined />}
                        className="bg-gradient-to-r from-blue-500 to-purple-600"
                      />
                      <div className="hidden md:flex flex-col items-start">
                        <span className="text-gray-700 font-medium text-sm">
                          {user?.first_name}
                        </span>
                        <span className="text-gray-500 text-xs">
                          کاربر طلایی
                        </span>
                      </div>
                    </Button>
                  </Popover>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <Button
                    type="default"
                    onClick={() => navigate("/login")}
                    className="h-12 px-6 border-gray-300 hover:border-blue-500 text-gray-700 rounded-lg font-medium"
                  >
                    ورود
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => navigate("/register")}
                    className="h-12 px-6 bg-gradient-to-r from-blue-600 to-purple-600 border-0 hover:shadow-lg rounded-lg font-medium transition-all duration-200"
                  >
                    ثبت نام
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <Drawer
        title={
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="چندکو" className="h-8 w-auto" />
            <div>
              <div className="font-bold text-lg">چندکو</div>
              <div className="text-xs text-gray-500">منو</div>
            </div>
          </div>
        }
        placement="right"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        width={320}
        className="lg:hidden"
      >
        <div className="flex flex-col h-full">
          {/* Navigation Links */}
          <div className="flex-1 space-y-2">
            {menus.map((el) => (
              <Button
                key={el.id}
                type="text"
                block
                onClick={() => {
                  navigate(el.url);
                  setMobileMenuOpen(false);
                }}
                className="h-12 text-right justify-start text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              >
                {el.title}
              </Button>
            ))}
          </div>

          {/* Bottom Actions */}
          <div className="border-t border-gray-200 pt-4 space-y-2">
            <Button
              type="text"
              icon={<CustomerServiceOutlined />}
              block
              onClick={() => {
                navigate("/support");
                setMobileMenuOpen(false);
              }}
              className="h-12 text-right justify-start text-gray-700"
            >
              پشتیبانی
            </Button>

            {!token && (
              <>
                <Button
                  type="default"
                  block
                  onClick={() => {
                    navigate("/login");
                    setMobileMenuOpen(false);
                  }}
                  className="h-12 border-gray-300 text-gray-700"
                >
                  ورود به حساب
                </Button>
                <Button
                  type="primary"
                  block
                  onClick={() => {
                    navigate("/register");
                    setMobileMenuOpen(false);
                  }}
                  className="h-12 bg-gradient-to-r from-blue-600 to-purple-600 border-0"
                >
                  ثبت نام جدید
                </Button>
              </>
            )}
          </div>
        </div>
      </Drawer>
    </>
  );
}
