import { useState, useEffect } from "react";
import { getTickers } from "../../apis/Market/tickers";
import { useNavigate } from "react-router-dom";

const formatPrice = (price) => {
    return price.toLocaleString("ko-KR");
};

const formatTradeValue = (value) => {
    const eok = value / 100000000;
    if (eok >= 1) {
        return `${Math.round(eok).toLocaleString("ko-KR")}억`;
    }
    return value.toLocaleString("ko-KR");
};

const formatChangeRate = (rate) => {
    const percent = (rate * 100).toFixed(2);
    return rate >= 0 ? `+${percent}` : percent;
};

const CoinListTable = () => {
    const nav = useNavigate();

    const [activeTab, setActiveTab] = useState("domestic");
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCoins = async (marketType) => {
        try {
            setLoading(true);
            setError(null);
            const res = await getTickers(marketType);
            setCoins(res.data || []);
        } catch (err) {
            setError("시세 정보를 불러오는데 실패했습니다.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const marketType = activeTab === "domestic" ? "KRW" : "BTC";
        fetchCoins(marketType);
    }, [activeTab]);

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
            {loading ? (
                <div className="px-6 py-8 text-center text-[14px] text-[#9E9E9E]">
                    로딩 중...
                </div>
            ) : error ? (
                <div className="px-6 py-8 text-center text-[14px] text-[#FF4242]">
                    {error}
                </div>
            ) : (
                coins.map((coin, index) => (
                    <div
                        key={`${coin.symbol}-${index}`}
                        className="grid grid-cols-[2fr_1fr_1fr_1fr] px-6 py-4 border-b border-[#F0F0F0] last:border-b-0 hover:bg-[#FAFAFA] transition-colors cursor-pointer items-center"
                        onClick={() => nav(`/coindetail/${coin.symbol}`)}
                    >
                        <span className="text-[14px] font-medium text-[#212121]">
                            {coin.name} ({coin.symbol})
                        </span>
                        <span className="text-[14px] text-[#212121] text-right">
                            {activeTab === "domestic" ? "₩" : ""}{formatPrice(coin.price)}
                        </span>
                        <span className={`text-[14px] font-semibold text-right ${coin.changeRate >= 0 ? "text-[#FF4242]" : "text-[#4073FF]"
                            }`}>
                            {formatChangeRate(coin.changeRate)}%
                        </span>
                        <span className="text-[14px] text-[#787878] text-right">
                            {activeTab === "domestic" ? "₩" : ""}{formatTradeValue(coin.tradeValue)}
                        </span>
                    </div>
                ))
            )}
        </div>
    )
}

export default CoinListTable;

