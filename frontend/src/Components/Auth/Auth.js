import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Row, Col, Input, Button, notification } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

const Auth = () => {
  const history = useHistory();

  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupUsername, setSignupUsername] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const handleLogin = () => {
    axios
      .post(process.env.REACT_APP_API_URL + "/users/login", {
        username: loginUsername,
        password: loginPassword,
      })
      .then((resp) => {
        localStorage.setItem("token", resp.data.token);
        localStorage.setItem("user", JSON.stringify(resp.data.user));
        history.push("/chats");
      })
      .catch((err) => {
        console.log(err);
        notification.error({
          message: "Signin Failed",
          description: "Try Again Later",
        });
      });
  };
  const handleSignup = () => {
    axios
      .post(process.env.REACT_APP_API_URL + "/users/signup", {
        username: signupUsername,
        password: signupPassword,
      })
      .then((resp) => {
        notification.success({
          message: "User Created",
          description: "Proceed to Signin",
        });
      })
      .catch((err) => {
        console.log(err);
        notification.error({
          message: "User Not Created",
          description: "Try Again Later",
        });
      });
  };

  return (
    <Row style={{ height: "100vh" }}>
      <Col xxl={4} xl={4} lg={4} md={4} sm={2} xs={2} />
      <Col xxl={6} xl={6} lg={6} md={6} sm={20} xs={20}>
        <div className="username-input" style={{ marginTop: "30vh" }}>
          <h3>Username:</h3>
          <Input
            value={loginUsername}
            onChange={(e) => setLoginUsername(e.target.value)}
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
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
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
          onClick={handleLogin}
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
            value={signupUsername}
            onChange={(e) => setSignupUsername(e.target.value)}
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
            value={signupPassword}
            onChange={(e) => setSignupPassword(e.target.value)}
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
          onClick={handleSignup}
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
