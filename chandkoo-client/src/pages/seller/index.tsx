import { Card, Divider, Avatar, Spin } from "antd";
import {
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  YoutubeOutlined,
  WhatsAppOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MapComponent from "../../components/google-map";
import {
  getSellerDetails,
  type SellerData,
} from "../../services/seller.service";
// Generate avatar based on name
const generateAvatar = (firstName: string, lastName: string) => {
  const colors = [
    "#f44336",
    "#e91e63",
    "#9c27b0",
    "#673ab7",
    "#3f51b5",
    "#2196f3",
    "#03a9f4",
    "#00bcd4",
    "#009688",
    "#4caf50",
    "#8bc34a",
    "#cddc39",
    "#ffeb3b",
    "#ffc107",
    "#ff9800",
  ];
  const color = colors[(firstName.length + lastName.length) % colors.length];
  return `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=${color.slice(
    1
  )}&color=fff&size=256&bold=true`;
};

export default function SellerPage() {
  const { id } = useParams();
  const [seller, setSeller] = useState<SellerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSellerData = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const response: any = await getSellerDetails(id);
        if (response.status === 200 && response.data.success) {
          setSeller(response.data.data);
          setTimeout(() => {
            window.scrollTo(0, 0);
          }, 100);
        } else {
          setError("فروشنده یافت نشد");
        }
      } catch (err) {
        console.error("Error fetching seller data:", err);
        setError("خطا در دریافت اطلاعات فروشنده");
      } finally {
        setLoading(false);
      }
    };

    fetchSellerData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (error || !seller) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <UserOutlined className="text-4xl text-gray-400 mb-4" />
          <p className="text-gray-600">{error || "فروشنده یافت نشد"}</p>
        </div>
      </div>
    );
  }

  const fullName = `${seller.first_name} ${seller.last_name}`;
  const avatarUrl = generateAvatar(seller.first_name, seller.last_name);
  const hasLocation = seller.lat && seller.lng;
  const hasSocialMedia =
    seller.linkedin ||
    seller.twitter ||
    seller.instagram ||
    seller.whatsapp ||
    seller.youtube ||
    seller.facebook;

  return (
    <div className="relative mt-[100px] pb-[100px] min-h-[calc(100vh-50px)] bg-gray-50 flex justify-center items-start px-4 py-8 overflow-hidden">
      {/* Background with wallpaper */}
      <div className="absolute w-[100vw] left-0 top-0 h-[100%] opacity-20">
        <img
          src="/images/middle-wallpaper.jpg"
          className="w-full h-full object-cover min-h-[100%]"
          alt="background"
        />
      </div>

      <div className="relative z-[10] bg-white rounded-lg shadow-lg max-w-5xl w-full overflow-hidden">
        {/* Header Section with banner */}
        <div
          className="relative w-full h-52 bg-cover bg-center"
          style={{
            backgroundImage: `url('/images/middle-wallpaper.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/80 to-blue-600/80"></div>

          {/* Avatar and name overlay */}
          <div className="absolute -bottom-[70px] left-1/2 transform -translate-x-1/2 text-center">
            <Avatar
              size={100}
              src={avatarUrl}
              className="border-4 border-white shadow-lg"
            />
            <h1 className="text-xl font-bold mt-3 text-gray-800">{fullName}</h1>
          </div>
        </div>

        <div className="p-6 md:p-10 mt-12">
          {/* Contact Info */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="text-center md:text-right">
              {(seller.phone_number || seller.mobile) && (
                <div className="space-y-3">
                  {/* Phone Numbers Label */}
                  <div className="flex items-center justify-center md:justify-start gap-2 text-gray-600 mb-2">
                    <PhoneOutlined className="text-green-600" />
                    <span className="font-semibold text-sm">
                      شماره‌های تماس
                    </span>
                  </div>

                  {/* Phone Numbers */}
                  <div className="space-y-2">
                    {seller.phone_number && (
                      <p className="flex items-center justify-center md:justify-start gap-2 text-gray-700">
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
                          تلفن ثابت
                        </span>
                        <span className="font-medium">
                          {seller.phone_number}
                        </span>
                      </p>
                    )}
                    {seller.mobile && (
                      <p className="flex items-center justify-center md:justify-start gap-2 text-gray-700">
                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                          موبایل
                        </span>
                        <span className="font-medium">{seller.mobile}</span>
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {seller.address && (
              <div className="text-center md:text-right">
                <div className="space-y-3">
                  {/* Address Label */}
                  <div className="flex items-center justify-center md:justify-start gap-2 text-gray-600 mb-2">
                    <EnvironmentOutlined className="text-blue-600" />
                    <span className="font-semibold text-sm">آدرس</span>
                  </div>

                  {/* Address */}
                  <p className="flex items-center justify-center md:justify-start gap-2 text-gray-700 bg-gray-50 p-3 rounded-lg">
                    <span className="font-medium text-right leading-relaxed">
                      {seller.address}
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>
          {/* Social Media */}
          {hasSocialMedia && (
            <>
              <Divider>شبکه‌های اجتماعی</Divider>
              <div className="flex justify-center items-center gap-4 text-xl text-gray-500 mb-6">
                {seller.facebook && (
                  <a
                    href={seller.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600 transition-colors"
                  >
                    <FacebookOutlined />
                  </a>
                )}
                {seller.instagram && (
                  <a
                    href={seller.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-pink-600 transition-colors"
                  >
                    <InstagramOutlined />
                  </a>
                )}
                {seller.twitter && (
                  <a
                    href={seller.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-sky-500 transition-colors"
                  >
                    <TwitterOutlined />
                  </a>
                )}
                {seller.linkedin && (
                  <a
                    href={seller.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-700 transition-colors"
                  >
                    <LinkedinOutlined />
                  </a>
                )}
                {seller.youtube && (
                  <a
                    href={seller.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-red-600 transition-colors"
                  >
                    <YoutubeOutlined />
                  </a>
                )}
                {seller.whatsapp && (
                  <a
                    href={`https://wa.me/${seller.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-green-600 transition-colors"
                  >
                    <WhatsAppOutlined />
                  </a>
                )}
              </div>
            </>
          )}

          {/* Branches */}
          {seller.branches && seller.branches.length > 0 && (
            <>
              <Divider>شعب فروشگاه</Divider>
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {seller.branches.map((branch) => (
                  <Card
                    key={branch.id}
                    title={
                      <div className="flex items-center gap-2">
                        <EnvironmentOutlined className="text-blue-500" />
                        <span>{branch.name}</span>
                      </div>
                    }
                    bordered={false}
                    className="rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <p className="flex items-center gap-2 text-gray-700 mb-2">
                      <UserOutlined className="text-gray-400" />
                      <span>
                        {branch.first_name} {branch.last_name}
                      </span>
                    </p>
                    <p className="flex items-center gap-2 text-gray-700 mb-2">
                      <EnvironmentOutlined className="text-gray-400" />
                      <span>{branch.address}</span>
                    </p>
                    <p className="flex items-center gap-2 text-gray-700 mb-3">
                      <PhoneOutlined className="text-gray-400" />
                      <span>{branch.phone_number}</span>
                    </p>

                    {/* Branch Social Media */}
                    {(branch.linkedin ||
                      branch.twitter ||
                      branch.instagram ||
                      branch.whatsapp ||
                      branch.youtube ||
                      branch.facebook) && (
                      <div className="flex gap-3 mt-3 pt-3 border-t border-gray-100">
                        {branch.facebook && (
                          <a
                            href={branch.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <FacebookOutlined />
                          </a>
                        )}
                        {branch.instagram && (
                          <a
                            href={branch.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-pink-600 hover:text-pink-800"
                          >
                            <InstagramOutlined />
                          </a>
                        )}
                        {branch.twitter && (
                          <a
                            href={branch.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sky-500 hover:text-sky-700"
                          >
                            <TwitterOutlined />
                          </a>
                        )}
                        {branch.linkedin && (
                          <a
                            href={branch.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-700 hover:text-blue-900"
                          >
                            <LinkedinOutlined />
                          </a>
                        )}
                        {branch.youtube && (
                          <a
                            href={branch.youtube}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-red-600 hover:text-red-800"
                          >
                            <YoutubeOutlined />
                          </a>
                        )}
                        {branch.whatsapp && (
                          <a
                            href={`https://wa.me/${branch.whatsapp}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-600 hover:text-green-800"
                          >
                            <WhatsAppOutlined />
                          </a>
                        )}
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </>
          )}

          {/* Map */}
          {hasLocation && (
            <div className="rounded-lg overflow-hidden shadow-md mb-10 border border-gray-200">
              <div className="p-4 bg-gray-50 border-b">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <EnvironmentOutlined className="text-blue-600" />
                  موقعیت روی نقشه
                </h3>
              </div>
              <MapComponent
                initialLatLng={{ lat: seller.lat, lng: seller.lng }}
                isDraggable={false}
                handleLatLngChange={() => {}}
              />
            </div>
          )}

          {/* About Section */}
          <Divider>درباره فروشنده</Divider>
          <div className="text-center text-gray-600 bg-gray-50 rounded-lg p-6">
            <p className="text-lg mb-3">
              فروشنده با سابقه درخشان در زمینه فروش محصولات با کیفیت
            </p>
            <p className="mb-2">
              📞 برای استعلام قیمت و اطلاعات بیشتر با شماره‌های فوق تماس بگیرید
            </p>
            <p className="text-sm text-gray-500">
              این فروشنده دارای {seller.branches?.length || 0} شعبه فعال می‌باشد
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
