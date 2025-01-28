import { Link, Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="container flex justify-cente items-center mx-auto min-h-[calc(100vh-350px)]">
      <div className="w-[calc(100vw-200px)] h-[calc(100vh-450px)] mt-[40px] mb-[40px] flex relative rounded-[32px] bg-[#f9f9f9] overflow-hidden">
        <div className="w-[400px] relative overflow-hidden">
          <div className="absolute left-[0px] top-[0px] w-full h-[100vh] bg-[rgba(103,58,183,0.8)] z-[4]"></div>
          <div className="h-[100%] w-[100%] bg-[url('/images/login-wallpaper.jpg')] bg-cover bg-center absolute left-[0px] top-[0px]" />
          <ul className="list-none mt-[30px] !p-[10px_30px] relative z-[10]">
            <li className="text-[#fff] text-[18px] leading-[32px] p-[15px] rounded-[12px] hover:bg-[rgba(255,255,255,0.05)] hover:backdrop-blur-sm">
              <Link to={"/dashboard/my-requests"}>استعلام های من</Link>
            </li>
            <li className="text-[#fff] text-[18px] leading-[32px] p-[15px] rounded-[12px] hover:bg-[rgba(255,255,255,0.05)] hover:backdrop-blur-sm">
              <Link to={"/dashboard/request-price"}>استعلام قیمت</Link>
            </li>
          </ul>
        </div>
        <div className="w-[calc(100vw-600px)] p-[25px_50px] h-[calc(100vh-450px)] rounded-[16px] p-[10px] overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
