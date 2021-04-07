const DownloadFile = ({ downloadPageLink }) => {
  return (
    <div className="p-1">
      <h3 className="my-2 text-lg font-medium">
        Great! File is uploaded , Share this link with your friend
      </h3>

      <div className="flex space-x-3 text-gray-900">
        <span className="break-all">{downloadPageLink}</span>
        <img
          onClick={() => {
            navigator.clipboard.writeText(downloadPageLink);
          }}
          src="/copy.png"
          alt="copy"
          className="object-contain w-8 h-8 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default DownloadFile;
