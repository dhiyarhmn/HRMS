"use client";
import React, { useState } from "react";
import BackBtn from "@/components/LoginPageComponents/backbutton";
import Image from "next/image";
import dihi from "@/public/logo-dihi.png";
import { useRouter } from "next/navigation";
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

export default function NewUser() {
  const router = useRouter();

  return (
    <div>
      <div className="flex w-full h-dvh justify-center items-center bg-first">
        <BackBtn
          onClick={() => router.push("/login")}
          className={"fixed top-0 left-0 mt-4 ml-4"}
        />
        <div className="flex w-1/2 h-auto">
          <div className="flex flex-col w-full h-auto p-12 gap-y-4 bg-second rounded-lg">
            <div className="flex w-full justify-end">
              <div className="flex items-center">
                <Image src={dihi} className="w-12" alt="logo" />
              </div>
            </div>
            <span className="text-center font-bold text-3xl">
              New User Registration
            </span>
            <Form
              labelCol={{ xs: { span: 24 }, sm: { span: 6 } }}
              wrapperCol={{ xs: { span: 24 }, sm: { span: 14 } }}
              style={{ width: "100%" }}
              className="mt-4 border-2 border-white p-4 rounded-lg"
            >
              <Form.Item
                label="NIK"
                name="NIK"
                rules={[{ required: true, message: "Please input!" }]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  placeholder="****************"
                />
              </Form.Item>

              <Form.Item
                label="Nama"
                name="Nama"
                rules={[{ required: true, message: "Please input!" }]}
              >
                <Input placeholder="John Doe" />
              </Form.Item>

              <Form.Item
                label="Id Role"
                name="Id Role"
                rules={[{ required: true, message: "Please input!" }]}
              >
                <InputNumber style={{ width: "100%" }} placeholder="1" />
              </Form.Item>

              <Form.Item
                label="Id Departemen"
                name="Id Departemen"
                rules={[{ required: true, message: "Please input!" }]}
              >
                <InputNumber style={{ width: "100%" }} placeholder="1" />
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
                <Select placeholder="Staff" />
              </Form.Item>

              <Form.Item
                label="Gaji"
                name="Gaji"
                rules={[{ required: true, message: "Please input!" }]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  placeholder="1,000,000"
                />
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
                  Register
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
