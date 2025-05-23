import { useEffect, useState } from "react";
import { getAllCategories } from "../services/categories.service";

export default function HomeCategories() {
  const [categories, setCategories] = useState<any[]>([]);
  useEffect(() => {
    getAllCategories().then((data) => {
      if (data.status == 200) {
        setCategories(data.data);
      }
    });
  }, []);
  return (
    <div className="bg-[#f0f0f0] border-t-[1px] border-b-[1px] border-t-[#ccc] border-b-[#ccc] p-[15px_0px]">
      <div className="mx-auto container">
        <div className="flex">
          {categories.map((el) => (
            <div className="flex-1">
              <div className="flex flex-col gap-[5px] justify-center items-center">
                <div className="p-[5px]">
                  <svg
                    className="size-8 text-gray-600 group-hover:text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
                    />
                  </svg>
                </div>
                <div className="text-[13px] text-[#555]">{el.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
