import { Icon } from "@iconify/react";

const AttachmentPreview = ({
  index,
  attachment,
  setAttachmentPreviews,
  setMessage,
  attachmentPreviews,
  message,
}) => {
  return (
    <div className="relative flex w-max h-max">
      {attachment?.type.includes("audio") && (
        <>
          <audio
            controlsList="nodownload noplaybackrate"
            className="recorded-audio self-center rounded"
            src={attachment.url}
            controls
          />
          <Icon
            onClick={() => {
              setAttachmentPreviews(
                attachmentPreviews.filter((file) => file !== attachment.url)
              );
              setMessage({
                ...message,
                attachments: message.attachments.filter((_, i) => i !== index),
              });
            }}
            height={20}
            width={20}
            icon="mdi:delete"
            className="absolute right-4 h-full cursor-pointer text-zinc-200"
          />
        </>
      )}

      {attachment?.type.includes("image") && (
        <>
          <img
            className="self-center h-max max-h-60 w-max max-w-[40rem] rounded"
            src={attachment.url}
          />
          <Icon
            onClick={() => {
              setAttachmentPreviews(
                attachmentPreviews.filter((file) => file !== attachment.url)
              );
              setMessage({
                ...message,
                attachments: message.attachments.filter((_, i) => i !== index),
              });
            }}
            height={24}
            width={24}
            icon="mdi:delete"
            className="absolute top-2 right-2 bg-[#30363D] rounded p-1 cursor-pointer hover:bg-[#20222D]"
            color="rgb(244 63 94)"
          />
        </>
      )}
    </div>
  );
};

export default AttachmentPreview;
