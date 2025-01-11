import React from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
} from "antd";
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 14,
    },
  },
};
const FormGaji = () => {
  const [form] = Form.useForm();
  const variant = Form.useWatch("variant", form);
  return (
    <Form
      {...formItemLayout}
      form={form}
      variant={"outlined"}
      style={{
        maxWidth: 600,
      }}
    >
      <Form.Item
        label="Input"
        name="Input"
        rules={[
          {
            required: true,
            message: "Please input!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="InputNumber"
        name="InputNumber"
        rules={[
          {
            required: true,
            message: "Please input!",
          },
        ]}
      >
        <InputNumber
          style={{
            width: "100%",
          }}
        />
      </Form.Item>
      <Form.Item
        label="InputNumber"
        name="InputNumber"
        rules={[
          {
            required: true,
            message: "Please input!",
          },
        ]}
      >
        <InputNumber
          style={{
            width: "100%",
          }}
        />
      </Form.Item>
      <Form.Item
        label="InputNumber"
        name="InputNumber"
        rules={[
          {
            required: true,
            message: "Please input!",
          },
        ]}
      >
        <InputNumber
          style={{
            width: "100%",
          }}
        />
      </Form.Item>
      <Form.Item
        label="InputNumber"
        name="InputNumber"
        rules={[
          {
            required: true,
            message: "Please input!",
          },
        ]}
      >
        <InputNumber
          style={{
            width: "100%",
          }}
        />
      </Form.Item>

      

      <Form.Item
        wrapperCol={{
          offset: 17,
          span: 16,
        }}
        
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default FormGaji;
