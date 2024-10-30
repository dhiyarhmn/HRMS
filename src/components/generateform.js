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
      label="Input"
      name="Input"
      rules={[{ required: true, message: "Please input!" }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="InputNumber"
      name="InputNumber"
      rules={[{ required: true, message: "Please input!" }]}
    >
      <InputNumber style={{ width: "100%" }} />
    </Form.Item>

    <Form.Item
      label="TextArea"
      name="TextArea"
      rules={[{ required: true, message: "Please input!" }]}
    >
      <Input.TextArea />
    </Form.Item>

    <Form.Item
      label="Mentions"
      name="Mentions"
      rules={[{ required: true, message: "Please input!" }]}
    >
      <Mentions />
    </Form.Item>

    <Form.Item
      label="Select"
      name="Select"
      rules={[{ required: true, message: "Please input!" }]}
    >
      <Select />
    </Form.Item>

    <Form.Item
      label="Cascader"
      name="Cascader"
      rules={[{ required: true, message: "Please input!" }]}
    >
      <Cascader />
    </Form.Item>

    <Form.Item
      label="TreeSelect"
      name="TreeSelect"
      rules={[{ required: true, message: "Please input!" }]}
    >
      <TreeSelect />
    </Form.Item>

    <Form.Item
      label="DatePicker"
      name="DatePicker"
      rules={[{ required: true, message: "Please input!" }]}
    >
      <DatePicker />
    </Form.Item>

    <Form.Item
      label="RangePicker"
      name="RangePicker"
      rules={[{ required: true, message: "Please input!" }]}
    >
      <RangePicker />
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
