import { useState } from "react";

const dummyCoins = [
    { name: "비트코인", ticker: "BTC", price: "142,580,000", change: "+5.2", isPositive: true, volume: "1,245억" },
    { name: "이더리움", ticker: "ETH", price: "4,825,000", change: "-2.8", isPositive: false, volume: "865억" },
    { name: "리플", ticker: "XRP", price: "3,250", change: "+12.5", isPositive: true, volume: "523억" },
    { name: "리플", ticker: "XRP", price: "3,250", change: "+12.5", isPositive: true, volume: "523억" },
    { name: "리플", ticker: "XRP", price: "3,250", change: "+12.5", isPositive: true, volume: "523억" },
    { name: "리플", ticker: "XRP", price: "3,250", change: "+12.5", isPositive: true, volume: "523억" },
    { name: "리플", ticker: "XRP", price: "3,250", change: "+12.5", isPositive: true, volume: "523억" },
    { name: "리플", ticker: "XRP", price: "3,250", change: "+12.5", isPositive: true, volume: "523억" },
];

const CoinListTable = () => {
    const [activeTab, setActiveTab] = useState("domestic");

    return (
        <div className="border border-[#E0E0E0] bg-white rounded-lg">
            {/* Header */}
            <div className="flex flex-row items-center justify-between px-6 py-4 border-b border-[#F0F0F0]">
                <h2 className="text-[18px] font-bold text-[#212121]">코인 시세</h2>
                <div className="flex flex-row items-center gap-2">
                    <button
                        onClick={() => setActiveTab("domestic")}
                        className={`px-4 py-1.5 rounded-md text-[13px] font-semibold transition-colors cursor-pointer ${activeTab === "domestic"
                                ? "bg-[#1F78F2] text-white"
                                : "bg-[#F5F5F5] text-[#787878] hover:bg-[#EBEBEB]"
                            }`}
                    >
                        국내시세
                    </button>
                    <button
                        onClick={() => setActiveTab("overseas")}
                        className={`px-4 py-1.5 rounded-md text-[13px] font-semibold transition-colors cursor-pointer ${activeTab === "overseas"
                                ? "bg-[#1F78F2] text-white"
                                : "bg-[#F5F5F5] text-[#787878] hover:bg-[#EBEBEB]"
                            }`}
                    >
                        해외시세
                    </button>
                    <button className="px-3 py-1.5 rounded-md text-[13px] bg-[#F5F5F5] text-[#787878] hover:bg-[#EBEBEB] transition-colors cursor-pointer flex items-center gap-1">
                        1시간
                        <iconify-icon icon="mingcute:down-fill" className="text-[12px]"></iconify-icon>
                    </button>
                </div>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr] px-6 py-3 text-[13px] text-[#9E9E9E] border-b border-[#F0F0F0]">
                <span>코인명</span>
                <span className="text-right">가격</span>
                <span className="text-right">등락폭</span>
                <span className="text-right">거래대금</span>
            </div>

            {/* Table Rows */}
            {dummyCoins.map((coin, index) => (
                <div
                    key={index}
                    className="grid grid-cols-[2fr_1fr_1fr_1fr] px-6 py-4 border-b border-[#F0F0F0] last:border-b-0 hover:bg-[#FAFAFA] transition-colors cursor-pointer items-center"
                >
                    <span className="text-[14px] font-medium text-[#212121]">
                        {coin.name} ({coin.ticker})
                    </span>
                    <span className="text-[14px] text-[#212121] text-right">
                        ₩{coin.price}
                    </span>
                    <span className={`text-[14px] font-semibold text-right ${coin.isPositive ? "text-[#FF4242]" : "text-[#4073FF]"
                        }`}>
                        {coin.change}%
                    </span>
                    <span className="text-[14px] text-[#787878] text-right">
                        ₩{coin.volume}
                    </span>
                </div>
            ))}
        </div>
    )
}

export default CoinListTable;
