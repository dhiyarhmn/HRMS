import { payrollServices } from "@/api/api";
import { Button, message } from "antd";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useState } from "react";

const SlipGajiStaff = ({ selectedRecord }) => {
  const [loading, setLoading] = useState(false);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const generatePDF = (data) => {
    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const payrollDate = new Date(data.payroll.date);

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
          `Periode: ${payrollDate.toLocaleDateString("id-ID", {
            month: "long",
            year: "numeric",
          })}`,
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
        startY + 10
      );

      // Signatures
      const signatureY = startY + 30;
      doc.setFont("helvetica", "normal");
      doc.text("Diterima oleh,", 35, signatureY);
      doc.text("Disetujui oleh,", pageWidth - 65, signatureY);

      doc.text("(________________)", 30, signatureY + 25);
      doc.text("(________________)", pageWidth - 70, signatureY + 25);
      doc.text("Karyawan", 39, signatureY + 30);
      doc.text("HRGA", pageWidth - 57, signatureY + 30);

      doc.save(
        `slip-gaji-${data.employee.name}-${
          payrollDate.getMonth() + 1
        }${payrollDate.getFullYear()}.pdf`
      );
      message.success("PDF berhasil di-generate");
    } catch (error) {
      console.error("Error generating PDF:", error);
      message.error("Gagal generate PDF!");
    }
  };

  const handleGeneratePDF = async () => {
    try {
      setLoading(true);
      const response = await payrollServices.getEmployeePayroll();

      // Find the specific payroll record
      const payrollRecord = response.data.find(
        (record) => record.id_payroll === selectedRecord
      );

      if (!payrollRecord) {
        message.error("Data payroll tidak ditemukan");
        return;
      }

      // Ensure month and year are correctly formatted
      const month = String(payrollRecord.month).padStart(2, "0");
      const year = String(payrollRecord.year);

      // Fetch detailed payroll data
      const detailedResponse = await payrollServices.getPayrollSummary({
        params: {
          id_employee: payrollRecord.id_employee,
          month: month,
          year: year,
        },
      });

      generatePDF(detailedResponse.data.data);
    } catch (error) {
      console.error("Error:", error);
      // More detailed error logging
      if (error.response) {
        console.error("Response error:", error.response.data);
        message.error(
          `Gagal mengambil data payroll: ${
            error.response.data.message || error.message
          }`
        );
      } else {
        message.error(
          "Gagal mengambil data payroll: Terjadi kesalahan tidak dikenal"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Button
        type="primary"
        onClick={handleGeneratePDF}
        loading={loading}
        className="w-full"
      >
        Generate Slip Gaji
      </Button>
    </div>
  );
};

export default SlipGajiStaff;
