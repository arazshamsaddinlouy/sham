import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Popover, Button, Alert } from "antd";
import {
  DownOutlined,
  LogoutOutlined,
  UserOutlined,
  BellOutlined,
  UserAddOutlined,
  PlusOutlined,
  WalletOutlined,
  ProductOutlined,
} from "@ant-design/icons";
import { BiHeadphone } from "react-icons/bi";
import { ShamContext } from "../App";
import { getUserInfo } from "../services/auth.service";
import { setUser } from "../store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { CgChevronLeft } from "react-icons/cg";
import { GiMedal } from "react-icons/gi";
import { getAllMenus } from "../services/content.service";
export default function Header() {
  const [menus, setMenus] = useState<any[]>([]);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const { user } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const [token, setToken] = useState<string>();
  const value: any = useContext(ShamContext);
  const navigate = useNavigate();
  // Sign out handler
  const handleSignOut = () => {
    window.localStorage.removeItem("accessToken");
    window.localStorage.removeItem("refreshToken");
    value.setNotif({ type: "success", description: "خروج با موفقیت" });
    navigate("/");
  };
  // Settings handler
  const handleEditMobile = () => {
    navigate("/dashboard/branches");
  };
  // Settings handler
  const handleEditProfile = () => {
    navigate("/dashboard/profile/edit");
  };
  useEffect(() => {
    getAllMenus().then((res) => {
      if (res.status === 200) {
        setMenus(res.data.menus);
      }
    });
  }, []);
  const MenuItems = () => (
    <div className="w-[250px]">
      <div className="flex items-center relative overflow-hidden rounded-[12px] overflow-hidden mb-[5px] p-[12px_15px] justify-between bg-[#FDDC5C]">
        <div className="absolute right-[-45px] rounded-[12px] top-[-11px] w-[70px] h-[70px] rotate-[45deg] bg-[rgb(239,202,62)]" />
        <div className="absolute left-[-45px] rounded-[12px] top-[-11px] w-[70px] h-[70px] rotate-[45deg] bg-[rgb(239,202,62)]" />
        <div className="text-[13px] relative z-[2] flex items-center font-bold">
          امتیاز شما : ۳۲۱
        </div>
        <div className="flex gap-[5px] relative z-[5] items-center bg-[#fff] text-[#333] text-[10px] p-[4px_8px] rounded-[12px]">
          <GiMedal size={15} />
          کاربر طلایی
        </div>
      </div>
      <div onClick={handleEditProfile}>
        <div className="flex h-[60px] justify-between items-center border-b-[1px] border-b-[#eee] p-[10px_5px] hover:bg-[#f5f5f5] cursor-pointer">
          <div className="flex items-center gap-[10px]">
            <div>
              <UserAddOutlined className="text-[27px] text-[#555]" />
            </div>
            <div className="pb-[5px]">
              <div className="text-[15px] text-[#111]">
                {user?.first_name} {user?.last_name}
              </div>
              <div className="text-[10px] mt-[4px] text-[#444]">
                {user?.mobile}
              </div>
            </div>
          </div>
          <div>
            <CgChevronLeft size={20} />
          </div>
        </div>
      </div>
      <div
        className="flex h-[40px] cursor-pointer p-[10px_15px] pr-[30px] gap-[10px] items-center hover:bg-[#f5f5f5]"
        onClick={handleEditMobile}
      >
        <ProductOutlined />
        خرید اشتراک
      </div>
      <div
        className="flex h-[40px] cursor-pointer p-[10px_15px] pr-[30px] gap-[10px] items-center hover:bg-[#f5f5f5]"
        onClick={handleEditMobile}
      >
        <PlusOutlined />
        افزودن غرفه
      </div>
      <div
        className="flex justify-between h-[40px] cursor-pointer p-[10px_5px] pr-[30px] gap-[10px] items-center hover:bg-[#f5f5f5]"
        onClick={handleEditMobile}
      >
        <div className="flex gap-[10px]">
          <WalletOutlined />
          شارژ کیف پول
        </div>
        <div className="bg-[#4CAF50] text-[11px] rounded-[20px] text-[#fff] p-[2px_6px]">
          ۲۲,۳۰۰۰ تومان
        </div>
      </div>
      <div
        className="flex h-[40px] cursor-pointer p-[10px_15px] pr-[30px] gap-[10px] items-center hover:bg-[#f5f5f5]"
        onClick={handleSignOut}
      >
        <LogoutOutlined />
        خروج
      </div>
    </div>
  );
  const NotificationItems = () => (
    <div className="w-[300px]">
      <div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-[10px]">
            <div className="pb-[5px]">
              <div className="flex flex-col gap-[10px] text-[13px]">
                <Alert
                  className="w-[300px]"
                  message="فلانی تخمین قیمت ارسال کرد"
                  type="success"
                  showIcon
                  closable
                />
                <Alert
                  className="w-[300px]"
                  message="قلانی پیامی برای شما ارسال کرد"
                  type="info"
                  showIcon
                  closable
                />
                <Alert
                  className="w-[300px]"
                  message="تخمین قیمت فلانی به پایان رسید"
                  type="warning"
                  showIcon
                  closable
                />
                <Alert
                  className="w-[300px]"
                  message="فعالیت شما در این کارتابل کم بود"
                  type="error"
                  showIcon
                  closable
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    const storageToken = localStorage.getItem("accessToken");
    if (storageToken) {
      setToken(storageToken);
      getUserInfo()
        .then((data) => {
          if (data.status == 200) {
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
  return (
    <header className="bg-white">
      <nav
        className="mx-auto flex container items-center justify-between p-6 max-lg:px-4 max-lg:py-2 max-lg:shadow-[0px_2px_4px-rgba(0,0,0,0.1)]"
        aria-label="Global"
      >
        <div
          className="flex cursor-pointer relative z-[10]"
          onClick={() => setOpenMenu(!openMenu)}
        >
          <Link to={"/"} className="-m-1.5 p-1.5">
            <span className="sr-only">خرید و فروش آنلاین</span>
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
          </Link>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 max-lg:relative max-lg:top-[8px]"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="size-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="hidden lg:flex lg:gap-x-12">
          {menus.map((el) => (
            <a
              key={`menu-${el.id}`}
              href={el.url}
              className="text-sm/6 lh-40 font-semibold text-gray-900"
            >
              {el.title}
            </a>
          ))}
          <div className="relative">
            <div>
              <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                <a
                  href="#"
                  className="flex items-center justify-center gap-x-2.5 p-3 text-sm/6 font-semibold text-gray-900 hover:bg-gray-100"
                >
                  <svg
                    className="size-5 flex-none text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2 10a8 8 0 1 1 16 0 8 8 0 0 1-16 0Zm6.39-2.908a.75.75 0 0 1 .766.027l3.5 2.25a.75.75 0 0 1 0 1.262l-3.5 2.25A.75.75 0 0 1 8 12.25v-4.5a.75.75 0 0 1 .39-.658Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  پشتیبانی فروش
                </a>
                <a
                  href="#"
                  className="flex items-center justify-center gap-x-2.5 p-3 text-sm/6 font-semibold text-gray-900 hover:bg-gray-100"
                >
                  <svg
                    className="size-5 flex-none text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2 3.5A1.5 1.5 0 0 1 3.5 2h1.148a1.5 1.5 0 0 1 1.465 1.175l.716 3.223a1.5 1.5 0 0 1-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 0 0 6.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 0 1 1.767-1.052l3.223.716A1.5 1.5 0 0 1 18 15.352V16.5a1.5 1.5 0 0 1-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 0 1 2.43 8.326 13.019 13.019 0 0 1 2 5V3.5Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  تماس با ما
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-[10px] pt-[10px] focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm text-center">
          {token && (
            <div className="relative mt-[13px] ml-[-15px]">
              <Popover
                content={<NotificationItems />}
                title=""
                className="ml-[15px] mt-[8px] relative top-[-5px] ltr"
                trigger="click"
              >
                <div className="absolute top-[-13px] z-[2] right-[-10px] w-[20px] h-[20px] rounded-[10px] bg-[#f44336] text-[#fff] text-[11px]">
                  3
                </div>
                <BellOutlined className="text-[22px] items-center text-[#555]" />
              </Popover>
            </div>
          )}
          {token ? (
            <Popover
              content={<MenuItems />}
              title=""
              className="ml-[5px] mt-[8px] relative top-[-5px] ltr"
              trigger="click"
            >
              {user && user.first_name && user.last_name && (
                <Button
                  icon={<DownOutlined className="text-[12px]" />}
                  className="border-none bg-transparent shadow-none p-[0_10px]"
                >
                  <UserOutlined className="text-[20px] text-[#555]" />
                </Button>
              )}
            </Popover>
          ) : (
            <>
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="focus:outline-none mt-[1px] focus:ring-4 ml-[15px] focus:ring-blue-300 font-medium rounded-full text-sm text-center"
              >
                ورود
              </button>
              <button
                onClick={() => navigate("/register")}
                type="button"
                className="text-white mt-[7px] bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                ثبت نام <span aria-hidden="true">&larr;</span>
              </button>
            </>
          )}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className={`focus:outline-none ${
              !token ? "relative top-[6px]" : ""
            } focus:ring-4 ml-[25px] h-[40px] px-[25px] border-[1px] border-[#ccc] focus:ring-blue-300 font-medium rounded-full text-sm text-center`}
          >
            <div className="flex items-center gap-[5px]">
              <BiHeadphone size={18} />
              <div>پشتیبانی</div>
            </div>
          </button>
        </div>
      </nav>
      <div className="lg:hidden" role="dialog" aria-modal="true">
        <div
          className={`fixed inset-y-0 transition-all ${
            openMenu ? "right-[0px]" : "right-[-400px]"
          } z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10`}
        >
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700 cursor-pointer"
              onClick={() => setOpenMenu(!openMenu)}
            >
              <span className="sr-only">Close menu</span>
              <svg
                className="size-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <div className="-mx-3">
                  <div className="mt-2 space-y-2" id="disclosure-1">
                    {menus.map((el) => (
                      <a
                        key={el.id}
                        href={el.url}
                        className="block rounded-lg py-2 pl-6 pr-3 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50"
                      >
                        {el.title}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
