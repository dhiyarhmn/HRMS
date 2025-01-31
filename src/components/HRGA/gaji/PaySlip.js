import React, { useState } from "react";
import { Button, Form, DatePicker, message } from "antd";
import { payrollServices } from "@/api/api";
import jsPDF from "jspdf";
import "jspdf-autotable";

const PaySlip = ({ selectedRecord }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const generatePDF = (data, date) => {
    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      // Header
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("SLIP GAJI KARYAWAN", pageWidth / 2, 15, { align: "center" });

      // Company Info
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("PT. Daekyung Indah Heavy Industry", pageWidth / 2, 25, {
        align: "center",
      });
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(
        "Jalan Australia II Kavling 1 KIEC, Warnasari, Kec. Citangkil, Kota Cilegon, Banten 42443",
        pageWidth / 2,
        30,
        { align: "center" }
      );

      // Employee Info
      doc.setFontSize(10);
      doc.text(
        [
          `Nama: ${data.employee.name}`,
          `NIK: ${data.employee.nik}`,
          `Departemen: ${data.employee.department_id}`,
          `Periode: ${date.format("MMMM YYYY")}`,
        ],
        15,
        45
      );

      let startY = 65;

      // Function to add section
      const addSection = (title, items, y) => {
        doc.setFontSize(10);
        doc.text(title, 15, y);

        const tableData = Object.entries(items)
          .filter(([, value]) => value > 0)
          .map(([key, value]) => [
            key.replace(/_/g, " ").toUpperCase(),
            formatCurrency(value).replace("IDR", "").trim(),
          ]);

        if (tableData.length > 0) {
          doc.autoTable({
            startY: y + 5,
            head: [["Keterangan", "Jumlah"]],
            body: tableData,
            theme: "grid",
            styles: { fontSize: 8 },
            columnStyles: {
              0: { cellWidth: 100 },
              1: { cellWidth: 60, halign: "right" },
            },
            margin: { left: 15 },
          });
          return doc.lastAutoTable.finalY + 10;
        }
        return y + 15;
      };

      // Add sections
      startY = addSection(
        "A. GAJI",
        {
          "Gaji Pokok": data.payroll.basic_salary,
        },
        startY
      );

      startY = addSection(
        "B. TUNJANGAN",
        {
          "Tunjangan Jabatan":
            data.details.allowances[0]?.position_allowance || 0,
          "Tunjangan Kesehatan":
            data.details.allowances[0]?.health_allowance || 0,
          "Tunjangan Pensiun": data.details.allowances[0]?.pension || 0,
          "Tunjangan Komunikasi":
            data.details.allowances[0]?.communication || 0,
        },
        startY
      );

      startY = addSection(
        "C. BONUS",
        {
          Lembur: data.details.bonuses[0]?.overtime || 0,
          "Uang Makan": data.details.bonuses[0]?.meal || 0,
          Transport: data.details.bonuses[0]?.transport || 0,
          Extra: data.details.bonuses[0]?.extra || 0,
        },
        startY
      );

      startY = addSection(
        "D. POTONGAN",
        {
          BPJS: data.details.deductions[0]?.bpjs_deduction || 0,
          Pinjaman: data.details.deductions[0]?.borrow_deduction || 0,
          "Jamsostek JHT":
            data.details.deductions[0]?.jamsostek_jht_deduction || 0,
          Pajak: data.details.deductions[0]?.tax_deduction || 0,
          "Iuran Kematian": data.details.deductions[0]?.death_deduction || 0,
          "Jamsostek JP":
            data.details.deductions[0]?.jamsostek_jp_deduction || 0,
          "Potongan Cuti": data.details.deductions[0]?.leave_deduction || 0,
        },
        startY
      );

      startY = addSection(
        "E. POTONGAN KOPERASI",
        {
          "Simpanan Wajib":
            data.details.other_deductions[0]?.simpanan_wajib || 0,
          "Simpanan Sukarela":
            data.details.other_deductions[0]?.simpanan_sukarela || 0,
          "Pinjaman Uang & Barang":
            data.details.other_deductions[0]?.pinjaman_uang_barang || 0,
          Ruko: data.details.other_deductions[0]?.ruko || 0,
          Makan: data.details.other_deductions[0]?.makan || 0,
          "Iuran SPMI": data.details.other_deductions[0]?.iuran_spmi || 0,
          "Soft Loan": data.details.other_deductions[0]?.soft_loan || 0,
        },
        startY
      );

      // Total
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text(
        `TOTAL GAJI BERSIH: ${formatCurrency(data.payroll.total_salary)}`,
        15,
        startY
      );

      // Signatures
      const signatureY = Math.min(startY + 30, pageHeight - 40); // Ensure signatures fit on the page
      doc.setFont("helvetica", "normal");
      doc.text("Diterima oleh,", 35, signatureY);
      doc.text("Disetujui oleh,", pageWidth - 65, signatureY);

      doc.text("(________________)", 30, signatureY + 25);
      doc.text("(________________)", pageWidth - 70, signatureY + 25);
      doc.text("Karyawan", 39, signatureY + 30);
      doc.text("HRGA", pageWidth - 57, signatureY + 30);

      doc.save(`slip-gaji-${data.employee.name}-${date.format("MMYYYY")}.pdf`);
      message.success("PDF berhasil di-generate");
    } catch (error) {
      console.error("Error generating PDF:", error);
      message.error("Gagal generate PDF!");
    }
  };

  const handlePayroll = async (values) => {
    try {
      setLoading(true);
      const params = {
        id_employee: selectedRecord,
        month: values.date.format("MM"),
        year: values.date.format("YYYY"),
      };

      // Mengambil data dari endpoint yang sudah ada
      const response = await payrollServices.getPayrollSummary({
        params: params,
      });

      generatePDF(response.data.data, values.date);
    } catch (error) {
      console.error("Error:", error);
      message.error("Gagal mengambil data payroll");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Form form={form} layout="vertical" onFinish={handlePayroll}>
        <Form.Item
          label="Pilih Tanggal (Bulan dan Tahun)"
          name="date"
          rules={[{ required: true, message: "Silakan pilih periode!" }]}
        >
          <DatePicker picker="month" className="w-full" />
        </Form.Item>

        <Form.Item className="flex justify-end gap-2">
          <Button type="primary" htmlType="submit" loading={loading}>
            Cetak Slip Gaji
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PaySlip;
