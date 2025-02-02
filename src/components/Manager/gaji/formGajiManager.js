import React, { useState, useEffect } from "react";
import { Tabs, message } from "antd";
import AllowanceForm from "./AllowanceForm";
import BonusForm from "./BonusForm";
import DeductionForm from "./DeductionForm";
import OtherDeductionForm from "./OtherDeductionForm";
import PayrollCalculator from "./PayrollCalculator";
import PaySlip from "./PaySlip";

const { TabPane } = Tabs;

const FormGajiManager = ({ selectedRecord }) => {
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
        <TabPane tab="Print Payslip" key="1">
          <PaySlip selectedRecord={employeeId} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default FormGajiManager;
