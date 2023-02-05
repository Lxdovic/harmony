import { useEffect } from "react";
import { whoami } from "../api/auth";
import { useDispatch } from "react-redux";
import { getServers } from "../api/server";
import Sidebar from "../features/Sidebar";

const Home = () => {
  return (
    <div>
      <Sidebar />
    </div>
  );
};

export default Home;
