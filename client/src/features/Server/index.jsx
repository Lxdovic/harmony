import { Icon } from "@iconify/react";

const index = ({ server, setChannel }) => {
  return (
    <ul className="w-64 bg-[#111113] h-screen">
      <li className="flex items-center p-4 border-zinc-800 border-b-2">
        <h2 className="text-zinc-200 font-semibold">{server?.name}</h2>
      </li>

      {server?.channels.map((channel, index) => (
        <li
          onClick={() => setChannel(channel)}
          className="flex hover:bg-zinc-900 text-zinc-400 cursor-pointer p-2"
          key={index}
        >
          <Icon className="self-center" icon="carbon:hashtag" />
          <span className="self-center">{channel.name}</span>
        </li>
      ))}
    </ul>
  );
};

export default index;
