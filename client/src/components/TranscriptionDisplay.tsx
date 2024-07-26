import React from "react";
import { Typewriter } from "react-simple-typewriter";

type TranscriptionDisplayProps = {
  transcription: string;
  summary: string;
  highlights: string;
};

const TranscriptionDisplay: React.FC<TranscriptionDisplayProps> = ({
  transcription,
  summary,
  highlights,
}) => {
  return (
    <div className="mt-8 w-full bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-bold text-gray-800">Transcription</h2>
      <p className="mt-2 text-gray-700 whitespace-pre-wrap">
        <Typewriter
          words={[transcription]}
          typeSpeed={50}
          cursor
          cursorStyle="_"
        />
      </p>
      <h2 className="text-2xl font-bold text-gray-800 mt-4">Summary</h2>
      <p className="mt-2 text-gray-700 whitespace-pre-wrap">
        <Typewriter words={[summary]} typeSpeed={50} cursor cursorStyle="_" />
      </p>
      <h2 className="text-2xl font-bold text-gray-800 mt-4">Highlights</h2>
      <p className="mt-2 text-gray-700 whitespace-pre-wrap">
        <Typewriter
          words={[highlights]}
          typeSpeed={50}
          cursor
          cursorStyle="_"
        />
      </p>
    </div>
  );
};

export default TranscriptionDisplay;
