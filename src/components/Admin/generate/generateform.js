// generateform.js
import React from "react";
import {
  Form,
  Input,
  InputNumber,
  Mentions,
  Select,
  Cascader,
  TreeSelect,
  DatePicker,
  Button,
  Upload,
  message,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;
const { Dragger } = Upload;

// Props untuk Dragger (Upload CSV)
const uploadProps = {
  name: "file",
  multiple: true,
  action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
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

// Komponen Manual Form
export const ManualForm = () => (
  <Form
    labelCol={{ xs: { span: 24 }, sm: { span: 6 } }}
    wrapperCol={{ xs: { span: 24 }, sm: { span: 14 } }}
    style={{ width: "100%" }}
  >
    <Form.Item
      label="NIK"
      name="NIK"
      rules={[{ required: true, message: "Please input!" }]}
    >
      <InputNumber style={{ width: "100%" }} placeholder="****************"/>
    </Form.Item>

    <Form.Item
      label="Nama"
      name="Nama"
      rules={[{ required: true, message: "Please input!" }]}
    >
      <Input placeholder="John Doe"/>
    </Form.Item>

    <Form.Item
      label="Id Role"
      name="Id Role"
      rules={[{ required: true, message: "Please input!" }]}
    >
      <InputNumber style={{ width: "100%" }} placeholder="1"/>
    </Form.Item>

    <Form.Item
      label="Id Departemen"
      name="Id Departemen"
      rules={[{ required: true, message: "Please input!" }]}
    >
      <InputNumber style={{ width: "100%" }} placeholder="1"/>
    </Form.Item>

    <Form.Item
      label="Posisi"
      name="Posisi"
      rules={[
        {
          required: true,
          message: "Please input!",
        },
      ]}
    >
      <Select placeholder="Staff"/>
    </Form.Item>

    <Form.Item
      label="Gaji"
      name="Gaji"
      rules={[{ required: true, message: "Please input!" }]}
    >
      <InputNumber style={{ width: "100%" }} placeholder="1,000,000"/>
    </Form.Item>

    <Form.Item
      label="Tanggal Masuk"
      name="Tanggal Masuk"
      rules={[{ required: true, message: "Please input!" }]}
    >
      <DatePicker />
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 18, span: 18 }}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
);

// Komponen Upload CSV
export const UploadCSV = () => (
  <>
    <Form className="flex flex-col gap-y-8">
      <Dragger {...uploadProps}>
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
      <Form.Item className="flex w-full justify-end">
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  </>
);
