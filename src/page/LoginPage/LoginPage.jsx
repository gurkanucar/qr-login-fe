import React, { useEffect, useState } from "react";
import { Container, Form, Button, Image } from "react-bootstrap";
import QRCode from "react-qr-code";
import { randomCodeGenerator } from "../../utils/randomCodeGenerator";

import "./LoginPage.css";

const LoginPage = () => {
  const [values, setValues] = useState({
    room: randomCodeGenerator(20),
    code: randomCodeGenerator(25),
  });

  const MINUTE_MS = 6000;

  useEffect(() => {
    const interval = setInterval(() => {
      setValues({ ...values, code: randomCodeGenerator(25) });
    }, MINUTE_MS);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);

  const login = (e) => {
    e.preventDefault();
    console.log("login");
  };

  return (
    <Container className="loginPage">
      <Form className="formLogin" onSubmit={login}>
        <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" required placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3 text-start" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" required placeholder="Password" />
        </Form.Group>

        <div className="d-grid gap-2">
          <Button variant="primary" type="submit">
            Login
          </Button>
        </div>
        <br />
        <Form.Group className="mb-3 text-center">
          <span className="text"> or</span>
          <br />
          <QRCode size={200} value={JSON.stringify(values)} />
        </Form.Group>
      </Form>
    </Container>
  );
};

export default LoginPage;
