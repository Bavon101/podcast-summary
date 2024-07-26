"use client";

import React, { useState } from "react";
import UploadForm from "./UploadForm";
import TranscriptionDisplay from "./TranscriptionDisplay";
import BackgroundImage from "@/assets/pexels-mikebirdy-114820.jpg";
import Image from "next/image";

type Podcast = {
  file: File | null;
  transcription: string;
  summary: string;
  highlights: string;
};

const audioFiles = [
  {
    title: "Batman: The Dark Knight Returns",
    summary:
      "In this audio file, we explore the story of Batman as he comes out of retirement to fight crime in Gotham City. Bruce Wayne, now older and burdened by past traumas, dons the cape and cowl once more to take on a new wave of criminals. The narrative delves into his psyche, examining the cost of being Batman and the toll it takes on him. He faces formidable foes, old and new, including the Joker and a corrupt government. Batman's return sparks a revolution, inspiring the citizens of Gotham to stand up against tyranny and injustice. The story is a powerful commentary on heroism, sacrifice, and the relentless pursuit of justice, even in the face of overwhelming odds.",
  },
  {
    title: "Wonder Woman: The Amazon Warrior",
    summary:
      "This audio file recounts the epic tale of Wonder Woman, also known as Diana of Themyscira. Raised on a secluded island among Amazon warriors, Diana is trained in the art of combat from a young age.",
  },
  {
    title: "Superman: Man of Steel",
    summary:
      "In this audio file, we follow the story of Superman, the last son of Krypton. Sent to Earth as a baby, Kal-El is raised by the Kent family in Smallville, Kansas, and grows up to become Clark Kent. As he discovers his superhuman abilities, he decides to use them to protect humanity. Superman's journey is one of self-discovery, as he struggles with his dual identity and the responsibilities that come with his powers. He faces challenges from powerful enemies like Lex Luthor and General Zod, but his unwavering sense of justice and compassion guide him. Superman's story is a testament to the power of hope, resilience, and the enduring spirit of heroism.",
  },
];

const PodcastSummarizer = () => {
  const [state, setState] = useState<Podcast>({
    file: null,
    transcription: "",
    summary: "",
    highlights: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (file: File) => {
    setIsLoading(true);
    const lorem =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque faucibus, ante eget ultricies fermentum, dui lacus vulputate quam, ut tincidunt quam felis ac lectus. Praesent sollicitudin faucibus orci, sed sagittis justo posuere id. Suspendisse viverra dapibus lorem, a pretium massa pellentesque ut. Sed sed turpis nulla. Aenean sed nulla massa. Donec non lacus venenatis, sagittis ipsum hendrerit, scelerisque nisl. Ut ac odio ex. Nam pulvinar nulla ligula, in tempus enim condimentum in. Maecenas ullamcorper sed neque ut viverra. Cras convallis diam non luctus porta. Integer sapien neque, tincidunt a viverra at, aliquet at felis.";
    setTimeout(() => {
      setState({
        file: file,
        transcription: audioFiles[0].summary,
        summary: audioFiles[1].summary,
        highlights: audioFiles[2].summary,
      });
      setIsLoading(false);
    }, 2000); // Simulating a delay for the file processing
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add submit logic here
  };

  const handleCancel = () => {
    setState({
      file: null,
      transcription: "",
      summary: "",
      highlights: "",
    });
    setIsLoading(false);
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center px-[5%] py-10 relative min-h-screen">
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 bg-opacity-75 z-50">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-900"></div>
          </div>
          <p className="mt-4 text-xl font-semibold">Please wait...</p>
        </div>
      )}
      {state.transcription ? (
        <div className="w-full flex flex-col items-center justify-center">
          <div className="text-center md:text-left shadow-md p-8 bg-white rounded-lg w-full max-w-screen-lg">
            <TranscriptionDisplay
              transcription={state.transcription}
              summary={state.summary}
              highlights={state.highlights}
            />
            <button
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col md:flex-row gap-8 items-center">
          <div className="flex flex-col items-center justify-center w-full md:w-6/12 gap-4">
            <Image
              src={BackgroundImage}
              alt="Podcast Summarizer"
              className="rounded-lg shadow-lg w-9/12"
            />
            <div className="w-9/12">
              <p className="text-6xl font-black mb-4">
                Podcast <br /> Summarizer
              </p>
              <p className="text-xl font-black">100% Automatic And Free</p>
            </div>
          </div>
          <div className="flex flex-col justify-end items-center w-6/12 h-[200px]">
            <UploadForm
              onFileChange={handleFileChange}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PodcastSummarizer;
