import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/auth";
import "./HomePage.css";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.auth.value.myToken);

  const [myData, setMyData] = useState();

  useEffect(() => {
    getMe();
  }, []);

  const getMe = () => {
    fetch("http://192.168.0.10:8080/user/myself", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        setMyData(responseData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const logoutFunction = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="home_page">
      <h1>Welcome To App</h1>
      <h2>Username: {myData?.username}</h2>
      {myData && <h4>{JSON.stringify(myData)}</h4>}

      <Button onClick={logoutFunction}>Logout</Button>
    </div>
  );
};

export default HomePage;
