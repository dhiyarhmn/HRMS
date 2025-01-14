"use client";
import React, { useState } from "react";
import dihi from "@/public/logo-dihi.png";
import Image from "next/image";
import LoginButton from "@/components/LandingPageComponents/LoginButton/loginbutton";
import { Card } from "antd";
import { useRouter } from "next/navigation";
import bg1 from "@/public/bg-2.jpg";
import LandingCard from "@/components/LandingPageComponents/LandingCard/landingcard";

const { Meta } = Card;

export default function LandingPage() {
  const router = useRouter();
  const handleLogin = () => {
    router.push("/login");
  };
  return (
    <div
      className="flex flex-col min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `url(${bg1.src})`,
      }}
    >
      {/* Navbar */}
      <nav className="sticky top-0 w-full p-2 sm:p-4 z-50">
        <div className="flex bg-third shadow-md w-full h-14 sm:h-16 rounded-xl p-2 sm:p-4 justify-between items-center">
          <div className="flex w-auto sm:w-1/6 justify-start">
            <a href="/" className="flex items-center space-x-2">
              <Image
                src={dihi}
                className="w-8 h-8 sm:w-12 sm:h-12"
                alt="DIHI Logo"
              />
              <span className="font-semibold text-sm sm:text-base">HRMS</span>
            </a>
          </div>
          <div className="hidden sm:flex grow justify-center font-semibold">
            HR Management System
          </div>
          <div className="flex w-auto sm:w-1/6 justify-end">
            <LoginButton onClick={handleLogin} />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="w-full px-4 py-8 flex-grow flex items-center">
        <div className="flex flex-col items-center justify-center w-full">
          <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl text-center mb-8">
            Fitur yang Tersedia di HRMS
          </h1>

          <LandingCard />
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full px-2 sm:px-4">
        <div className="flex flex-col w-full py-4 sm:py-6 bg-third justify-center items-center rounded-t-xl shadow-md gap-y-2 sm:gap-y-4">
          <nav className="grid grid-cols-2 sm:grid-flow-col gap-4 sm:gap-8 text-sm sm:text-base font-semibold">
            <a className="link link-hover text-center">About Us</a>
            <a className="link link-hover text-center">Contact Us</a>
            <a className="link link-hover text-center">FAQ</a>
            <a className="link link-hover text-center">Privacy & Policy</a>
          </nav>
          <aside>
            <p className="font-light text-xs sm:text-sm text-center px-4">
              Hak Cipta © {new Date().getFullYear()} - All right reserved by PT
              Daekyung Indah Heavy Industry
            </p>
          </aside>
        </div>
      </footer>
    </div>
  );
}
