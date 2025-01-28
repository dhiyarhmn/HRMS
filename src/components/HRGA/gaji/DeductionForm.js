import React from "react";
import { Form, InputNumber, DatePicker, Button, message } from "antd";
import { deductionServices } from "@/api/api";

const DeductionForm = ({ employeeId, onSubmitSuccess }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const formattedDate = values.date.format("YYYY-MM-01");

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
        date: formattedDate,
      };

      console.log("Sending deduction data:", deductionData);
      await deductionServices.createDeduction(deductionData);

      form.resetFields();
      if (onSubmitSuccess) onSubmitSuccess();
    } catch (error) {
      console.error("Error details:", error.response?.data);
      message.error(
        error.response?.data?.message || "Gagal menyimpan data potongan"
      );
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Form.Item
          label="Potongan BPJS"
          name="bpjs_deduction"
          rules={[
            { required: true, message: "Potongan BPJS harus diisi!" },
            {
              type: "number",
              min: 0,
              message: "Potongan BPJS harus berupa angka positif!",
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
          label="Potongan Pinjaman"
          name="borrow_deduction"
          rules={[
            {
              type: "number",
              min: 0,
              message: "Potongan Pinjaman harus berupa angka positif!",
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
          label="Potongan Jamsostek JHT"
          name="jamsostek_jht_deduction"
          rules={[
            { required: true, message: "Potongan Jamsostek JHT harus diisi!" },
            {
              type: "number",
              min: 0,
              message: "Potongan Jamsostek JHT harus berupa angka positif!",
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
          label="Potongan Pajak"
          name="tax_deduction"
          rules={[
            { required: true, message: "Potongan Pajak harus diisi!" },
            {
              type: "number",
              min: 0,
              message: "Potongan Pajak harus berupa angka positif!",
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
          label="Potongan Kematian"
          name="death_deduction"
          rules={[
            {
              type: "number",
              min: 0,
              message: "Potongan Kematian harus berupa angka positif!",
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
          label="Potongan Jamsostek JP"
          name="jamsostek_jp_deduction"
          rules={[
            { required: true, message: "Potongan Jamsostek JP harus diisi!" },
            {
              type: "number",
              min: 0,
              message: "Potongan Jamsostek JP harus berupa angka positif!",
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
          label="Potongan Cuti"
          name="leave_deduction"
          rules={[
            {
              type: "number",
              min: 0,
              message: "Potongan Cuti harus berupa angka positif!",
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
          Simpan Potongan
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DeductionForm;
