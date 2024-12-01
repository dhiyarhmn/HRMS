"use client";
import Navigation from "@/components/navigation";
import Profile from "@/components/profile";
import dihi from "@/public/logo-dihi.png";
import Image from "next/image";
import Carousel from "@/components/carousel";

export default function Home() {
  const links = [
    { href: "/Karyawan/home", text: "Home" },
    { href: "/Karyawan/cuti", text: "Cuti" },
    { href: "/Karyawan/lembur", text: "Lembur" },
    { href: "/Karyawan/ruangan", text: "Ruangan" },
    { href: "/Karyawan/gaji", text: "Gaji" },
  ];
  return (
    <div>
      <header>
        <div className="flex w-full h-20 items-center justify-between px-8 bg-first">
          <a
            href="/home"
            className="flex justify-center items-center w-auto h-12 px-4 rounded-full cursor-pointer"
          >
            <Image src={dihi} className="w-12 h-12" />
            <span className="font-semibold">HR Management System</span>
          </a>
          <div className="flex justify-center items-center w-auto h-20 rounded-full">
            <Profile />
          </div>
        </div>
      </header>
      <Navigation links={links} />
      <section>
        <div className="flex flex-col w-full h-[70dvh] gap-y-8 mt-6 p-8">
          <Carousel />
        </div>
      </section>
    </div>
  );
}
