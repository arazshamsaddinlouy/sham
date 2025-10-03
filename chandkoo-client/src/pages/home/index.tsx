import HomeCategories from "../../components/home-categories";
import HomeHeader from "../../components/home-header";
import HomeOrderFlow from "../../components/home-order-flow";
import HomeSales from "../../components/home-sales";
import HomeSeller from "../../components/home-seller";
import HomeTimeSales from "../../components/home-time-sale";

export default function Home() {
  return (
    <div className="max-w-[100vw] max-[768px]:px-[15px] overflow-hidden">
      <HomeHeader />
      <HomeCategories />
      <HomeOrderFlow />
      <HomeSeller />
      <HomeSales />
      <HomeTimeSales />
    </div>
  );
}
