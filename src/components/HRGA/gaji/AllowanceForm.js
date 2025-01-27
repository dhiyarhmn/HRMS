import React from "react";
import { Form, InputNumber, DatePicker, Button, message } from "antd";
import { allowanceServices } from "@/api/api";

const AllowanceForm = ({ employeeId, onSubmitSuccess }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      // Memastikan semua nilai adalah number
      const allowanceData = {
        id_employee: employeeId, // employeeId sudah berupa number
        position_allowance: values.position_allowance
          ? Number(values.position_allowance)
          : 0,
        health_allowance: values.health_allowance
          ? Number(values.health_allowance)
          : 0,
        pension: values.pension ? Number(values.pension) : 0,
        communication: values.communication ? Number(values.communication) : 0,
        date: values.date.format("YYYY-MM-DD"),
      };

      console.log("Sending allowance data:", allowanceData);

      const response = await allowanceServices.createAllowance(allowanceData);
      console.log("Response:", response);

      form.resetFields();
      if (onSubmitSuccess) onSubmitSuccess();
    } catch (error) {
      console.error("Error saving allowance:", error);
      console.error("Error response:", error.response?.data);
      message.error(
        error.response?.data?.message || "Failed to save allowance data"
      );
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Form.Item
          label="Position Allowance"
          name="position_allowance"
          rules={[
            { required: true, message: "Position Allowance is required!" },
            {
              type: "number",
              min: 0,
              message: "Position Allowance must be a positive number!",
            },
          ]}
        >
          <InputNumber
            className="w-full"
            formatter={(value) =>
              `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            }
            parser={(value) => value.replace(/Rp\s?|(\.*)/g, "")}
            min={0}
          />
        </Form.Item>

        <Form.Item
          label="Health Allowance"
          name="health_allowance"
          rules={[
            { required: true, message: "Health Allowance is required!" },
            {
              type: "number",
              min: 0,
              message: "Health Allowance must be a positive number!",
            },
          ]}
        >
          <InputNumber
            className="w-full"
            formatter={(value) =>
              `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            }
            parser={(value) => value.replace(/Rp\s?|(\.*)/g, "")}
            min={0}
          />
        </Form.Item>

        <Form.Item
          label="Pension"
          name="pension"
          rules={[
            { required: true, message: "Pension is required!" },
            {
              type: "number",
              min: 0,
              message: "Pension must be a positive number!",
            },
          ]}
        >
          <InputNumber
            className="w-full"
            formatter={(value) =>
              `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            }
            parser={(value) => value.replace(/Rp\s?|(\.*)/g, "")}
            min={0}
          />
        </Form.Item>

        <Form.Item
          label="Communication"
          name="communication"
          rules={[
            { required: true, message: "Communication is required!" },
            {
              type: "number",
              min: 0,
              message: "Communication must be a positive number!",
            },
          ]}
        >
          <InputNumber
            className="w-full"
            formatter={(value) =>
              `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            }
            parser={(value) => value.replace(/Rp\s?|(\.*)/g, "")}
            min={0}
          />
        </Form.Item>

        <Form.Item
          label="Date"
          name="date"
          rules={[{ required: true, message: "Please select date!" }]}
        >
          <DatePicker className="w-full" />
        </Form.Item>
      </div>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save Allowance
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AllowanceForm;
