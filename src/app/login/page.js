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

    // Redirect berdasarkan role
    const role = user.role.toLowerCase();
    switch (role) {
      case "Direktur":
        router.push("/Direktur/home");
        break;
      case "Admin":
        router.push("/Admin/home");
        break;
      case "Staff":
        router.push("/Staff/home");
        break;
      case "HRGA":
        router.push("/HRGA/home");
        break;
      case "Manager":
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

      // Tampilkan pesan dari server
      if (response.message) {
        message.success(response.message);
      }

      // Handle redirect
      handleRedirect(response.user, response.first_login);
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex w-full h-dvh justify-center items-center bg-first">
        <BackBtn
          onClick={() => router.push("/")}
          className={"fixed top-0 left-0 mt-4 ml-4"}
        />
        <div className="flex w-1/2 h-1/2">
          <div className="flex w-1/2 bg-second rounded-l-lg">
            <Image
              src={satria}
              className="w-full h-full rounded-l-lg"
              alt="image"
            />
          </div>
          <div className="flex flex-col w-1/2 h-auto p-12 gap-y-4 bg-second rounded-r-lg">
            <div className="flex w-full justify-end">
              <div className="flex items-center">
                <Image src={dihi} className="w-12" alt="logo" />
              </div>
            </div>
            <span className="text-center font-bold text-3xl">Login</span>
            <div className="flex flex-col">
              <label className="text-sm font-semibold">Username</label>
              <input
                type="text"
                className="p-2 border rounded text-sm"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="user123"
                disabled={loading}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold">Password</label>
              <input
                type="password"
                className="p-2 border rounded text-sm"
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
              className="w-full"
            >
              {loading ? "Loading..." : "Login"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
