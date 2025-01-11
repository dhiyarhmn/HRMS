// generate.js
"use client";
import NavigationAdmin from "@/components/Admin/navigation/navigationAdmin";
import Navbar from "@/components/Navbar/navbar";
import { ManualForm, UploadCSV } from "@/components/Admin/generate/generateform";
import { Segmented } from "antd";
import { useState } from "react";

export default function Generate() {
  const [formType, setFormType] = useState("Manual");

  return (
    <div>
      <Navbar href={"/Admin/home"} p={"Admin"} />
      <NavigationAdmin />
      <section>
        <div className="flex w-full justify-center items-center px-8 py-2">
          <div className="flex flex-col w-1/2 h-auto p-6 gap-y-8 bg-first rounded-lg">
            
            <div className="flex w-full justify-center">
              <Segmented
                options={["Manual", "Import CSV"]}
                onChange={(value) => setFormType(value)}
                className="w-auto"
              />
            </div>

            <div className="flex flex-col p-4 bg-white rounded-md">
              {formType === "Manual" ? <ManualForm /> : <UploadCSV />}
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
}
