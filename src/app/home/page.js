"use client";
import Navigation from "@/components/navigation";
import Profile from "@/components/profile";
import dihi from "@/public/logo-dihi.png";
import Image from "next/image";

export default function Home() {
  const links = [
    { href: "/home", text: "Home" },
    { href: "/cuti", text: "Cuti" },
    { href: "/lembur", text: "Lembur" },
    { href: "/bookroom", text: "Ruangan" },
    { href: "/gaji", text: "Gaji" },
  ];
  return (
    <div>
      <header>
        <div className="flex w-full h-20 items-center justify-between px-8 bg-first">
          <a
            href="/home"
            className="flex justify-center items-center w-auto h-12 px-4 rounded-full cursor-pointer"
          >
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
        
      />
      <section>
        <div className="flex flex-col w-full h-[70dvh] gap-y-8 mt-6 p-8">
          <div className="hero bg-second h-full rounded-xl">
            <div className="hero-content flex-col lg:flex-row">
              <Image src={dihi} className="w-64" />
              <div>
                <h1 className="text-3xl font-bold">
                  Selamat Datang di Dashboard Admin
                </h1>
                <p className="py-6">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Incidunt, neque officia, atque mollitia facilis ea beatae
                  voluptate blanditiis modi vero labore. Totam sit nostrum
                  consectetur ratione aspernatur doloremque minus eius.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
