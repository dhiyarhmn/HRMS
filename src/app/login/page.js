"use client";
import React from "react";
import Input from "@/components/input";
import Image from "next/image";
import satria from "@/public/satria.gif";
import dihi from "@/public/logo-dihi.png";
import { Button } from "antd";
import { useRouter } from "next/navigation";

export default function Login() {

  const router = useRouter();
  return (
    <div>
      <div className="flex w-full h-dvh justify-center items-center bg-first">
        <div className="flex w-1/2 h-1/2">
          <div className="flex w-1/2 bg-second rounded-l-lg">
            <Image src={satria} className="w-full h-full rounded-l-lg" alt="image"/>
          </div>
          <div className="flex flex-col w-1/2 h-auto p-12 gap-y-4 bg-second rounded-r-lg">
            <div className="flex w-full justify-end">
              <div className="flex items-center">
                <Image src={dihi} className="w-12" alt="logo"/>
              </div>
            </div>
            <span className="text-center font-bold text-3xl">
              Login
            </span>
            <Input className="flex flex-col" />
            <Button type="primary" onClick={() => router.push("/Karyawan/home")}>Login</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
