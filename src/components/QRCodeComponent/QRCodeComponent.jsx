import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import QRCode from "react-qr-code";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { login } from "../../store/auth";

const QRCodeComponent = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { codes } = props;
  const [data, setData] = useState();
  const [stompClient, setStompClient] = useState(null);
  const [fileUploaded, setFileUploaded] = useState(false);

  const getLoginRequestObject = () => {
    return {
      room: codes.room,
      code: codes.code,
      type: "CLIENT",
    };
  };

  useEffect(() => {
    if (data != undefined && data.type == "SERVER") {
      dispatch(
        login({
          myToken: data.message,
        })
      );
      stompClient.disconnect();
      navigate("/home");
    }
  }, [data]);

  useEffect(() => {
    const sock = new SockJS("http://localhost:8080/loginListener");
    const client = Stomp.over(sock);
    setStompClient(client);
  }, []);

  useEffect(() => {
    if (stompClient !== undefined && stompClient !== null) {
      stompClient.connect({}, onConnected, onError);
    }
  }, [stompClient]);

  const onConnected = () => {
    if (stompClient !== undefined && stompClient !== null) {
      stompClient.subscribe(
        "/topic/loginListener/" + codes.room,
        onMessageReceived
      );
      sendMessage(getLoginRequestObject());
    }
  };

  const onMessageReceived = (payload) => {
    const message = JSON.parse(payload.body);
    setData(message);
  };

  const onError = (error) => {
    console.log(error);
  };

  const sendMessage = async (msg) => {
    if (stompClient) {
      stompClient.send("/app/login/" + codes.room, {}, JSON.stringify(msg));
    }
  };

  return (
    <div>
      <QRCode size={200} value={JSON.stringify(codes)} />
    </div>
  );
};

export default QRCodeComponent;
