"use client";
import Navbar from "@/components/Navbar/navbar";
import NavigationAdmin from "@/components/Admin/navigation/navigationAdmin";
import HomeAdmin from "@/components/Admin/home/homeAdmin";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar href={"/Admin/home"} p={"Admin"} />
      <NavigationAdmin />
      <main className="w-full">
        <HomeAdmin />
      </main>
    </div>
  );
}
