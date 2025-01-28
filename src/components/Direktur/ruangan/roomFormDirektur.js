import React, { useState, useEffect } from "react";
import { Button, Modal, message, DatePicker } from "antd";
import Image from "next/image";
import roomPic from "@/public/room-1.jpeg";
import { bookingServices, roomServices } from "@/api/api";
import dayjs from "dayjs";

const RoomFormDirektur = ({ room, onBookingSuccess }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checked, setChecked] = useState({});
  const [bookingDate, setBookingDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bookedSlots, setBookedSlots] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      if (bookingDate && room.id_room) {
        try {
          const response = await roomServices.getListRoomBookings(room.id_room);
          if (response.data && response.data.bookings) {
            const selectedDate = dayjs(bookingDate).format("YYYY-MM-DD");

            // Filter bookings for selected date
            const dateBookings = response.data.bookings.filter(
              (booking) => booking.booking_date === selectedDate
            );

            // Extract all booked time slots for the selected date
            const bookedTimeSlots = dateBookings.flatMap((booking) =>
              booking.times.map((time) => ({
                start: time.start,
                end: time.end,
              }))
            );

            setBookedSlots(bookedTimeSlots);
          }
        } catch (error) {
          console.error("Error fetching bookings:", error);
          // Only show error message if it's not a 404 (no bookings found)
          if (error.response?.status !== 404) {
            message.error("Gagal mengambil data booking yang ada");
          }
        }
      }
    };

    fetchBookings();
  }, [bookingDate, room.id_room]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      setLoading(true);

      const selectedTimes = Object.entries(checked)
        .filter(([_, isSelected]) => isSelected)
        .map(([time]) => time);

      if (selectedTimes.length === 0) {
        message.error("Silakan pilih waktu peminjaman");
        return;
      }

      // Validasi slot waktu berurutan
      const timeSlots = selectedTimes.sort();
      for (let i = 1; i < timeSlots.length; i++) {
        const prevEndTime = timeSlots[i - 1].split(" - ")[1];
        const currentStartTime = timeSlots[i].split(" - ")[0];
        if (prevEndTime !== currentStartTime) {
          message.error("Silakan pilih slot waktu yang berurutan");
          return;
        }
      }

      const times = [];
      const firstTimeSlot = timeSlots[0].split(" - ");
      const lastTimeSlot = timeSlots[timeSlots.length - 1].split(" - ");

      times.push({
        start: firstTimeSlot[0],
        end: lastTimeSlot[1],
      });

      const bookingData = {
        id_room: room.id_room,
        booking_date: dayjs(bookingDate).format("YYYY-MM-DD"),
        times: times,
      };

      await bookingServices.createBooking(bookingData);

      message.success("Booking berhasil dibuat!");
      setIsModalOpen(false);
      setChecked({});
      setBookingDate(null);

      // Trigger refresh of booking table
      if (onBookingSuccess) {
        onBookingSuccess();
      }
    } catch (error) {
      message.error(error.response?.data?.message || "Gagal melakukan booking");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setChecked({});
    setBookingDate(null);
  };

  const handleCheckboxChange = (time) => {
    setChecked((prev) => ({
      ...prev,
      [time]: !prev[time],
    }));
  };

  const handleDateChange = (date) => {
    setBookingDate(date);
    setChecked({});
  };

  const generateSchedule = () => {
    const startHour = 8;
    const endHour = 17;
    const schedule = [];
    for (let hour = startHour; hour < endHour; hour++) {
      const startTime = `${String(hour).padStart(2, "0")}:00`;
      const endTime = `${String(hour + 1).padStart(2, "0")}:00`;
      schedule.push(`${startTime} - ${endTime}`);
    }
    return schedule;
  };

  const schedule = generateSchedule();

  const convertTimeToMinutes = (time) => {
    const [hours, minutes] = time.split(":");
    return parseInt(hours) * 60 + parseInt(minutes);
  };

  const isTimeSlotBooked = (timeSlot) => {
    const [slotStart, slotEnd] = timeSlot.split(" - ");

    return bookedSlots.some((bookedSlot) => {
      // Convert times to minutes for easier comparison
      const bookedStartMinutes = convertTimeToMinutes(bookedSlot.start);
      const bookedEndMinutes = convertTimeToMinutes(bookedSlot.end);
      const slotStartMinutes = convertTimeToMinutes(slotStart);
      const slotEndMinutes = convertTimeToMinutes(slotEnd);

      // Check for any overlap
      return (
        (slotStartMinutes >= bookedStartMinutes &&
          slotStartMinutes < bookedEndMinutes) ||
        (slotEndMinutes > bookedStartMinutes &&
          slotEndMinutes <= bookedEndMinutes) ||
        (slotStartMinutes <= bookedStartMinutes &&
          slotEndMinutes >= bookedEndMinutes)
      );
    });
  };

  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        className="rounded-full w-full sm:w-auto"
      >
        Book
      </Button>
      <Modal
        title="Detail Ruangan"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width="90%"
        maxWidth={900}
        className="responsive-modal"
        confirmLoading={loading}
      >
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 py-4 md:py-8">
          {/* Image Container */}
          <div className="w-full md:w-80 h-48 md:h-auto relative rounded-lg overflow-hidden">
            <Image
              src={roomPic}
              alt="Room"
              className="object-cover"
              fill
              sizes="(max-width: 768px) 100vw, 384px"
              priority
            />
          </div>

          {/* Form Container */}
          <div className="flex flex-col flex-grow">
            <p className="text-lg font-semibold mb-2">
              Ruangan {room.room_name}
            </p>
            <div className="mb-4 space-y-1">
              <p className="text-gray-600">Kapasitas: {room.capacity}</p>
              <p className="text-gray-600">Lokasi: {room.location}</p>
            </div>

            <div className="mb-6">
              <p className="font-medium mb-2">Pilih Tanggal Peminjaman:</p>
              <DatePicker
                onChange={handleDateChange}
                value={bookingDate}
                className="w-full"
                disabledDate={(current) => {
                  return current && current < dayjs().startOf("day");
                }}
              />
            </div>

            {bookingDate && (
              <>
                <div className="mb-4">
                  <p className="font-medium mb-2">Pilih Jadwal:</p>

                  {/* Legend */}
                  <div className="flex flex-wrap gap-4 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-100 border border-green-300"></div>
                      <span className="text-sm">Tersedia</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-red-100 border border-red-300"></div>
                      <span className="text-sm">Sudah Dibooking</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-blue-500"></div>
                      <span className="text-sm">Dipilih</span>
                    </div>
                  </div>

                  {/* Time Slots Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
                    {schedule.map((time, index) => {
                      const isBooked = isTimeSlotBooked(time);
                      return (
                        <label key={index} className="relative">
                          <input
                            type="checkbox"
                            checked={checked[time] || false}
                            onChange={() => handleCheckboxChange(time)}
                            disabled={isBooked}
                            className="hidden"
                          />
                          <div
                            className={`
                  w-full text-center p-2 rounded-lg text-sm sm:text-base
                  ${
                    isBooked
                      ? "bg-red-100 text-red-800 border border-red-300 cursor-not-allowed"
                      : checked[time]
                      ? "bg-blue-500 text-white border border-blue-600"
                      : "bg-green-100 text-green-800 border border-green-300 hover:bg-green-200 cursor-pointer"
                  }
                `}
                          >
                            {time}
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default RoomFormDirektur;