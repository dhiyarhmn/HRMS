import { useEffect, useState } from "react";
import { TimePicker, InputNumber, Form, Input, Button, Space } from "antd";

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

export default function FormPengajuanLembur({
  selectedAbsensi,
  setSelectedAbsensi,
  periode,
  setPeriode,
}) {
  const [form] = Form.useForm();

  const disabledTime = () => ({
    disabledHours: () => {
      const disabled = [];
      for (let i = 8; i < 17; i++) {
        disabled.push(i);
      }
      return disabled;
    },
    disabledMinutes: () => [],
    disabledSeconds: () => [],
  });

  const onChange = (value) => {
    setSelectedAbsensi(value);
    console.log("Total Hour:", value);
  };

  return (
    <dialog id="modal8" className="modal">
      <div className="modal-box" id="formPengajuanLemburContainer">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg text-center">Form Pengajuan Lembur</h3>
        <div className="py-4">
          <Form
            form={form}
            layout="vertical"
            style={{ maxWidth: 600 }}
            autoComplete="off"
          >
            <Form.Item label="NIK">
              <Input placeholder="345" disabled />
            </Form.Item>
            <Form.Item label="Nama">
              <Input placeholder="Satria Bintang" disabled />
            </Form.Item>
            <Form.Item label="Departemen">
              <Input placeholder="Accounting" disabled />
            </Form.Item>
            <Form.Item label="Jabatan">
              <Input placeholder="Staff" disabled />
            </Form.Item>
            <Form.Item
              name="startTime"
              label="Start Time"
              rules={[
                { required: true, message: "Start Time wajib diisi!" },
              ]}
            >
              <TimePicker
                className="w-full max-w-s"
                onChange={(value) => console.log("Start Time:", value)}
                getPopupContainer={() =>
                  document.getElementById("formPengajuanLemburContainer")
                }
                minuteStep={60}
                format="HH:mm"
                disabledTime={disabledTime}
              />
            </Form.Item>
            <Form.Item
              name="endTime"
              label="End Time"
              rules={[
                { required: true, message: "End Time wajib diisi!" },
              ]}
            >
              <TimePicker
                className="w-full max-w-s"
                onChange={(value) => console.log("End Time:", value)}
                getPopupContainer={() =>
                  document.getElementById("formPengajuanLemburContainer")
                }
                minuteStep={60}
                format="HH:mm"
                disabledTime={disabledTime}
              />
            </Form.Item>
            <Form.Item
              name="totalHour"
              label="Total Hour"
              rules={[
                { required: true, message: "Total Hour wajib diisi!" },
              ]}
            >
              <InputNumber
                min={1}
                max={14}
                value={selectedAbsensi || undefined}
                onChange={onChange}
                placeholder="Select hours"
                className="w-full max-w-s"
              />
            </Form.Item>
            <Form.Item>
              <Space>
                <SubmitButton form={form}>Submit</SubmitButton>
                <Button htmlType="reset" onClick={() => form.resetFields()}>
                  Reset
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </div>
    </dialog>
  );
}
