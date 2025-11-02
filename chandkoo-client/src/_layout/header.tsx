import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Popover, Button, Alert } from "antd";
import { FaHeadset } from "react-icons/fa"; // inside return JSX:

import {
  LogoutOutlined,
  UserOutlined,
  BellOutlined,
  UserAddOutlined,
  PlusOutlined,
  WalletOutlined,
  ProductOutlined,
} from "@ant-design/icons";
import { ShamContext } from "../App";
import { getUserInfo } from "../services/auth.service";
import { setUser } from "../store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { CgChevronLeft } from "react-icons/cg";
import { GiHamburgerMenu, GiMedal } from "react-icons/gi";
import { getAllMenus } from "../services/content.service";
import { BiLogIn, BiUserCheck } from "react-icons/bi";

export default function Header() {
  const [menus, setMenus] = useState<any[]>([]);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const { user } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const [token, setToken] = useState<string>();
  const value: any = useContext(ShamContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    value.setNotif({ type: "success", description: "خروج با موفقیت" });
    navigate("/");
  };

  useEffect(() => {
    getAllMenus().then((res) => {
      if (res.status === 200) setMenus(res.data.menus);
    });
  }, []);

  useEffect(() => {
    setOpenMenu(false);
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

  const MenuItems = () => (
    <div className="w-[250px]">
      <div className="flex items-center relative overflow-hidden rounded-lg mb-2 p-3 justify-between bg-yellow-400">
        <div className="absolute right-[-45px] top-[-11px] w-[70px] h-[70px] rotate-[45deg] bg-yellow-500 rounded-lg" />
        <div className="absolute left-[-45px] top-[-11px] w-[70px] h-[70px] rotate-[45deg] bg-yellow-500 rounded-lg" />
        <div className="text-[13px] relative z-[2] font-bold flex items-center">
          امتیاز شما : ۳۲۱
        </div>
        <div className="flex gap-1 relative z-[5] items-center bg-white text-[#333] text-[10px] p-1 rounded-full">
          <GiMedal size={15} />
          کاربر طلایی
        </div>
      </div>
      <div onClick={() => navigate("/dashboard/profile/edit")}>
        <div className="flex h-14 justify-between items-center border-b border-gray-200 p-2 hover:bg-gray-100 cursor-pointer">
          <div className="flex items-center gap-2">
            <UserAddOutlined className="text-2xl text-gray-600" />
            <div className="text-[15px] text-gray-900">
              {user?.first_name} {user?.last_name}
            </div>
          </div>
          <CgChevronLeft size={20} />
        </div>
      </div>
      <div
        className="flex h-10 gap-2 items-center p-2 hover:bg-gray-100 cursor-pointer"
        onClick={() => navigate("/dashboard/branches")}
      >
        <ProductOutlined /> خرید اشتراک
      </div>
      <div
        className="flex h-10 gap-2 items-center p-2 hover:bg-gray-100 cursor-pointer"
        onClick={() => navigate("/dashboard/branches")}
      >
        <PlusOutlined /> افزودن غرفه
      </div>
      <div className="flex justify-between h-10 items-center p-2 hover:bg-gray-100 cursor-pointer">
        <div className="flex gap-2">
          <WalletOutlined /> شارژ کیف پول
        </div>
        <div className="bg-green-500 text-white text-xs rounded-full px-2">
          22,300 تومان
        </div>
      </div>
      <div
        className="flex h-10 gap-2 items-center p-2 hover:bg-gray-100 cursor-pointer"
        onClick={handleSignOut}
      >
        <LogoutOutlined /> خروج
      </div>
    </div>
  );

  const NotificationItems = () => (
    <div className="w-[300px] space-y-2">
      <Alert
        message="فلانی تخمین قیمت ارسال کرد"
        type="success"
        showIcon
        closable
      />
      <Alert
        message="قلانی پیامی برای شما ارسال کرد"
        type="info"
        showIcon
        closable
      />
      <Alert
        message="تخمین قیمت فلانی به پایان رسید"
        type="warning"
        showIcon
        closable
      />
      <Alert
        message="فعالیت شما در این کارتابل کم بود"
        type="error"
        showIcon
        closable
      />
    </div>
  );

  return (
    <header className="bg-white fixed top-0 z-[200] left-0 right-0 shadow-md backdrop-blur-sm">
      <nav className="container mx-auto flex items-center justify-between h-24 px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div
            className="block sm:hidden w-[45px] h-[45px] bg-[#fff] rounded-[4px] border-[1px] border-[#f0f0f0] cursor-pointer text-center"
            onClick={() => setOpenMenu(true)}
          >
            <GiHamburgerMenu
              size={23}
              className="relative top-[10px] right-[10px]"
            />
          </div>
          <img src="/logo.png" className="h-10 w-auto" />
          <div className="hidden sm:flex flex-col">
            <div className="text-lg font-bold">چندکو</div>
            <div className="text-xs text-gray-500">
              سامانه خرید فروش منطقه ای
            </div>
          </div>
        </Link>
        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-6 items-center">
          {menus.map((el) => (
            <a
              key={el.id}
              href={el.url}
              className="text-gray-900 font-semibold hover:text-blue-600"
            >
              {el.title}
            </a>
          ))}
        </div>
        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {token && (
            <Popover content={<NotificationItems />} trigger="click">
              <div className="relative cursor-pointer">
                <div className="absolute top-[-8px] right-[-8px] bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  3
                </div>
                <BellOutlined className="text-2xl text-gray-600" />
              </div>
            </Popover>
          )}

          {token ? (
            <Popover content={<MenuItems />} trigger="click">
              <Button
                icon={<UserOutlined />}
                className="border-none bg-transparent"
              />
            </Popover>
          ) : (
            <div className="flex gap-2 items-center">
              <Button
                icon={<BiLogIn />}
                onClick={() => navigate("/login")}
                className="rounded-full border border-gray-300 px-4 py-4 text-gray-700 hover:bg-gray-100 h-[45px]"
              >
                ورود
              </Button>
              <Button
                icon={<BiUserCheck />}
                onClick={() => navigate("/register")}
                className="rounded-full bg-blue-600 text-white px-4 py-4 h-[45px]"
              >
                ثبت نام
              </Button>
              <div
                onClick={() => navigate("/support")}
                className="border-r-[1px] hidden sm:flex items-center gap-[3px] border-r-[#ccc] pr-[10px] mr-[10px] h-[45px]"
              >
                <div>
                  <FaHeadset />
                </div>
                <div>پشتیبانی</div>
              </div>
            </div>
          )}
          {/* Mobile Overlay */}
          {openMenu && (
            <div
              className="fixed inset-0 bg-black bg-opacity-60 z-[250] h-[100vh]"
              onClick={() => setOpenMenu(false)}
            />
          )}

          {/* Mobile Slide Menu */}
          <div
            className={`fixed top-0 right-0 h-[100vh] w-72 bg-white z-[300] transform transition-transform ${
              openMenu ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex justify-between items-center p-4 border-b">
              <div>منو</div>
              <button onClick={() => setOpenMenu(false)}>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-4 space-y-2">
              {menus.map((el) => (
                <a
                  key={el.id}
                  href={el.url}
                  className="block py-2 px-3 rounded hover:bg-gray-100"
                >
                  {el.title}
                </a>
              ))}
              <Button
                icon={<FaHeadset />}
                block
                onClick={() => navigate("/support")}
                className="my-2 py-[20px] rounded-full border border-gray-300"
              >
                پشتیبانی
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Slide Menu */}
      <div
        className={`fixed top-0 right-0 h-[100vh] w-72 bg-white z-50 transform transition-transform ${
          openMenu ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <div>منو</div>
          <button onClick={() => setOpenMenu(false)}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="p-4 space-y-2">
          {menus.map((el) => (
            <a
              key={el.id}
              href={el.url}
              className="block py-2 px-3 rounded hover:bg-gray-100"
            >
              {el.title}
            </a>
          ))}
          {!token && (
            <>
              <Button
                icon={<BiLogIn />}
                block
                onClick={() => navigate("/login")}
                className="my-2 py-[20px] rounded-full border border-gray-300"
              >
                ورود
              </Button>
              <Button
                icon={<BiUserCheck />}
                block
                onClick={() => navigate("/register")}
                className="my-2 py-[20px] rounded-full bg-blue-600 text-white"
              >
                ثبت نام
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
