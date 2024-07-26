"use client";

import PodcastSummarizer from "@/components/PodcastSummarizer";
import React from "react";
import "../../app/globals.css"
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <>
        <Navbar />
        <PodcastSummarizer />
        <Footer />
    </>
    
  )
};

export default Home;
