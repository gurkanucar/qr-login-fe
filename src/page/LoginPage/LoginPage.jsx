import React, { useEffect, useState } from "react";
import { Container, Form, Button, Image } from "react-bootstrap";
import QRCode from "react-qr-code";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import QRCodeComponent from "../../components/QRCodeComponent/QRCodeComponent";
import { login } from "../../store/auth";
import { randomCodeGenerator } from "../../utils/randomCodeGenerator";

import "./LoginPage.css";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    room: randomCodeGenerator(20),
    code: randomCodeGenerator(25),
  });

  const [userCredientals, setUserCredientals] = useState({
    username: "",
    password: "",
  });

  const MINUTE_MS = 1200000;

  useEffect(() => {
    const interval = setInterval(() => {
      setValues({ ...values, code: randomCodeGenerator(25) });
    }, MINUTE_MS);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);

  const loginHandler = (e) => {
    e.preventDefault();
    loginRequest();
  };

  const loginRequest = () => {
    fetch("http://192.168.0.10:8080/auth/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userCredientals.username,
        password: userCredientals.password,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        if (responseData.access_token != undefined) {
          dispatch(
            login({
              myToken: responseData.access_token,
            })
          );
          navigate("/home");
        } else {
          alert("Wrong credientals!");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container className="loginPage">
      <Form className="formLogin" onSubmit={loginHandler}>
        <Form.Group className="mb-3 text-start" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            required
            value={userCredientals.username}
            onChange={(e) =>
              setUserCredientals({
                ...userCredientals,
                username: e.target.value,
              })
            }
            placeholder="Enter username"
          />
        </Form.Group>
        <Form.Group className="mb-3 text-start" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            value={userCredientals.password}
            onChange={(e) =>
              setUserCredientals({
                ...userCredientals,
                password: e.target.value,
              })
            }
            placeholder="Password"
          />
        </Form.Group>

        <div className="d-grid gap-2">
          <Button variant="primary" type="submit">
            Login
          </Button>
        </div>
        <br />

        <br />
        <Form.Group className="mb-3 text-center">
          <span className="text"> or</span>
          <br />
          <QRCodeComponent codes={values} />
        </Form.Group>
      </Form>
    </Container>
  );
};

export default LoginPage;
