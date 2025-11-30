import { Badge, Drawer, Button } from "antd";
import { useEffect, useState, useRef } from "react";
import {
  HiOutlineChartBar,
  HiOutlineCog,
  HiOutlineClipboardList,
  HiOutlineTag,
  HiOutlineCurrencyDollar,
  HiOutlineUserGroup,
  HiOutlineViewGrid,
  HiOutlineChevronLeft,
} from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  getActiveRequests,
  getAllActiveRequests,
} from "../../services/price-inquiry.service";
import {
  setActiveRequest,
  setRequestCount,
} from "../../store/slices/userSlice";
import useIsMobile from "../../hooks/useIsMobile";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Dashboard() {
  const location = useLocation();
  const dispatch = useDispatch();
  const isMobile = useIsMobile();

  const user = useSelector((state: any) => state?.user?.user || {});
  const activeRequests = useSelector(
    (state: any) => state?.user?.activeRequests || 0
  );
  const requestCount = useSelector(
    (state: any) => state?.user?.requestCount || 0
  );

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user.customerType == "1") {
      getActiveRequests().then((data) => {
        if (data.status === 200) dispatch(setActiveRequest(data.data.length));
      });
    } else {
      getAllActiveRequests().then((data) => {
        if (data.status === 200) dispatch(setRequestCount(data.data.length));
      });
    }
  }, [location.pathname, user.customerType]);

  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [location.pathname, isMobile]);

  const sidebarItems = [
    ...(user.customerType == "1"
      ? [
          {
            title: "مزایده ها",
            to: "/dashboard/trades",
            icon: HiOutlineCurrencyDollar,
            color: "text-blue-400",
          },
          {
            title: "حراج ها",
            to: "/dashboard/sales",
            icon: HiOutlineTag,
            color: "text-green-400",
          },
          {
            title: "استعلام های قیمت",
            to: "/dashboard/my-requests",
            count: activeRequests,
            icon: HiOutlineClipboardList,
            color: "text-purple-400",
          },
          {
            title: "درخواست استعلام قیمت",
            to: "/dashboard/request-price",
            icon: HiOutlineViewGrid,
            color: "text-orange-400",
          },
        ]
      : []),
    ...(user.customerType == "0"
      ? [
          {
            title: "مزایده ها",
            to: "/dashboard/trades",
            icon: HiOutlineCurrencyDollar,
            color: "text-blue-400",
          },
          {
            title: "حراج ها",
            to: "/dashboard/sales",
            icon: HiOutlineTag,
            color: "text-green-400",
          },
          {
            title: "تنظیمات غرفه",
            to: "/dashboard/branches",
            icon: HiOutlineCog,
            color: "text-gray-400",
          },
          {
            title: "استعلام های دریافتی",
            to: "/dashboard/customer-request",
            count: requestCount,
            icon: HiOutlineUserGroup,
            color: "text-red-400",
          },
        ]
      : []),
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Sidebar Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
            <HiOutlineChartBar className="text-white text-xl" />
          </div>
          <div>
            <h1 className="text-white font-bold text-lg">پنل کاربری چندکو</h1>
            <p className="text-white/60 text-sm">
              {user.customerType == "1" ? "خریدار" : "فروشنده"}
            </p>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 bg-white/5 mx-4 mt-4 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">
              {user?.first_name?.[0]}
              {user?.last_name?.[0]}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-medium text-sm truncate">
              {user?.first_name} {user?.last_name}
            </p>
            <p className="text-white/60 text-xs">خوش آمدید</p>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-2 mt-4">
        {sidebarItems.map((item, index) => {
          const IconComponent = item.icon;
          const isActive = location.pathname === item.to;

          return (
            <Link
              key={index}
              to={item.to}
              className={`
                flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group
                ${
                  isActive
                    ? "bg-white/20 text-white shadow-lg"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }
              `}
              onClick={() => isMobile && setSidebarOpen(false)}
            >
              <div
                className={`
                w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200
                ${
                  isActive
                    ? "bg-white text-purple-600"
                    : "bg-white/10 group-hover:bg-white/20"
                }
              `}
              >
                <IconComponent
                  className={`text-lg ${
                    isActive ? "text-purple-600" : item.color
                  }`}
                />
              </div>

              <div className="flex-1 flex items-center justify-between">
                <span className="font-medium text-sm">{item.title}</span>

                <div className="flex items-center gap-2">
                  {item.count !== undefined && item.count > 0 && (
                    <Badge
                      count={item.count}
                      className="ml-2"
                      style={{
                        backgroundColor: "#10b981",
                        borderColor: "#10b981",
                      }}
                    />
                  )}
                  <HiOutlineChevronLeft
                    className={`
                    text-lg transition-transform duration-200
                    ${isActive ? "text-white" : "text-white/40"}
                  `}
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-white/10">
        <div className="bg-white/5 rounded-xl p-3">
          <p className="text-white/60 text-xs text-center">نسخه ۱.۰.۰</p>
        </div>
      </div>
    </div>
  );

  return (
    <div
      id="main-parent"
      className="flex w-full min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 pt-[0px]"
    >
      {/* Desktop Sidebar */}
      {!isMobile && (
        <div
          ref={sidebarRef}
          className="w-80 bg-gradient-to-b from-purple-600 to-purple-700 text-white h-[calc(100vh-90px)] sticky top-[90px] shadow-xl border-l border-white/10"
        >
          <SidebarContent />
        </div>
      )}

      {/* Mobile Drawer */}
      <Drawer
        placement="right"
        onClose={() => setSidebarOpen(false)}
        open={sidebarOpen}
        width={320}
        bodyStyle={{ padding: 0 }}
        closable={false}
        className="md:hidden"
      >
        <div className="bg-gradient-to-b from-purple-600 to-purple-700 text-white h-full">
          <SidebarContent />
        </div>
      </Drawer>

      {/* Main Content Area */}
      <div
        className={`
        flex-1 min-h-[calc(100vh-90px)] transition-all duration-300
        ${isMobile ? "w-full" : "max-w-[calc(100vw-320px)]"}
      `}
      >
        {/* Mobile Header */}
        {isMobile && (
          <div className="bg-white/80 backdrop-blur-md border-b border-gray-200/60 sticky top-[90px] z-30 shadow-sm">
            <div className="flex items-center justify-between p-4">
              <div>
                <h1 className="text-lg font-bold text-gray-800">
                  {sidebarItems.find((item) => item.to === location.pathname)
                    ?.title || "داشبورد"}
                </h1>
                <p className="text-gray-500 text-sm mt-1">
                  مدیریت و نظارت بر فعالیت‌ها
                </p>
              </div>

              <Button
                icon={<GiHamburgerMenu className="text-lg" />}
                onClick={() => setSidebarOpen(true)}
                className="border-0 h-12 w-12 flex items-center justify-center rounded-xl"
              />
            </div>
          </div>
        )}

        {/* Content Container */}
        <div
          className={`
          p-4 md:p-6 lg:p-8
          ${isMobile ? "pt-6" : "pt-8"}
        `}
        >
          {/* Welcome Card */}
          {!isMobile && (
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold mb-2">
                    سلام، {user?.first_name} {user?.last_name} 👋
                  </h1>
                  <p className="text-blue-100 text-lg">
                    به پنل کاربری چندکو{" "}
                    {user.customerType == "1" ? "خریدار" : "فروشنده"} خوش آمدید
                  </p>
                </div>
                <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center">
                  <HiOutlineChartBar className="text-3xl" />
                </div>
              </div>
            </div>
          )}

          {/* Page Content */}
          <div
            className={`
            bg-white rounded-2xl shadow-sm border border-gray-200/60
            ${isMobile ? "p-4" : "p-6"}
          `}
          >
            <Outlet />
          </div>

          {/* Quick Stats Footer */}
          {!isMobile && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200/60 text-center">
                <div className="text-2xl font-bold text-purple-600 mb-1">
                  {activeRequests + requestCount}
                </div>
                <div className="text-gray-600 text-sm">کل درخواست‌ها</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200/60 text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {user.customerType == "1" ? activeRequests : requestCount}
                </div>
                <div className="text-gray-600 text-sm">
                  {user.customerType == "1"
                    ? "استعلام‌های فعال"
                    : "درخواست‌های جدید"}
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200/60 text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {sidebarItems.length}
                </div>
                <div className="text-gray-600 text-sm">ماژول‌های فعال</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
