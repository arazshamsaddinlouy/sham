import { TreeSelect } from "antd";
import { useState } from "react";
import { SaleItem } from "../../components/home-sales";

const { SHOW_PARENT } = TreeSelect;

const treeData = [
  {
    title: "Node1",
    value: "0-0",
    key: "0-0",
    children: [
      {
        title: "Child Node1",
        value: "0-0-0",
        key: "0-0-0",
      },
    ],
  },
  {
    title: "Node2",
    value: "0-1",
    key: "0-1",
    children: [
      {
        title: "Child Node3",
        value: "0-1-0",
        key: "0-1-0",
      },
      {
        title: "Child Node4",
        value: "0-1-1",
        key: "0-1-1",
      },
      {
        title: "Child Node5",
        value: "0-1-2",
        key: "0-1-2",
      },
    ],
  },
];

export default function DashboardTrades() {
  const [value, setValue] = useState(["0-0-0"]);
  const onChange = (newValue: string[]) => {
    console.log("onChange ", newValue);
    setValue(newValue);
  };

  const tProps = {
    treeData,
    value,
    onChange,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: "",
    style: {
      width: "100%",
    },
  };

  return (
    <>
      <div className="text-[26px] pb-[15px] mb-[30px] border-b-[1px] border-b-[#ccc]">
        مزایده ها
      </div>
      <div className="text-[14px] mb-[10px]">
        لطفا دسته بندی مزایده خود را انتخاب نمایید
      </div>
      <TreeSelect {...tProps} />
      <div className="mb-[15px] mt-[40px] pb-[15px] border-b-[1px] border-b-[#ccc] text-[18px]">
        مزایده های دسته بندی{" "}
        <strong className="font-bold">لوازم الکتریکی</strong>
      </div>
      <div className="flex flex-wrap gap-[15px]">
        <SaleItem />
        <SaleItem />
        <SaleItem />
        <SaleItem />
        <SaleItem />
        <SaleItem />
        <SaleItem />
        <SaleItem />
        <SaleItem />
        <SaleItem />
        <SaleItem />
        <SaleItem />
        <SaleItem />
        <SaleItem />
        <SaleItem />
        <SaleItem />
      </div>
    </>
  );
}
