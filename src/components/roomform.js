import React, { useState } from "react";
import { Button, Modal } from "antd";
import Image from "next/image";
import room from "@/public/room-1.jpeg";

const RoomForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checked, setChecked] = useState({});
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    console.log("Checked: ", checked);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setChecked({});
    
  };
  const handleCheckboxChange = (index) => {
    setChecked((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  return (
    <>
      <Button type="primary" onClick={showModal} className="rounded-full">
        Book
      </Button>
      <Modal
        title="Detail Ruangan"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={900}
      >
        <div className="flex gap-x-8 py-8">
          <Image src={room} className="w-80 rounded-lg" />
          <div className="flex flex-col">
            <p>Nama Ruangan: E101</p>
            <p>Ketersediaan: <span className="font-bold text-green-500">Tersedia</span></p>

            <div className="grid grid-cols-5 grid-rows-5 gap-4 mt-8">
              {Array.from({ length: 11 }, (_, index) => (
                <label key={index} className="relative">
                  <input
                    type="checkbox"
                    checked={checked[index] || false}
                    onChange={() => handleCheckboxChange(index)}
                    className="hidden"
                  />
                  <div
                    className={`w-20 text-center cursor-pointer rounded-lg p-2 ${
                      checked[index]
                        ? "duration-300 bg-blue-600 text-white"
                        : "duration-300 bg-gray-200 text-black"
                    }`}
                  >
                    {index + 1}
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default RoomForm;
