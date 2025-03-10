"use client";
import React from "react";
import { Card } from "antd";
import Image from "next/image";
import booking from "@/public/booking.gif";
import absence from "@/public/absence.gif";
import overtime from "@/public/overtime.gif";
import approval from "@/public/approval.gif";
import salary from "@/public/salary.gif";
import generate from "@/public/generate.gif";
import { useRouter } from "next/navigation";

const { Meta } = Card;

export default function LandingCard() {
  const router = useRouter();

  const handleCardClick = (path) => {
    router.push(path);
  };

  const menuItems = [
    {
      title: "Ketidakhadiran",
      image: absence,
      path: "/login",
    },
    {
      title: "Lembur",
      image: overtime,
      path: "/login",
    },
    {
      title: "Booking Ruangan",
      image: booking,
      path: "/login",
    },
    {
      title: "E-Slip Gaji",
      image: salary,
      path: "/login",
    },
    {
      title: "Approval Booking",
      image: approval,
      path: "/login",
    },
    {
      title: "Generate Akun",
      image: generate,
      path: "/login",
    },
  ];
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full max-w-7xl">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`flex justify-center p-4 rounded-xl cursor-pointer transition-transform duration-300 hover:scale-105`}
            onClick={() => handleCardClick(item.path)}
          >
            <Card
              hoverable
              cover={
                <Image
                  alt={item.title}
                  src={item.image}
                  unoptimized
                  className="object-contain w-36 h-36 p-1"
                />
              }
              className="w-full max-w-xs transition-all duration-300 ease-in-out"
            >
              <Meta
                title={
                  <div className="text-center font-semibold">{item.title}</div>
                }
                description={
                  <div className="text-center">{item.description}</div>
                }
              />
            </Card>
          </div>
        ))}
      </div>
    </>
  );
}
