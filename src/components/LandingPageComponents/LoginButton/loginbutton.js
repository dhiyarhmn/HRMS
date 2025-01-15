import React from "react";
import "./loginbutton.css";
import { Button } from "antd";

export default function LoginButton({ onClick }) {
  return (
    <Button
      className="btn-shine loginbtn text-sm sm:text-base px-3 sm:px-4 py-1 sm:py-2"
      onClick={onClick}
    >
      <span>Login</span>
    </Button>
  );
}
