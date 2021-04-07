import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

function DropzoneComponent({ setFiles }) {
  const onDrop = useCallback((acceptedFile) => {
    setFiles(acceptedFile);
    console.log(acceptedFile);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png,application/pdf,audio/mpeg",
    multiple: false,
  });
  // console.log({ isDragActive, isDragAccept, isDragReject });

  return (
    <div className="flex flex-col w-full p-4">
      <div
        {...getRootProps()}
        className="w-full mx-auto rounded-md cursor-pointer h-80 focus:outline-none"
      >
        <input {...getInputProps()} />
        <div
          className={
            "rounded-xl w-full p-2 border-2 border-dashed border-yellow-light h-full flex bg-gray-50 flex-col justify-center items-center " +
            (isDragReject === true ? "bg-red-300 " : " ") +
            (isDragAccept === true ? "bg-green-300 " : " ")
          }
        >
          <img src="/folder.png" alt="folder" className="w-16 h-16" />
          <p className="my-2 text-center">
            {isDragReject === true
              ? "Sorry , this app only support images , pdf and mp3"
              : " Drag and Drop the file here"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default DropzoneComponent;
// https://www.freakyjolly.com/react-upload-files-using-react-dropzone/
