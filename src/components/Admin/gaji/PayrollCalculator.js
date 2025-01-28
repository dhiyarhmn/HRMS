// components/Admin/gaji/PayrollCalculator.js
import React, { useState } from "react";
import { Form, DatePicker, Button, message } from "antd";
import { payrollServices } from "@/api/api";

const PayrollCalculator = ({ employeeId, onCalculateSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const month = values.date.format("MM");
      const year = values.date.format("YYYY");

      const payrollData = {
        id_employee: employeeId,
        month: month,
        year: year,
      };

      console.log("Sending payroll calculation data:", payrollData);
      const response = await payrollServices.calculatePayroll(payrollData);

      // Pastikan kita mengirim data yang benar ke parent component
      if (onCalculateSuccess) {
        // Kirim response.data.data karena struktur response adalah
        // { message: "...", data: { ... payroll data ... } }
        onCalculateSuccess(response.data.data);
      }

      message.success("Payroll calculated successfully");
    } catch (error) {
      console.error("Error details:", error.response?.data);
      message.error("Failed to calculate payroll");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        label="Pilih Tanggal (Bulan dan Tahun)"
        name="date"
        rules={[{ required: true, message: "Please select date!" }]}
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
