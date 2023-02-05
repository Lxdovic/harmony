import Sidebar from "../features/Sidebar";
import Input from "../components/ui/Input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createServer } from "../api/server";

const CreateServer = () => {
  const [serverName, setServerName] = useState("");

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

  return (
    <div className="flex w-screen h-screen">
      <Sidebar />

      <div className="flex w-[calc(100vw-6rem)] flex-col gap-6 bg-[#0e0e0f] h-screen px-40 py-20">
        <div className="flex flex-col self-center gap-12">
          <h1 className="font-['Poppins]' text-zinc-200 flex flex-col">
            <span className="text-3xl uppercase">Create Server</span>
            <span className="">Create a server and invite your friends!</span>
          </h1>

          <img src="/friends.svg" alt="friends" />

          <form
            onSubmit={handleCreateServer}
            className="w-full h-full flex flex-col gap-2"
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
                  className="cursor-pointer bg-rose-500 w-full"
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
