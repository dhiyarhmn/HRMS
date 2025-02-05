import React, { useState } from "react";
import { Form, InputNumber, DatePicker, Button, message, Alert } from "antd";
import { bonusServices } from "@/api/api";
import dayjs from "dayjs";

const UpdateBonusForm = ({ employeeId, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [bonusData, setBonusData] = useState(null);
  const [loadingData, setLoadingData] = useState(false);

  const handleMonthSelect = async (date) => {
    if (!date) {
      setSelectedMonth(null);
      setBonusData(null);
      form.resetFields();
      return;
    }

    setLoadingData(true);
    setSelectedMonth(date);

    try {
      const response = await bonusServices.getBonuses();
      const monthlyBonus = response.data.data.find(
        (bonus) =>
          bonus.id_employee === employeeId &&
          dayjs(bonus.date).month() === date.month() &&
          dayjs(bonus.date).year() === date.year()
      );

      if (monthlyBonus) {
        setBonusData(monthlyBonus);
        form.setFieldsValue({
          overtime: monthlyBonus.overtime,
          meal: monthlyBonus.meal,
          transport: monthlyBonus.transport,
          extra: monthlyBonus.extra,
        });
      } else {
        setBonusData(null);
        form.resetFields(["overtime", "meal", "transport", "extra"]);
      }
    } catch (error) {
      console.error("Error fetching bonus data:", error);
      message.error("Gagal mengambil data bonus");
    } finally {
      setLoadingData(false);
    }
  };

  const handleUpdate = async (values) => {
    if (!selectedMonth || !bonusData) {
      message.error("Pilih bulan dan pastikan data tersedia");
      return;
    }

    try {
      setLoading(true);
      const formattedDate = selectedMonth.format("YYYY-MM-DD");

      const bonusUpdateData = {
        id_employee: employeeId,
        date: formattedDate,
        ...Object.fromEntries(
          Object.entries(values).filter(
            ([_, value]) => value !== null && value !== undefined
          )
        ),
      };

      await bonusServices.updateBonus(bonusUpdateData);
      if (onSuccess) onSuccess();
      message.success("Data bonus berhasil diupdate");
    } catch (error) {
      console.error("Error updating bonus:", error);
      message.error(
        error.response?.data?.message || "Gagal memperbarui data bonus"
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
      ) : selectedMonth && !bonusData ? (
        <Alert
          message="Data Tidak Ditemukan"
          description={`Tidak ada data bonus untuk bulan ${selectedMonth.format(
            "MMMM YYYY"
          )}`}
          type="warning"
          showIcon
        />
      ) : selectedMonth && bonusData ? (
        <Form form={form} layout="vertical" onFinish={handleUpdate}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label="Lembur"
              name="overtime"
              validateStatus={
                form.getFieldError("overtime").length > 0 ? "error" : ""
              }
              help={form.getFieldError("overtime")[0]}
              rules={[
                {
                  type: "number",
                  min: 0,
                  message: "Lembur harus berupa angka positif!",
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
              label="Makan"
              name="meal"
              validateStatus={
                form.getFieldError("meal").length > 0 ? "error" : ""
              }
              help={form.getFieldError("meal")[0]}
              rules={[
                {
                  type: "number",
                  min: 0,
                  message: "Makan harus berupa angka positif!",
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
              label="Transport"
              name="transport"
              validateStatus={
                form.getFieldError("transport").length > 0 ? "error" : ""
              }
              help={form.getFieldError("transport")[0]}
              rules={[
                {
                  type: "number",
                  min: 0,
                  message: "Transport harus berupa angka positif!",
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
              label="Tambahan"
              name="extra"
              validateStatus={
                form.getFieldError("extra").length > 0 ? "error" : ""
              }
              help={form.getFieldError("extra")[0]}
              rules={[
                {
                  type: "number",
                  min: 0,
                  message: "Tambahan harus berupa angka positif!",
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
              Update Bonus
            </Button>
          </Form.Item>
        </Form>
      ) : null}
    </div>
  );
};

export default UpdateBonusForm;
