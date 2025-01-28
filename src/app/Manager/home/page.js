"use client";
import Navbar from "@/components/Navbar/navbar";
import HomeManager from "@/components/Manager/home/homeManager";
import NavigationManager from "@/components/Manager/navigation/navigationManager";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar href={"/Manager/home"} p={"Manager"} />
      <NavigationManager />
      <main className="w-full">
        <HomeManager />
      </main>
    </div>
  );
}
