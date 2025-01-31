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
      Object.entries(values).forEach(([key, value]) => {
        if (key === "start_work") {
          formData.append(key, value.format("YYYY-MM-DD"));
        } else {
          formData.append(key, value);
        }
      });

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
      className="w-full max-w-2xl mx-auto space-y-4"
      onFinish={onFinish}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Form.Item
          label="NIK"
          name="nik"
          rules={[{ required: true, message: "Please input NIK!" }]}
        >
          <InputNumber
            className="w-full"
            placeholder="Input NIK"
            controls={false}
          />
        </Form.Item>

        <Form.Item
          label="Nama"
          name="name"
          rules={[{ required: true, message: "Please input name!" }]}
        >
          <Input placeholder="Input nama lengkap" />
        </Form.Item>

        <Form.Item
          label="Role"
          name="id_role"
          rules={[{ required: true, message: "Please select role!" }]}
        >
          <Select placeholder="Pilih role">
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
          <Select placeholder="Pilih departemen">
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
          <Input placeholder="Input posisi" />
        </Form.Item>

        <Form.Item
          label="Gaji Dasar"
          name="basic_salary"
          rules={[{ required: true, message: "Please input salary!" }]}
        >
          <InputNumber
            className="w-full"
            placeholder="Input gaji dasar"
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

      <Form.Item className="flex justify-end mb-0">
        <Button type="primary" htmlType="submit" loading={loading}>
          Generate Account
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
    accept: ".csv",
    beforeUpload: (file) => {
      setUploadedFile(file);
      message.success(`${file.name} berhasil diunggah`);
      return false;
    },
    onRemove: () => {
      setUploadedFile(null);
      message.info("File unggahan telah dihapus");
    },
  };

  const handleImport = async () => {
    if (!uploadedFile) {
      message.error("Silakan unggah file terlebih dahulu");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", uploadedFile);
      await userServices.importUsers(formData);
      message.success("Akun berhasil dibuat dari file CSV");
      setUploadedFile(null);
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
    <div className="max-w-2xl mx-auto w-full space-y-6">
      <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
        <Dragger {...uploadProps}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined className="text-3xl text-blue-500" />
          </p>
          <p className="ant-upload-text text-base sm:text-lg font-medium">
            Klik atau seret file CSV ke area ini
          </p>
          <p className="ant-upload-hint text-sm text-gray-500 px-4 text-center">
            Hanya mendukung file CSV. Pastikan file memiliki format CSV
            yang sesuai.
          </p>
        </Dragger>
      </div>

      <div className="flex justify-end">
        <Button
          type="primary"
          onClick={handleImport}
          loading={loading}
          disabled={!uploadedFile}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};
