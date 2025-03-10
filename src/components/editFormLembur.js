import { useEffect, useState } from "react";
import {
  TimePicker,
  Form,
  Input,
  Button,
  Space,
  message,
} from "antd";
import axios from "axios";
import dayjs from "dayjs";

export default function EditFormLembur({
  selectedOvertime,
  onEditSuccess,
}) {
  const [form] = Form.useForm();
  const [initialValues, setInitialValues] = useState(null); // Simpan data awal

  useEffect(() => {
    if (selectedOvertime) {
      const startTime = dayjs(selectedOvertime.start_time, "HH:mm");
      const endTime = dayjs(selectedOvertime.end_time, "HH:mm");

      const initialData = {
        start_time: startTime,
        end_time: endTime,
        description: selectedOvertime.description,
      };

      form.setFieldsValue(initialData); // Set nilai awal form
      setInitialValues(initialData); // Simpan data awal
    }
  }, [selectedOvertime, form]);

  const disabledTime = () => ({
    disabledHours: () => {
      const disabled = [];
      for (let i = 8; i < 18; i++) {
        disabled.push(i);
      }
      return disabled;
    },
    disabledMinutes: () => [],
    disabledSeconds: () => [],
  });

  const handleSubmit = async (values) => {
    console.log("Raw Form values:", values);

    const formattedValues = {
      ...values,
      start_time: values.start_time ? values.start_time.format("HH:mm") : null,
      end_time: values.end_time ? values.end_time.format("HH:mm") : null,
    };

    console.log("Formatted values:", formattedValues);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://127.0.0.1:8000/api/overtime/update/${selectedOvertime.id_overtime}`,
        formattedValues,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      message.success("Pengajuan lembur berhasil diperbarui!");
      setTimeout(() => {
        window.location.reload();
      }, 1000);

      onEditSuccess(response.data.data);
      form.resetFields();
      document.getElementById("modal12").close();
    } catch (error) {
      console.error("Error mengirim data:", error);
      if (error.response) {
        message.error(
          `${error.response.data.message || "Gagal mengirim data."}`
        );
      } else if (error.request) {
        message.error("Tidak ada response dari server.");
      } else {
        message.error("Terjadi kesalahan.");
      }
    }
  };

  const handleCloseModal = () => {
    if (initialValues) {
      form.setFieldsValue(initialValues); // Reset form ke data awal
    }
    document.getElementById("modal12").close();
  };

  return (
    <dialog id="modal12" className="modal">
      <div className="modal-box min-h-[520px]" id="editFormPengajuanLemburContainer">
        <form method="dialog">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={handleCloseModal}
          >
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg text-center mb-10">
          Edit Form Pengajuan Lembur
        </h3>
        <div>
          <Form
            form={form}
            layout="vertical"
            style={{ maxWidth: 600 }}
            autoComplete="off"
            onFinish={handleSubmit}
          >
            <Form.Item name="start_time" label="Start Time">
              <TimePicker
                className="w-full max-w-s"
                getPopupContainer={() =>
                  document.getElementById("editFormPengajuanLemburContainer")
                }
                minuteStep={60}
                format="HH:mm"
                disabledTime={disabledTime}
                disabled
              />
            </Form.Item>
            <Form.Item
              name="end_time"
              label="End Time"
              rules={[{ required: true, message: "End Time wajib diisi!" }]}
            >
              <TimePicker
                className="w-full max-w-s"
                
                getPopupContainer={() =>
                  document.getElementById("editFormPengajuanLemburContainer")
                }
                minuteStep={60}
                format="HH:mm"
                disabledTime={disabledTime}
              />
              
            </Form.Item>
            <Form.Item
              label="Keterangan"
              name="description"
              rules={[{ required: true, message: "Keterangan wajib diisi!" }]}
            >
              <Input.TextArea
                placeholder="keterangan"
                rows={6}
                className="w-full max-w-s"
              />
            </Form.Item>

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