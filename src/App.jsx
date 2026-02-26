import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Feed from "./components/Feed";
import SearchFeed from "./components/SearchFeed";

export default function App() {
    return (
        <BrowserRouter basename="/react_youtube/">
            <div className="min-h-screen bg-black text-white">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Feed />} />
                    <Route path="/search/:searchTerm" element={<SearchFeed />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}
