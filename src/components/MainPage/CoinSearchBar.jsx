const CoinSearchBar = () => {
    return (
        <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8892B0]">
                <iconify-icon icon="mingcute:search-line" className="text-[20px]"></iconify-icon>
            </div>
            <input
                type="text"
                placeholder="코인명 또는 티커로 검색 (예: 비트코인, BTC)"
                className="w-full h-12 pl-12 pr-4 border border-[#233554] rounded-lg bg-[#112240] text-[14px] text-[#CCD6F6] placeholder-[#495670] outline-none focus:border-[#64FFDA] transition-colors"
            />
        </div>
    )
}

export default CoinSearchBar;
