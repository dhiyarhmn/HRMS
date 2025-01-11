"use client";
import NavigationAdmin from "@/components/Admin/navigation/navigationAdmin";
import Navbar from "@/components/Navbar/navbar";
import DaftarRuangan from "@/components/Staff/ruangan/daftarruangan";

export default function Ruangan() {
  return (
    <div>
      <Navbar href={"/Admin/home"} p={"Admin"}/>
      <NavigationAdmin />
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
