import React from "react";
import {
  InfoCircleOutlined,
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  KeyOutlined,
} from "@ant-design/icons";
import { Input, Tooltip, Button, Space } from "antd";
const App = (props) => (
  <div className={`${props.className}`}>
    <span className="font-medium mt-4 mb-1">Username</span>
    <Input
      placeholder="Username"
      prefix={
        <UserOutlined
          style={{
            color: "rgba(0,0,0,.25)",
          }}
        />
      }
      suffix={
        <Tooltip title="Extra information">
          <InfoCircleOutlined
            style={{
              color: "rgba(0,0,0,.45)",
            }}
          />
        </Tooltip>
      }
    />
    <span className="font-medium mt-4 mb-1">Password</span>
    <Input.Password
      placeholder="Password"
      prefix={
        <KeyOutlined
          style={{
            color: "rgba(0,0,0,.25)",
          }}
        />
      }
      iconRender={(visible) =>
        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
      }
    />
  </div>
);
export default App;
