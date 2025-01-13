import React, { useState } from "react";

const VideoUpload = () => {
  // Static videos ke URLs
  const staticVideos = [
    "https://www.youtube.com/embed/dQw4w9WgXcQ",
    "https://www.youtube.com/embed/3JZ_D3ELwOQ",
    "https://www.youtube.com/embed/tgbNymZ7vqY",
    "https://www.youtube.com/embed/2Vv-BfVoq4g",
  ];

  const [videos, setVideos] = useState(staticVideos); // Static aur uploaded videos ka list
  const [likes, setLikes] = useState(new Array(staticVideos.length).fill(0)); // Static videos ke likes initialize

  const handleVideoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const videoURL = URL.createObjectURL(file);
      setVideos((prevVideos) => [...prevVideos, videoURL]);
      setLikes((prevLikes) => [...prevLikes, 0]); // Naye video ke liye like initialize
    }
  };

  const handleLike = (index) => {
    const updatedLikes = [...likes];
    updatedLikes[index] += 1;
    setLikes(updatedLikes); // Specific video ka like increment
  };

  const videoStyle = {
    width: "640px", // Fixed width
    height: "360px", // Fixed height
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* Display the videos */}
      {videos.length > 0 && (
        <div className="mb-4">
          {videos.map((src, index) => (
            <div key={index} className="relative mb-8">
              {src.includes("youtube.com") ? (
                <iframe
                  style={videoStyle} // Fixed size for iframe
                  src={src}
                  title={`YouTube Video ${index}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <video style={videoStyle} controls> {/* Fixed size for video */}
                  <source src={src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}

              {/* Like Button */}
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => handleLike(index)}
                  className="bg-blue-500 text-white text-xl p-4 rounded-full flex items-center justify-center"
                >
                  <span className="font-extrabold text-white">👍 {likes[index]}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Input field to upload the video */}
      <input
        type="file"
        accept="video/*"
        onChange={handleVideoChange}
        className="mt-4 p-2 bg-blue-500 text-white rounded-lg cursor-pointer"
      />
    </div>
  );
};

export default VideoUpload;