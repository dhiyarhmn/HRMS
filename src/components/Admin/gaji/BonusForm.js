import React from "react";
import { Form, InputNumber, DatePicker, Button, message } from "antd";
import { bonusServices } from "@/api/api";

const BonusForm = ({ employeeId, onSubmitSuccess }) => {
  const [form] = Form.useForm();

  const handleBonus = async (values) => {
    try {
      const formattedDate = values.date.format("YYYY-MM-01");

      const bonusData = {
        id_employee: employeeId,
        overtime: values.overtime ? Number(values.overtime) : 0,
        meal: values.meal ? Number(values.meal) : 0,
        transport: values.transport ? Number(values.transport) : 0,
        extra: values.extra ? Number(values.extra) : 0,
        date: formattedDate,
      };

      console.log("Sending bonus data:", bonusData);
      await bonusServices.createBonus(bonusData);

      form.resetFields();
      if (onSubmitSuccess) onSubmitSuccess();
    } catch (error) {
      console.error("Error details:", error.response?.data);
      message.error(
        error.response?.data?.message || "Gagal menyimpan data bonus"
      );
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleBonus}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Form.Item
          label="Lembur"
          name="overtime"
          rules={[
            {
              type: "number",
              min: 0,
              message: "Lembur harus berupa angka positif!",
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
          label="Makan"
          name="meal"
          rules={[
            { required: true, message: "Makan wajib diisi!" },
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
            min={0}
          />
        </Form.Item>

        <Form.Item
          label="Transport"
          name="transport"
          rules={[
            { required: true, message: "Transport wajib diisi!" },
            {
              type: "number",
              min: 0,
              message: "Transport harus berupa angka positif!",
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
          label="Tambahan"
          name="extra"
          rules={[
            {
              type: "number",
              min: 0,
              message: "Tambahan harus berupa angka positif!",
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
          Simpan Bonus
        </Button>
      </Form.Item>
    </Form>
  );
};

export default BonusForm;
