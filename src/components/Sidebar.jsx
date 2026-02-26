export default function Sidebar({ selectedCategory, setSelectedCategory }) {
    const categories = [
        { name: "New" },
        { name: "Trending" },
        { name: "Coding" },
        { name: "ReactJS" },
        { name: "Music" },
        { name: "Education" },
        { name: "Gaming" },
        { name: "Sport" },
        { name: "Comedy" },
    ];

    return (
        <div className="flex flex-row md:flex-col overflow-x-auto w-full md:w-48 xl:w-64 h-auto md:h-[calc(100vh-80px)] py-4 px-2 md:border-r border-gray-800 gap-2 scrollbar-hide sticky top-[77px] bg-black">
            {categories.map((category) => (
                <button
                    key={category.name}
                    className={`px-4 py-2 rounded-full md:rounded-lg text-left whitespace-nowrap transition-colors flex items-center md:gap-3 ${
                        selectedCategory === category.name
                            ? "bg-red-600 text-white font-bold"
                            : "text-gray-300 hover:bg-gray-800"
                    }`}
                    onClick={() => setSelectedCategory(category.name)}
                >
                    <span>{category.name}</span>
                </button>
            ))}
            <p className="hidden md:block text-gray-500 text-xs mt-auto text-center py-4">
                © 2026 YouTube Clone
            </p>
        </div>
    );
}
