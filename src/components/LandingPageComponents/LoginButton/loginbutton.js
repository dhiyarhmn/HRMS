import React from 'react'
import './loginbutton.css'
import { Button } from 'antd';

export default function LoginButton({ onClick }) {
  return (
    <div>
      <Button className="btn-shine loginbtn" onClick={onClick}>
        <span>Login</span>
      </Button>
    </div>
  );
}