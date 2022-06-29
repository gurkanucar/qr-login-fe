import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import QRCode from "react-qr-code";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

const QRCodeComponent = (props) => {
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
      //sendMessage(username + " connected", "SYSTEM");
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
    // setTimeout(() => {
    //
    // }, 500);
  };

  const onError = (error) => {
    console.log(error);
  };

  const sendMessage = async (msg) => {
    // if (msg !== "") {
    //   const data = {
    //     message: "",
    //   };
    if (stompClient) {
      console.log("message sending.....");
      stompClient.send("/app/login/" + codes.room, {}, JSON.stringify(msg));
    }
    //  }
  };

  return (
    <div>
      <Button
        variant="primary"
        onClick={() => {
          let obj = {
            room: codes.room,
            code: "farkliKod1",
            type: "CLIENT",
          };
          stompClient.send("/app/login/" + codes.room, {}, JSON.stringify(obj));
        }}
      >
        farkliKod1
      </Button>
      <Button
        variant="primary"
        onClick={() => {
          let obj = {
            room: codes.room,
            code: "farkliKod2",
            type: "CLIENT",
          };
          stompClient.send("/app/login/" + codes.room, {}, JSON.stringify(obj));
        }}
      >
        farkliKod2
      </Button>
      <Button
        variant="primary"
        onClick={() => {
          let obj = {
            room: codes.room,
            code: "farkliKod2",
            type: "MOBILE",
            message: "jwt kodddd",
          };
          stompClient.send("/app/login/" + codes.room, {}, JSON.stringify(obj));
        }}
      >
        mobile
      </Button>
      <QRCode size={200} value={JSON.stringify(codes)} />
    </div>
  );
};

export default QRCodeComponent;
