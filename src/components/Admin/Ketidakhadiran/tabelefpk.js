import { useEffect, useState } from "react";
import { PlusOutlined, InboxOutlined } from "@ant-design/icons";
import {
  TimePicker,
  InputNumber,
  Button,
  Form,
  Input,
  Space,
  Upload,
  message,
  Select,
  DatePicker
} from "antd";

const { Dragger } = Upload;
const { Option } = Select;
const { RangePicker } = DatePicker;

const SubmitButton = ({ form, children }) => {
  const [submittable, setSubmittable] = useState(false);

  // Watch all values
  const values = Form.useWatch([], form);
  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);

  return (
    <Button type="primary" htmlType="submit" disabled={!submittable}>
      {children}
    </Button>
  );
};

export default function formPengajuanKetidakhadiran() {
  const [form] = Form.useForm();

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
          <Form
            form={form}
            layout="vertical"
            style={{ maxWidth: 600 }}
            autoComplete="off"
          >
            <Form.Item label="NIK" name="nik">
              <Input placeholder="345" disabled />
            </Form.Item>
            <Form.Item label="Nama" name="nama">
              <Input placeholder="Satria Bintang" disabled />
            </Form.Item>
            <Form.Item label="Departemen" name="departemen">
              <Input placeholder="Accounting" disabled />
            </Form.Item>
            <Form.Item label="Jabatan" name="jabatan">
              <Input placeholder="Staff" disabled />
            </Form.Item>
            <Form.Item
              label="Jenis Absensi"
              name="jenisAbsensi"
              rules={[{ required: true, message: "Jenis Absensi wajib diisi!" }]}
            >
              <Select
                getPopupContainer={(triggerNode) => triggerNode.parentElement}
                placeholder="Select"
              >
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
            <Form.Item label="Sisa Cuti Tahunan" name="sisaCuti">
              <Input placeholder="12" disabled />
            </Form.Item>
            <Form.Item
              label="Jenis Periode Absensi"
              name="jenisPeriode"
              rules={[{ required: true, message: "Jenis Periode Absensi wajib dipilih!" }]}
            >
              <Select
                getPopupContainer={(triggerNode) => triggerNode.parentElement}
                placeholder="Select"
              >
                <Option value="Day">Day</Option>
                <Option value="Hour">Hour</Option>
              </Select>
            </Form.Item>
            {/* <Form.Item
              label="Periode Ketidakhadiran"
              name="periode"
              rules={[{ required: true, message: "Periode wajib diisi!" }]}
            >
              <RangePicker
                showTime={{ format: "HH:mm" }}
                format="YYYY-MM-DD HH:mm"
                getPopupContainer={(triggerNode) => triggerNode.parentElement}
                style={{ width: "100%" }}
              />
            </Form.Item> */}
            <Form.Item
              label="Periode Awal"
              name="periodeAwal"
              rules={[{ required: true, message: "Periode Awal wajib diisi!" }]}
            >
              <Input type="datetime-local" className="w-full max-w-s" />
            </Form.Item>
            <Form.Item
              label="Periode Akhir"
              name="periodeAkhir"
              rules={[{ required: true, message: "Periode Akhir wajib diisi!" }]}
            >
              <Input type="datetime-local" className="w-full max-w-s" />
            </Form.Item>
            <Form.Item
              label="Berkas"
              name="berkas"
              rules={[{ required: true, message: "Berkas wajib diupload!" }]}
            >
              <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
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
            <Form.Item
              label="Keterangan"
              name="keterangan"
              rules={[{ required: true, message: "Keterangan wajib diisi!" }]}
            >
              <Input.TextArea
                placeholder="keterangan"
                rows={4}
                className="w-full max-w-s"
              />
            </Form.Item>
            <div className="py-2 flex justify-center">
              <Space>
                <SubmitButton form={form}>Submit</SubmitButton>
                <Button htmlType="reset">Reset</Button>
              </Space>
            </div>
          </Form>
        </div>
      </div>
    </dialog>
  );
}
