"use client";
import Navbar from "@/components/Navbar/navbar";
import NavigationAdmin from "@/components/Admin/navigation/navigationAdmin";
import HomeAdmin from "@/components/Admin/home/homeAdmin";

export default function Home() {
  
  return (
    <div>
      <Navbar href={"/Admin/home"} p={"Admin"}/>
      <NavigationAdmin
        headerBg="flex mt-8 bg-transparent"
        navigationBg="bg-third"
      />
      <section>
        <HomeAdmin />
      </section>
    </div>
  );
}
