import React from "react";
import { Form, InputNumber, DatePicker, Button, message } from "antd";
import { deductionServices } from "@/api/api";

const DeductionForm = ({ employeeId, onSubmitSuccess }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const deductionData = {
        id_employee: employeeId,
        bpjs_deduction: values.bpjs_deduction
          ? Number(values.bpjs_deduction)
          : 0,
        borrow_deduction: values.borrow_deduction
          ? Number(values.borrow_deduction)
          : 0,
        jamsostek_jht_deduction: values.jamsostek_jht_deduction
          ? Number(values.jamsostek_jht_deduction)
          : 0,
        tax_deduction: values.tax_deduction ? Number(values.tax_deduction) : 0,
        death_deduction: values.death_deduction
          ? Number(values.death_deduction)
          : 0,
        jamsostek_jp_deduction: values.jamsostek_jp_deduction
          ? Number(values.jamsostek_jp_deduction)
          : 0,
        leave_deduction: values.leave_deduction
          ? Number(values.leave_deduction)
          : 0,
        date: values.date.format("YYYY-MM-DD"),
      };

      console.log("Sending deduction data:", deductionData); // Debug
      await deductionServices.createDeduction(deductionData);

      form.resetFields();
      if (onSubmitSuccess) onSubmitSuccess();
    } catch (error) {
      console.error("Error details:", error.response?.data); // Debug
      message.error(
        error.response?.data?.message || "Failed to save deduction data"
      );
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Form.Item
          label="BPJS Deduction"
          name="bpjs_deduction"
          rules={[
            {
              type: "number",
              min: 0,
              message: "BPJS Deduction must be a positive number!",
            },
          ]}
        >
          <InputNumber
            className="w-full"
            formatter={(value) =>
              `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            }
            parser={(value) => value.replace(/Rp\s?|(\.*)/g, "")}
          />
        </Form.Item>

        <Form.Item
          label="Borrow Deduction"
          name="borrow_deduction"
          rules={[
            {
              type: "number",
              min: 0,
              message: "Borrow Deduction must be a positive number!",
            },
          ]}
        >
          <InputNumber
            className="w-full"
            formatter={(value) =>
              `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            }
            parser={(value) => value.replace(/Rp\s?|(\.*)/g, "")}
          />
        </Form.Item>

        <Form.Item
          label="Jamsostek JHT"
          name="jamsostek_jht_deduction"
          rules={[
            {
              type: "number",
              min: 0,
              message: "Jamsostek JHT must be a positive number!",
            },
          ]}
        >
          <InputNumber
            className="w-full"
            formatter={(value) =>
              `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            }
            parser={(value) => value.replace(/Rp\s?|(\.*)/g, "")}
          />
        </Form.Item>

        <Form.Item
          label="Tax Deduction"
          name="tax_deduction"
          rules={[
            {
              type: "number",
              min: 0,
              message: "Tax Deduction must be a positive number!",
            },
          ]}
        >
          <InputNumber
            className="w-full"
            formatter={(value) =>
              `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            }
            parser={(value) => value.replace(/Rp\s?|(\.*)/g, "")}
          />
        </Form.Item>

        <Form.Item
          label="Death Deduction"
          name="death_deduction"
          rules={[
            {
              type: "number",
              min: 0,
              message: "Death Deduction must be a positive number!",
            },
          ]}
        >
          <InputNumber
            className="w-full"
            formatter={(value) =>
              `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            }
            parser={(value) => value.replace(/Rp\s?|(\.*)/g, "")}
          />
        </Form.Item>

        <Form.Item
          label="Jamsostek JP"
          name="jamsostek_jp_deduction"
          rules={[
            {
              type: "number",
              min: 0,
              message: "Jamsostek JP must be a positive number!",
            },
          ]}
        >
          <InputNumber
            className="w-full"
            formatter={(value) =>
              `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            }
            parser={(value) => value.replace(/Rp\s?|(\.*)/g, "")}
          />
        </Form.Item>

        <Form.Item
          label="Leave Deduction"
          name="leave_deduction"
          rules={[
            {
              type: "number",
              min: 0,
              message: "Leave Deduction must be a positive number!",
            },
          ]}
        >
          <InputNumber
            className="w-full"
            formatter={(value) =>
              `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            }
            parser={(value) => value.replace(/Rp\s?|(\.*)/g, "")}
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
          Save Deductions
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DeductionForm;
