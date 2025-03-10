import { useEffect, useState } from "react";
import { PlusOutlined, InboxOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space, Upload, message, Select, DatePicker } from "antd";
import axios from "axios";
import dayjs from "dayjs"; // Import dayjs

const { Dragger } = Upload;
const { Option } = Select;

export default function EditFormKetidakhadiran({ selectedAbsence, onEditSuccess }) {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [dataKetidakhadiran, setDataKetidakhadiran] = useState();
  const [initialValues, setInitialValues] = useState(null); // Simpan data awal
  const { RangePicker } = DatePicker;
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://127.0.0.1:8000/api/userSession", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setDataKetidakhadiran(response.data.data.user);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedAbsence) {
      const isValidDate = (date) => date && dayjs(date).isValid();
  
      const initialData = {
        absence_code: selectedAbsence.absence_code,
        absence_type: selectedAbsence.absence_type,
        start_date: isValidDate(selectedAbsence.start_date) ? dayjs(selectedAbsence.start_date) : null,
        end_date: isValidDate(selectedAbsence.end_date) ? dayjs(selectedAbsence.end_date) : null,
        description: selectedAbsence.description,
      };
  
      form.setFieldsValue(initialData);
      setInitialValues(initialData);
    }
  }, [selectedAbsence, form]);
  

  const props = {
    name: "file",
    multiple: false, // Pastikan ini diatur ke false
    maxCount: 1, // Batasi jumlah file yang dapat diunggah menjadi 1
    fileList,
    onChange(info) {
      setFileList(info.fileList);
    },
    beforeUpload: () => false,
  };

  const handleSubmit = async (values) => {
    console.log("Raw Form values:", values);

    const formattedStartDate = values.start_date.format("YYYY-MM-DD HH:mm");
    const formattedEndDate = values.end_date.format("YYYY-MM-DD HH:mm");

    try {
      const formattedValues = {
        absence_code: values.absence_code,
        absence_type: values.absence_type,
        start_date: formattedStartDate,
        end_date: formattedEndDate,
        description: values.description,
      };

      const formData = new FormData();
      Object.keys(formattedValues).forEach((key) => {
        formData.append(key, formattedValues[key]);
      });

      if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append("document", fileList[0].originFileObj);
      }

      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://127.0.0.1:8000/api/absence/${selectedAbsence.id_absences}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      message.success("Pengajuan ketidakhadiran berhasil diperbarui!");
      setTimeout(() => {
        window.location.reload();
      }, 1000);

      form.resetFields();
      setErrorMessage(null); // Reset pesan error
      document.getElementById("modal13").close();
    } catch (error) {
      console.error("Error mengirim data:", error);
      if (error.response) {
        setErrorMessage(error.response.data.message || "Gagal mengirim data.");
      } else if (error.request) {
        setErrorMessage("Tidak ada response dari server.");
      } else {
        setErrorMessage("Terjadi kesalahan.");
      }
    }
  };

  const handleCloseModal = () => {
    if (initialValues) {
      form.setFieldsValue(initialValues); // Reset form ke data awal
      if (selectedAbsence.document) {
        setFileList([
          {
            uid: "-1",
            name: selectedAbsence.document,
            status: "done",
            url: selectedAbsence.document,
          },
        ]);
      } else {
        setFileList([]); // Reset fileList jika tidak ada dokumen
      }
    }
    setErrorMessage(null); // Reset pesan error saat modal ditutup
    document.getElementById("modal13").close();
  };

  const nowPlusOneHour = dayjs().add(1, 'hour');
  
  const disabledDate = (current) => {
    return current && current < dayjs().startOf('day');
  };
  
  const disabledDateTime = (current) => {
    if (current && current.isSame(dayjs(), 'day')) {
      return {
        disabledHours: () => Array.from({ length: nowPlusOneHour.hour() }, (_, i) => i),
        disabledMinutes: () => Array.from({ length: 60 }, (_, i) => i).filter(minute => minute < nowPlusOneHour.minute()),
      };
    }
    return {};
  };

  return (
    <dialog id="modal13" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={handleCloseModal} // Tambahkan event onClick
          >
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg text-center mb-10">Edit Pengajuan Ketidakhadiran</h3>
        <div>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            autoComplete="off"
          >
            <Form.Item
              label="Jenis Ketidakhadiran"
              name="absence_code"
              rules={[
                { required: true, message: "Jenis Ketidakhadiran wajib diisi!" },
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
              dependencies={['absence_code']}
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    const absenceCode = getFieldValue('absence_code');
                    if (['BT', 'DL', 'LP'].includes(absenceCode) && (!value || value.fileList.length === 0)) {
                      return Promise.reject(new Error('Berkas wajib diisi untuk jenis absensi ini!'));
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
            <Form.Item label="Keterangan" name="description">
              <Input.TextArea rows={4} />
            </Form.Item>
            {errorMessage && ( // Tampilkan pesan error jika ada
              <div className="mb-4 text-red-500 text-center">{errorMessage}</div>
            )}
            <div className="py-2 flex justify-center">
              <Space>
                <Button type="primary" htmlType="submit" className="w-[100px]">
                  Update
                </Button>
              </Space>
            </div>
          </Form>
        </div>
      </div>
    </dialog>
  );
}