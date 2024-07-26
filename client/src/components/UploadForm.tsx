import React from "react";

type UploadFormProps = {
  onFileChange: (file: File) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const UploadForm: React.FC<UploadFormProps> = ({ onFileChange, onSubmit }) => {
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onFileChange(e.target.files[0]);
    }
  };

  return (
    <form
      className="p-6 rounded-[4rem] shadow-md w-full flex flex-col items-center"
      onSubmit={onSubmit}
    >
      <div className="mb-4 w-screen flex flex-col items-center">
        <label
          htmlFor="file-upload"
          className="bg-blue-500 text-white px-8 py-4 rounded-[2rem] cursor-pointer hover:bg-blue-600 transition-colors"
        >
          Upload Audio
        </label>
        <input
          id="file-upload"
          type="file"
          accept="audio/*"
          onChange={handleFileInputChange}
          className="hidden"
        />
        <p className="mt-2 text-gray-600 mt-14">or drop a file</p>
        <p className="mt-1 text-gray-600">paste audio or <span className="underline">URL</span></p>
      </div>
      {/* <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 transition-colors"
      >
        Upload and Process
      </button> */}
    </form>
  );
};

export default UploadForm;
