"use client";
import React, { useState } from "react";
import BackBtn from "@/components/LoginPageComponents/backbutton";
import Image from "next/image";
import hrms from "@/public/hrms.gif"
import dihi from "@/public/logo-dihi.png";
import { Button, message } from "antd";
import { useRouter } from "next/navigation";
import { login } from "@/api/api";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Konfigurasi durasi message
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

  const handleLogin = async () => {
    if (!username || !password) {
      messageApi.error({
        content: "Mohon isi semua field",
        duration: 1,
      });
      return;
    }

    setLoading(true);
    try {
      const response = await login(username, password);
      messageApi.success({
        content: response.message,
        duration: 1,
      });
      // Tambahkan delay sebelum redirect
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

  // Handle keypress untuk tombol Enter
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !loading) {
      handleLogin();
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
          {/* Image Section */}
          <div className="hidden md:flex md:w-1/2 md:h-full items-center justify-center bg-white relative">
            <Image
              src={hrms}
              className="object-cover w-80 h-w-80"
              alt="image"
              priority
              unoptimized
            />
          </div>

          {/* Login Form Section */}
          <div className="w-full md:w-1/2 bg-second p-6 sm:p-8 md:p-12">
            <div className="flex justify-end mb-6">
              <Image src={dihi} className="w-10 sm:w-12" alt="logo" priority />
            </div>

            <div className="space-y-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8">
                Login
              </h1>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold block">
                    Username
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="user123"
                    disabled={loading}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold block">
                    Password
                  </label>
                  <input
                    type="password"
                    className="w-full p-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="********"
                    disabled={loading}
                  />
                </div>

                <Button
                  type="primary"
                  onClick={handleLogin}
                  loading={loading}
                  className="w-full h-10"
                >
                  {loading ? "Loading..." : "Login"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
