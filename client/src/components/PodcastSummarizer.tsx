"use client";

import React, { useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import UploadForm from "./UploadForm";
import TranscriptionDisplay from "./TranscriptionDisplay";

type Podcast = {
  file: File | null;
  transcription: string;
  summary: string;
  highlights: string;
};

const PodcastSummarizer = () => {
  const [state, setState] = useState<Podcast>({
    file: null,
    transcription: "",
    summary: "",
    highlights: "",
  });

  const handleFileChange = (file: File) => {
    const lorem =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque faucibus, ante eget ultricies fermentum, dui lacus vulputate quam, ut tincidunt quam felis ac lectus. Praesent sollicitudin faucibus orci, sed sagittis justo posuere id. Suspendisse viverra dapibus lorem, a pretium massa pellentesque ut. Sed sed turpis nulla. Aenean sed nulla massa. Donec non lacus venenatis, sagittis ipsum hendrerit, scelerisque nisl. Ut ac odio ex. Nam pulvinar nulla ligula, in tempus enim condimentum in. Maecenas ullamcorper sed neque ut viverra. Cras convallis diam non luctus porta. Integer sapien neque, tincidunt a viverra at, aliquet at felis.";
    setState({
      file: file,
      transcription: lorem,
      summary: lorem,
      highlights: lorem,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add submit logic here
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl flex flex-col items-center text-center">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
          Podcast Summarizer
        </h1>
        <UploadForm onFileChange={handleFileChange} onSubmit={handleSubmit} />
        {state.transcription && (
          <TranscriptionDisplay
            transcription={state.transcription}
            summary={state.summary}
            highlights={state.highlights}
          />
        )}
      </div>
    </div>
  );
};

export default PodcastSummarizer;
