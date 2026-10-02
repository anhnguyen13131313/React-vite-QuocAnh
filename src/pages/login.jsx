import {
  Button,
  Input,
  Form,
  notification,
  Row,
  Col,
  Divider,
  message,
} from "antd";
import { loginAPI, registerUserAPI } from "../services/api.service";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useState } from "react";
const LoginPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    const res = await loginAPI(values.email, values.password);

    if (res.data) {
      message.success("Đăng nhập thành công");
      navigate("/");
    } else {
      notification.error({
        message: "Error login",
        description: JSON.stringify(res.message),
      });
    }
    setLoading(false);
  };
  return (
    <Row justify={"center"} style={{ marginTop: "30px" }}>
      <Col xs={24} md={16} lg={8}>
        <fieldset
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            margin: "5px",
            borderRadius: "5px",
          }}
        >
          <legend>Đăng nhập</legend>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Email không đúng định dạng!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Button
                  loading={loading}
                  onClick={() => {
                    form.submit();
                  }}
                  type="primary"
                >
                  Login
                </Button>

                <Link to={"/"}>
                  Go to homepage
                  <ArrowRightOutlined />
                </Link>
              </div>
            </Form.Item>
          </Form>
          <Divider></Divider>
          <div style={{ textAlign: "center" }}>
            Bạn chưa có tài khoản? <Link to={"/register"}>Đăng ký tại đây</Link>
          </div>
        </fieldset>
      </Col>
    </Row>
  );
};

export default LoginPage;
