"use client";
import Navigation from "@/components/navigation";

export default function Dashboard() {
    const links = [
      { href: "#section1", text: "Section 1" },
      { href: "#section2", text: "Section 2" },
      { href: "#section3", text: "Section 3" },
    ];
return (
    <div>
         <Navigation links={links} />
         
    </div>
);
}