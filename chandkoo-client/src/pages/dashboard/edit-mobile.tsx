import { Button, ConfigProvider, Form, Input } from "antd";
import { useContext, useEffect, useState } from "react";
import { ShamContext } from "../../App";
import { editUserInfo, getEditUserMobile } from "../../services/user.service";
import { useNavigate } from "react-router-dom";
export default function EditMobile() {
  const navigate = useNavigate();
  const value: any = useContext(ShamContext);
  const handleEdit = () => {
    const payload = form.getFieldsValue();
    editUserInfo(payload).then((data) => {
      if (data.status === 200) {
        value.setNotif({
          type: "success",
          description: "کاربر ویرایش شد",
        });
        navigate("/dashboard");
      } else {
        value.setNotif({
          type: "error",
          description: "خطا در ویرایش کاربر",
        });
      }
    });
  };
  useEffect(() => {
    getEditUserMobile().then((data) => {
      if (data.status === 200) {
        form.setFieldValue("mobile", data.data.mobile);
      }
    });
  }, []);
  const [submittable, setSubmittable] = useState<boolean>(false);
  const [form] = Form.useForm();
  const values = Form.useWatch([], form);
  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);
  return (
    <Form
      form={form}
      layout={"vertical"}
      className="w-full mx-auto p-[0px_5px]"
    >
      <Form.Item
        name="mobile"
        label="لطفا شماره موبایل را وارد نمایید"
        className="rtl"
        rules={[
          { required: true, message: "شماره موبایل اجباری است" },
          {
            pattern: /^09\d{9}$/,
            message: "شماره موبایل صحیح نمیباشد",
          },
        ]}
      >
        <Input type="text" placeholder="09123456789" className="h-[50px]" />
      </Form.Item>
      <Form.Item>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#4caf50",
            },
          }}
        >
          <Button
            onClick={handleEdit}
            htmlType="submit"
            className="w-full h-[40px]"
            type="primary"
            disabled={!submittable}
          >
            ویرایش اطلاعات
          </Button>
        </ConfigProvider>
      </Form.Item>
    </Form>
  );
}
