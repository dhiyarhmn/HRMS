"use client";
import Navbar from "@/components/Navbar/navbar";
import NavigationHRGA from "@/components/HRGA/navigation/navigationHRGA";
import Image from "next/image";
import dihi from "@/public/logo-dihi.png";
import { useState } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Calendar from "@/components/calendarLembur";
import Link from "next/link";

export default function CalendarPage() {
  return (
    <div>
      <Navbar href={"/HRGA/home"} p={"HRGA"} />
      <NavigationHRGA />
      <main className="flex-grow p-6 space-y-8"></main>
      <section>
        <div className="flex flex-col w-full h-auto gap-y-8 p-4">
          <div className="max-w-[84rem] mx-auto w-full p-4">
            <Link
              href="/HRGA/lembur"
              className="btn bg-second w-[100px] flex items-center gap-2 p-4 rounded-full"
            >
              <ArrowLeftOutlined />
              Back
            </Link>
            <h2 className="text-xl font-bold text-black text-center mb-6">
              Calendar Lembur Pegawai
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
