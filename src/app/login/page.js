"use client";
import React, { useState } from "react";
import BackBtn from "@/components/LoginPageComponents/backbutton";
import Input from "@/components/input";
import Image from "next/image";
import satria from "@/public/satria.gif";
import dihi from "@/public/logo-dihi.png";
import { Button, message } from "antd";
import { useRouter } from "next/navigation";
import { login } from "@/api/api";

export default function Login() {
  const router = useRouter();

  const [username, setUsername] = useState(""); // State untuk menyimpan email
  const [password, setPassword] = useState(""); // State untuk menyimpan password
  const [loading, setLoading] = useState(false); // State untuk mengontrol loading button

  // Mapping role ke halaman
  const roleRoutes = {
    admin: "/Admin/home",
    direktur: "/Direktur/home",
    hrga: "/Hrga/home",
    manager: "/Manager/home",
    staff: "/Staff/home",
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      // Panggil API login dengan username dan password
      const response = await login({ username, password });

      // Simpan token dan role ke localStorage
      localStorage.setItem("auth_token", response.data.token);
      const userRole = response.data.role;

      // Redirect berdasarkan role
      const redirectRoute = roleRoutes[userRole] || "/default-home";
      if (redirectRoute) {
        message.success("Login berhasil!");
        router.push(redirectRoute);
      } else {
        message.error("Role tidak dikenali!");
      }
    } catch (error) {
      // Error handling berdasarkan status
      if (error.message.includes("401")) {
        message.error("Username atau password salah.");
      } else if (error.message.includes("403")) {
        message.error("Akses ditolak! Hubungi administrator.");
      } else {
        message.error("Terjadi kesalahan. Coba lagi nanti.");
      }
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
                type="username"
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
            <Button type="primary" loading={loading} onClick={handleLogin}>
              {loading ? "Loading..." : "Login"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
