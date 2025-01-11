"use client";
import { Layout } from "antd";
import Image from "next/image";
import home from "@/public/home.png";
import cuti from "@/public/cuti.png";
import lembur from "@/public/lembur.png";
import gaji from "@/public/gaji.png";
import booking from "@/public/booking.png";

export default function NavigationStaff({ links, headerBg, navigationBg }) {
  const { Header } = Layout;

  return (
    <div>
      <Header
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
        className={`justify-center flex mt-8 bg-transparent`}
      >
        <div
          className={`flex items-center h-auto gap-x-12 px-12 py-2 rounded-full bg-third border-2 border-black`}
        >
          <a
            href="/Staff/home"
            className="flex flex-col items-center justify-center text-black font-medium w-12 h-auto gap-y-1 cursor-pointer"
          >
            <Image src={home} className="w-5 h-5" />
            <span className="text-sm">Home</span>
          </a>
          <a
            href="/Staff/cuti"
            className="flex flex-col items-center justify-center text-black font-medium w-12 h-auto gap-y-1 cursor-pointer"
          >
            <Image src={cuti} className="w-5 h-5" />
            <span className="text-sm">Cuti</span>
          </a>
          <a
            href="/Staff/lembur"
            className="flex flex-col items-center justify-center text-black font-medium w-12 h-auto gap-y-1 cursor-pointer"
          >
            <Image src={lembur} className="w-5 h-5" />
            <span className="text-sm">Lembur</span>
          </a>
          <a
            href="/Staff/ruangan"
            className="flex flex-col items-center justify-center text-black font-medium w-12 h-auto gap-y-1 cursor-pointer"
          >
            <Image src={booking} className="w-5 h-5" />
            <span className="text-sm">Ruangan</span>
          </a>
          <a
            href="/Staff/gaji"
            className="flex flex-col items-center justify-center text-black font-medium w-12 h-auto gap-y-1 cursor-pointer"
          >
            <Image src={gaji} className="w-5 h-5" />
            <span className="text-sm">Gaji</span>
          </a>
        </div>
      </Header>
    </div>
  );
}
