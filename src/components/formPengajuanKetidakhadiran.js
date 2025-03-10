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
  DatePicker,
} from "antd";
import axios from "axios";
import "../app/globals.css";
import dayjs from "dayjs"; // Import dayjs

const { Dragger } = Upload;
const { Option } = Select;

export default function FormPengajuanKetidakhadiran() {
  const [form] = Form.useForm();
  const [dataKetidakhadiran, setDataKetidakhadiran] = useState();
  const [fileList, setFileList] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://127.0.0.1:8000/api/userSession",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const absenceAuth = response.data.data.user;
        setDataKetidakhadiran(absenceAuth);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const props = {
    name: "file",
    multiple: false,
    maxCount: 1,
    fileList,
    onChange(info) {
      let newFileList = [...info.fileList];

      if (newFileList.length > 1) {
        newFileList = newFileList.slice(-1);
      }

      setFileList(newFileList);

      const { status } = info.file;
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
    beforeUpload: () => false,
  };

  const handleSubmit = async (values) => {
    console.log("Raw Form values:", values);

    console.log("Start Date:", values.start_date.format("YYYY-MM-DD HH:mm"));
    console.log("End Date:", values.end_date.format("YYYY-MM-DD HH:mm"));

    const formattedStartDate = values.start_date.format("YYYY-MM-DD HH:mm");
    const formattedEndDate = values.end_date.format("YYYY-MM-DD HH:mm");

    const formData = new FormData();
    formData.append("absence_code", values.absence_code);
    formData.append("absence_type", values.absence_type);
    formData.append("start_date", formattedStartDate);
    formData.append("end_date", formattedEndDate);
    formData.append("duration", values.duration);
    formData.append("description", values.description);

    if (fileList.length > 0 && fileList[0].originFileObj) {
      formData.append("document", fileList[0].originFileObj);
    }

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://127.0.0.1:8000/api/absence",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      message.success("Pengajuan ketidakhadiran berhasil dikirim!");

      setTimeout(() => {
        window.location.reload();
      }, 1000);

      form.resetFields();
      setErrorMessage(null); // Reset pesan error
      document.getElementById("modal3").close();
    } catch (error) {
      console.error("Error mengirim data:", error);
      if (error.response) {
        console.error(error.response.data);
        setErrorMessage(error.response.data.message || "Gagal mengirim data.");
      } else if (error.request) {
        setErrorMessage("Tidak ada response dari server.");
      } else {
        setErrorMessage("Terjadi kesalahan.");
      }
    }
  };

  const resetForm = () => {
    form.resetFields();
  };

  const nowPlusOneHour = dayjs().add(1, "hour");

  const disabledDate = (current) => {
    // Nonaktifkan tanggal sebelum hari ini
    return current && current < dayjs().startOf("day");
  };

  // Reset pesan error saat modal ditutup
  useEffect(() => {
    const modal = document.getElementById("modal3");
    const handleClose = () => {
      setErrorMessage(null);
    };

    modal.addEventListener("close", handleClose);

    return () => {
      modal.removeEventListener("close", handleClose);
    };
  }, []);

  return (
    <dialog id="modal3" className="modal" onClose={resetForm}>
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={resetForm}>
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg text-center mb-10">
          Form Pengajuan Ketidakhadiran
        </h3>
        <div>
          <Form
            form={form}
            layout="vertical"
            style={{ maxWidth: 600 }}
            autoComplete="off"
            onFinish={handleSubmit}
          >
            <Form.Item
              label="Jenis Ketidakhadiran"
              name="absence_code"
              rules={[
                {
                  required: true,
                  message: "Jenis Ketidakhadiran wajib diisi!",
                },
              ]}
            >
              <Select
                getPopupContainer={(triggerNode) => triggerNode.parentElement}
                placeholder="Select"
              >
                <Option value="P">Permit</Option>
                <Option value="L">Late</Option>
                <Option value="BT">Business Trip</Option>
                <Option value="DL">Doctor Letter</Option>
                <Option value="AL">Annual Leave</Option>
                <Option value="SBA">Sick By Accident</Option>
                <Option value="LP">Legal Permit</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Sisa Cuti Tahunan" name="sisaCuti">
              <Input
                placeholder={dataKetidakhadiran?.annual_leave.leave_remaining}
                disabled
              />
            </Form.Item>
            <Form.Item
              label="Jenis Periode Ketidakhadiran"
              name="absence_type"
              rules={[
                {
                  required: true,
                  message: "Jenis Periode Ketidakhadiran wajib diisi!",
                },
              ]}
            >
              <Select
                getPopupContainer={(triggerNode) => triggerNode.parentElement}
                placeholder="Select"
              >
                <Option value="Hari">Hari</Option>
                <Option value="Jam">Jam</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Periode Awal"
              name="start_date"
              rules={[{ required: true, message: "Periode Awal wajib diisi!" }]}
            >
              <DatePicker
                showTime={{ format: "HH:mm" }}
                format="YYYY-MM-DD HH:mm"
                className="w-full"
                getPopupContainer={(triggerNode) => triggerNode.parentElement}
                disabledDate={disabledDate}
              />
            </Form.Item>
            <Form.Item
              label="Periode Akhir"
              name="end_date"
              rules={[{ required: true, message: "Periode Akhir wajib diisi!" }]}
            >
              <DatePicker
                showTime={{ format: "HH:mm" }}
                format="YYYY-MM-DD HH:mm"
                className="w-full"
                getPopupContainer={(triggerNode) => triggerNode.parentElement}
                disabledDate={disabledDate}
              />
            </Form.Item>
            <Form.Item
              label="Berkas"
              name="document"
              dependencies={["absence_code"]}
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    const absenceCode = getFieldValue("absence_code");
                    if (
                      ["BT", "DL", "LP"].includes(absenceCode) &&
                      (!value || value.fileList.length === 0)
                    ) {
                      return Promise.reject(
                        new Error("Berkas wajib diisi untuk jenis absensi ini!")
                      );
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  Supported file types: pdf, doc, docx, jpg, jpeg, and png
                </p>
              </Dragger>
            </Form.Item>
            <Form.Item
              label="Keterangan"
              name="description"
              rules={[{ required: true, message: "Keterangan wajib diisi!" }]}
            >
              <Input.TextArea
                placeholder="keterangan"
                rows={4}
                className="w-full max-w-s"
              />
            </Form.Item>
            {errorMessage && ( // Tampilkan pesan error jika ada
          <div className="mb-4 text-red-500 text-center">{errorMessage}</div>
        )}
            <div className="py-2 flex justify-center">
              <Space>
                <Button type="primary" htmlType="submit" className="w-[100px]">
                  Submit
                </Button>
              </Space>
            </div>
          </Form>
        </div>
      </div>
    </dialog>
  );
}