import { useState } from "react";

const NewsSearchBar = ({ onSearch }) => {
    const [keyword, setKeyword] = useState("");

    const handleSearch = () => {
        onSearch(keyword.trim());
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    const handleClear = () => {
        setKeyword("");
        onSearch("");
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
                placeholder="뉴스 검색 (예: ETF, 규제, 상승)"
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

export default NewsSearchBar;

