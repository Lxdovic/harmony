import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { whoami } from "./api/auth";
import { getServers } from "./api/server";
import { io } from "socket.io-client";
import { OnSocketEvents } from "./socket";

import Routes from "./routes";

function App() {
  const dispatch = useDispatch();
  const localUser = useSelector((state) => state.localUser);
  const [updateApp, setUpdateApp] = useState(false);

  const socket = io(import.meta.env.VITE_API_URL, {
    query: { token: localStorage.getItem("accessToken") },
  });

  useEffect(() => {
    getLocalUser();
    fetchServers();
  }, [updateApp]);

  const getLocalUser = async () => {
    try {
      const identity = await whoami();

      dispatch({ type: "SET_USER", payload: identity.data.user });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchServers = async () => {
    try {
      const { data } = await getServers();

      dispatch({ type: "SET_SERVERS", payload: data.servers });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <OnSocketEvents socket={socket} />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        rtl={false}
        theme="dark"
      />

      <BrowserRouter>
        <Routes
          localUser={localUser}
          socket={socket}
          setUpdateApp={setUpdateApp}
        />
      </BrowserRouter>
    </>
  );
}

export default App;
