import { Card, Button, Divider, Avatar } from "antd";
import {
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import wallpaper from "./login-wallpaper.jpg";
import MapComponent from "../../components/google-map";

interface Branch {
  id: number;
  name: string;
  address: string;
  phone: string;
}

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
}

export default function SellerPage() {
  const seller = {
    name: "فروشگاه چندکو",
    description:
      "فروشگاه چندکو عرضه کننده بهترین محصولات خانگی، الکترونیکی و مد با تضمین کیفیت و ارسال سریع در سراسر کشور.",
    banner: "/images/middle-wallpaper.jpg",
    avatar: "https://www.w3schools.com/w3images/avatar2.png",
  };

  const branches: Branch[] = [
    {
      id: 1,
      name: "شعبه مرکزی",
      address: "تهران، خیابان ولیعصر، پلاک ۱۲۳",
      phone: "021-12345678",
    },
    {
      id: 2,
      name: "شعبه اصفهان",
      address: "اصفهان، خیابان چهارباغ عباسی، پلاک ۴۵۶",
      phone: "031-98765432",
    },
  ];

  const products: Product[] = [
    {
      id: 1,
      name: "کفش اسپرت مردانه",
      price: "۴۵۰,۰۰۰ تومان",
      image:
        "https://genkiware.com/demo-modules/1-medium_default/hummingbird-printed-t-shirt.jpg",
    },
    {
      id: 2,
      name: "هدفون بلوتوثی",
      price: "۷۸۰,۰۰۰ تومان",
      image:
        "https://genkiware.com/demo-modules/1-medium_default/hummingbird-printed-t-shirt.jpg",
    },
    {
      id: 3,
      name: "ساعت مچی زنانه",
      price: "۱,۲۰۰,۰۰۰ تومان",
      image:
        "https://genkiware.com/demo-modules/1-medium_default/hummingbird-printed-t-shirt.jpg",
    },
  ];

  return (
    <div className="relative mt-[100px] pb-[100px] min-h-[calc(100vh-50px)] bg-gray-50 flex justify-center items-start px-4 py-8 overflow-hidden">
      {/* Background */}
      <div className="absolute w-[100vw] left-0 top-0 h-[100%] opacity-20">
        <img
          src={seller.banner}
          className="w-full h-full object-cover min-h-[100%]"
        />
      </div>

      <div className="relative z-[10] bg-white rounded-lg shadow-lg max-w-5xl w-full overflow-hidden">
        {/* Header Section */}
        <div
          className="relative w-full h-52 bg-cover bg-center"
          style={{ backgroundImage: `url('${wallpaper}')` }}
        >
          {/* Avatar and name overlay */}
          <div className="absolute -bottom-[70px] left-1/2 transform -translate-x-1/2 text-center">
            <Avatar
              size={100}
              src={seller.avatar}
              className="border-4 border-white shadow-md"
            />
            <h1 className="text-xl font-bold mt-3 text-gray-800">
              {seller.name}
            </h1>
          </div>
        </div>

        <div className="p-6 md:p-10 mt-12">
          <p className="text-gray-600 mb-4 text-center">{seller.description}</p>

          {/* Social Media */}
          <div className="flex justify-center items-center gap-4 text-xl text-gray-500 mb-6">
            <a href="#" className="hover:text-blue-600">
              <FacebookOutlined />
            </a>
            <a href="#" className="hover:text-pink-600">
              <InstagramOutlined />
            </a>
            <a href="#" className="hover:text-sky-500">
              <TwitterOutlined />
            </a>
          </div>

          <Divider>شعب فروشگاه</Divider>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {branches.map((branch) => (
              <Card
                key={branch.id}
                title={branch.name}
                bordered
                className="rounded-lg shadow-sm"
              >
                <p className="flex items-center gap-2 text-gray-700 mb-1">
                  <EnvironmentOutlined />
                  {branch.address}
                </p>
                <p className="flex items-center gap-2 text-gray-700">
                  <PhoneOutlined />
                  {branch.phone}
                </p>
              </Card>
            ))}
          </div>

          {/* ✅ Add the map right below branches */}
          <div className="rounded-lg overflow-hidden shadow-md mb-10">
            <MapComponent
              initialLatLng={{ lat: 35.6892, lng: 51.389 }}
              isDraggable={false}
              handleLatLngChange={() => {}}
            />
          </div>

          <Divider>محصولات منتخب</Divider>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {products.map((product) => (
              <Card
                key={product.id}
                hoverable
                cover={
                  <img
                    alt={product.name}
                    src={product.image}
                    className="object-cover h-48 w-full"
                  />
                }
                className="rounded-lg shadow-sm"
              >
                <Card.Meta title={product.name} description={product.price} />
                <Button
                  type="primary"
                  className="mt-3 w-full bg-green-500 border-none hover:bg-green-600"
                >
                  افزودن به سبد خرید
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
