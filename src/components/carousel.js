import React from "react";
import { Carousel } from "antd";
import dihi from "@/public/logo-dihi.png";
import Image from "next/image";

const App = () => (
  <Carousel arrows infinite adaptiveHeight draggable className="bg-first rounded-2xl p-8">
    <div className="flex justify-center items-center w-full h-[60dvh] bg-red-300 p-4 rounded-xl">
      <div className="flex justify-center items-center h-full w-full gap-x-8">
        <Image src={dihi} className="bg-white rounded-xl shadow-xl border-4 border-black"/>
        <span className="font-medium text-lg w-1/2 text-justify bg-white p-4 rounded-xl shadow-xl border-2 border-black">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium dolorum consequatur expedita! Officia ab ea, nihil blanditiis incidunt nulla quibusdam nostrum repellendus corrupti deleniti soluta similique suscipit illo temporibus dicta.</span>
      </div>
    </div>
    <div className="flex justify-center items-center w-full h-[60dvh] bg-yellow-300 p-4 rounded-xl">
      <div className="flex justify-center items-center w-full h-full gap-x-8">
        <Image src={dihi} className="bg-white rounded-xl shadow-xl border-4 border-black"/>
        <span data-tip="test" className="tooltip font-medium text-lg w-1/2 text-justify bg-white p-4 rounded-xl shadow-xl border-2 border-black">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium dolorum consequatur expedita! Officia ab ea, nihil blanditiis incidunt nulla quibusdam nostrum repellendus corrupti deleniti soluta similique suscipit illo temporibus dicta.</span>
      </div>
    </div>
    <div className="flex justify-center items-center w-full h-[60dvh] bg-blue-300 p-4 rounded-xl">
      <div className="flex justify-center items-center w-full h-full gap-x-8">
        <Image src={dihi} className="bg-white rounded-xl shadow-xl border-4 border-black"/>
        <span className="font-medium text-lg w-1/2 text-justify bg-white p-4 rounded-xl shadow-xl border-2 border-black">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium dolorum consequatur expedita! Officia ab ea, nihil blanditiis incidunt nulla quibusdam nostrum repellendus corrupti deleniti soluta similique suscipit illo temporibus dicta.</span>
      </div>
    </div>
    <div className="flex justify-center items-center w-full h-[60dvh] bg-green-300 p-4 rounded-xl">
      <div className="flex justify-center items-center w-full h-full gap-x-8">
        <Image src={dihi} className="bg-white rounded-xl shadow-xl border-4 border-black"/>
        <span className="font-medium text-lg w-1/2 text-justify bg-white p-4 rounded-xl shadow-xl border-2 border-black">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium dolorum consequatur expedita! Officia ab ea, nihil blanditiis incidunt nulla quibusdam nostrum repellendus corrupti deleniti soluta similique suscipit illo temporibus dicta.</span>
      </div>
    </div>
  </Carousel>
);
export default App;
