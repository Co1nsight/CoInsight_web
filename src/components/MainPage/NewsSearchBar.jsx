const NewsSearchBar = () => {
    return (
        <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9E9E9E]">
                <iconify-icon icon="mingcute:search-line" className="text-[20px]"></iconify-icon>
            </div>
            <input
                type="text"
                placeholder="뉴스 검색 (예: ETF, 규제, 상승)"
                className="w-full h-12 pl-12 pr-4 border border-[#E0E0E0] rounded-lg bg-white text-[14px] text-[#212121] placeholder-[#9E9E9E] outline-none focus:border-[#1F78F2] transition-colors"
            />
        </div>
    )
}

export default NewsSearchBar;
