"use client";
import React, { useState } from "react";
import BackBtn from "@/components/LoginPageComponents/backbutton";
import Image from "next/image";
import satria from "@/public/satria.gif";
import dihi from "@/public/logo-dihi.png";
import { Button, message } from "antd";
import { useRouter } from "next/navigation";
import { login } from "@/api/api";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

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
      message.error("Mohon isi semua field");
      return;
    }

    setLoading(true);
    try {
      const response = await login(username, password);
      if (response.message) {
        message.success(response.message);
      }
      handleRedirect(response.user, response.first_login);
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-first">
      <BackBtn
        onClick={() => router.push("/")}
        className="fixed top-4 left-4 z-10"
      />
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-4xl flex flex-col md:flex-row h-auto md:h-[500px] shadow-lg rounded-lg overflow-hidden">
          {/* Image Section - Hidden on mobile, visible on md and up */}
          <div className="hidden md:block md:w-1/2 bg-second relative">
            <Image
              src={satria}
              className="object-cover w-full h-full"
              alt="image"
              priority
              unoptimized
            />
          </div>

          {/* Login Form Section */}
          <div className="w-full md:w-1/2 bg-second p-6 sm:p-8 md:p-12">
            {/* Logo Container */}
            <div className="flex justify-end mb-6">
              <Image src={dihi} className="w-10 sm:w-12" alt="logo" priority />
            </div>

            {/* Login Form */}
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
                    placeholder="********"
                    disabled={loading}
                  />
                </div>

                <Button
                  type="primary"
                  loading={loading}
                  onClick={handleLogin}
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
