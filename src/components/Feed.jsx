import { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import Shimmer from "./Shimmer";

export default function Feed() {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchTrendingVideos() {
            try {
                setError(null);
                setLoading(true);

                const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;

                if (!apiKey) {
                    throw new Error("YouTube API Key is missing.");
                }

                const response = await fetch(
                    `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=US&maxResults=12&key=${apiKey}`
                );

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error?.message || `API Error: ${response.status}`);
                }

                const data = await response.json();

                const formattedVideos = data.items.map((video) => ({
                    id: video.id,
                    title: video.snippet.title,
                    channel: video.snippet.channelTitle,
                    thumbnail: video.snippet.thumbnails?.high?.url || video.snippet.thumbnails?.default?.url || "",
                }));

                setVideos(formattedVideos);
            } catch (err) {
                console.error("Fetch error:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchTrendingVideos();
    }, []);

    if (loading) {
        return <Shimmer />;
    }

    if (error) {
        return <div className="text-red-500 text-center mt-4">Error: {error}</div>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {videos.map((video) => (
                <VideoCard key={video.id} video={video} />
            ))}
        </div>
    );
}
