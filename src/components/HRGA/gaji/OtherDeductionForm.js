import React from "react";
import { Form, InputNumber, DatePicker, Button, message } from "antd";
import { otherDeductionServices } from "@/api/api";

const OtherDeductionForm = ({ employeeId, onSubmitSuccess }) => {
  const [form] = Form.useForm();

  const handleOtherDeduction = async (values) => {
    try {
      const formattedDate = values.date.format("YYYY-MM-01");

      const otherDeductionData = {
        id_employee: employeeId,
        simpanan_wajib: values.simpanan_wajib
          ? Number(values.simpanan_wajib)
          : 0,
        simpanan_sukarela: values.simpanan_sukarela
          ? Number(values.simpanan_sukarela)
          : 0,
        pinjaman_uang_barang: values.pinjaman_uang_barang
          ? Number(values.pinjaman_uang_barang)
          : 0,
        ruko: values.ruko ? Number(values.ruko) : 0,
        makan: values.makan ? Number(values.makan) : 0,
        iuran_spmi: values.iuran_spmi ? Number(values.iuran_spmi) : 0,
        soft_loan: values.soft_loan ? Number(values.soft_loan) : 0,
        date: formattedDate,
      };

      console.log("Sending other deduction data:", otherDeductionData); 
      const response = await otherDeductionServices.createOtherDeduction(
        otherDeductionData
      );
      console.log("Response:", response);

      form.resetFields();
      if (onSubmitSuccess) onSubmitSuccess();
    } catch (error) {
      console.error("Error details:", error.response?.data); 
      message.error(
        error.response?.data?.message ||
          "Gagal menyimpan data potongan tambahan"
      );
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleOtherDeduction}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Form.Item
          label="Simpanan Wajib"
          name="simpanan_wajib"
          rules={[
            {
              type: "number",
              min: 0,
              message: "Simpanan Wajib harus berupa angka positif!",
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
          label="Simpanan Sukarela"
          name="simpanan_sukarela"
          rules={[
            {
              type: "number",
              min: 0,
              message: "Simpanan Sukarela harus berupa angka positif!",
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
          label="Pinjaman Uang/Barang"
          name="pinjaman_uang_barang"
          rules={[
            {
              type: "number",
              min: 0,
              message: "Pinjaman Uang/Barang harus berupa angka positif!",
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
          label="Ruko"
          name="ruko"
          rules={[
            {
              type: "number",
              min: 0,
              message: "Ruko harus berupa angka positif!",
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
          label="Makan"
          name="makan"
          rules={[
            {
              type: "number",
              min: 0,
              message: "Makan harus berupa angka positif!",
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
          label="Iuran SPMI"
          name="iuran_spmi"
          rules={[
            {
              type: "number",
              min: 0,
              message: "Iuran SPMI harus berupa angka positif!",
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
          label="Pinjaman Lunak"
          name="soft_loan"
          rules={[
            {
              type: "number",
              min: 0,
              message: "Pinjaman Lunak harus berupa angka positif!",
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
          label="Tanggal (Bulan dan Tahun)"
          name="date"
          rules={[
            { required: true, message: "Silakan pilih bulan dan tahun!" },
          ]}
        >
          <DatePicker picker="month" className="w-full" format="MMMM YYYY" />
        </Form.Item>
      </div>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Simpan Potongan Tambahan
        </Button>
      </Form.Item>
    </Form>
  );
};

export default OtherDeductionForm;
