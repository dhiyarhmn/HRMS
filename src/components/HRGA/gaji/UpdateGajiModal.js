// components/Admin/gaji/UpdateGajiModal.js
import React from "react";
import { Modal } from "antd";
import UpdateGajiForm from "./UpdateGajiForm";

const UpdateGajiModal = ({ isOpen, onClose, selectedRecord }) => {
  return (
    <Modal
      title={
        <h3 className="text-lg font-semibold text-gray-900">
          Update Data Gaji
        </h3>
      }
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={800}
      centered
      className="custom-modal"
    >
      <UpdateGajiForm selectedRecord={selectedRecord} />
    </Modal>
  );
};

export default UpdateGajiModal;
