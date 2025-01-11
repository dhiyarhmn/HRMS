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
    console.log("Jadwal yang dipilih: ", checked);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setChecked({});
  };

  const handleCheckboxChange = (time) => {
    setChecked((prev) => ({
      ...prev,
      [time]: !prev[time],
    }));
  };

  // Membuat jadwal dari 08:00 hingga 16:00 dengan rentang 1 jam
  const generateSchedule = () => {
    const startHour = 8; // 08:00
    const endHour = 16; // 16:00
    const schedule = [];
    for (let hour = startHour; hour < endHour; hour++) {
      const startTime = `${String(hour).padStart(2, "0")}:00`;
      const endTime = `${String(hour + 1).padStart(2, "0")}:00`;
      schedule.push(`${startTime} - ${endTime}`);
    }
    return schedule;
  };

  const schedule = generateSchedule();

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
          <Image src={room} className="w-80 rounded-lg" alt="Room" />
          <div className="flex flex-col">
            <p>Nama Ruangan: E101</p>
            <p>
              Ketersediaan:{" "}
              <span className="font-bold text-green-500">Tersedia</span>
            </p>

            <div className="grid grid-cols-3 gap-4 mt-8">
              {schedule.map((time, index) => (
                <label key={index} className="relative">
                  <input
                    type="checkbox"
                    checked={checked[time] || false}
                    onChange={() => handleCheckboxChange(time)}
                    className="hidden"
                  />
                  <div
                    className={`w-full text-center cursor-pointer rounded-lg p-2 ${
                      checked[time]
                        ? "duration-300 bg-blue-600 text-white"
                        : "duration-300 bg-gray-200 text-black"
                    }`}
                  >
                    {time}
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
