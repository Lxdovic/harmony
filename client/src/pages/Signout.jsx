import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Signout = ({ setUpdateApp }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("accessToken");

    dispatch({ type: "DEL_USER" });

    setUpdateApp((prev) => !prev);

    navigate("/signin");
  }, []);

  return <div className="w-screen h-screen bg-zinc-900"></div>;
};

export default Signout;
