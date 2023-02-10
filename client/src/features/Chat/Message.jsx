import { useSelector } from "react-redux";
import Attachment from "./Attachment";
import { Icon } from "@iconify/react";

const Message = ({ message }) => {
  const author = useSelector((state) =>
    state.users.find((user) => user._id === message.author)
  );

  return (
    <div className="flex flex-col gap-2 hover:bg-zinc-900 w-full rounded p-2">
      <div className="flex gap-2">
        <img
          className="w-12 h-12 rounded-full"
          src={`${import.meta.env.VITE_API_URL}/${
            import.meta.env.VITE_API_UPLOAD_FOLDER
          }/${author.profilePicture}`}
        />
        <span className="text-xl text-zinc-200 font-semibold self-center">
          {author.username}
        </span>
        <Icon
          icon="ic:outline-arrow-forward-ios"
          className="self-center text-zinc-500"
        />
        <span className="text-zinc-500 self-center">
          {new Date(message.createdAt).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
        </span>
      </div>

      <span className="ml-2 text-zinc-300 flex flex-col gap-2 w-full max-w-[90rem]">
        <span>{message.content}</span>

        {message.attachments.length > 0 && (
          <div className="flex flex-col gap-2">
            {message.attachments.map((attachment, index) => (
              <div key={index}>
                <Attachment attachment={attachment} />
              </div>
            ))}
          </div>
        )}
      </span>
    </div>
  );
};

export default Message;
