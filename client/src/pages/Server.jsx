import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getServer } from "../api/server";
import { getChannels } from "../api/channel";
import { useDispatch, useSelector } from "react-redux";

import Sidebar from "../features/Sidebar";
import ServerSidebar from "../features/Server";
import Chat from "../features/Chat";

const Server = ({ socket }) => {
  const [server, setServer] = useState({});
  const [channel, setChannel] = useState({});

  const { id } = useParams();

  const channels = useSelector((state) => state.channels);

  const dispatch = useDispatch();

  useEffect(() => {
    getPopulatedServer();
  }, []);

  const getPopulatedServer = async () => {
    try {
      const response = await getServer(id);

      setServer(response.data.server);

      response.data.server.members.forEach((member) => {
        dispatch({
          type: "ADD_USER",
          payload: member,
        });
      });

      const channelsResponse = await getChannels(response.data.server._id);

      dispatch({
        type: "SET_CHANNELS",
        payload: channelsResponse.data.channels,
      });

      setChannel(response.data.server.channels[0]);

      dispatch({
        type: "SET_MESSAGES",
        payload: channelsResponse.data.channels[0].messages,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSwitchChannel = (channel) => {
    setChannel(channel._id);
    dispatch({
      type: "SET_MESSAGES",
      payload: channel.messages,
    });
  };

  return (
    <div className="flex w-screen h-screen">
      <Sidebar />

      <div className="flex w-[calc(100vw-6rem)] bg-[#0e0e0f] h-screen">
        {Object.keys(server).length > 0 && (
          <>
            <ServerSidebar
              channels={channels}
              setChannel={handleSwitchChannel}
              server={server}
            />
            <Chat socket={socket} channelId={channel} server={server} />
          </>
        )}
      </div>
    </div>
  );
};

export default Server;
