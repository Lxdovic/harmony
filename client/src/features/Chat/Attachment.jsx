import React from "react";

const Attachment = ({ attachment }) => {
  console.log(attachment);
  return (
    <div>
      {attachment?.type?.includes("image") && (
        <img
          className="w-max max-h-[30rem] max-w-[40rem] rounded"
          src={`${import.meta.env.VITE_API_URL}/${
            import.meta.env.VITE_API_UPLOAD_FOLDER
          }/${attachment.path}`}
        />
      )}

      {attachment?.type?.includes("audio") && (
        <audio
          controlsList="nodownload noplaybackrate"
          className="self-center rounded"
          src={`${import.meta.env.VITE_API_URL}/${
            import.meta.env.VITE_API_UPLOAD_FOLDER
          }/${attachment.path}`}
          controls
        />
      )}
    </div>
  );
};

export default Attachment;
