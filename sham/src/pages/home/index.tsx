import HomeCategories from "../../components/home-categories";
import HomeHeader from "../../components/home-header";
import HomeOrderFlow from "../../components/home-order-flow";
import HomeSeller from "../../components/home-seller";
import HomeStatistics from "../../components/home-statistics";

export default function Home() {
  return (
    <div>
      <HomeHeader />
      <HomeCategories />
      <HomeOrderFlow />
      <HomeStatistics />
      <HomeSeller />
    </div>
  );
}
