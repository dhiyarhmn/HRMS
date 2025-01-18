// components/Admin/gaji/DeductionForm.js
import React from "react";
import { Form, InputNumber, DatePicker, Button, message } from "antd";
import { deductionServices } from "@/api/api";

const DeductionForm = ({ employeeId, onSubmitSuccess }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const deductionData = {
        id_employee: employeeId,
        bpjs_deduction: Number(values.bpjs_deduction),
        borrow_deduction: Number(values.borrow_deduction),
        jamsostek_jht_deduction: Number(values.jamsostek_jht_deduction),
        tax_deduction: Number(values.tax_deduction),
        death_deduction: Number(values.death_deduction),
        jamsostek_jp_deduction: Number(values.jamsostek_jp_deduction),
        leave_deduction: Number(values.leave_deduction),
        date: values.date.format("YYYY-MM-DD"),
      };

      console.log("Sending deduction data:", deductionData); // Debug
      await deductionServices.createDeduction(deductionData);
      
      form.resetFields();
      if (onSubmitSuccess) onSubmitSuccess();
    } catch (error) {
      console.error("Error details:", error.response?.data); // Debug
      message.error("Failed to save deduction data");
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Form.Item
          label="BPJS Deduction"
          name="bpjs_deduction"
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

        <Form.Item
          label="Borrow Deduction"
          name="borrow_deduction"
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

        <Form.Item
          label="Jamsostek JHT"
          name="jamsostek_jht_deduction"
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

        <Form.Item
          label="Tax Deduction"
          name="tax_deduction"
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

        <Form.Item
          label="Death Deduction"
          name="death_deduction"
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

        <Form.Item
          label="Jamsostek JP"
          name="jamsostek_jp_deduction"
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

        <Form.Item
          label="Leave Deduction"
          name="leave_deduction"
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

        <Form.Item label="Date" name="date" rules={[{ required: true }]}>
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
