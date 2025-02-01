"use client";
import React, { useState } from "react";
import BackBtn from "@/components/LoginPageComponents/backbutton";
import Image from "next/image";
import hrms from "@/public/hrms.gif";
import dihi from "@/public/logo-dihi.png";
import { Button, Form, Input, message } from "antd";
import { useRouter } from "next/navigation";
import { login } from "@/api/api";
import ContactPerson from "@/components/ContactPerson/contactPerson";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm(); // Form instance dari Ant Design
  const [messageApi, contextHolder] = message.useMessage({
    duration: 1,
    maxCount: 1,
  });

  const handleRedirect = (user, isFirstLogin) => {
    if (isFirstLogin) {
      router.push("/NewUser");
      return;
    }

    const role = user.role.toLowerCase();
    switch (role) {
      case "director":
        router.push("/Direktur/home");
        break;
      case "admin":
        router.push("/Admin/home");
        break;
      case "staff":
        router.push("/Staff/home");
        break;
      case "hrga":
        router.push("/HRGA/home");
        break;
      case "manager":
        router.push("/Manager/home");
        break;
      default:
        router.push("/login");
    }
  };

  const handleLogin = async (values) => {
    const { identifier, password } = values;

    setLoading(true);
    try {
      const response = await login(identifier, password);
      messageApi.success({
        content: response.message,
        duration: 1,
      });
      setTimeout(() => {
        handleRedirect(response.user, response.first_login);
      }, 1000);
    } catch (error) {
      messageApi.error({
        content: error.message,
        duration: 1,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !loading) {
      form.submit(); // Submit form saat tombol Enter ditekan
    }
  };

  return (
    <div className="min-h-screen bg-first">
      {contextHolder}
      <BackBtn
        onClick={() => router.push("/")}
        className="fixed top-4 left-4 z-10"
      />
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-4xl flex flex-col md:flex-row h-auto md:h-[500px] shadow-lg rounded-lg overflow-hidden">
          <div className="hidden md:flex md:w-1/2 md:h-full items-center justify-center bg-white relative">
            <Image
              src={hrms}
              className="object-cover w-80 h-w-80"
              alt="image"
              priority
              unoptimized
            />
          </div>

          <div className="w-full md:w-1/2 bg-second p-6 sm:p-8 md:p-12">
            <div className="flex justify-end mb-6">
              <Image src={dihi} className="w-10 sm:w-12" alt="logo" priority />
            </div>

            <div className="space-y-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8">
                Login
              </h1>

              <Form
                form={form}
                onFinish={handleLogin} // Submit form saat validasi berhasil
                layout="vertical"
              >
                <Form.Item
                  label="Username / Email"
                  name="identifier"
                  rules={[
                    {
                      required: true,
                      message: "Mohon masukkan username atau email!",
                    },
                  ]}
                >
                  <Input
                    placeholder="user123 / user@example.com"
                    disabled={loading}
                    onKeyPress={handleKeyPress}
                  />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Mohon masukkan password!" },
                  ]}
                >
                  <Input.Password
                    placeholder="********"
                    disabled={loading}
                    onKeyPress={handleKeyPress}
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    className="w-full h-10"
                  >
                    {loading ? "Loading..." : "Login"}
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
      <ContactPerson />
    </div>
  );
}
