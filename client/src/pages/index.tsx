import axios from "axios";
import { useState } from "react";
import DownloadFile from "../components/DownloadFile";
import DropzoneComponent from "../components/DropzoneComponent";
import EmailForm from "../components/EmailForm";
//TODO change render file name
const index = () => {
  const [files, setFiles] = useState(null);

  const [id, setId] = useState(null);
  const [downloadPageLink, setDownloadPageLink] = useState(null);

  const resetComponent = () => {
    setFiles(null);
    setDownloadPageLink(null);
  };

  const handleUpload = async () => {
    const formData = new FormData();

    formData.append("myFile", files[0]);
    try {
      const { data } = await axios({
        method: "post",
        url: "/api/files/upload",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      setDownloadPageLink(data.downloadPageLink);
      setId(data.id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center shadow-2xl bg-gray-50 w-96 rounded-xl">
      {!downloadPageLink && <DropzoneComponent setFiles={setFiles} />}

      {/* show files */}
      {/* <renderFiles files={files} /> */}

      {/* //upload button */}
      {files?.length > 0 && !downloadPageLink && (
        <button className="button" onClick={handleUpload}>
          Upload
        </button>
      )}
      {/* // copy link */}
      {downloadPageLink && (
        <div>
          <DownloadFile downloadPageLink={downloadPageLink} />

          <EmailForm id={id} />

          <button onClick={resetComponent} className="button">
            Upload new File
          </button>
        </div>
      )}
    </div>
  );
};

export default index;
