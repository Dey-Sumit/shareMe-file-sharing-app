import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { sizeInMB } from "../utils/sizeInMb";
import EmailForm from "./EmailForm";

function DropzoneComponent() {
  const [files, setFiles] = useState(null);
  const [downloadPageLink, setDownloadPageLink] = useState(null);

  const [id, setId] = useState(null);

  const resetComponent = () => {
    setFiles(null);
    setDownloadPageLink(null);
  };

  const onDrop = useCallback((acceptedFile) => {
    setFiles(acceptedFile);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    // accept: "image/jpeg, image/png",
    multiple: true,
  });

  const handleUpload = async () => {
    const formData = new FormData();

    formData.append("myFile", files[0]);
    try {
      const { data } = await axios({
        method: "post",
        url: "http://localhost:3000/api/files",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      setDownloadPageLink(data.donwloadPageLink);
      setId(data.id);
    } catch (error) {
      console.log(error);
    }
  };

  // clean up
  //   useEffect(() => {
  //     files.forEach((file) => URL.revokeObjectURL(file.preview));
  //   }, [files]);

  return (
    <div className="flex flex-col p-4 shadow-2xl w-96 rounded-xl bg-gray-50 ">
      {!downloadPageLink && (
        <>
          <div
            {...getRootProps()}
            className="w-full mx-auto mb-5 rounded-md cursor-pointer h-80 focus:outline-none"
          >
            <input
              {...getInputProps()}
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none cursor-pointer focus:outline-none focus:shadow-outline"
            />
            <div
              className={
                "rounded-xl w-full p-2 border-2 border-dashed border-yellow-light h-full flex flex-col justify-center items-center " +
                (isDragActive ? "bg-gray-100" : "bg-gray-50")
              }
            >
              <img src="/folder.png" alt="folder" className="w-16 h-16" />
              <p className="my-2 text-center">Drag and Drop the file here</p>
            </div>
          </div>

          <div className="flex flex-col">
            {files?.map((file) => (
              <div key={file.name} className="flex items-center w-full my-2 ">
                <img
                  src={`images/${file.type.split("/")[1]}.png`}
                  alt={`${file.type.split("/")[1]}.png`}
                  className="w-14 h-14"
                />
                <span className="mx-2">{file.name}</span>
                <span className="ml-auto ">{`${sizeInMB(file.size)} MB`}</span>
              </div>
            ))}
          </div>
        </>
      )}
      {files?.length > 0 && !downloadPageLink && (
        <button
          className="w-32 p-1 mx-auto my-5 font-medium tracking-wide text-white rounded-md bg-yellow-light border-yellow-light"
          onClick={handleUpload}
        >
          Upload
        </button>
      )}
      {downloadPageLink && (
        <>
          <h3 className="my-2 text-lg font-medium">
            Great! File is uploaded , Share this link with your friend
          </h3>
          <div className="flex space-x-3 text-gray-900">
            <span>{downloadPageLink}</span>
            <span
              onClick={() => {
                navigator.clipboard.writeText(downloadPageLink);
              }}
            >
              <img
                src="/copy.png"
                alt=""
                className="object-contain w-10 h-10 cursor-pointer"
              />
            </span>
          </div>
          <EmailForm id={id} />
          <button
            onClick={resetComponent}
            className="p-1 mx-auto my-5 font-medium tracking-wide text-white rounded-md w-60 bg-yellow-light border-yellow-light"
          >
            Upload new File
          </button>
        </>
      )}
    </div>
  );
}

export default DropzoneComponent;
// https://www.freakyjolly.com/react-upload-files-using-react-dropzone/
