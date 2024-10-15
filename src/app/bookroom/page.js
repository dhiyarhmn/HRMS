"use client";
import Navigation from "@/components/navigation";
import Image from "next/image";
import dihi from "@/public/logo-dihi.png";
import Profile from "@/components/profile";
import room from "@/public/room-1.jpeg";
import RoomForm from "@/components/roomform";

export default function BookRoom() {
  const links = [
    { href: "#section1", text: "Section 1" },
    { href: "#section2", text: "Section 2" },
    { href: "#section3", text: "Section 3" },
  ];
  return (
    <div>
      <header>
        <div className="flex w-full h-20 items-center justify-between px-8 bg-yellow-300">
          <div className="flex justify-center items-center bg-white w-auto h-12 px-4 rounded-full">
            <Image src={dihi} className="w-12 h-12" />
            <p className="font-semibold">HR Management System</p>
          </div>
          <div className="flex justify-center items-center w-auto h-20 rounded-full">
            <Profile />
          </div>
        </div>
      </header>
      <Navigation
        links={links}
        headerBg="flex mt-8 bg-red-300"
        navigationBg="bg-green-300"
      />
      <section>
        <div className="flex flex-col w-full h-auto bg-slate-500 gap-y-8 mt-6 p-8">
          <div
            id="lantai1"
            className="flex w-full justify-evenly bg-yellow-300 p-4 rounded-lg"
          >
            <div className="card card-compact bg-base-100 w-1/6 shadow-xl">
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
            <div className="card card-compact bg-base-100 w-1/6 shadow-xl">
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
            <div className="card card-compact bg-base-100 w-1/6 shadow-xl">
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
            className="flex w-full justify-evenly bg-yellow-300 p-4 rounded-lg"
          >
            <div className="card card-compact bg-base-100 w-1/6 shadow-xl">
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
            <div className="card card-compact bg-base-100 w-1/6 shadow-xl">
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
            <div className="card card-compact bg-base-100 w-1/6 shadow-xl">
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
            <div className="card card-compact bg-base-100 w-1/6 shadow-xl">
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
