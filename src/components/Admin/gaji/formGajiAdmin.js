import React from "react";
import { Button, Form, Input, InputNumber } from "antd";

const FormGajiAdmin = ({ selectedRecord }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={selectedRecord}
        >
          <div className="bg-gray-50 p-3 rounded">
            <Form.Item
              label="Nama Karyawan"
              name="nama"
              rules={[
                { required: true, message: "Please input nama karyawan!" },
              ]}
            >
              <Input />
            </Form.Item>
          </div>

          <div className="bg-gray-50 p-3 rounded mt-4">
            <Form.Item
              label="Gaji Pokok"
              name="gajiPokok"
              rules={[{ required: true, message: "Please input gaji pokok!" }]}
            >
              <InputNumber
                className="w-full"
                formatter={(value) =>
                  `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                }
                parser={(value) => value.replace(/Rp\s?|(\.*)/g, "")}
              />
            </Form.Item>
          </div>

          <div className="bg-gray-50 p-3 rounded mt-4">
            <Form.Item
              label="Tunjangan"
              name="tunjangan"
              rules={[{ required: true, message: "Please input tunjangan!" }]}
            >
              <InputNumber
                className="w-full"
                formatter={(value) =>
                  `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                }
                parser={(value) => value.replace(/Rp\s?|(\.*)/g, "")}
              />
            </Form.Item>
          </div>

          <div className="bg-gray-50 p-3 rounded mt-4">
            <Form.Item
              label="Potongan"
              name="potongan"
              rules={[{ required: true, message: "Please input potongan!" }]}
            >
              <InputNumber
                className="w-full"
                formatter={(value) =>
                  `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                }
                parser={(value) => value.replace(/Rp\s?|(\.*)/g, "")}
              />
            </Form.Item>
          </div>

          <Form.Item className="flex justify-end gap-2 mt-6">
            <Button className="mr-2" onClick={() => form.resetFields()}>
              Reset
            </Button>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default FormGajiAdmin;
