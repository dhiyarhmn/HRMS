import React from "react";
import { Card } from "antd";
import Image from "next/image";
import absence from "@/public/absence.gif";
import overtime from "@/public/overtime.gif";
import booking from "@/public/booking.gif";
import salary from "@/public/salary.gif";
import { useRouter } from "next/navigation";

const { Meta } = Card;

export default function HomeManager() {
  const router = useRouter();
  const handleCardClick = (path) => {
    router.push(path);
  };

  const menuItems = [
    {
      title: "Ketidakhadiran",
      image: absence,
      path: "/Manager/Ketidakhadiran",
      bgColor: "bg-first",
      rounded: "rounded-s-badge rounded-br-badge",
    },
    {
      title: "Lembur",
      image: overtime,
      path: "/Manager/lembur",
      bgColor: "bg-second",
      rounded: "rounded-badge",
    },
    {
      title: "Gaji",
      image: salary,
      path: "/Manager/gaji",
      bgColor: "bg-second",
      rounded: "rounded-badge",
    },
    {
      title: "Booking Ruangan",
      image: booking,
      path: "/Manager/ruangan",
      bgColor: "bg-second",
      rounded: "rounded-e-badge rounded-tl-badge",
    },
  ];
  return (
    <div className="w-full h-screen flex items-center justify-center px-4 py-8">
      <div className="flex flex-col items-center justify-center w-full max-w-4xl">
        <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl text-center mb-8">
          Silakan Pilih Fitur yang Tersedia
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 w-full">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className={`flex justify-center p-4 md:p-6 lg:p-8 ${item.bgColor} shadow-lg border-4 md:border-6 lg:border-8 border-white ${item.rounded} cursor-pointer transition-transform duration-300 hover:scale-105`}
              onClick={() => handleCardClick(item.path)}
            >
              <Card
                hoverable
                cover={
                  <Image
                    alt={item.title}
                    src={item.image}
                    unoptimized
                    className="object-contain w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 p-1"
                  />
                }
                className="w-full max-w-xs transition-all duration-300 ease-in-out divide-y-2"
              >
                <Meta
                  title={item.title}
                  className="text-center"
                />
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
