import { Input } from "antd";
import { Button, Flex } from "antd";
import { useState } from "react";
import axios from "axios";
const UserForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const handleClickBtn = () => {
    const URL_BACKEND = "http://localhost:8080/api/v1/user";
    const data = {
      fullName: fullName,
      email: email,
      password: password,
      phone: phone,
    };
    axios.post(URL_BACKEND, data);
    console.log("check state", { fullName, email, password, phone });
  };
  return (
    <div className="user-form" style={{ margin: "20px 0" }}>
      <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
        <div>
          <span>FullName</span>
          <Input
            value={fullName}
            onChange={(even) => {
              setFullName(even.target.value);
            }}
          />
        </div>
        <div>
          <span>Email</span>
          <Input
            value={email}
            onChange={(even) => {
              setEmail(even.target.value);
            }}
          />
        </div>
        <div>
          <span>Password</span>
          <Input.Password
            value={password}
            onChange={(even) => {
              setPassword(even.target.value);
            }}
          />
        </div>
        <div>
          <span>PhoneNumber</span>
          <Input
            value={phone}
            onChange={(even) => {
              setPhone(even.target.value);
            }}
          />
        </div>
        <div>
          <Button
            type="primary"
            onClick={() => {
              handleClickBtn();
            }}
          >
            Create User
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
