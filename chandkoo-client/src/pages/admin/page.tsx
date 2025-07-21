import { useEffect, useState } from "react";
import {
  addCategory,
  getAllAdminCategories,
} from "../../services/categories.service";
import { Button, Input, Select } from "antd";

export default function Admin() {
  const [parentId, setParentId] = useState<any>();
  const [title, setTitle] = useState<any>();
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getAllAdminCategories().then((data) => {
      if (data.status == 200) {
        setCategories(data.data);
      }
    });
  }, []);
  const handleSubmit = () => {
    addCategory(title, parentId).then((data) => {
      if (data.status === 200) {
        window.alert("good");
      }
    });
  };
  return (
    <div className="flex">
      <Select value={parentId} onChange={(value) => setParentId(value)}>
        <Select.Option value="">بدون والد</Select.Option>
        {categories.map((el: any) => (
          <Select.Option key={el.id} value={el.id}>
            {el.title}
          </Select.Option>
        ))}
      </Select>
      <Input onChange={(e) => setTitle(e.target.value)} placeholder="title" />
      <Button disabled={!title} onClick={() => handleSubmit()}>
        ثبت
      </Button>
    </div>
  );
}
