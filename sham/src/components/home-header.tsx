export default function HomeHeader() {
  return (
    <div className="relative h-[400px] overflow-hidden">
      <div className="bg-[url('/images/header-pattern-next.jpg')] opacity-[0.08] bg-center bg-[length:80vw] absolute left-[50%] top-[50%] -translate-y-[50%] -translate-x-[50%] w-[400%] h-full" />
      <div className="container mx-auto">
        <div className="text-center p-[60px] mt-[15px] mb-[15px] relative overflow-hidden">
          <div className="relative z-[3]">
            <h1 className="text-[60px] mb-[20px] font-bold">
              سامانه خرید و فروش آنلاین
            </h1>

            <h2 className="text-[19px] text-[#373737] max-w-[800px] mx-auto mb-[10px] leading-[36px]">
              <p>
                شما از طریق این سامانه میتوانید محصولات خود را خرید و فروش
                نمایید.
              </p>
              <p>
                همچنین روی نقشه میتوانین نزدیک ترین فروشندگان را یافت و بهترین
                قیمت را پیدا کنید.  
              </p>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
