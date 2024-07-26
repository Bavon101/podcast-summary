"use client";

import React from "react";

const Home = () => {
  const [file, setFile] = React.useState<File | null>(null);
  const [transcription, setTranscription] = React.useState<string>("");
  const [summary, setSummary] = React.useState<string>("");
  const [highlights, setHighlights] = React.useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {};

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Podcast Summarizer</h1>
      <form className="bg-white p-6 rounded shadow-md" onSubmit={handleSubmit}>
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          className="mb-4"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Upload and Process
        </button>
      </form>
      {transcription && (
        <div className="mt-8 w-full max-w-2xl bg-white p-6 rounded shadow-md">
          <h2 className="text-2xl font-bold">Transcription</h2>
          <p className="mt-2">{transcription}</p>
          <h2 className="text-2xl font-bold mt-4">Summary</h2>
          <p className="mt-2">{summary}</p>
          <h2 className="text-2xl font-bold mt-4">Highlights</h2>
          <p className="mt-2">{highlights}</p>
        </div>
      )}
    </div>
  );
};

export default Home;
