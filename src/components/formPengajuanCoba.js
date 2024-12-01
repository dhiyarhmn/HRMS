import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  DatePicker,
  Form,
  Input,
  Select,
  Upload,
  message,
} from "antd";

const { Dragger } = Upload;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const { Option } = Select;

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export default function FormPengajuanCuti({
  selectedAbsensi,
  setSelectedAbsensi,
  periode,
  setPeriode,
}) {
  const props = {
    name: "file",
    multiple: true,
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload", // Update with your API endpoint
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <dialog id="modal3" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg text-center">
          Form Pengajuan Absensi
        </h3>
        <div className="py-4">
          <Form layout="vertical" style={{ maxWidth: 600 }}>
            <Form.Item label="Nama">
              <Input placeholder="Satria Bintang" />
            </Form.Item>
            <Form.Item label="NIK">
              <Input placeholder="345" />
            </Form.Item>
            <Form.Item label="Departemen">
              <Input placeholder="Accounting" />
            </Form.Item>
            <Form.Item label="Jabatan">
              <Input placeholder="Staff" />
            </Form.Item>
            <Form.Item label="Jenis Absensi">
              <Select >
                <Option value="Absen">Absen</Option>
                <Option value="Izin">Izin</Option>
                <Option value="Terlambat">Terlambat</Option>
                <Option value="Dinas">Dinas</Option>
                <Option value="SakitDenganSuratDokter">
                  Sakit dengan Surat Dokter
                </Option>
                <Option value="CutiTahunan">Cuti Tahunan</Option>
                <Option value="SakitAkibatKecelakaanKerja">
                  Sakit Akibat Kecelakaan Kerja
                </Option>
                <Option value="IzinResmi">Izin Resmi</Option>
                <Option value="Skors">Skors</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Berkas" valuePropName="fileList" getValueFromEvent={normFile}>
              <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                  <PlusOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload. Strictly prohibited from
                  uploading company data or other banned files.
                </p>
              </Dragger>
            </Form.Item>
            <Form.Item label="Lama Periode Absensi">
              <Select
                value={periode}
                onChange={(e) => setPeriode(e)}
              >
                <Option value="Day">Day</Option>
                <Option value="Hour">Hour</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Periode">
              <RangePicker />
            </Form.Item>
            <Form.Item label="Keterangan">
              <TextArea placeholder="Keterangan" rows={4} />
            </Form.Item>
            <div className="py-2 flex justify-center">
              <input
                type="submit"
                value="Submit"
                className="btn bg-blue-500 text-white"
              />
            </div>
          </Form>
        </div>
      </div>
    </dialog>
  );
}
