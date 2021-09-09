import React from "react";
import { Row, Col, Input, Button } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

const Auth = () => {
  return (
    <Row style={{ height: "100vh" }}>
      <Col xxl={4} xl={4} lg={4} md={4} sm={2} xs={2} />
      <Col xxl={6} xl={6} lg={6} md={6} sm={20} xs={20}>
        <div className="username-input" style={{ marginTop: "30vh" }}>
          <h3>Username:</h3>
          <Input
            bordered={false}
            className="username-input"
            style={{
              outline: "none",
              borderTop: "0px",
              borderLeft: "0px",
              borderRight: "0px",
              borderBottom: "2px solid gray",
            }}
            placeholder="Username"
          />
        </div>
        <div className="passowrd-input" style={{ marginTop: "5vh" }}>
          <h3>Password:</h3>
          <Input.Password
            bordered={false}
            className="password-input"
            style={{
              outline: "none",
              borderTop: "0px",
              borderLeft: "0px",
              borderRight: "0px",
              borderBottom: "2px solid gray",
            }}
            placeholder="Password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </div>
        <Button
          ghost
          className="login-button"
          style={{ marginTop: "5vh" }}
          shape="round"
          size="large"
        >
          Login
        </Button>
      </Col>
      <Col xxl={4} xl={4} lg={4} md={4} sm={2} xs={2} />
      <Col xxl={0} xl={0} lg={0} md={0} sm={2} xs={2} />
      <Col xxl={6} xl={6} lg={6} md={6} sm={20} xs={20}>
        <div className="username-input" style={{ marginTop: "30vh" }}>
          <h3>Username:</h3>
          <Input
            bordered={false}
            className="username-input"
            style={{
              outline: "none",
              borderTop: "0px",
              borderLeft: "0px",
              borderRight: "0px",
              borderBottom: "2px solid gray",
            }}
            placeholder="Username"
          />
        </div>
        <div className="passowrd-input" style={{ marginTop: "5vh" }}>
          <h3>Password:</h3>
          <Input.Password
            bordered={false}
            className="password-input"
            style={{
              outline: "none",
              borderTop: "0px",
              borderLeft: "0px",
              borderRight: "0px",
              borderBottom: "2px solid gray",
            }}
            placeholder="Password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </div>
        <Button
          ghost
          className="signup-button"
          style={{ marginTop: "5vh" }}
          shape="round"
          size="large"
        >
          Signup
        </Button>
      </Col>
      <Col xxl={4} xl={4} lg={4} md={4} sm={2} xs={2} />
    </Row>
  );
};
export default Auth;
