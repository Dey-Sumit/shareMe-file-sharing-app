import axios from "axios";
import { GetServerSidePropsContext } from "next";
import { sizeInMB } from "../../../utils/sizeInMb";
import fileDownload from "js-file-download";

const download = ({ file: { id, filename, size } }) => {
  const handleDownload = async () => {
    //TODO axios default
    const { data } = await axios(`http://localhost:3000/api/download/${id}`, {
      responseType: "blob", // Important
    });

    fileDownload(data, filename);
  };
  return (
    <div className="grid place-items-center h-screen">
      <div className="flex flex-col justify-center items-center shadow-2xl space-y-3 py-3 w-96 rounded-md">
        {!id && (
          <span className="bg-yellow-light rounded-md  text-white mx-auto my-5 p-1 border-yellow-light font-medium tracking-wide">
            oops! File Not Found, Check the URL
            <br />
            {/* Or the download link is expired */}
          </span>
        )}
        {id && (
          <>
            <img src="/images/file-download.png" alt="" className="w-16 h-16" />
            <h1 className="font-bold text-lg">
              Your file is ready to download
            </h1>
            <div className=" flex items-center space-y-3 p-2">
              <img
                src={`/images/${filename.split(".")[1]}.png`}
                alt={filename}
                className="w-14 h-14"
              />
              <span className="mx-2">{filename}</span>
              <span className="ml-auto ">{`${sizeInMB(size)} MB`}</span>
            </div>
            <button
              className="bg-yellow-light rounded-md w-32 text-white mx-auto p-1 border-yellow-light font-medium tracking-wide focus:outline-none"
              onClick={handleDownload}
            >
              Download
            </button>
          </>
        )}
      </div>
    </div>
  );
};
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { id } = ctx.query;
  try {
    const { data } = await axios.get(`http://localhost:3000/api/show/${id}`);

    return {
      props: {
        file: data,
      },
    };
  } catch (error) {
    return {
      props: {
        file: {},
      },
    };
  }
};
export default download;
