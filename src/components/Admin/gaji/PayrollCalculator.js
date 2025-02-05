import { payrollServices } from "@/api/api";
import { Button, DatePicker, Form, message } from "antd";
import { useState } from "react";

const PayrollCalculator = ({ employeeId, onCalculateSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleCalculate = async (values) => {
    try {
      setLoading(true);
      const month = values.date.format("MM");
      const year = values.date.format("YYYY");

      const payrollData = {
        id_employee: employeeId,
        date: values.date.format("YYYY-MM-01"), // Gunakan format date sesuai backend
      };

      console.log("Sending payroll calculation data:", payrollData);
      const response = await payrollServices.calculatePayroll(payrollData);

      if (onCalculateSuccess) {
        onCalculateSuccess(response.data.data);
      }

      message.success("Payroll calculated successfully");
    } catch (error) {
      console.error("Error details:", error.response?.data);
      message.error("Gagal melakukan kalkulasi gaji");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleCalculate}>
      <Form.Item
        label="Pilih Tanggal (Bulan dan Tahun)"
        name="date"
        rules={[{ required: true, message: "Silakan pilih bulan dan tahun!" }]}
      >
        <DatePicker picker="month" className="w-full" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Kalkulasi Gaji
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PayrollCalculator;
