export default function VideoCard({ video }) {
    return (
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
            <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full aspect-video object-cover"
            />
            <div className="p-3">
                <h3 className="text-white font-semibold line-clamp-2" title={video.title}>
                    {video.title}
                </h3>
                <p className="text-gray-400 text-sm mt-1">
                    {video.channel}
                </p>
            </div>
        </div>
    );
}
