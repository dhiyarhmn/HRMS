"use client";
import Navbar from "@/components/Navbar/navbar";
import NavigationStaff from "@/components/Staff/navigation/navigationStaff";
import DaftarRuangan from "@/components/Staff/ruangan/daftarruangan";

export default function Ruangan() {
  return (
    <div>
      <Navbar href={"/Staff/home"} />
      <NavigationStaff />
      <section>
        <div className="flex w-full justify-center items-center px-8 py-2">
          <div className="flex flex-wrap w-auto justify-center bg-second p-4 gap-8 rounded-lg">
            <DaftarRuangan />
          </div>
        </div>
      </section>
    </div>
  );
}
