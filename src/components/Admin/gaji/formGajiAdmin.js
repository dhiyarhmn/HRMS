import React, { useState } from "react";
import { Button, Form, Input, InputNumber, message } from "antd";
import jsPDF from "jspdf";
import "jspdf-autotable";

const FormGajiAdmin = ({ selectedRecord }) => {
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

  const generatePDF = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      // Create new PDF document
      const doc = new jsPDF();

      // Add company logo or header
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("SLIP GAJI KARYAWAN", 105, 20, { align: "center" });

      // Add current date
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      const currentDate = new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      doc.text(currentDate, 105, 30, { align: "center" });

      // Add employee information
      doc.setFontSize(12);
      doc.text(`Nama Karyawan: ${values.nama}`, 14, 50);

      // Create salary details table
      const totalGaji = values.gajiPokok + values.tunjangan - values.potongan;

      const tableData = [
        ["Gaji Pokok", formatCurrency(values.gajiPokok)],
        ["Tunjangan", formatCurrency(values.tunjangan)],
        ["Potongan", formatCurrency(values.potongan)],
        ["Total Gaji", formatCurrency(totalGaji)],
      ];

      doc.autoTable({
        startY: 60,
        head: [["Keterangan", "Jumlah"]],
        body: tableData,
        theme: "striped",
        headStyles: {
          fillColor: [66, 66, 66],
          textColor: 255,
          fontStyle: "bold",
        },
        styles: {
          fontSize: 12,
          cellPadding: 5,
        },
        columnStyles: {
          0: { cellWidth: 100 },
          1: { cellWidth: 70, halign: "left" },
        },
      });

      // Add footer
      const finalY = doc.lastAutoTable.finalY || 150;
      doc.setFontSize(10);
      doc.text(
        "*Slip gaji ini diterbitkan secara elektronik dan sah tanpa tanda tangan.",
        20,
        finalY + 20
      );

      // Save PDF
      doc.save(
        `slip-gaji-${values.nama.replace(/\s+/g, "-").toLowerCase()}.pdf`
      );
      message.success("PDF berhasil di-generate");
    } catch (error) {
      console.error("Error generating PDF:", error);
      message.error("Gagal generate PDF. Pastikan semua field terisi!");
    } finally {
      setLoading(false);
    }
  };

  const onFinish = (values) => {
    console.log("Success:", values);
    message.success("Data berhasil disimpan");
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={selectedRecord}
        >
          <div className="bg-gray-50 p-3 rounded">
            <Form.Item
              label="Nama Karyawan"
              name="nama"
              
            >
              <Input disabled />
            </Form.Item>
          </div>

          <div className="bg-gray-50 p-3 rounded mt-4">
            <Form.Item
              label="Gaji Pokok"
              name="gajiPokok"
              rules={[{ required: true, message: "Please input gaji pokok!" }]}
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

          <div className="bg-gray-50 p-3 rounded mt-4">
            <Form.Item
              label="Tunjangan"
              name="tunjangan"
              rules={[{ required: true, message: "Please input tunjangan!" }]}
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

          <div className="bg-gray-50 p-3 rounded mt-4">
            <Form.Item
              label="Potongan"
              name="potongan"
              rules={[{ required: true, message: "Please input potongan!" }]}
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

          <Form.Item className="flex justify-end gap-2 mt-6">
            <Button className="mr-2" onClick={() => form.resetFields()}>
              Reset
            </Button>
            <Button onClick={generatePDF} loading={loading} className="mr-2">
              Generate PDF
            </Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default FormGajiAdmin;
