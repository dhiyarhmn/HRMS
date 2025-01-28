import React from "react";
import { Form, InputNumber, DatePicker, Button, message } from "antd";
import { allowanceServices } from "@/api/api";

const AllowanceForm = ({ employeeId, onSubmitSuccess }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const formattedDate = values.date.format("YYYY-MM-01");

      const allowanceData = {
        id_employee: employeeId,
        position_allowance: values.position_allowance
          ? Number(values.position_allowance)
          : 0,
        health_allowance: values.health_allowance
          ? Number(values.health_allowance)
          : 0,
        pension: values.pension ? Number(values.pension) : 0,
        communication: values.communication ? Number(values.communication) : 0,
        date: formattedDate,
      };

      console.log("Sending allowance data:", allowanceData);
      const response = await allowanceServices.createAllowance(allowanceData);
      console.log("Response:", response);

      form.resetFields();
      if (onSubmitSuccess) onSubmitSuccess();
    } catch (error) {
      console.error("Error saving allowance:", error);
      message.error(
        error.response?.data?.message || "Gagal menyimpan data tunjangan"
      );
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Form.Item
          label="Tunjangan Jabatan"
          name="position_allowance"
          rules={[
            {
              type: "number",
              min: 0,
              message: "Tunjangan Jabatan harus berupa angka positif!",
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
          label="Tunjangan Kesehatan"
          name="health_allowance"
          rules={[
            { required: true, message: "Tunjangan Kesehatan wajib diisi!" },
            {
              type: "number",
              min: 0,
              message: "Tunjangan Kesehatan harus berupa angka positif!",
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
          label="Pensiun"
          name="pension"
          rules={[
            { required: true, message: "Pensiun wajib diisi!" },
            {
              type: "number",
              min: 0,
              message: "Pensiun harus berupa angka positif!",
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
          label="Komunikasi"
          name="communication"
          rules={[
            {
              type: "number",
              min: 0,
              message: "Komunikasi harus berupa angka positif!",
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
          Simpan Tunjangan
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AllowanceForm;
