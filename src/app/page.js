"use client";
import React, { useState } from "react";
import dihi from "@/public/logo-dihi.png";
import Image from "next/image";
import LoginButton from "@/components/LandingPageComponents/LoginButton/loginbutton";
import LandingCard from "@/components/LandingPageComponents/LandingCard/landingcard";
import booking from "@/public/booking.gif";
import absence from "@/public/absence.gif";
import salary from "@/public/salary.gif";
import bg1 from "@/public/bg-2.jpg";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  // Simulasi status login
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Ubah ini menjadi sistem autentikasi Anda

  const handleLogin = () => {
    router.push("/login");
  };

  const handleCardClick = (path) => {
    if (isLoggedIn) {
      router.push(path);
    } else {
      router.push("/login");
    }
  };

  return (
    <>
      <div
        className="flex flex-col w-full h-dvh bg-cover bg-center"
        style={{
          backgroundImage: `url(${bg1.src})`,
        }}
      >
        <nav className="flex grow-0 top-0 w-full h-auto p-4">
          <div className="flex bg-third shadow-md w-full h-16 rounded-xl p-4 justify-between items-center">
            <div className="flex grow-0 w-1/6 justify-start">
              <a href="/" className="flex items-center">
                <Image src={dihi} className="w-12 h-12" />
                <span className="font-semibold">HRMS</span>
              </a>
            </div>
            <div className="flex grow w-4/6 justify-center font-semibold">HR Management System</div>
            <div className="flex grow-0 w-1/6 justify-end">
              <LoginButton onClick={handleLogin} />
            </div>
          </div>
        </nav>
        <section className="flex flex-col h-full justify-center items-center w-full p-4">
          <p className="font-bold text-4xl">
            Fitur yang Tersedia di HRMS
          </p>
          <div className="flex justify-around w-full p-12">
            <div
              className="flex w-auto h-auto p-12 bg-first shadow-lg border-8 border-white rounded-s-badge rounded-br-badge cursor-pointer"
              onClick={() => handleCardClick("/cuti")}
            >
              <LandingCard
                title="Absensi & Cuti"
                description="Lorem ipsum dolor sit amet"
                imageUrl={absence}
              />
            </div>
            <div
              className="flex w-auto h-auto p-12 bg-second shadow-lg border-8 border-white rounded-badge cursor-pointer"
              onClick={() => handleCardClick("/ruangan")}
            >
              <LandingCard
                title="Booking Ruangan"
                description="Lorem ipsum dolor sit amet"
                imageUrl={booking}
                className={"w-72 h-96"}
              />
            </div>
            <div
              className="flex w-auto h-auto p-12 bg-third shadow-lg border-8 border-white rounded-e-badge rounded-tl-badge cursor-pointer"
              onClick={() => handleCardClick("/gaji")}
            >
              <LandingCard
                title="Slip Gaji"
                description="Lorem ipsum dolor sit amet"
                imageUrl={salary}
              />
            </div>
          </div>
        </section>
        <footer className="flex grow-0 bottom-0 w-full h-auto px-4">
          <div className="flex flex-col grow-0 bottom-0 w-full h-24 bg-third justify-center items-center rounded-t-xl shadow-md gap-y-4">
            <nav className="grid grid-flow-col gap-8 font-semibold">
              <a className="link link-hover">About Us</a>
              <a className="link link-hover">Contact Us</a>
              <a className="link link-hover">FAQ</a>
              <a className="link link-hover">Privacy & Policy</a>
            </nav>
            <aside>
              <p className="font-light">
                Hak Cipta © {new Date().getFullYear()} - All right reserved by
                PT Daekyung Indah Heavy Industry
              </p>
            </aside>
          </div>
        </footer>
      </div>
    </>
  );
}
