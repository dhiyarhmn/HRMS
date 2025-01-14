"use client";
import Navbar from "@/components/Navbar/navbar";
import HomeStaff from "@/components/Staff/home/homeStaff";
import NavigationStaff from "@/components/Staff/navigation/navigationStaff";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar href={"/Staff/home"} p={"Staff"} />
      <NavigationStaff />
      <main className="w-full">
        <HomeStaff />
      </main>
    </div>
  );
}
