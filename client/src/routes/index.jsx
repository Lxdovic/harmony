import { Route, Routes, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Signin from "../pages/Signin";
import Signout from "../pages/Signout";
import Signup from "../pages/Signup";
import Settings from "../pages/Settings";
import CreateServer from "../pages/CreateServer";
import Server from "../pages/Server";
import Page404 from "../pages/Page404";

const index = ({ localUser, setUpdateApp, socket }) => {
  return (
    <Routes>
      {localUser.loggedIn ? (
        <>
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route
            path="/signout"
            element={
              <Signout
                localUser={localUser}
                socket={socket}
                setUpdateApp={setUpdateApp}
              />
            }
          />
          <Route
            path="/"
            element={
              <Home
                localUser={localUser}
                socket={socket}
                setUpdateApp={setUpdateApp}
              />
            }
          />
          <Route
            path="/settings"
            element={
              <Settings
                localUser={localUser}
                socket={socket}
                setUpdateApp={setUpdateApp}
              />
            }
          />
          <Route
            path="/createserver"
            element={
              <CreateServer
                localUser={localUser}
                socket={socket}
                setUpdateApp={setUpdateApp}
              />
            }
          />
          <Route
            path="/server/:id"
            element={
              <Server
                localUser={localUser}
                socket={socket}
                setUpdateApp={setUpdateApp}
              />
            }
          />
        </>
      ) : (
        <>
          <Route
            path="/signin"
            element={<Signin setUpdateApp={setUpdateApp} />}
          />
          <Route
            path="/signup"
            element={<Signup setUpdateApp={setUpdateApp} />}
          />
          <Route path="/" element={<Navigate to="/signin" />} />
          <Route path="*" element={<Page404 />} />
        </>
      )}
    </Routes>
  );
};

export default index;
