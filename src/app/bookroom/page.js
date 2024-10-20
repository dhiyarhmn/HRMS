"use client";
import Navigation from "@/components/navigation";
import Image from "next/image";
import dihi from "@/public/logo-dihi.png";
import Profile from "@/components/profile";
import room from "@/public/room-1.jpeg";
import RoomForm from "@/components/roomform";

export default function BookRoom() {
  const links = [
    { href: "/home", text: "Home" },
    { href: "/cuti", text: "Cuti" },
    { href: "/lembuer", text: "Lembur" },
    { href: "/bookroom", text: "Ruangan" },
    { href: "/gaji", text: "Gaji" },
  ];
  return (
    <div>
      <header>
        <div className="flex w-full h-20 items-center justify-between px-8 bg-first">
          <a href="/" className="flex justify-center items-center w-auto h-12 px-4 rounded-full cursor-pointer">
            <Image src={dihi} className="w-12 h-12" />
            <span className="font-semibold">HR Management System</span>
          </a>
          <div className="flex justify-center items-center w-auto h-20 rounded-full">
            <Profile />
          </div>
        </div>
      </header>
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
