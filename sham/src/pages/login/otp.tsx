export default function LoginOtp() {
  return (
    <div className="container mx-auto flex justify-center items-center min-h-[calc(100vh-350px)]">
      <div className="w-[1000px] h-[400px] flex rounded-[32px] bg-[#f9f9f9] overflow-hidden">
        <div className="w-[400px] relative">
          <div className="h-[100%] w-[100%] bg-[url('/images/login-wallpaper.jpg')] bg-cover bg-center absolute left-[0px] top-[0px]" />
        </div>
        <div className="w-[600px] p-[60px] h-[400px] flex flex-col justify-center items-center rounded-[16px] p-[10px]">
          <div className="text-[22px] text-center mt-[20px] mb-[30px]">
            ورود به پنل مدیریت
          </div>
          <form className="w-full mx-auto p-[0px_60px]">
            <label className="text-[13px] text-[#444] block mb-[10px]">
              کد وارد شده به شماره{" "}
              <b className="font-bold text-[17px] text-[#111]">۰۹۱۲۱۳۰۳۳۸۰</b>{" "}
              را وارد کنید
            </label>

            <div className="flex gap-[20px] mt-[30px]">
              <div>
                <input
                  type="text"
                  className="h-[50px] outline-none w-full bg-[#f0f0f0] focus:bg-[#f0f0f0] rounded-[8px] p-[10px] border-box"
                />
              </div>
              <div>
                <input
                  type="text"
                  className="h-[50px] outline-none w-full bg-[#f0f0f0] focus:bg-[#f0f0f0] rounded-[8px] p-[10px] border-box"
                />
              </div>
              <div>
                <input
                  type="text"
                  className="h-[50px] outline-none w-full bg-[#f0f0f0] focus:bg-[#f0f0f0] rounded-[8px] p-[10px] border-box"
                />
              </div>
              <div>
                <input
                  type="text"
                  className="h-[50px] outline-none w-full bg-[#f0f0f0] focus:bg-[#f0f0f0] rounded-[8px] p-[10px] border-box"
                />
              </div>
              <div>
                <input
                  type="text"
                  className="h-[50px] outline-none w-full bg-[#f0f0f0] focus:bg-[#f0f0f0] rounded-[8px] p-[10px] border-box"
                />
              </div>
              <div>
                <input
                  type="text"
                  className="h-[50px] outline-none w-full bg-[#f0f0f0] focus:bg-[#f0f0f0] rounded-[8px] p-[10px] border-box"
                />
              </div>
            </div>
            <div className="text-left text-[#222] text-[11px] mt-[20px]">
              زمان باقیمانده : ۲:۰۰
            </div>
            <button className="w-full h-[42px] leading-[42px] bg-[#4caf50] outline-none mt-[30px] mb-[20px] rounded-[8px] text-[#fff]">
              ورود به سامانه
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
