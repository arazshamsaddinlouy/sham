import HomeCategories from "../../components/home-categories";
import HomeHeader from "../../components/home-header";
import HomeOrderFlow from "../../components/home-order-flow";
import HomeSales from "../../components/home-sales";
import HomeSeller from "../../components/home-seller";
import HomeStatistics from "../../components/home-statistics";
import HomeTimeSales from "../../components/home-time-sale";

export default function Home() {
  return (
    <div>
      <HomeHeader />
      <HomeCategories />
      <HomeOrderFlow />
      <HomeStatistics />
      <HomeSeller />
      <HomeSales />
      <HomeTimeSales />
    </div>
  );
}
