import React, { useState } from "react";
import { Form, InputNumber, DatePicker, Button, message, Alert } from "antd";
import { allowanceServices } from "@/api/api";
import dayjs from "dayjs";

const UpdateAllowanceForm = ({ employeeId, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [allowanceData, setAllowanceData] = useState(null);
  const [loadingData, setLoadingData] = useState(false);

  const handleMonthSelect = async (date) => {
    if (!date) {
      setSelectedMonth(null);
      setAllowanceData(null);
      form.resetFields();
      return;
    }

    setLoadingData(true);
    setSelectedMonth(date);

    try {
      const response = await allowanceServices.getAllowances();
      const monthlyAllowance = response.data.data.find(
        (allowance) =>
          allowance.id_employee === employeeId &&
          dayjs(allowance.date).month() === date.month() &&
          dayjs(allowance.date).year() === date.year()
      );

      if (monthlyAllowance) {
        setAllowanceData(monthlyAllowance);
        form.setFieldsValue({
          position_allowance: monthlyAllowance.position_allowance,
          health_allowance: monthlyAllowance.health_allowance,
          pension: monthlyAllowance.pension,
          communication: monthlyAllowance.communication,
        });
      } else {
        setAllowanceData(null);
        form.resetFields([
          "position_allowance",
          "health_allowance",
          "pension",
          "communication",
        ]);
      }
    } catch (error) {
      console.error("Error fetching allowance data:", error);
      message.error("Gagal mengambil data tunjangan");
    } finally {
      setLoadingData(false);
    }
  };

  const handleUpdate = async (values) => {
    if (!selectedMonth || !allowanceData) {
      message.error("Pilih bulan dan pastikan data tersedia");
      return;
    }

    try {
      setLoading(true);
      const formattedDate = selectedMonth.format("YYYY-MM-DD");

      const allowanceUpdateData = {
        id_employee: employeeId,
        date: formattedDate,
        position_allowance: values.position_allowance,
        health_allowance: values.health_allowance,
        pension: values.pension,
        communication: values.communication,
      };

      Object.keys(allowanceUpdateData).forEach((key) => {
        if (
          allowanceUpdateData[key] === null ||
          allowanceUpdateData[key] === undefined
        ) {
          delete allowanceUpdateData[key];
        }
      });

      await allowanceServices.updateAllowance(allowanceUpdateData);
      if (onSuccess) onSuccess();
      message.success("Data tunjangan berhasil diupdate");
    } catch (error) {
      console.error("Error updating allowance:", error);
      message.error(
        error.response?.data?.message || "Gagal memperbarui data tunjangan"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Form.Item label="Pilih Bulan dan Tahun" required className="mb-6">
        <DatePicker
          picker="month"
          className="w-full"
          format="MMMM YYYY"
          onChange={handleMonthSelect}
          value={selectedMonth}
        />
      </Form.Item>

      {loadingData ? (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-gray-600">Memuat data...</p>
        </div>
      ) : selectedMonth && !allowanceData ? (
        <Alert
          message="Data Tidak Ditemukan"
          description={`Tidak ada data tunjangan untuk bulan ${selectedMonth.format(
            "MMMM YYYY"
          )}`}
          type="warning"
          showIcon
        />
      ) : selectedMonth && allowanceData ? (
        <Form form={form} layout="vertical" onFinish={handleUpdate}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label="Tunjangan Jabatan"
              name="position_allowance"
              validateStatus={
                form.getFieldError("position_allowance").length > 0
                  ? "error"
                  : ""
              }
              help={form.getFieldError("position_allowance")[0]}
              rules={[
                {
                  type: "number",
                  min: 0,
                  message: "Tunjangan Jabatan harus berupa angka positif!",
                  transform: (value) => Number(value),
                },
              ]}
            >
              <InputNumber
                className="w-full"
                formatter={(value) =>
                  `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                }
                parser={(value) => value.replace(/[^\d]/g, "")}
                min={0}
              />
            </Form.Item>

            <Form.Item
              label="Tunjangan Kesehatan"
              name="health_allowance"
              validateStatus={
                form.getFieldError("health_allowance").length > 0 ? "error" : ""
              }
              help={form.getFieldError("health_allowance")[0]}
              rules={[
                {
                  type: "number",
                  min: 0,
                  message: "Tunjangan Kesehatan harus berupa angka positif!",
                  transform: (value) => Number(value),
                },
              ]}
            >
              <InputNumber
                className="w-full"
                formatter={(value) =>
                  `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                }
                parser={(value) => value.replace(/[^\d]/g, "")}
                min={0}
              />
            </Form.Item>

            <Form.Item
              label="Pensiun"
              name="pension"
              validateStatus={
                form.getFieldError("pension").length > 0 ? "error" : ""
              }
              help={form.getFieldError("pension")[0]}
              rules={[
                {
                  type: "number",
                  min: 0,
                  message: "Pensiun harus berupa angka positif!",
                  transform: (value) => Number(value),
                },
              ]}
            >
              <InputNumber
                className="w-full"
                formatter={(value) =>
                  `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                }
                parser={(value) => value.replace(/[^\d]/g, "")}
                min={0}
              />
            </Form.Item>

            <Form.Item
              label="Komunikasi"
              name="communication"
              validateStatus={
                form.getFieldError("communication").length > 0 ? "error" : ""
              }
              help={form.getFieldError("communication")[0]}
              rules={[
                {
                  type: "number",
                  min: 0,
                  message: "Komunikasi harus berupa angka positif!",
                  transform: (value) => Number(value),
                },
              ]}
            >
              <InputNumber
                className="w-full"
                formatter={(value) =>
                  `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                }
                parser={(value) => value.replace(/[^\d]/g, "")}
                min={0}
              />
            </Form.Item>
          </div>

          <Form.Item className="flex justify-end">
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="bg-green-500 hover:bg-green-600"
              style={{ backgroundColor: "#10B981", borderColor: "#10B981" }}
            >
              Update Tunjangan
            </Button>
          </Form.Item>
        </Form>
      ) : null}
    </div>
  );
};

export default UpdateAllowanceForm;
