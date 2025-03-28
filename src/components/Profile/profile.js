import React, { useState, useEffect } from "react";
import { Button, Popover } from "antd";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { logout, getProfile } from "@/api/api";

const Profile = ({ role }) => {
  const [open, setOpen] = useState(false);
  const [employeeData, setEmployeeData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setEmployeeData(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    e.stopPropagation();

    logout()
      .then(() => {
        window.location.href = "/login";
      })
      .catch((error) => {
        console.error("Error during logout:", error);
        window.location.href = "/login";
      });
  };

  const content = (
    <>
      {role === "admin" && (
        <div className="flex flex-col gap-y-2 border border-black p-1 rounded-lg hover:bg-gray-100 cursor-pointer">
          <div className="flex items-center gap-x-4">
            <a href="/Admin/reset">
              <span className="text-black">Reset Password</span>
            </a>
          </div>
        </div>
      )}
      <div className="flex justify-center mt-4">
        <div
          onClick={handleLogout}
          className="group flex items-center justify-start w-11 h-10 bg-red-600 rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-32 hover:rounded-full active:translate-x-1 active:translate-y-1"
        >
          <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3">
            <svg className="w-4 h-4" viewBox="0 0 512 512" fill="white">
              <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
            </svg>
          </div>
          <div className="absolute right-5 transform translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
            Logout
          </div>
        </div>
      </div>
    </>
  );

  return (
    <Popover
      content={content}
      title="Logout"
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
      placement="bottomRight"
      className="hover:cursor-pointer"
    >
      <Button type="none" className="p-5 rounded-full bg-white hover:bg-second">
        <div className="flex items-center gap-x-4">
          <Avatar icon={<UserOutlined />} />
          <span>{employeeData?.name || "User"}</span>
        </div>
      </Button>
    </Popover>
  );
};

export default Profile;
