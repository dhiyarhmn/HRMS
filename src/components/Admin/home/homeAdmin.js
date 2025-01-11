import React from "react";
import { Card } from "antd";
import Image from "next/image";
import absence from "@/public/absence.gif";
import approval from "@/public/approval.gif";
import salary from "@/public/salary.gif";
import { useRouter } from "next/navigation";
import generate from "@/public/generate.gif";

const { Meta } = Card;

export default function HomeAdmin() {
  const router = useRouter();
  const handleCardClick = (path) => {
    router.push(path);
  };
  return (
    <div>
      <div className="flex flex-col h-full justify-center items-center w-full p-8">
        <p className="font-bold text-4xl">Silakan Pilih Fitur yang Tersedia</p>
        <div className="flex justify-center w-full p-12 gap-4">
          <div
            className="flex w-auto h-auto p-12 bg-first shadow-lg border-8 border-white rounded-s-badge rounded-br-badge cursor-pointer"
            onClick={() => handleCardClick("/cuti")}
          >
            <Card
              hoverable
              cover={
                <Image
                  alt="example"
                  src={absence}
                  unoptimized
                  className="object-contain w-40 h-40 p-1"
                />
              }
              className={`w-60 h-auto hover:scale-110 transition-all duration-300 ease-in-out divide-y-2`}
            >
              <Meta
                title="Absensi & Cuti"
                description="Lorem ipsum dolor sit amet"
              />
            </Card>
          </div>
          <div
            className="flex w-auto h-auto p-12 bg-third shadow-lg border-8 border-white rounded-e-badge rounded-tl-badge cursor-pointer"
            onClick={() => handleCardClick("/Admin/gaji")}
          >
            <Card
              hoverable
              cover={
                <Image
                  alt="example"
                  src={salary}
                  unoptimized
                  className="object-contain w-40 h-40 p-1"
                />
              }
              className={`w-60 h-auto hover:scale-110 transition-all duration-300 ease-in-out divide-y-2`}
            >
              <Meta title="Gaji" description="Lorem ipsum dolor sit amet" />
            </Card>
          </div>
          <div
            className="flex w-auto h-auto p-12 bg-second shadow-lg border-8 border-white rounded-s-badge rounded-br-badge cursor-pointer"
            onClick={() => handleCardClick("/Admin/approval")}
          >
            <Card
              hoverable
              cover={
                <Image
                  alt="example"
                  src={approval}
                  unoptimized
                  className="object-contain w-40 h-40 p-1"
                />
              }
              className={`w-60 h-auto hover:scale-110 transition-all duration-300 ease-in-out divide-y-2`}
            >
              <Meta title="Approval" description="Lorem ipsum dolor sit amet" />
            </Card>
          </div>
          <div
            className="flex w-auto h-auto p-12 bg-first shadow-lg border-8 border-white rounded-e-badge rounded-tl-badge cursor-pointer"
            onClick={() => handleCardClick("/Admin/generate")}
          >
            <Card
              hoverable
              cover={
                <Image
                  alt="example"
                  src={generate}
                  unoptimized
                  className="object-contain w-40 h-40 p-1"
                />
              }
              className={`w-60 h-auto hover:scale-110 transition-all duration-300 ease-in-out divide-y-2`}
            >
              <Meta title="Generate" description="Lorem ipsum dolor sit amet" />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
