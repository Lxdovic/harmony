import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getServer } from "../api/server";

import Sidebar from "../features/Sidebar";
import ServerSidebar from "../features/Server";
import Chat from "../features/Chat";

const Server = () => {
  const [server, setServer] = useState({});
  const [channel, setChannel] = useState({});

  const { id } = useParams();

  useEffect(() => {
    getPopulatedServer();
  }, []);

  const getPopulatedServer = async () => {
    try {
      const response = await getServer(id);

      setServer(response.data.server);
      setChannel(response.data.server.channels[0]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex w-screen h-screen">
      <Sidebar />

      <div className="flex w-[calc(100vw-6rem)] bg-[#0e0e0f] h-screen">
        {Object.keys(server).length > 0 && (
          <>
            <ServerSidebar setChannel={setChannel} server={server} />
            <Chat channel={channel} />
          </>
        )}
      </div>
    </div>
  );
};

export default Server;
