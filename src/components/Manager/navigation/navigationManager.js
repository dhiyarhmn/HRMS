"use client";
import { Layout } from "antd";
import Image from "next/image";
import home from "@/public/home.png";
import cuti from "@/public/cuti.png";
import lembur from "@/public/lembur.png";
import gaji from "@/public/gaji.png";
import booking from "@/public/booking.png";
import { useState } from "react";

export default function NavigationManager() {
  const { Header } = Layout;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: "/Manager/home", icon: home, label: "Home" },
    { href: "/Manager/Ketidakhadiran", icon: cuti, label: "Ketidakhadiran" },
    { href: "/Manager/lembur", icon: lembur, label: "Lembur" },
    { href: "/Manager/gaji", icon: gaji, label: "Gaji" },
    { href: "/Manager/ruangan", icon: booking, label: "Ruangan" },
  ];

  return (
    <div className="w-full px-2 sm:px-4 justify-center flex">
      <Header
        className="justify-center flex mt-4 sm:mt-8 bg-transparent p-0 w-max items-center"
      >
        {/* Mobile Menu Button */}
        <button
          className="md:hidden fixed bottom-4 right-4 bg-third p-3 rounded-full shadow-lg z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>

        {/* Navigation Menu */}
        <div
          className={`${
            isMenuOpen ? "flex" : "hidden md:flex"
          } fixed md:relative bottom-16 md:bottom-0 left-2 right-2 md:left-auto md:right-auto w-max
                  flex-wrap md:flex-nowrap items-center h-auto md:gap-x-3 lg:gap-x-6 px-4 md:px-8 lg:px-12 py-4 
                  rounded-xl md:rounded-full bg-third border-2 border-black shadow-lg md:shadow-none z-40`}
        >
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="flex flex-col items-center justify-center text-black font-medium 
                       h-auto gap-y-1 cursor-pointer md:p-0
                        hover:bg-black/10 rounded-lg transition-colors w-max !px-2 !py-1"
            >
              <Image src={item.icon} className="w-5 h-5" alt={item.label} />
              <span className="text-xs sm:text-sm w-max">{item.label}</span>
            </a>
          ))}
        </div>
      </Header>
    </div>
  );
}
