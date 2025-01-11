"use client";
import Navbar from "@/components/Navbar/navbar";
import TabelRiwayatGaji from "@/components/Staff/gaji/riwayatgaji";
import NavigationStaff from "@/components/Staff/navigation/navigationStaff";

export default function Gaji() {
  return (
    <div>
      <Navbar href={"/Staff/home"} />
      <NavigationStaff
        headerBg="flex mt-8 bg-transparent"
        navigationBg="bg-third"
      />
      <section>
        <div className="flex w-full min-h-[75dvh] justify-center mt-8 p-4 bg-second">
          <div className="flex w-3/4 justify-center bg-white rounded-lg">
            <TabelRiwayatGaji />
          </div>
        </div>
      </section>
    </div>
  );
}
