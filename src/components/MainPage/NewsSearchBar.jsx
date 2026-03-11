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
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8892B0] cursor-pointer hover:text-[#64FFDA] transition-colors"
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
                className="w-full h-12 pl-12 pr-10 border border-[#233554] rounded-lg bg-[#112240] text-[14px] text-[#CCD6F6] placeholder-[#495670] outline-none focus:border-[#64FFDA] transition-colors"
            />
            {keyword && (
                <div
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8892B0] cursor-pointer hover:text-[#CCD6F6] transition-colors"
                    onClick={handleClear}
                >
                    <iconify-icon icon="mingcute:close-line" className="text-[18px]"></iconify-icon>
                </div>
            )}
        </div>
    )
}

export default NewsSearchBar;
