import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { whoami } from "./api/auth";
import { getServers } from "./api/server";

import Routes from "./routes";

function App() {
  const dispatch = useDispatch();
  const localUser = useSelector((state) => state.localUser);
  const [updateApp, setUpdateApp] = useState(false);

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
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        rtl={false}
        theme="dark"
      />

      <BrowserRouter>
        <Routes localUser={localUser} setUpdateApp={setUpdateApp} />
      </BrowserRouter>
    </>
  );
}

export default App;
