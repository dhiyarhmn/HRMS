"use client";
import Navbar from "@/components/navbar";
import Navigation from "@/components/navigation";
import RoomForm from "@/components/roomform";
import room from "@/public/room-1.jpeg";
import Image from "next/image";

export default function Ruangan() {
  const links = [
    { href: "/Staff/home", text: "Home" },
    { href: "/Staff/cuti", text: "Cuti" },
    { href: "/Staff/lembur", text: "Lembur" },
    { href: "/Staff/ruangan", text: "Ruangan" },
    
  ];
  return (
    <div>
      <Navbar />
      <Navigation
        links={links}
        headerBg="flex mt-8 bg-transparent"
        navigationBg="bg-third"
      />
      <section>
        <div className="flex flex-col w-full h-auto gap-y-8 mt-6 p-8">
          <div
            id="lantai1"
            className="flex w-full justify-evenly bg-second p-4 rounded-lg"
          >
            <div className="card card-compact bg-third w-1/6 shadow-xl text-black">
              <figure>
                <Image src={room} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">E101</h2>
                <p>Ruangan Rapat</p>
                <div className="card-actions justify-end">
                  <RoomForm />
                </div>
              </div>
            </div>
            <div className="card card-compact bg-third w-1/6 shadow-xl text-black">
              <figure>
                <Image src={room} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">E101</h2>
                <p>Ruangan Rapat</p>
                <div className="card-actions justify-end">
                  <RoomForm />
                </div>
              </div>
            </div>
            <div className="card card-compact bg-third w-1/6 shadow-xl text-black">
              <figure>
                <Image src={room} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">E101</h2>
                <p>Ruangan Rapat</p>
                <div className="card-actions justify-end">
                  <RoomForm />
                </div>
              </div>
            </div>
          </div>
          <div
            id="lantai2"
            className="flex w-full justify-evenly bg-second p-4 rounded-lg"
          >
            <div className="card card-compact bg-third w-1/6 shadow-xl text-black">
              <figure>
                <Image src={room} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">E101</h2>
                <p>Ruangan Rapat</p>
                <div className="card-actions justify-end">
                  <RoomForm />
                </div>
              </div>
            </div>
            <div className="card card-compact bg-third w-1/6 shadow-xl text-black">
              <figure>
                <Image src={room} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">E101</h2>
                <p>Ruangan Rapat</p>
                <div className="card-actions justify-end">
                  <RoomForm />
                </div>
              </div>
            </div>
            <div className="card card-compact bg-third w-1/6 shadow-xl text-black">
              <figure>
                <Image src={room} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">E101</h2>
                <p>Ruangan Rapat</p>
                <div className="card-actions justify-end">
                  <RoomForm />
                </div>
              </div>
            </div>
            <div className="card card-compact bg-third w-1/6 shadow-xl text-black">
              <figure>
                <Image src={room} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">E101</h2>
                <p>Ruangan Rapat</p>
                <div className="card-actions justify-end">
                  <RoomForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
