import React, { useState, useEffect } from "react";
import { Tabs, message } from "antd";
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

  useEffect(() => {
    if (selectedRecord) {
      setEmployeeId(selectedRecord);
    }
  }, [selectedRecord]);

  const handlePayrollCalculated = (result) => {
    setPayrollResult(result);
  };

  if (!employeeId) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Allowances" key="1">
          <AllowanceForm
            employeeId={employeeId}
            onSubmitSuccess={() => message.success("Allowance saved")}
          />
        </TabPane>
        <TabPane tab="Bonuses" key="2">
          <BonusForm
            employeeId={employeeId}
            onSubmitSuccess={() => message.success("Bonus saved")}
          />
        </TabPane>
        <TabPane tab="Deductions" key="3">
          <DeductionForm
            employeeId={employeeId}
            onSubmitSuccess={() => message.success("Deduction saved")}
          />
        </TabPane>
        <TabPane tab="Other Deductions" key="4">
          <OtherDeductionForm
            employeeId={employeeId}
            onSubmitSuccess={() => message.success("Other deduction saved")}
          />
        </TabPane>
        <TabPane tab="Calculate Payroll" key="5">
          <PayrollCalculator
            employeeId={employeeId}
            onCalculateSuccess={handlePayrollCalculated}
          />
          {payrollResult && (
            <div className="mt-4 p-4 bg-white rounded shadow">
              <h3 className="text-lg font-semibold mb-3">Payroll Summary</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">Basic Salary:</p>
                  <p>
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(payrollResult.basic_salary)}
                  </p>
                </div>
                <div>
                  <p className="font-medium">Total Allowances:</p>
                  <p>
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(payrollResult.total_allowance)}
                  </p>
                </div>
                <div>
                  <p className="font-medium">Total Bonuses:</p>
                  <p>
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(payrollResult.total_bonus)}
                  </p>
                </div>
                <div>
                  <p className="font-medium">Total Deductions:</p>
                  <p>
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(payrollResult.total_deduction)}
                  </p>
                </div>
                <div>
                  <p className="font-medium">Total Other Deductions:</p>
                  <p>
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(payrollResult.total_other_deduction)}
                  </p>
                </div>
                <div>
                  <p className="font-medium">Net Salary:</p>
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
        <TabPane tab="Print Payslip" key="6">
          <PaySlip selectedRecord={employeeId} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default FormGajiHRGA;
