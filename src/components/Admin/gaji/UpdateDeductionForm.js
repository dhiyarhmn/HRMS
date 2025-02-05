import React, { useState } from "react";
import { Form, InputNumber, DatePicker, Button, message, Alert } from "antd";
import { deductionServices } from "@/api/api";
import dayjs from "dayjs";

const UpdateDeductionForm = ({ employeeId, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [deductionData, setDeductionData] = useState(null);
  const [loadingData, setLoadingData] = useState(false);

  const handleMonthSelect = async (date) => {
    if (!date) {
      setSelectedMonth(null);
      setDeductionData(null);
      form.resetFields();
      return;
    }

    setLoadingData(true);
    setSelectedMonth(date);

    try {
      const response = await deductionServices.getDeductions();
      const monthlyDeduction = response.data.data.find(
        (deduction) =>
          deduction.id_employee === employeeId &&
          dayjs(deduction.date).month() === date.month() &&
          dayjs(deduction.date).year() === date.year()
      );

      if (monthlyDeduction) {
        setDeductionData(monthlyDeduction);
        form.setFieldsValue({
          bpjs_deduction: monthlyDeduction.bpjs_deduction,
          borrow_deduction: monthlyDeduction.borrow_deduction,
          jamsostek_jht_deduction: monthlyDeduction.jamsostek_jht_deduction,
          tax_deduction: monthlyDeduction.tax_deduction,
          death_deduction: monthlyDeduction.death_deduction,
          jamsostek_jp_deduction: monthlyDeduction.jamsostek_jp_deduction,
          leave_deduction: monthlyDeduction.leave_deduction,
        });
      } else {
        setDeductionData(null);
        form.resetFields([
          "bpjs_deduction",
          "borrow_deduction",
          "jamsostek_jht_deduction",
          "tax_deduction",
          "death_deduction",
          "jamsostek_jp_deduction",
          "leave_deduction",
        ]);
      }
    } catch (error) {
      console.error("Error fetching deduction data:", error);
      message.error("Gagal mengambil data potongan");
    } finally {
      setLoadingData(false);
    }
  };

  const handleUpdate = async (values) => {
    if (!selectedMonth || !deductionData) {
      message.error("Pilih bulan dan pastikan data tersedia");
      return;
    }

    try {
      setLoading(true);
      const formattedDate = selectedMonth.format("YYYY-MM-01");

      const deductionUpdateData = {
        id_employee: employeeId,
        bpjs_deduction: values.bpjs_deduction || 0,
        borrow_deduction: values.borrow_deduction || 0,
        jamsostek_jht_deduction: values.jamsostek_jht_deduction || 0,
        tax_deduction: values.tax_deduction || 0,
        death_deduction: values.death_deduction || 0,
        jamsostek_jp_deduction: values.jamsostek_jp_deduction || 0,
        leave_deduction: values.leave_deduction || 0,
        date: formattedDate,
      };

      await deductionServices.updateDeduction(deductionUpdateData);
      
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error updating deduction:", error);
      message.error(
        error.response?.data?.message || "Gagal memperbarui data potongan"
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
      ) : selectedMonth && !deductionData ? (
        <Alert
          message="Data Tidak Ditemukan"
          description={`Tidak ada data potongan untuk bulan ${selectedMonth.format(
            "MMMM YYYY"
          )}`}
          type="warning"
          showIcon
        />
      ) : selectedMonth && deductionData ? (
        <Form form={form} layout="vertical" onFinish={handleUpdate}>
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
                {
                  required: true,
                  message: "Potongan Jamsostek JHT harus diisi!",
                },
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
                {
                  required: true,
                  message: "Potongan Jamsostek JP harus diisi!",
                },
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
          </div>

          <Form.Item className="flex justify-end">
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="bg-green-500 hover:bg-green-600"
              style={{ backgroundColor: "#10B981", borderColor: "#10B981" }}
            >
              Update Potongan
            </Button>
          </Form.Item>
        </Form>
      ) : null}
    </div>
  );
};

export default UpdateDeductionForm;
