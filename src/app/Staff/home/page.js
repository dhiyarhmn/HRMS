"use client";
import Navbar from "@/components/Navbar/navbar";
import HomeStaff from "@/components/Staff/home/homeStaff";
import NavigationStaff from "@/components/Staff/navigation/navigationStaff";

export default function Home() {
  return (
    <div>
      <Navbar href={"/Staff/home"} />
      <NavigationStaff
        headerBg="flex mt-8 bg-transparent"
        navigationBg="bg-third"
      />
      <section>
        <HomeStaff />
      </section>
    </div>
  );
}
