"use client";
import Navbar from "@/components/Navbar/navbar";
import NavigationManager from "@/components/Manager/navigation/navigationManager";
import Image from "next/image";
import dihi from "@/public/logo-dihi.png";
import { useState } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Calendar from "@/components/calendarKetidakhadiran";
import Link from "next/link";

export default function calendar() {
  return (
    <div>
      <Navbar href={"/Manager/home"} p={"Manager"} />
      <NavigationManager />
      <main className="flex-grow px-4 py-6 md:px-6 lg:px-8"></main>
      <section>
        <div className="flex flex-col w-full h-auto gap-y-8 p-4">
          <div className="max-w-[84rem] mx-auto w-full p-4">
            <Link
              href="/Manager/Ketidakhadiran"
              className="btn bg-second w-[100px] flex items-center gap-2 p-4 rounded-full"
            >
              <ArrowLeftOutlined />
              Back
            </Link>
            <h2 className="text-xl font-bold text-black text-center mb-6">
              Calendar Ketidakhadiran Pegawai
            </h2>
            <div className="bg-white rounded-xl shadow-md overflow-x-auto w-full">
              <div className="p-6">
                <div className="w-full overflow-x-auto">
                  <Calendar />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
