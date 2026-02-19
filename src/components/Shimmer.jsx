export default function Shimmer() {
    return (
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg animate-pulse">
            <div className="w-full aspect-video bg-gray-700"></div>
            <div className="p-3 space-y-2">
                <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                <div className="h-4 bg-gray-700 rounded w-1/2"></div>
            </div>
        </div>
    );
}
