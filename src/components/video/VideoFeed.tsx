import { useState } from "react";
import YouTube from "react-youtube";

// Define the type for videos
type Video = {
  id: number;
  title: string;
  videoId: string;
  isLocal: boolean;
};

const SAMPLE_VIDEOS: Video[] = [
  { id: 1, title: "VIDEO 1.", videoId: "krDWc30PAGg", isLocal: false },
  { id: 2, title: "VIDEO 2.", videoId: "c-YO1MRGl3M", isLocal: false },
  { id: 3, title: "VIDEO 3.", videoId: "b3ootXSAaqE", isLocal: false },
];

export const VideoFeed = () => {
  const [videos, setVideos] = useState<Video[]>(SAMPLE_VIDEOS);
  const [likes, setLikes] = useState<Record<number, number>>({});
  const [comments, setComments] = useState<Record<number, string[]>>({});
  const [newVideo, setNewVideo] = useState({ title: "" });
  const [localVideoFile, setLocalVideoFile] = useState<File | null>(null);

  const opts = {
    height: "300px",
    width: "500px",
    playerVars: { autoplay: 0, controls: 1, modestbranding: 1, rel: 0, showinfo: 0 },
  };

  const handleFileValidation = (file: File): boolean => ["video/mp4", "video/webm", "video/ogg"].includes(file.type);

  const handleLike = (videoId: number) => setLikes((prev) => ({ ...prev, [videoId]: (prev[videoId] || 0) + 1 }));

  const handleComment = (videoId: number, comment: string) => {
    if (comment.trim()) {
      setComments((prev) => ({ ...prev, [videoId]: [...(prev[videoId] || []), comment] }));
    }
  };

  const handleShare = (video: Video) => {
    const shareUrl = video.isLocal ? video.videoId : `https://www.youtube.com/watch?v=${video.videoId}`;
    const emailLink = `mailto:?subject=Check out this video: ${encodeURIComponent(video.title)}&body=Watch it here: ${encodeURIComponent(shareUrl)}`;
    const facebookLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    const instagramLink = `https://www.instagram.com/?url=${encodeURIComponent(shareUrl)}`;

    const choice = prompt(`Choose where to share the video:\n1. Email\n2. Facebook\n3. Instagram\n\nEnter the number (1, 2, or 3):`, "1");

    switch (choice) {
      case "1":
        window.location.href = emailLink;
        break;
      case "2":
        window.open(facebookLink, "_blank");
        break;
      case "3":
        window.open(instagramLink, "_blank");
        break;
      default:
        alert("Invalid choice. Please try again.");
    }
  };

  const handleUpload = () => {
    if (!newVideo.title || !localVideoFile) {
      alert("Please provide both a title and a video file!");
      return;
    }

    if (!handleFileValidation(localVideoFile)) {
      alert("Unsupported format! Use MP4, WebM, or OGG.");
      return;
    }

    const fileURL = URL.createObjectURL(localVideoFile);
    setVideos((prev) => [...prev, { id: prev.length + 1, title: newVideo.title, videoId: fileURL, isLocal: true }]);
    setNewVideo({ title: "" });
    setLocalVideoFile(null);
    alert("Video uploaded!");
  };

  return (
    <div className="bg-gray-900 min-h-screen p-8 text-white">
      <h1 className="text-5xl font-extrabold text-center mb-10">Welcome To Video Stream</h1>

      {/* Upload Section */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-10 max-w-md mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Upload New Video</h2>
        <input
          type="text"
          placeholder="Video Title"
          value={newVideo.title}
          onChange={(e) => setNewVideo({ title: e.target.value })}
          className="w-full p-3 mb-3 rounded bg-gray-700 text-white placeholder-gray-400"
        />
        <input
          type="file"
          accept="video/mp4,video/webm,video/ogg"
          onChange={(e) => setLocalVideoFile(e.target.files?.[0] || null)}
          className="w-full p-3 mb-3 rounded bg-gray-700 text-white"
        />
        <button
          onClick={handleUpload}
          className="w-full bg-gradient-to-r from-green-400 to-blue-500 py-2 rounded font-semibold hover:from-green-500 hover:to-blue-600"
        >
          Upload
        </button>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map((video) => (
          <div key={video.id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div>
              {video.isLocal ? (
                <video controls className="w-full h-64 object-cover">
                  <source src={video.videoId} type="video/mp4" />
                </video>
              ) : (
                <YouTube videoId={video.videoId} opts={opts} />
              )}
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">{video.title}</h3>
              <div className="flex justify-between">
                <button onClick={() => handleLike(video.id)} className="bg-green-500 px-3 py-1 rounded">
                  Like ({likes[video.id] || 0})
                </button>
                <button onClick={() => handleComment(video.id, prompt("Your comment:") || "")} className="bg-yellow-500 px-3 py-1 rounded">
                  Comment
                </button>
                <button onClick={() => handleShare(video)} className="bg-blue-500 px-3 py-1 rounded">
                  Share
                </button>
              </div>
              {comments[video.id]?.length > 0 && (
                <div className="mt-3 bg-gray-700 p-2 rounded">
                  <strong>Comments:</strong>
                  <ul>
                    {comments[video.id].map((cmt, i) => (
                      <li key={i} className="text-sm">- {cmt}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};