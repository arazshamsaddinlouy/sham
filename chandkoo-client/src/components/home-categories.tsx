import { useEffect, useState } from "react";
import { getAllCategories } from "../services/categories.service";
import { BiCategory } from "react-icons/bi";

export default function HomeCategories() {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    getAllCategories().then((data) => {
      if (data.status === 200) setCategories(data.data);
    });
  }, []);

  return (
    <div className="w-full pt-4 pb-12 my-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6 mt-6">
          {categories.map((el) => (
            <div
              key={el.title}
              className="relative flex flex-col justify-center items-center h-[120px] md:h-[130px] rounded-[16px] bg-white border border-gray-200 overflow-hidden transition-transform transform hover:scale-105 cursor-pointer group"
            >
              {/* Rotated background icon */}
              <div className="absolute -top-4 -left-4 opacity-20 rotate-12 pointer-events-none transition-all group-hover:opacity-30">
                <BiCategory
                  size={60}
                  className="text-gray-200 md:text-gray-300"
                />
              </div>

              {/* Foreground content */}
              <div className="relative z-10 text-center px-2">
                <h3 className="text-[12px] sm:text-[14px] md:text-[15px] font-medium text-gray-800 truncate">
                  {el.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
