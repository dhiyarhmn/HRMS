"use client";
import HomeHRGA from "@/components/HRGA/home/homeHRGA";
import NavigationHRGA from "@/components/HRGA/navigation/navigationHRGA";
import Navbar from "@/components/Navbar/navbar";

export default function Home() {
  return (
    <div>
      <Navbar href={"/HRGA/home"} />
      <NavigationHRGA
        headerBg="flex mt-8 bg-transparent"
        navigationBg="bg-third"
      />
      <section>
        <HomeHRGA />
      </section>
    </div>
  );
}
