import Sidebar from "../features/Sidebar";
import Input from "../components/ui/Input";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createServer } from "../api/server";

const CreateServer = () => {
  const [serverName, setServerName] = useState("");
  const [eyeballMovement, setEyeballMovement] = useState([0, 0]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCreateServer = async (e) => {
    e.preventDefault();

    try {
      const server = await createServer({ name: serverName });

      dispatch({
        type: "ADD_SERVER",
        payload: server.data.server,
      });

      navigate("/server/" + server.data.server._id);
    } catch (error) {
      console.log(error);
    }
  };

  const scale = (fromRange, toRange) => {
    const d = (toRange[1] - toRange[0]) / (fromRange[1] - fromRange[0]);
    return (from) => (from - fromRange[0]) * d + toRange[0];
  };

  const handleMouseMove = (e) => {
    const center = [window.innerWidth / 2, window.innerHeight / 2];

    setEyeballMovement([
      scale(
        [-(window.innerWidth / 2), window.innerWidth / 2],
        [-1, 1]
      )(center[0] - e.clientX),
      scale(
        [-(window.innerHeight / 2), window.innerHeight / 2],
        [-1, 1]
      )(center[1] - e.clientY),
    ]);
  };

  useEffect(() => {
    document.addEventListener("mousemove", (e) => {
      handleMouseMove(e);
    });

    return () => {
      document.removeEventListener("mousemove", (e) => {
        handleMouseMove(e);
      });
    };
  }, []);

  return (
    <div className="flex w-screen h-screen">
      <Sidebar />

      <div className="flex justify-center w-[calc(100vw-6rem)] flex-col gap-6 bg-[#0e0e0f] h-screen px-40 py-20">
        <div className="relative flex flex-col self-center gap-12">
          <h1 className="font-['Poppins]' text-zinc-200 flex flex-col">
            <span className="text-5xl uppercase text-center">
              Create Server
            </span>
            <span className="mb-64 text-xl  text-center">
              Create a server and invite your friends!
            </span>
          </h1>

          <div className="absolute top-32">
            <div
              style={{
                background:
                  "linear-gradient(0deg, rgba(14,14,15,1) 0%, rgba(255,255,255,0) 100%)",
              }}
              className="absolute w-full h-full"
            />
            <span
              style={{
                left: 150,
                top: 111,
                width: 54,
                height: 54,
                animation: "eye-blink 10s infinite",
              }}
              className="bg-white flex rounded-full absolute"
            >
              <img
                style={{
                  left: 25 - eyeballMovement[0] * 14,
                  top: 15 - eyeballMovement[1] * 14,
                }}
                src="/assets/logo/proximityHover/eyeball.png"
                className="absolute z-10"
              />
            </span>

            <span
              style={{
                left: 230,
                top: 111,
                width: 40,
                height: 54,
                borderRadius: "50%",
                animation: "eye-blink 10s infinite",
              }}
              className="bg-white flex absolute"
            >
              <img
                style={{
                  left: 13 - eyeballMovement[0] * 14,
                  top: 15 - eyeballMovement[1] * 14,
                }}
                src="/assets/logo/proximityHover/eyeball.png"
                className="absolute z-10"
              />
            </span>
            <img src="/assets/logo/proximityHover/logo.png" alt="cat" />
          </div>

          <form
            onSubmit={handleCreateServer}
            className="w-full h-full flex flex-col gap-2 z-10"
          >
            <div className="flex w-full gap-2 h-36">
              <div className="w-full flex flex-col">
                <Input
                  type="text"
                  className={"w-full"}
                  onChange={(e) => setServerName(e.target.value)}
                  placeholder="Server name"
                  value={serverName}
                />
                <Input
                  type="submit"
                  className="cursor-pointer bg-[#f43f5e] w-full"
                  value={"Create Server"}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateServer;
