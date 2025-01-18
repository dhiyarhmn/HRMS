"use client";
import { roomServices } from "@/api/api";
import RoomForm from "@/components/Staff/ruangan/roomFormStaff";
import roomPic from "@/public/room-1.jpeg";
import { Card, Empty, Spin } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";
const { Meta } = Card;

const DaftarRuanganStaff = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await roomServices.getRooms();
        setRooms(response.data.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="bg-second p-4 rounded-lg">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {Array.isArray(rooms) && rooms.length > 0 ? (
          rooms.map((room) => (
            <Card
              key={room.id_room}
              hoverable
              cover={
                <div className="relative h-48">
                  <Image
                    src={roomPic}
                    alt={room.name}
                    fill
                    className="object-cover rounded-t-lg"
                    priority
                  />
                </div>
              }
              className="w-full h-full shadow-lg border-2 flex flex-col"
            >
              <Meta
                title={
                  <h3 className="text-lg font-semibold">{`Ruangan ${room.room_name}`}</h3>
                }
                description={
                  <div className="space-y-2 text-sm text-black">
                    <p>Kapasitas: {room.capacity}</p>
                    <p>Lokasi: {room.location}</p>
                    <p className="text-xs">
                      Tersedia: {room.available_from} - {room.available_to}
                    </p>
                  </div>
                }
              />
              <div className="mt-4">
                <RoomForm room={room} />
              </div>
            </Card>
          ))
        ) : (
          <div className="col-span-full">
            <Empty description="Tidak ada ruangan tersedia" className="my-8" />
          </div>
        )}
      </div>
    </div>
  );
};

export default DaftarRuanganStaff;
