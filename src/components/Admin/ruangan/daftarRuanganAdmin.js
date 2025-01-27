import React, { useEffect, useState } from "react";
import RoomFormAdmin from "./roomFormAdmin";
import { Card, Empty, Spin, message } from "antd";
import Image from "next/image";
import roomPic from "@/public/room-1.jpeg";
import { roomServices } from "@/api/api";

const { Meta } = Card;

const DaftarRuanganAdmin = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const refreshRooms = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const response = await roomServices.getRooms();
        if (response.data && response.data.data) {
          setRooms(response.data.data);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
        message.error("Gagal mengambil data ruangan");
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [refreshTrigger]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spin size="large" />
      </div>
    );
  }

  const RoomCard = ({ room }) => (
    <Card
          key={room.id_room}
          hoverable
          className="w-[300px] flex-shrink-0 bg-third rounded-xl shadow-sm transition-all duration-200 hover:shadow-md"
          cover={
            <div className="relative h-48 rounded-t-xl overflow-hidden">
              <Image
                src={roomPic}
                alt={room.name}
                fill
                className="object-cover transition-transform duration-200 hover:scale-105"
                priority
              />
            </div>
          }
          bodyStyle={{ padding: "1.25rem" }}
        >
          <Meta
            title={
              <h3 className="text-lg font-semibold text-gray-900">
                {`Ruangan ${room.room_name}`}
              </h3>
            }
            description={
              <div className="space-y-3 mt-2">
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-600">Kapasitas</p>
                    <p className="text-sm text-gray-900">{room.capacity} orang</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-600">
                      Jam Operasional
                    </p>
                    <p className="text-sm text-gray-900">
                      {room.available_from} - {room.available_to}
                    </p>
                  </div>
                </div>
              </div>
            }
          />
          <div className="mt-4 pt-4 border-t border-gray-100">
        <RoomFormAdmin room={room} onBookingSuccess={refreshRooms} />
      </div>
    </Card>
  );

  return (
    <div className="relative">
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-6">
          {Array.isArray(rooms) && rooms.length > 0 ? (
            rooms.map((room) => <RoomCard key={room.id_room} room={room} />)
          ) : (
            <div className="w-full bg-white rounded-xl p-8 text-center">
              <Empty
                description={
                  <span className="text-gray-600">
                    Tidak ada ruangan tersedia
                  </span>
                }
                className="my-8"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DaftarRuanganAdmin;
