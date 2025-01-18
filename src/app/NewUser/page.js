"use client";
import React, { useState, useEffect } from "react";
import BackBtn from "@/components/LoginPageComponents/backbutton";
import Image from "next/image";
import dihi from "@/public/logo-dihi.png";
import { useRouter } from "next/navigation";
import { Form, Input, Select, DatePicker, Button, message } from "antd";
import { employeeServices } from "@/api/api";
import dayjs from "dayjs";

export default function NewUser() {
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isProfileCompleted, setIsProfileCompleted] = useState(false);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    if (currentUser?.isProfileCompleted) {
      setIsProfileCompleted(true);
      // Set form values from existing data
      form.setFieldsValue({
        name: currentUser.name,
        phone: currentUser.phone,
        gender: currentUser.gender,
        date_of_birth: currentUser.date_of_birth
          ? dayjs(currentUser.date_of_birth)
          : null,
      });
    }
  }, [form]);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const currentUser = JSON.parse(localStorage.getItem("user"));

      if (!currentUser) {
        message.error("User data not found. Please login again.");
        router.push("/login");
        return;
      }

      const userData = {
        name: values.name,
        phone: values.phone,
        gender: values.gender,
        date_of_birth: values.date_of_birth.format("YYYY-MM-DD"),
      };

      console.log("Submitting data:", userData);

      const response = await employeeServices.completeNewUserProfile(userData);

      if (response.success) {
        message.success({
          content: "Profile updated successfully!",
          duration: 2,
        });

        // Redirect sesuai role
        const homeRoute = employeeServices.getHomeRoute(currentUser.role);
        console.log("Redirecting to:", homeRoute);
        router.push(homeRoute);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      message.error(error.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-first">
      <div className="flex flex-col items-center justify-center px-4 py-8 md:py-12">
        <BackBtn
          onClick={() => router.push("/login")}
          className="absolute top-4 left-4 z-10"
        />

        <div className="w-full max-w-4xl mx-auto">
          <div className="bg-second rounded-lg shadow-lg p-4 md:p-8 lg:p-12">
            <div className="flex justify-end mb-4">
              <div className="relative w-8 md:w-12">
                <Image src={dihi} alt="logo" className="w-full h-auto" />
              </div>
            </div>

            <h1 className="text-center font-bold text-2xl md:text-3xl mb-6">
              Complete Your Profile
            </h1>

            <Form
              form={form}
              onFinish={onFinish}
              className="w-full border-2 border-white p-4 rounded-lg"
              layout="vertical"
            >
              <div className="space-y-4">
                <Form.Item
                  label="Nama Lengkap"
                  name="name"
                  rules={[
                    { required: true, message: "Please input your name!" },
                    { max: 255, message: "Name cannot exceed 255 characters!" },
                  ]}
                >
                  <Input
                    placeholder="John Doe"
                    disabled={isProfileCompleted}
                    className="w-full"
                  />
                </Form.Item>

                <Form.Item
                  label="No HP"
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: "Please input your phone number!",
                    },
                    {
                      max: 15,
                      message: "Phone number cannot exceed 15 characters!",
                    },
                    {
                      pattern: /^(\+62|62|0)[0-9]{9,12}$/,
                      message: "Please input a valid Indonesian phone number!",
                    },
                  ]}
                >
                  <Input
                    placeholder="081234567890"
                    disabled={isProfileCompleted}
                    className="w-full"
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
                    className="w-full"
                  >
                    <Select.Option value="male">Pria</Select.Option>
                    <Select.Option value="female">Wanita</Select.Option>
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
                    className="w-full"
                  />
                </Form.Item>

                <Form.Item className="flex justify-end mt-6">
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    disabled={isProfileCompleted}
                    className="w-full md:w-auto"
                  >
                    {isProfileCompleted ? "Profile Completed" : "Submit"}
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
