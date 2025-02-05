import React, { useState, useEffect } from "react";
import { Tabs, message, Alert } from "antd";
import AllowanceForm from "./AllowanceForm";
import BonusForm from "./BonusForm";
import DeductionForm from "./DeductionForm";
import OtherDeductionForm from "./OtherDeductionForm";
import PayrollCalculator from "./PayrollCalculator";
import PaySlip from "./PaySlip";

const { TabPane } = Tabs;

const FormGajiHRGA = ({ selectedRecord }) => {
  const [payrollResult, setPayrollResult] = useState(null);
  const [employeeId, setEmployeeId] = useState(null);
  const [activeKey, setActiveKey] = useState("1");

  useEffect(() => {
    // selectedRecord sekarang langsung berupa ID
    if (selectedRecord) {
      setEmployeeId(selectedRecord);
    }
  }, [selectedRecord]);

  const handlePayrollCalculated = (result) => {
    setPayrollResult(result);
  };

  if (!employeeId) {
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
            <AllowanceForm
              employeeId={employeeId}
              onSubmitSuccess={() =>
                message.success("Tunjangan berhasil disimpan")
              }
            />
          </div>
        </TabPane>

        <TabPane tab="Bonus" key="2">
          <div className="p-4">
            <BonusForm
              employeeId={employeeId}
              onSubmitSuccess={() => message.success("Bonus berhasil disimpan")}
            />
          </div>
        </TabPane>

        <TabPane tab="Potongan" key="3">
          <div className="p-4">
            <DeductionForm
              employeeId={employeeId}
              onSubmitSuccess={() =>
                message.success("Potongan berhasil disimpan")
              }
            />
          </div>
        </TabPane>

        <TabPane tab="Potongan Lainnya" key="4">
          <div className="p-4">
            <OtherDeductionForm
              employeeId={employeeId}
              onSubmitSuccess={() =>
                message.success("Potongan lainnya berhasil disimpan")
              }
            />
          </div>
        </TabPane>

        <TabPane tab="Hitung Gaji" key="5">
          <div className="p-4">
            <PayrollCalculator
              employeeId={employeeId}
              onCalculateSuccess={handlePayrollCalculated}
            />
          </div>
          {payrollResult && (
            <div className="mt-4 p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">
                Ringkasan Gaji
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-600">Gaji Pokok:</p>
                  <p className="text-lg">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(payrollResult.basic_salary)}
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-600">Total Tunjangan:</p>
                  <p className="text-lg">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(payrollResult.total_allowance)}
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-600">Total Bonus:</p>
                  <p className="text-lg">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(payrollResult.total_bonus)}
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-600">Total Potongan:</p>
                  <p className="text-lg">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(payrollResult.total_deduction)}
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-600">
                    Total Potongan Lainnya:
                  </p>
                  <p className="text-lg">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(payrollResult.total_other_deduction)}
                  </p>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="font-medium text-green-600">Gaji Bersih:</p>
                  <p className="text-xl font-bold text-green-600">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(payrollResult.total_salary)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </TabPane>

        <TabPane tab="Slip Gaji" key="6">
          <div className="p-4">
            <PaySlip selectedRecord={employeeId} payrollData={payrollResult} />
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default FormGajiHRGA;
