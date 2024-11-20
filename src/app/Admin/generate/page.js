// generate.js
"use client";
import React, { useState } from "react";
import { Segmented } from "antd";
import Navbar from "@/components/navbar";
import { ManualForm, UploadCSV } from "@/components/generateform";

export default function Generate() {
  const [formType, setFormType] = useState("Manual");

  return (
    <div>
      <Navbar />
      <div className="flex w-full h-auto py-6 justify-center items-center">
        <div className="flex flex-col w-1/2 h-auto p-6 gap-y-8 bg-first rounded-lg">
          <div className="flex w-full justify-center">
            <h1 className="bg-white rounded-full p-6 font-semibold text-2xl text-center">Generate Akun</h1>
          </div>
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
    </div>
  );
}
