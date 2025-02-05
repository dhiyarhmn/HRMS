import React, { useState } from "react";
import { Form, InputNumber, DatePicker, Button, message, Alert } from "antd";
import { otherDeductionServices } from "@/api/api";
import dayjs from "dayjs";

const UpdateOtherDeductionForm = ({ employeeId, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [otherDeductionData, setOtherDeductionData] = useState(null);
  const [loadingData, setLoadingData] = useState(false);

  const handleMonthSelect = async (date) => {
    if (!date) {
      setSelectedMonth(null);
      setOtherDeductionData(null);
      form.resetFields();
      return;
    }

    setLoadingData(true);
    setSelectedMonth(date);

    try {
      const response = await otherDeductionServices.getOtherDeductions();
      const monthlyOtherDeduction = response.data.data.find(
        (otherDeduction) =>
          otherDeduction.id_employee === employeeId &&
          dayjs(otherDeduction.date).month() === date.month() &&
          dayjs(otherDeduction.date).year() === date.year()
      );

      if (monthlyOtherDeduction) {
        setOtherDeductionData(monthlyOtherDeduction);
        form.setFieldsValue({
          simpanan_wajib: monthlyOtherDeduction.simpanan_wajib,
          simpanan_sukarela: monthlyOtherDeduction.simpanan_sukarela,
          pinjaman_uang_barang: monthlyOtherDeduction.pinjaman_uang_barang,
          ruko: monthlyOtherDeduction.ruko,
          makan: monthlyOtherDeduction.makan,
          iuran_spmi: monthlyOtherDeduction.iuran_spmi,
          soft_loan: monthlyOtherDeduction.soft_loan,
        });
      } else {
        setOtherDeductionData(null);
        form.resetFields([
          "simpanan_wajib",
          "simpanan_sukarela",
          "pinjaman_uang_barang",
          "ruko",
          "makan",
          "iuran_spmi",
          "soft_loan",
        ]);
      }
    } catch (error) {
      console.error("Error fetching other deduction data:", error);
      message.error("Gagal mengambil data potongan lainnya");
    } finally {
      setLoadingData(false);
    }
  };

  const handleUpdate = async (values) => {
    if (!selectedMonth || !otherDeductionData) {
      message.error("Pilih bulan dan pastikan data tersedia");
      return;
    }

    try {
      setLoading(true);
      const formattedDate = selectedMonth.format("YYYY-MM-01");

      const otherDeductionUpdateData = {
        id_employee: employeeId,
        simpanan_wajib: values.simpanan_wajib || 0,
        simpanan_sukarela: values.simpanan_sukarela || 0,
        pinjaman_uang_barang: values.pinjaman_uang_barang || 0,
        ruko: values.ruko || 0,
        makan: values.makan || 0,
        iuran_spmi: values.iuran_spmi || 0,
        soft_loan: values.soft_loan || 0,
        date: formattedDate,
      };

      await otherDeductionServices.updateOtherDeduction(otherDeductionUpdateData);
      
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error updating other deduction:", error);
      message.error(
        error.response?.data?.message ||
          "Gagal memperbarui data potongan lainnya"
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
      ) : selectedMonth && !otherDeductionData ? (
        <Alert
          message="Data Tidak Ditemukan"
          description={`Tidak ada data potongan lainnya untuk bulan ${selectedMonth.format(
            "MMMM YYYY"
          )}`}
          type="warning"
          showIcon
        />
      ) : selectedMonth && otherDeductionData ? (
        <Form form={form} layout="vertical" onFinish={handleUpdate}>
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
          </div>

          <Form.Item className="flex justify-end">
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="bg-green-500 hover:bg-green-600"
              style={{ backgroundColor: "#10B981", borderColor: "#10B981" }}
            >
              Update Potongan Lainnya
            </Button>
          </Form.Item>
        </Form>
      ) : null}
    </div>
  );
};

export default UpdateOtherDeductionForm;
