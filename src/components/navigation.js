"use client";
import { Layout } from "antd";
import Image from "next/image";
import dihi from "../public/logo-dihi.png"; // Sesuaikan path ke /public

export default function Navigation({ links, headerBg, navigationBg }) {
  const { Header } = Layout;

  return (
    <div>
      <Header
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
        className={`justify-center ${headerBg || "bg-none"}`}
      >
        <div
          className={`flex items-center h-auto gap-x-8 px-12 rounded-full ${
            navigationBg || "bg-white"
          }`}
        >
          {/* Logo */}
          <div className="demo-logo">
            <Image
              src={dihi}
              alt="logo"
              style={{ marginRight: 16 }}
              className="h-10 w-10"
            />
          </div>

          {/* Links */}
          {links.map((link, index) => (
            <a key={index} href={link.href} className="text-black">
              {link.text}
            </a>
          ))}

          {/* Get Started Button */}
          <a
            aria-describedby="get-started"
            className="flex items-center justify-center w-auto px-6 py-2.5 text-center text-white duration-200 bg-[#027D01] border-2 border-black rounded-full hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black"
            href="/dashboard"
          >
            Get Started
          </a>
        </div>
      </Header>
    </div>
  );
}
