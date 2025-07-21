import { useEffect, useState } from "react";
import { getAllFooters } from "../services/content.service";
import { Collapse } from "antd";

const { Panel } = Collapse;
export default function Footer() {
  const [footers, setFooters] = useState<any[]>([]);
  useEffect(() => {
    getAllFooters().then((res) => {
      if (res.status === 200) {
        setFooters(res.data.footers);
      }
    });
  }, []);
  return (
    <footer className="flex flex-col items-center bg-zinc-50 text-center text-surface dark:bg-neutral-700 dark:text-white lg:text-left">
      <div className="container p-6 w-full">
        {/* Mobile & Tablet: Accordion */}
        <div className="block lg:hidden w-full">
          <Collapse
            accordion
            className="bg-white text-black rounded-md shadow-md"
            expandIconPosition="end"
          >
            {footers.map((el) => (
              <Panel
                header={<span className="font-semibold">{el.title}</span>}
                key={`footers-${el.id}`}
                className="bg-white text-black"
              >
                <ul className="list-none p-0 m-0">
                  {(el.children || []).map((sub: any) => (
                    <li key={`footer-${sub.id}`} className="my-1">
                      <a href={sub.url} className="text-black hover:underline">
                        {sub.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </Panel>
            ))}
          </Collapse>
        </div>

        {/* Desktop: Grid */}
        <div className="hidden lg:grid lg:grid-cols-4 md:grid-cols-2 place-items-center w-full">
          {footers.map((el) => (
            <div className="mb-6" key={`footers-${el.id}`}>
              <h5 className="mb-2.5 font-bold uppercase">{el.title}</h5>
              <ul className="mb-0 list-none">
                {(el.children || []).map((sub: any) => (
                  <li key={`footer-${sub.id}`}>
                    <a href={sub.url}>{sub.title}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full bg-black/5 p-4 text-center text-[12px]">
        © تمامی حقوق مادی و معنوی این سایت محفوظ میباشد. ۱۴۰۳
      </div>
    </footer>
  );
}
