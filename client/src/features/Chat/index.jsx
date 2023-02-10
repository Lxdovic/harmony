import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import AttachmentPreview from "./AttachmentPreview";
import Message from "./Message";

const index = ({ server, channelId, socket }) => {
  const [attachmentPreviews, setAttachmentPreviews] = useState([]);
  const [message, setMessage] = useState({
    content: "",
    attachments: [],
  });

  const messages = useSelector((state) => state.messages);
  const channel = useSelector((state) =>
    state.channels.find((channel) => channel._id === channelId)
  );

  const recorderControls = useAudioRecorder();

  useEffect(() => {}, [messages]);

  useEffect(() => {
    if (!message.attachments.length > 0) {
      setAttachmentPreviews([]);
      return;
    }

    setAttachmentPreviews(
      message.attachments.map((attachment) => {
        return {
          type: attachment.type,
          url: URL.createObjectURL(attachment.file),
        };
      })
    );

    return () =>
      message.attachments.map((attachment) =>
        URL.revokeObjectURL(attachment.file)
      );
  }, [message.attachments]);

  const handleWriteMessage = (e) => {
    if (e.target.value.length >= 2000) return;

    setMessage({ ...message, content: e.target.value });
  };

  const handleKeyDown = (e) => {
    if (e.code === "Enter" && !e.shiftKey) return handleSendMessage();
  };

  const handleSendMessage = () => {
    socket.emit("message", {
      ...message,
      channel: channel._id,
      server: server._id,
    });

    setMessage({ content: "", attachments: [] });
  };

  return (
    <ul className="flex flex-col w-[calc(100vw-22rem)] h-screen">
      <li className="flex items-center p-4 border-zinc-800 border-b-2">
        <h2 className="text-zinc-200 font-semibold">{channel?.name}</h2>
      </li>

      <ul className="overflow-x-hidden overflow-y-scroll">
        {messages.map((message, index) => (
          <li className="flex p-2" key={index}>
            <Message message={message} />
          </li>
        ))}
      </ul>

      <li className="mt-auto">
        {attachmentPreviews.length > 0 && (
          <div className="flex flex-col gap-2 bg-zinc-900 p-2">
            {attachmentPreviews.map((file, index) => (
              <div key={index}>
                <AttachmentPreview
                  index={index}
                  attachment={file}
                  setAttachmentPreviews={setAttachmentPreviews}
                  setMessage={setMessage}
                  attachmentPreviews={attachmentPreviews}
                  message={message}
                />
              </div>
            ))}
          </div>
        )}

        <div className="bg-zinc-900 p-2 h-20">
          <form className="flex w-full h-full gap-2">
            <textarea
              className="w-full outline-0 bg-zinc-900 resize-none placeholder:text-zinc-500 text-zinc-200"
              placeholder={`Send a message`}
              value={message.content}
              onKeyDown={(e) => handleKeyDown(e)}
              onChange={(e) => handleWriteMessage(e)}
            />
            <label
              htmlFor="chatImageUpload"
              className="transition cursor-pointer text-zinc-500 hover:text-zinc-200 h-12 self-center flex justify-center w-12 rounded hover:bg-zinc-800"
            >
              <Icon width={24} icon="bxs:image-add" className="self-center" />
            </label>

            {!recorderControls.isRecording && (
              <div
                onClick={recorderControls.startRecording}
                className="transition cursor-pointer text-zinc-500 hover:text-zinc-200 h-12 self-center flex justify-center w-12 rounded hover:bg-zinc-800"
              >
                <Icon width={24} icon="ic:round-mic" className="self-center" />
              </div>
            )}

            {recorderControls.isRecording && (
              <>
                <div
                  onClick={recorderControls.stopRecording}
                  className="transition cursor-pointer text-zinc-500 hover:text-zinc-200 h-12 self-center flex justify-center w-12 rounded hover:bg-zinc-800"
                >
                  <Icon width={24} icon="mdi:stop" className="self-center" />
                </div>

                <div
                  onClick={recorderControls.togglePauseResume}
                  className="transition cursor-pointer text-zinc-500 hover:text-zinc-200 h-12 self-center flex justify-center w-12 rounded hover:bg-zinc-800"
                >
                  <Icon
                    width={24}
                    icon={recorderControls.isPaused ? "mdi:play" : "mdi:pause"}
                    className="self-center"
                  />
                </div>
              </>
            )}

            <input
              type="file"
              accept="image/png, image/gif, image/jpeg, image/jpg"
              id="chatImageUpload"
              className="hidden"
              onChange={(e) => {
                setMessage({
                  ...message,
                  attachments: [
                    ...message.attachments,
                    { file: e.target.files[0], type: e.target.files[0].type },
                  ],
                });
              }}
              onClick={(event) => {
                event.target.value = null;
              }}
            />

            <div className="hidden">
              <AudioRecorder
                onRecordingComplete={(blob) =>
                  setMessage({
                    ...message,
                    attachments: [
                      ...message.attachments,
                      { file: blob, type: blob.type },
                    ],
                  })
                }
                recorderControls={recorderControls}
              />
            </div>
          </form>
        </div>
      </li>
    </ul>
  );
};

export default index;
