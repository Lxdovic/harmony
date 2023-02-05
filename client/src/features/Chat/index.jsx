const index = ({ channel }) => {
  console.log(channel);

  return (
    <ul className="w-[calc(100vw-22rem)] h-screen">
      <li className="flex items-center p-4 border-zinc-800 border-b-2">
        <h2 className="text-zinc-200 font-semibold">{channel?.name}</h2>
      </li>

      <ul>
        {channel?.messages.map((message, index) => (
          <li className="flex p-2" key={index}></li>
        ))}
      </ul>
    </ul>
  );
};

export default index;
