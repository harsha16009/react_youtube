import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import VideoCard from "./VideoCard";
import Shimmer from "./Shimmer";

export default function SearchFeed() {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const { searchTerm } = useParams();

    useEffect(() => {
        async function fetchSearchResults() {
            setLoading(true);
            try {
                const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY || import.meta.env.VITE_RAPID_API_KEY;
                const response = await fetch(
                    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchTerm}&maxResults=12&type=video&key=${apiKey}`
                );

                const data = await response.json();

                if (data.items) {
                    const formattedVideos = data.items.map((item) => ({
                        id: item.id.videoId,
                        title: item.snippet.title,
                        channel: item.snippet.channelTitle,
                        thumbnail: item.snippet.thumbnails.high.url,
                    }));
                    setVideos(formattedVideos);
                } else {
                    console.error("API Error or No items found:", data);
                    setVideos([]);
                }
            } catch (error) {
                console.error("Search API Error:", error);
            } finally {
                setLoading(false);
            }
        }

        if (searchTerm) {
            fetchSearchResults();
        }
    }, [searchTerm]);

    return (
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {loading
                ? Array(8)
                    .fill(0)
                    .map((_, i) => <Shimmer key={i} />)
                : videos.map((v) => <VideoCard key={v.id} video={v} />)}
        </div>
    );
}
