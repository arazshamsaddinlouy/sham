import { Badge } from "antd";
import { useEffect, useState, useRef } from "react";
import { LuList } from "react-icons/lu";
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

  // Sticky sidebar logic
  useEffect(() => {
    if (isMobile) return; // No sticky behavior on mobile

    const handleScroll = () => {
      const sidebar = sidebarRef.current;
      const footer = document.querySelector("footer"); // assumes you have a footer tag
      if (!sidebar || !footer) return;

      const footerRect = footer.getBoundingClientRect();
      const sidebarHeight = sidebar.offsetHeight;
      const topOffset = 90; // same as pt-[100px]

      if (footerRect.top <= sidebarHeight + topOffset) {
        sidebar.style.position = "absolute";
        sidebar.style.top = `${footer.offsetTop - sidebarHeight}px`;
      } else {
        sidebar.style.position = "fixed";
        sidebar.style.top = `${topOffset}px`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isMobile]);

  const sidebarItems = [
    ...(user.customerType == "1"
      ? [
          {
            title: "استعلام های قیمت",
            to: "/dashboard/my-requests",
            count: activeRequests,
          },
          { title: "درخواست استعلام قیمت", to: "/dashboard/request-price" },
        ]
      : []),
    { title: "مزایده ها", to: "/dashboard/trades" },
    { title: "حراج ها", to: "/dashboard/sales" },
    ...(user.customerType == "0"
      ? [
          { title: "تنظیمات غرفه", to: "/dashboard/branches" },
          {
            title: "استعلام های دریافتی",
            to: "/dashboard/customer-request",
            count: requestCount,
          },
        ]
      : []),
  ];

  return (
    <div className="flex w-full min-h-screen bg-gray-50 pt-[90px]">
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`
          ${
            isMobile
              ? `${sidebarOpen ? "w-64" : "w-0"} overflow-hidden`
              : "w-64"
          }
          bg-gradient-to-b from-purple-700 h-[calc(100vh-90px)] to-purple-500 text-white
          z-50 flex overflow-hidden flex-col
        `}
      >
        <div className="absolute inset-0 opacity-20">
          <img
            src="/images/middle-wallpaper.jpg"
            className="w-full h-full object-cover min-h-[100%]"
          />
        </div>
        <div className="flex items-center relative z-[20] justify-between p-6 border-b border-white/20">
          <h1 className="text-xl font-bold">پنل مدیریت</h1>
          {isMobile && (
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-white text-2xl focus:outline-none"
            >
              &times;
            </button>
          )}
        </div>
        <ul className="mt-6 flex flex-col gap-2 pr-2 relative z-[20]">
          {sidebarItems.map((item, index) => (
            <li key={index} className="hover:bg-white/20 rounded-lg">
              <Link
                to={item.to}
                className="flex justify-between items-center p-4 font-medium"
              >
                <div className="flex items-center gap-2">
                  <LuList />
                  <span>{item.title}</span>
                </div>
                {item.count !== undefined && (
                  <Badge
                    count={item.count}
                    style={{
                      backgroundColor: "#52c41a",
                      borderColor: "#52c41a",
                    }}
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Overlay for mobile */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isMobile ? "mr-0" : "mr-64"
        } px-[10px] pt-[30px] md:px-[30px]`}
      >
        {isMobile && !sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="mb-4 text-purple-700 bg-white px-4 py-2 rounded-lg shadow-md"
          >
            منو
          </button>
        )}
        <Outlet />
      </div>
    </div>
  );
}
