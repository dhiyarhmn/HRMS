// components/Admin/gaji/BonusForm.js
import React from "react";
import { Form, InputNumber, DatePicker, Button, message } from "antd";
import { bonusServices } from "@/api/api";

const BonusForm = ({ employeeId, onSubmitSuccess }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const bonusData = {
        id_employee: employeeId,
        overtime: Number(values.overtime),
        meal: Number(values.meal),
        transport: Number(values.transport),
        extra: Number(values.extra),
        date: values.date.format("YYYY-MM-DD"),
      };

      console.log("Sending bonus data:", bonusData); // Debug
      await bonusServices.createBonus(bonusData);
      
      form.resetFields();
      if (onSubmitSuccess) onSubmitSuccess();
    } catch (error) {
      console.error("Error details:", error.response?.data); // Debug
      message.error("Failed to save bonus data");
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Form.Item
          label="Overtime"
          name="overtime"
          rules={[{ required: true }]}
        >
          <InputNumber
            className="w-full"
            formatter={(value) =>
              `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            }
            parser={(value) => value.replace(/Rp\s?|(\.*)/g, "")}
          />
        </Form.Item>

        <Form.Item label="Meal" name="meal" rules={[{ required: true }]}>
          <InputNumber
            className="w-full"
            formatter={(value) =>
              `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            }
            parser={(value) => value.replace(/Rp\s?|(\.*)/g, "")}
          />
        </Form.Item>

        <Form.Item
          label="Transport"
          name="transport"
          rules={[{ required: true }]}
        >
          <InputNumber
            className="w-full"
            formatter={(value) =>
              `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            }
            parser={(value) => value.replace(/Rp\s?|(\.*)/g, "")}
          />
        </Form.Item>

        <Form.Item label="Extra" name="extra" rules={[{ required: true }]}>
          <InputNumber
            className="w-full"
            formatter={(value) =>
              `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            }
            parser={(value) => value.replace(/Rp\s?|(\.*)/g, "")}
          />
        </Form.Item>

        <Form.Item label="Date" name="date" rules={[{ required: true }]}>
          <DatePicker className="w-full" />
        </Form.Item>
      </div>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save Bonus
        </Button>
      </Form.Item>
    </Form>
  );
};

export default BonusForm;
