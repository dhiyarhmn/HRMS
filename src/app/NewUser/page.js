"use client";
import React, { useState, useEffect } from "react";
import BackBtn from "@/components/LoginPageComponents/backbutton";
import Image from "next/image";
import dihi from "@/public/logo-dihi.png";
import { useRouter } from "next/navigation";
import { Form, Input, Select, DatePicker, Button, message } from "antd";
import { employeeServices } from "@/api/api";

export default function NewUser() {
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isProfileCompleted, setIsProfileCompleted] = useState(false);

  useEffect(() => {
    // Fetch current user data to check if profile is already completed
    const currentUser = JSON.parse(localStorage.getItem("user"));
    if (currentUser?.isProfileCompleted) {
      setIsProfileCompleted(true);
      form.setFieldsValue({
        name: currentUser.name,
        phone: currentUser.phone,
        gender: currentUser.gender,
        date_of_birth: currentUser.date_of_birth,
      });
    }
  }, [form]);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const currentUser = JSON.parse(localStorage.getItem("user"));

      const userData = {
        ...values,
        position: currentUser.role, // Automatically set position based on role
        date_of_birth: values.date_of_birth.format("YYYY-MM-DD"),
      };

      const response = await employeeServices.completeNewUserProfile(userData);

      if (response.success) {
        message.success("Profile updated successfully");
        localStorage.setItem(
          "user",
          JSON.stringify({ ...currentUser, isProfileCompleted: true })
        );

        // Wait for the message to disappear before redirecting
        setTimeout(() => {
          const homeRoute = employeeServices.getHomeRoute(currentUser.role);
          router.push(homeRoute);
        }, 2000); // Delay for 2 seconds
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      message.error(error.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

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
              Complete Your Profile
            </span>
            <Form
              form={form}
              labelCol={{ xs: { span: 24 }, sm: { span: 6 } }}
              wrapperCol={{ xs: { span: 24 }, sm: { span: 14 } }}
              style={{ width: "100%" }}
              className="mt-4 border-2 border-white p-4 rounded-lg"
              onFinish={onFinish}
            >
              <Form.Item
                label="Nama Lengkap"
                name="name"
                rules={[{ required: true, message: "Please input your name!" }]}
              >
                <Input placeholder="John Doe" disabled={isProfileCompleted} />
              </Form.Item>

              <Form.Item
                label="No HP"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Input
                  placeholder="081234567890"
                  disabled={isProfileCompleted}
                />
              </Form.Item>

              <Form.Item
                label="Jenis Kelamin"
                name="gender"
                rules={[
                  { required: true, message: "Please select your gender!" },
                ]}
              >
                <Select
                  placeholder="Select gender"
                  disabled={isProfileCompleted}
                >
                  <Select.Option value="male">Male</Select.Option>
                  <Select.Option value="female">Female</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Tanggal Lahir"
                name="date_of_birth"
                rules={[
                  {
                    required: true,
                    message: "Please select your date of birth!",
                  },
                ]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  format="YYYY-MM-DD"
                  disabled={isProfileCompleted}
                />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 18, span: 18 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  disabled={isProfileCompleted}
                >
                  {isProfileCompleted ? "Profile Completed" : "Submit"}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
