import { useEffect, useState } from "react";
import { TimePicker, Form, Input, Button, Space, message } from "antd";
import axios from "axios";
import dayjs from "dayjs";

export default function FormPengajuanLembur({
  selectedAbsence,
  setSelectedAbsence,
  periode,
  setPeriode,
}) {
  const [form] = Form.useForm();
  const [dataLembur, setDataLembur] = useState();

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
        setDataLembur(response.data.data.user);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const resetForm = () => {
    form.resetFields();
  };

  useEffect(() => {
    const initialStartTime = dayjs().set('hour', 17).set('minute', 0).set('second', 0)

    form.setFieldsValue({ start_time: initialStartTime });
  }, [form]);

  const disabledTime = () => ({
    disabledHours: () => Array.from({ length: 10 }, (_, i) => i + 8),
    disabledMinutes: () => [],
    disabledSeconds: () => [],
  });

  const handleSubmit = async (values) => {
    const formattedValues = {
      ...values,
      start_time: values.start_time ? values.start_time.format("HH:mm") : null,
      end_time: values.end_time ? values.end_time.format("HH:mm") : null,
    };

    try {
      const token = localStorage.getItem("token");
      await axios.post("http://127.0.0.1:8000/api/overtime/create", formattedValues, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      message.success("Pengajuan lembur berhasil dikirim!");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      form.resetFields();
      document.getElementById("modal8").close();
    } catch (error) {
      console.error("Error mengirim data:", error);
      message.error(error.response?.data?.message || "Gagal mengirim data.");
    }
  };

  return (
    <dialog id="modal8" className="modal" onClose={resetForm}>
      <div className="modal-box min-h-[520px]" id="formPengajuanLemburContainer">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={resetForm}>
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg text-center mb-10">Form Pengajuan Lembur</h3>
        <div>
          <Form form={form} layout="vertical" style={{ maxWidth: 600 }} autoComplete="off" onFinish={handleSubmit}>
            <Form.Item name="start_time" label="Start Time">
              <TimePicker
                className="w-full max-w-s"
                getPopupContainer={() => document.getElementById("formPengajuanLemburContainer")}
                minuteStep={60}
                format="HH:mm"
                disabledTime={disabledTime}
                disabled
              />
            </Form.Item>
            <Form.Item name="end_time" label="End Time" rules={[{ required: true, message: "End Time wajib diisi!" }]}>
              <TimePicker
                className="w-full max-w-s"
                getPopupContainer={() => document.getElementById("formPengajuanLemburContainer")}
                minuteStep={60}
                format="HH:mm"
                disabledTime={disabledTime}
              />
            </Form.Item>
            <Form.Item label="Keterangan" name="description" rules={[{ required: true, message: "Keterangan wajib diisi!" }]}>
              <Input.TextArea placeholder="keterangan" rows={6} className="w-full max-w-s" />
            </Form.Item>
            <div className="py-2 flex justify-center">
              <Space>
                <Button type="primary" htmlType="submit" className="w-[100px]">Submit</Button>
              </Space>
            </div>
          </Form>
        </div>
      </div>
    </dialog>
  );
}
