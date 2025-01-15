"use client";
import HomeHRGA from "@/components/HRGA/home/homeHRGA";
import NavigationHRGA from "@/components/HRGA/navigation/navigationHRGA";
import Navbar from "@/components/Navbar/navbar";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar href={"/HRGA/home"} p={"HRGA"} />
      <NavigationHRGA />
      <main className="w-full">
        <HomeHRGA />
      </main>
    </div>
  );
}
