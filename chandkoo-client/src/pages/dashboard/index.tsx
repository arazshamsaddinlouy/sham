import { Badge } from "antd";
import { useEffect } from "react";
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
  const activeRequests = useSelector((state: any) => {
    return state?.user?.activeRequests || 0;
  });
  const requestCount = useSelector((state: any) => {
    return state?.user?.requestCount || 0;
  });

  const user = useSelector((state: any) => state?.user?.user || {});
  useEffect(() => {
    if (user.customerType == "1") {
      getActiveRequests().then((data) => {
        if (data.status === 200) {
          dispatch(setActiveRequest(data.data.length));
        }
      });
    } else {
      getAllActiveRequests().then((data) => {
        if (data.status === 200) {
          dispatch(setRequestCount(data.data.length));
        }
      });
    }
  }, [location.pathname, user.customerType]);
  const isMobile = useIsMobile();
  return (
    <div
      className={`container flex ${
        isMobile ? "flex-col" : ""
      } justify-cente items-center mx-auto min-h-[calc(100vh-350px)]`}
    >
      <div
        className={`${
          !isMobile ? "w-[calc(100vw-200px)]" : "w-[calc(100vw-30px)]"
        } h-[calc(100vh-450px)] mt-[40px] mb-[40px] flex ${
          isMobile ? "flex-col" : ""
        } relative rounded-[32px] bg-[#f9f9f9] overflow-hidden`}
      >
        <div
          className={`${
            isMobile ? "w-[calc(100vw-30px)] h-[100px]" : "w-[400px]"
          } relative overflow-hidden`}
        >
          <div className="absolute left-[0px] top-[0px] w-full h-[100vh] bg-[rgba(103,58,183,0.8)] z-[4]"></div>
          <div className="h-[100%] w-[100%] bg-[url('/images/login-wallpaper.jpg')] bg-cover bg-center absolute left-[0px] top-[0px]" />
          <ul
            className={`list-none mt-[30px] !p-[10px_30px] relative z-[10] ${
              isMobile
                ? "flex items-center h-[50px] mt-[15px] whitespace-nowrap overflow-x-auto"
                : ""
            }`}
          >
            {user.customerType === 1 && (
              <li className="text-[#fff] text-[18px] leading-[32px] p-[15px] rounded-[12px] hover:bg-[rgba(255,255,255,0.05)] hover:backdrop-blur-sm">
                <Link
                  to={"/dashboard/my-requests"}
                  className="flex gap-[20px] items-center"
                >
                  <div className="flex items-center gap-[10px]">
                    <div>
                      <LuList />
                    </div>
                    <div>استعلام های قیمت</div>
                    <div>
                      <Badge
                        count={activeRequests}
                        style={{
                          backgroundColor: "#52c41a",
                          borderColor: "#52c41a",
                        }}
                      />
                    </div>
                  </div>
                </Link>
              </li>
            )}
            {user.customerType === 1 && (
              <li className="text-[#fff] text-[18px] leading-[32px] p-[15px] rounded-[12px] hover:bg-[rgba(255,255,255,0.05)] hover:backdrop-blur-sm">
                <Link
                  to={"/dashboard/request-price"}
                  className="flex gap-[20px] items-center"
                >
                  <div className="flex items-center gap-[10px]">
                    <div>
                      <LuList />
                    </div>
                    <div>درخواست استعلام قیمت</div>
                    <div></div>
                  </div>
                </Link>
              </li>
            )}
            <li className="text-[#fff] text-[18px] leading-[32px] p-[15px] rounded-[12px] hover:bg-[rgba(255,255,255,0.05)] hover:backdrop-blur-sm">
              <Link
                to={"/dashboard/trades"}
                className="flex gap-[20px] items-center"
              >
                <div className="flex items-center gap-[10px]">
                  <div>
                    <LuList />
                  </div>
                  <div>مزایده ها</div>
                  <div></div>
                </div>
              </Link>
            </li>
            <li className="text-[#fff] text-[18px] leading-[32px] p-[15px] rounded-[12px] hover:bg-[rgba(255,255,255,0.05)] hover:backdrop-blur-sm">
              <Link
                to={"/dashboard/sales"}
                className="flex gap-[20px] items-center"
              >
                <div className="flex items-center gap-[10px]">
                  <div>
                    <LuList />
                  </div>
                  <div>حراج ها</div>
                  <div></div>
                </div>
              </Link>
            </li>
            <li className="text-[#fff] text-[18px] leading-[32px] p-[15px] rounded-[12px] hover:bg-[rgba(255,255,255,0.05)] hover:backdrop-blur-sm">
              {user.customerType === 0 && (
                <Link
                  to={"/dashboard/branches"}
                  className="flex gap-[20px] items-center"
                >
                  <div className="flex items-center gap-[10px]">
                    <div>
                      <LuList />
                    </div>
                    <div>تنظیمات غرفه</div>
                    <div></div>
                  </div>
                </Link>
              )}
            </li>
            {user.customerType === 0 && (
              <li className="text-[#fff] text-[18px] leading-[32px] p-[15px] rounded-[12px] hover:bg-[rgba(255,255,255,0.05)] hover:backdrop-blur-sm">
                <Link
                  to={"/dashboard/customer-request"}
                  className="flex gap-[20px] items-center"
                >
                  <div className="flex items-center gap-[10px]">
                    <div>
                      <LuList />
                    </div>
                    <div>استعلام های دریافتی</div>
                    <div>
                      <Badge
                        count={requestCount}
                        style={{
                          backgroundColor: "#52c41a",
                          borderColor: "#52c41a",
                        }}
                      />
                    </div>
                  </div>
                </Link>
              </li>
            )}
          </ul>
        </div>
        <div
          className={`${
            isMobile ? " p-[15px_15px]" : "w-[calc(100vw-600px)]  p-[25px_50px]"
          }" h-[calc(100vh-450px)] rounded-[16px] p-[10px] overflow-auto`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}
