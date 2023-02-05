import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import SidebarItem from "./SidebarItem";

const index = () => {
  const localUser = useSelector((state) => state.localUser);
  const servers = useSelector((state) => state.servers);

  return (
    <ul className="bg-zinc-900 h-screen w-24 p-4">
      <li>
        <Link className="flex justify-center" to="/settings">
          {localUser?.profilePicture ? (
            <div
              style={{
                backgroundImage: `url(${
                  import.meta.env.VITE_API_URL
                }/uploads/images/${localUser.profilePicture})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="flex w-12 rounded-full overflow-hidden justify-center h-12 bg-rose-500"
            ></div>
          ) : (
            <div className="flex w-12 rounded-full overflow-hidden justify-center h-12 bg-rose-500">
              <img className="self-center h-4/6" src="/logo.svg" />
            </div>
          )}
        </Link>
      </li>

      <hr className="border-zinc-700 my-4" />

      <li className="p-2">
        <SidebarItem popupText={"Create Server"} link="/createserver">
          <Icon
            className="self-center w-1/2 h-1/2"
            color="#bbb"
            icon="carbon:add"
          />
        </SidebarItem>
      </li>

      {servers.map((server, index) => (
        <li key={index} className="p-2">
          <SidebarItem popupText={server.name} link={`/server/${server._id}`}>
            {server.icon ? (
              <div
                style={{
                  backgroundImage: `url(${
                    import.meta.env.VITE_API_URL
                  }/uploads/images/${server.icon})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                className="flex w-12 rounded-full overflow-hidden justify-center h-12 bg-rose-500"
              ></div>
            ) : (
              <div className="flex w-12 rounded-full overflow-hidden justify-center h-12 bg-rose-500">
                <img className="self-center h-4/6" src="/logo.svg" />
              </div>
            )}
          </SidebarItem>
        </li>
      ))}
    </ul>
  );
};

export default index;
