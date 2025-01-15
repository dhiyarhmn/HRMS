import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  InputNumber,
  Select,
  DatePicker,
  Button,
  Upload,
  message,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { userServices, roleServices, departmentServices } from "@/api/api";

const { Dragger } = Upload;

export const ManualForm = () => {
  const [form] = Form.useForm();
  const [roles, setRoles] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [rolesResponse, deptsResponse] = await Promise.all([
          roleServices.getRoles(),
          departmentServices.getDepartments(),
        ]);

        // Mengambil data dari nested response sesuai struktur API
        const rolesData = rolesResponse.data?.data || [];
        const deptsData = deptsResponse.data?.data || [];

        setRoles(rolesData);
        setDepartments(deptsData);
      } catch (error) {
        console.error("Error fetching data:", error);
        message.error("Failed to fetch form data");
      }
    };
    fetchData();
  }, []);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("nik", values.nik);
      formData.append("name", values.name);
      formData.append("id_role", values.id_role); // Menggunakan id_role sesuai response API
      formData.append("id_department", values.id_department); // Menggunakan id_department sesuai response API
      formData.append("position", values.position);
      formData.append("basic_salary", values.basic_salary);
      formData.append("start_work", values.start_work.format("YYYY-MM-DD"));

      await userServices.createUser(formData);
      message.success("Account generated successfully!");
      form.resetFields();
    } catch (error) {
      message.error(
        error.response?.data?.message || "Failed to generate account"
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <Form
      form={form}
      layout="vertical"
      className="w-full max-w-2xl mx-auto"
      onFinish={onFinish}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Form.Item
          label="NIK"
          name="nik"
          rules={[{ required: true, message: "Please input NIK!" }]}
        >
          <InputNumber className="w-full" placeholder="****************" />
        </Form.Item>

        <Form.Item
          label="Nama"
          name="name"
          rules={[{ required: true, message: "Please input name!" }]}
        >
          <Input placeholder="John Doe" />
        </Form.Item>

        <Form.Item
          label="Role"
          name="id_role"
          rules={[{ required: true, message: "Please select role!" }]}
        >
          <Select placeholder="Select role">
            {roles?.map((role) => (
              <Select.Option key={role.id_role} value={role.id_role}>
                {role.role_name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Departemen"
          name="id_department"
          rules={[{ required: true, message: "Please select department!" }]}
        >
          <Select placeholder="Select department">
            {departments?.map((dept) => (
              <Select.Option
                key={dept.id_department}
                value={dept.id_department}
              >
                {dept.department_name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Posisi"
          name="position"
          rules={[{ required: true, message: "Please input position!" }]}
        >
          <Input placeholder="Staff" />
        </Form.Item>

        <Form.Item
          label="Gaji Dasar"
          name="basic_salary"
          rules={[{ required: true, message: "Please input salary!" }]}
        >
          <InputNumber
            className="w-full"
            placeholder="1,000,000"
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          />
        </Form.Item>

        <Form.Item
          label="Tanggal Masuk Kerja"
          name="start_work"
          rules={[{ required: true, message: "Please select date!" }]}
          className="md:col-span-2"
        >
          <DatePicker className="w-full" />
        </Form.Item>
      </div>

      <Form.Item className="flex justify-end mt-6">
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export const UploadCSV = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadProps = {
    name: "file",
    multiple: false,
    accept: ".csv,.txt",
    beforeUpload: (file) => {
      setUploadedFile(file); // Simpan file ke state untuk diproses nanti
      message.success(`${file.name} berhasil diunggah`);
      return false; // Blokir unggahan otomatis
    },
    onRemove: () => {
      setUploadedFile(null); // Hapus file yang diunggah
      message.info("File unggahan telah dihapus");
    },
  };

  const handleSubmit = async () => {
    if (!uploadedFile) {
      message.error("Silakan unggah file terlebih dahulu");
      return;
    }

    const formData = new FormData();
    formData.append("file", uploadedFile);

    setLoading(true);
    try {
      await userServices.importUsers(formData);
      message.success("Akun berhasil dibuat dari file CSV");
      setUploadedFile(null); // Reset file setelah berhasil diproses
    } catch (error) {
      console.error("Error importing users:", error);
      message.error(
        error.response?.data?.message || "Gagal memproses file CSV"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto w-full">
      <Form className="space-y-6">
        <div className="w-full p-4 sm:p-6 border-2 border-dashed border-gray-300 rounded-lg">
          <Dragger {...uploadProps}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text text-base sm:text-lg">
              Klik atau seret file CSV/TXT ke area ini untuk mengunggah
            </p>
            <p className="ant-upload-hint text-sm px-4 text-center">
              Hanya mendukung file CSV atau TXT. Pastikan file Anda memiliki
              kolom yang diperlukan.
            </p>
          </Dragger>
        </div>

        <div className="flex justify-end">
          <Button
            type="primary"
            onClick={handleSubmit}
            loading={loading}
            disabled={!uploadedFile}
          >
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default UploadCSV;