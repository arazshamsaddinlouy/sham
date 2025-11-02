import { useState } from "react";
import HomeCategories from "../../components/home-categories";
import HomeHeader from "../../components/home-header";
import HomeOrderFlow from "../../components/home-order-flow";
import HomeSales from "../../components/home-sales";
import HomeSeller from "../../components/home-seller";
import HomeTimeSales from "../../components/home-time-sale";
import SalesProductModal from "../../components/sales-product-modal";
import BiddingProductModal from "../../components/sales-product-modal-timed";

export default function Home() {
  const [open, setOpen] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  return (
    <div className="max-w-[100vw] max-[768px]:px-[15px] overflow-hidden">
      <HomeHeader />
      <HomeCategories />
      <HomeOrderFlow />
      <HomeSeller />
      <div onClick={() => setOpen(true)}>
        <HomeSales />
      </div>
      <div onClick={() => setModalOpen(true)}>
        <HomeTimeSales />
      </div>
      <SalesProductModal
        open={open}
        onClose={() => setOpen(false)}
        product={{
          name: "کفش اسپرت مردانه",
          description:
            "این کفش اسپرت با طراحی مدرن و جنس باکیفیت مناسب استفاده روزمره و ورزشی است.",
          price: 850000,
          discountPercent: 20,
          rating: 4.5,
          reviewsCount: 128,
          images: [
            "https://genkiware.com/demo-modules/1-medium_default/hummingbird-printed-t-shirt.jpg",
            "https://genkiware.com/demo-modules/1-medium_default/hummingbird-printed-t-shirt.jpg",
            "https://genkiware.com/demo-modules/1-medium_default/hummingbird-printed-t-shirt.jpg",
          ],
        }}
      />
      <BiddingProductModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        product={{
          name: "ساعت مچی هوشمند",
          description:
            "ساعت هوشمند با قابلیت اندازه‌گیری ضربان قلب، گام‌شمار و نمایش اعلان‌ها.",
          startingPrice: 2500000, // Changed from 'price'
          currentHighestBid: 3200000, // Added - current highest bid
          images: [
            "https://genkiware.com/demo-modules/1-medium_default/hummingbird-printed-t-shirt.jpg",
            "https://genkiware.com/demo-modules/1-medium_default/hummingbird-printed-t-shirt.jpg",
          ],
          rating: 4,
          reviewsCount: 58,
          deadline: "2025-10-31T23:59:59", // Bid expiration time
          seller: {
            name: "فروشگاه چندکو",
            avatar: "https://www.w3schools.com/w3images/avatar5.png",
            link: "#",
          },
          // Added bids history
          bids: [
            {
              id: 1,
              bidder: "علی رضایی",
              amount: 3200000,
              time: "۱۴۰۴/۰۸/۰۳ - ۱۴:۳۰",
            },
            {
              id: 2,
              bidder: "مریم احمدی",
              amount: 3100000,
              time: "۱۴۰۴/۰۸/۰۳ - ۱۴:۱۵",
            },
            {
              id: 3,
              bidder: "امیر موسوی",
              amount: 3000000,
              time: "۱۴۰۴/۰۸/۰۳ - ۱۳:۴۵",
            },
            {
              id: 4,
              bidder: "سارا کریمی",
              amount: 2800000,
              time: "۱۴۰۴/۰۸/۰۳ - ۱۲:۲۰",
            },
          ],
          comments: [
            {
              id: 1,
              name: "علی رضایی",
              rating: 5,
              text: "بسیار عالی و باکیفیت. ارسال سریع داشت.",
              date: "۱۴۰۴/۰۸/۰۳",
            },
            {
              id: 2,
              name: "مریم احمدی",
              rating: 4,
              text: "ظاهر شیکی داره ولی شارژش زود تموم میشه.",
              date: "۱۴۰۴/۰۸/۰۲",
            },
            {
              id: 3,
              name: "امیر موسوی",
              rating: 5,
              text: "عالی بود! پیشنهاد می‌کنم بخرید.",
              date: "۱۴۰۴/۰۷/۳۰",
            },
          ],
        }}
      />
    </div>
  );
}
