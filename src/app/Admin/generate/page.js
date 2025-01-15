"use client";
import NavigationAdmin from "@/components/Admin/navigation/navigationAdmin";
import Navbar from "@/components/Navbar/navbar";
import {
  ManualForm,
  UploadCSV,
} from "@/components/Admin/generate/generateFormAdmin";
import { Segmented } from "antd";
import { useState } from "react";

export default function Generate() {
  const [formType, setFormType] = useState("Manual");

  return (
    <div className="min-h-screen bg-white">
      <Navbar href={"/Admin/home"} p={"Admin"} />
      <NavigationAdmin />
      <section className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-first rounded-lg p-4 sm:p-6">
            <div className="flex justify-center mb-6 sm:mb-8">
              <Segmented
                options={["Manual", "Import CSV"]}
                onChange={(value) => setFormType(value)}
                className="w-auto"
              />
            </div>

            <div className="bg-white rounded-md p-4 sm:p-6">
              {formType === "Manual" ? <ManualForm /> : <UploadCSV />}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
