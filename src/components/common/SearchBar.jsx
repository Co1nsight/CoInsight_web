import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ defaultKeyword = "" }) => {
    const [keyword, setKeyword] = useState(defaultKeyword);
    const nav = useNavigate();

    const handleSearch = () => {
        const trimmed = keyword.trim();
        if (trimmed) {
            nav(`/search?keyword=${encodeURIComponent(trimmed)}`);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    const handleClear = () => {
        setKeyword("");
        nav("/");
    };

    return (
        <div className="relative">
            <div
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9E9E9E] cursor-pointer hover:text-[#1F78F2] transition-colors"
                onClick={handleSearch}
            >
                <iconify-icon icon="mingcute:search-line" className="text-[20px]"></iconify-icon>
            </div>
            <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="검색어를 입력하세요 (예: 비트코인, ETF, 규제)"
                className="w-full h-12 pl-12 pr-10 border border-[#E0E0E0] rounded-lg bg-white text-[14px] text-[#212121] placeholder-[#9E9E9E] outline-none focus:border-[#1F78F2] transition-colors"
            />
            {keyword && (
                <div
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9E9E9E] cursor-pointer hover:text-[#212121] transition-colors"
                    onClick={handleClear}
                >
                    <iconify-icon icon="mingcute:close-line" className="text-[18px]"></iconify-icon>
                </div>
            )}
        </div>
    )
}

export default SearchBar;
