// components/Admin/gaji/UpdateGajiForm.js
import React, { useState, useEffect } from "react";
import { Tabs, message, Alert } from "antd";
import {
  allowanceServices,
  bonusServices,
  deductionServices,
  otherDeductionServices,
} from "@/api/api";
import UpdateAllowanceForm from "./UpdateAllowanceForm";
import UpdateBonusForm from "./UpdateBonusForm";
import UpdateDeductionForm from "./UpdateDeductionForm";
import UpdateOtherDeductionForm from "./UpdateOtherDeductionForm";
import dayjs from "dayjs";

const { TabPane } = Tabs;

const UpdateGajiForm = ({ selectedRecord }) => {
  const [employeeId, setEmployeeId] = useState(null);
  const [activeKey, setActiveKey] = useState("1");
  const [allowanceData, setAllowanceData] = useState(null);
  const [bonusData, setBonusData] = useState(null);
  const [deductionData, setDeductionData] = useState(null);
  const [otherDeductionData, setOtherDeductionData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (selectedRecord) {
      setEmployeeId(selectedRecord);
      fetchAllData(selectedRecord);
    }
  }, [selectedRecord]);

  const fetchAllData = async (empId) => {
    setLoading(true);
    try {
      const currentDate = dayjs();
      const month = currentDate.month() + 1;
      const year = currentDate.year();

      // Fetch allowance data
      const allowanceResponse = await allowanceServices.getAllowances();
      const currentAllowance = allowanceResponse.data.data.find(
        (allowance) =>
          allowance.id_employee === empId &&
          dayjs(allowance.date).month() + 1 === month &&
          dayjs(allowance.date).year() === year
      );
      setAllowanceData(currentAllowance || null);

      // Fetch bonus data
      const bonusResponse = await bonusServices.getBonuses();
      const currentBonus = bonusResponse.data.data.find(
        (bonus) =>
          bonus.id_employee === empId &&
          dayjs(bonus.date).month() + 1 === month &&
          dayjs(bonus.date).year() === year
      );
      setBonusData(currentBonus || null);

      // Fetch deduction data
      const deductionResponse = await deductionServices.getDeductions();
      const currentDeduction = deductionResponse.data.data.find(
        (deduction) =>
          deduction.id_employee === empId &&
          dayjs(deduction.date).month() + 1 === month &&
          dayjs(deduction.date).year() === year
      );
      setDeductionData(currentDeduction || null);

      // Fetch other deduction data
      const otherDeductionResponse =
        await otherDeductionServices.getOtherDeductions();
      const currentOtherDeduction = otherDeductionResponse.data.data.find(
        (otherDeduction) =>
          otherDeduction.id_employee === empId &&
          dayjs(otherDeduction.date).month() + 1 === month &&
          dayjs(otherDeduction.date).year() === year
      );
      setOtherDeductionData(currentOtherDeduction || null);
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("Gagal mengambil data");
    } finally {
      setLoading(false);
    }
  };

  if (!employeeId || loading) {
    return (
      <div className="flex justify-center items-center p-4">
        <Alert
          message="Loading"
          description="Memuat data karyawan..."
          type="info"
          showIcon
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Tabs
        activeKey={activeKey}
        onChange={setActiveKey}
        type="card"
        className="bg-white rounded-lg shadow"
      >
        <TabPane tab="Tunjangan" key="1">
          <div className="p-4">
            
              <UpdateAllowanceForm
                employeeId={employeeId}
                initialData={allowanceData}
                onSuccess={() => {
                  message.success("Tunjangan berhasil diperbarui");
                  fetchAllData(employeeId);
                }}
              />
            
          </div>
        </TabPane>

        <TabPane tab="Bonus" key="2">
          <div className="p-4">
            
              <UpdateBonusForm
                employeeId={employeeId}
                initialData={bonusData}
                onSuccess={() => {
                  message.success("Bonus berhasil diperbarui");
                  fetchAllData(employeeId);
                }}
              />
            
          </div>
        </TabPane>

        <TabPane tab="Potongan" key="3">
          <div className="p-4">
            
              <UpdateDeductionForm
                employeeId={employeeId}
                initialData={deductionData}
                onSuccess={() => {
                  message.success("Potongan berhasil diperbarui");
                  fetchAllData(employeeId);
                }}
              />
            
          </div>
        </TabPane>

        <TabPane tab="Potongan Lainnya" key="4">
          <div className="p-4">
            
              <UpdateOtherDeductionForm
                employeeId={employeeId}
                initialData={otherDeductionData}
                onSuccess={() => {
                  message.success("Potongan lainnya berhasil diperbarui");
                  fetchAllData(employeeId);
                }}
              />
            
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default UpdateGajiForm;
