import { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import Shimmer from "./Shimmer";
import Sidebar from "./Sidebar";

export default function Feed() {
    const [selectedCategory, setSelectedCategory] = useState("New");
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchVideos() {
            try {
                setError(null);
                setLoading(true);

                const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;

                if (!apiKey) {
                    throw new Error("YouTube API Key is missing.");
                }

                let url = "";

                if (selectedCategory === "Trending") {
                    url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=US&maxResults=12&key=${apiKey}`;
                } else {
                    url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${selectedCategory}&maxResults=12&type=video&key=${apiKey}`;
                }

                const response = await fetch(url);

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error?.message || `API Error: ${response.status}`);
                }

                const data = await response.json();

                const formattedVideos = data.items.map((item) => {
                    const id = typeof item.id === "object" ? item.id.videoId : item.id;
                    return {
                        id: id,
                        title: item.snippet.title,
                        channel: item.snippet.channelTitle,
                        thumbnail: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.default?.url || "",
                    };
                });

                // Filter out empty IDs (channels or playlists might sometimes lack videoId)
                setVideos(formattedVideos.filter((v) => v.id));
            } catch (err) {
                console.error("Fetch error:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchVideos();
    }, [selectedCategory]);

    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            <Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
            <div className="flex-1 p-4 md:p-6 lg:p-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">
                    {selectedCategory} <span className="text-red-500">Videos</span>
                </h2>
                
                {error && <div className="text-red-500 text-center mb-4 text-lg">Error: {error}</div>}
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {loading
                        ? Array(12).fill(0).map((_, i) => <Shimmer key={i} />)
                        : videos.map((video) => (
                              <VideoCard key={video.id} video={video} />
                          ))}
                </div>
            </div>
        </div>
    );
}
