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
      className="bg-white p-6 rounded shadow-md w-full max-w-md flex flex-col items-center"
      onSubmit={onSubmit}
    >
      <input
        type="file"
        accept="audio/*"
        onChange={handleFileInputChange}
        className="mb-4 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 transition-colors"
      >
        Upload and Process
      </button>
    </form>
  );
};

export default UploadForm;
