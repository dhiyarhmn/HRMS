"use client";
import Navbar from "@/components/Navbar/navbar";
import HomeDirektur from "@/components/Direktur/home/homeDirektur";
import NavigationDirektur from "@/components/Direktur/navigation/navigationDirektur";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar href={"/Direktur/home"} p={"Direktur"} />
      <NavigationDirektur />
      <main className="w-full">
        <HomeDirektur />
      </main>
    </div>
  );
}
