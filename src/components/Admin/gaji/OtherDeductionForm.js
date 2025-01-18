// components/Admin/gaji/OtherDeductionForm.js
import React from "react";
import { Form, InputNumber, DatePicker, Button, message } from "antd";
import { otherDeductionServices } from "@/api/api";

const OtherDeductionForm = ({ employeeId, onSubmitSuccess }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const otherDeductionData = {
        id_employee: employeeId,
        simpanan_wajib: Number(values.simpanan_wajib),
        simpanan_sukarela: Number(values.simpanan_sukarela),
        pinjaman_uang_barang: Number(values.pinjaman_uang_barang),
        ruko: Number(values.ruko),
        makan: Number(values.makan),
        iuran_spmi: Number(values.iuran_spmi),
        soft_loan: Number(values.soft_loan),
        date: values.date.format("YYYY-MM-DD"),
      };

      console.log("Sending other deduction data:", otherDeductionData); // Debug
      const response = await otherDeductionServices.createOtherDeduction(
        otherDeductionData
      );
      console.log("Response:", response);
      
      form.resetFields();
      if (onSubmitSuccess) onSubmitSuccess();
    } catch (error) {
      console.error("Error details:", error.response?.data); // Debug
      message.error("Failed to save other deduction data");
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Form.Item
          label="Simpanan Wajib"
          name="simpanan_wajib"
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
          label="Simpanan Sukarela"
          name="simpanan_sukarela"
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
          label="Pinjaman Uang/Barang"
          name="pinjaman_uang_barang"
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

        <Form.Item label="Ruko" name="ruko" rules={[{ required: true }]}>
          <InputNumber
            className="w-full"
            formatter={(value) =>
              `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            }
            parser={(value) => value.replace(/Rp\s?|(\.*)/g, "")}
          />
        </Form.Item>

        <Form.Item label="Makan" name="makan" rules={[{ required: true }]}>
          <InputNumber
            className="w-full"
            formatter={(value) =>
              `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            }
            parser={(value) => value.replace(/Rp\s?|(\.*)/g, "")}
          />
        </Form.Item>

        <Form.Item
          label="Iuran SPMI"
          name="iuran_spmi"
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
          label="Soft Loan"
          name="soft_loan"
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
          Save Other Deductions
        </Button>
      </Form.Item>
    </Form>
  );
};

export default OtherDeductionForm;
