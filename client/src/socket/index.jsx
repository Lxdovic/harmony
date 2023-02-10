import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const OnSocketEvents = ({ socket }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    socket?.on("message", (message) => {
      dispatch({ type: "ADD_MESSAGE", payload: message });
    });

    socket?.on("disconnect", () => {
      console.log("DISCONNECTED");
    });

    socket?.on("error", (err) => {
      console.log("ERROR: ", err);
    });

    socket?.on("connection", () => {
      console.log("CONNECTED");
    });

    return () => {
      socket.off("message");
      socket.off("disconnect");
      socket.off("error");
      socket.off("connection");
    };
  }, []);
};

export const offSocketEvents = function (socket) {};
